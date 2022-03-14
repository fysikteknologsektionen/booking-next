import dbConnect from 'lib/dbConnect';
import getWhitelistedEntries from 'lib/getWhitelistedEntries';
import HTTPResponseError from 'lib/HTTPResponseError';
import type {
  Connection,
  Document,
  HydratedDocument,
  LeanDocument,
  Model,
} from 'mongoose';

/**
 * Abstract controller for handling CRUD operations
 * @template T The document type.
 */
export default abstract class AbstractController<T extends Document> {
  Model: Model<T>;

  attributes: string[];

  connection: Promise<Connection | null>;

  /**
   *
   * @param Model The underlying mongoose model
   * @param attributes List of attributes available when creating/editing corresponding document
   */
  constructor(Model: Model<T>, attributes: string[]) {
    this.Model = Model;
    this.attributes = attributes;
    this.connection = dbConnect();
  }

  /**
   * Create a new document.
   * @param body Request body.
   * @returns The new document.
   */
  async create(body: Record<string, any>): Promise<HydratedDocument<T>> {
    await this.connection;
    const data = getWhitelistedEntries(body, this.attributes);
    const doc = new this.Model(data);
    await doc.save();
    return doc;
  }

  /**
   * Indexes documents.
   * @returns Array of documents.
   */
  async index(): Promise<LeanDocument<T>[]> {
    await this.connection;
    // Types to lean() don't get inferred correctly so we explicitly type it
    const docs = await this.Model.find().lean<LeanDocument<T>[]>().exec();
    return docs;
  }

  /**
   *  Gets a specific document.
   * @param id The document id.
   * @returns The specified document.
   */
  async get(id: string): Promise<LeanDocument<T>> {
    await this.connection;
    const doc = await this.Model.findById(id)
      .lean<LeanDocument<T> | null>()
      .exec();
    if (!doc) {
      throw new HTTPResponseError(
        404,
        `${this.Model.name} with id '${id}' not found.`,
      );
    }
    return doc;
  }

  async update(id: string, body: Record<string, any>) {
    await this.connection;
    const data = getWhitelistedEntries(body, this.attributes);
    const venue = await this.Model.findByIdAndUpdate(id, data, { new: true })
      .lean<LeanDocument<T> | null>()
      .exec();
    if (!venue) {
      throw new HTTPResponseError(
        404,
        `${this.Model.name} with id '${id}' not found.`,
      );
    }
    return venue;
  }

  /**
   * Deletes a specific document.
   * @param id The document id.
   * @returns The deleted document.
   */
  async delete(id: string): Promise<LeanDocument<T>> {
    await this.connection;
    const doc = await this.Model.findByIdAndDelete(id)
      .lean<LeanDocument<T> | null>()
      .exec();
    if (!doc) {
      throw new HTTPResponseError(
        404,
        `${this.Model.name} with id '${id}' not found.`,
      );
    }
    return doc;
  }
}
