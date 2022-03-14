import type AbstractController from 'controllers/AbstractController';
import type { Document } from 'mongoose';
import type { NextApiResponse } from 'next';
import HTTPResponseError from './HTTPResponseError';

/**
 * Router for handling API requests.
 */
export default class ApiRouter<T extends Document> {
  controller: AbstractController<T>;

  res: NextApiResponse;

  allowedHeaders: string[];

  constructor(
    controller: AbstractController<T>,
    res: NextApiResponse,
    allowedHeaders: string[],
  ) {
    this.controller = controller;
    this.res = res;
    this.allowedHeaders = allowedHeaders;
  }

  /**
   * Invokes a function and catches any potential errors.
   * @param func The function to invoke.
   */
  private dispatch(func: () => void): void {
    try {
      func();
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
      if (error instanceof HTTPResponseError) {
        this.res.status(error.statusCode).end();
      }
      this.res.status(500).end();
    }
  }

  async create(body: Record<string, any>): Promise<void> {
    this.dispatch(async () => this.res.json(await this.controller.create(body)));
  }

  async index(): Promise<void> {
    this.dispatch(async () => this.res.json(await this.controller.index()));
  }

  async get(id: string): Promise<void> {
    this.dispatch(async () => this.res.json(await this.controller.get(id)));
  }

  async update(id: string, body: Record<string, any>): Promise<void> {
    this.dispatch(async () => this.res.json(await this.controller.update(id, body)));
  }

  async delete(id: string): Promise<void> {
    this.dispatch(async () => this.res.json(await this.controller.delete(id)));
  }

  default(): void {
    this.res.status(405).setHeader('Allow', this.allowedHeaders).end();
  }
}
