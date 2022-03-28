import dbConnect from 'src/lib/dbConnect';
import getWhitelistedEntries from 'src/lib/getWhitelistedEntries';
import HTTPResponseError from 'src/lib/HTTPResponseError';
import type {
  Connection,
  HydratedDocument,
  LeanDocument,
  Model,
} from 'mongoose';

type LeanDocumentType<T> = LeanDocument<HydratedDocument<T>>;

/** Class representing a base repository  */
export default class BaseRepository<T extends Record<string, any>> {
  private Model: Model<T>;

  private whitelistedProperties: string[];

  private connection: Promise<Connection>;

  /**
   * Create a BaseRepository
   * @param Model The underlying mongoose model
   * @param whitelistedProperties List of whitelisted attributes for creating/editing documents
   */
  constructor(Model: Model<T>, whitelistedProperties: string[]) {
    this.Model = Model;
    this.whitelistedProperties = whitelistedProperties;
    this.connection = dbConnect();
  }

  /**
   * Create a new document.
   * @param body Request body.
   * @returns The new document.
   */
  public async create(body: Record<string, any>): Promise<HydratedDocument<T>> {
    await this.connection;
    const data = getWhitelistedEntries(body, this.whitelistedProperties);
    const doc = new this.Model(data);
    await doc.save();
    return doc;
  }

  /**
   * Indexes documents.
   * @returns Array of documents.
   */
  public async index(): Promise<LeanDocumentType<T>[]> {
    await this.connection;
    const docs = await this.Model.find().lean<LeanDocumentType<T>[]>().exec();
    return docs;
  }

  /**
   *  Gets a specific document.
   * @param id The document id.
   * @returns The specified document.
   */
  public async get(id: string): Promise<LeanDocumentType<T>> {
    await this.connection;
    const doc = await this.Model.findById(id)
      .lean<LeanDocumentType<T> | null>()
      .exec();
    if (!doc) {
      throw new HTTPResponseError(
        404,
        `${this.Model.name} with id '${id}' not found.`,
      );
    }
    return doc;
  }

  public async update(
    id: string,
    body: Record<string, any>,
  ): Promise<LeanDocumentType<T>> {
    await this.connection;
    const data = getWhitelistedEntries(body, this.whitelistedProperties);
    const doc = await this.Model.findByIdAndUpdate(id, data, { new: true })
      .lean<LeanDocumentType<T> | null>()
      .exec();
    if (!doc) {
      throw new HTTPResponseError(
        404,
        `${this.Model.name} with id '${id}' not found.`,
      );
    }
    return doc;
  }

  /**
   * Deletes a specific document.
   * @param id The document id.
   * @returns The deleted document.
   */
  public async delete(id: string): Promise<LeanDocumentType<T>> {
    await this.connection;
    const doc = await this.Model.findByIdAndDelete(id)
      .lean<LeanDocumentType<T>>()
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
