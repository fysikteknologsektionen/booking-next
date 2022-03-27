import dbConnect from 'src/lib/dbConnect';
import getWhitelistedEntries from 'src/lib/getWhitelistedEntries';
import HTTPResponseError from 'src/lib/HTTPResponseError';
import type {
  Connection,
  HydratedDocument,
  LeanDocument,
  Model,
} from 'mongoose';

/**
 * Abstract repository for handling data access
 * @template T The data resource type
 */
export default abstract class AbstractRepository<T> {
  private Model: Model<T>;

  private attributes: string[];

  private connection: Promise<Connection | null>;

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
  public async create(body: Record<string, any>): Promise<HydratedDocument<T>> {
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
  public async index(): Promise<LeanDocument<HydratedDocument<T>>[]> {
    await this.connection;
    // Types to lean() don't get inferred correctly so we explicitly type it
    const docs = await this.Model.find()
      .lean<LeanDocument<HydratedDocument<T>>[]>()
      .exec();
    return docs;
  }

  /**
   *  Gets a specific document.
   * @param id The document id.
   * @returns The specified document.
   */
  public async get(id: string): Promise<LeanDocument<HydratedDocument<T>>> {
    await this.connection;
    const doc = await this.Model.findById(id)
      .lean<LeanDocument<HydratedDocument<T>> | null>()
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
  ): Promise<LeanDocument<HydratedDocument<T>>> {
    await this.connection;
    const data = getWhitelistedEntries(body, this.attributes);
    const venue = await this.Model.findByIdAndUpdate(id, data, { new: true })
      .lean<LeanDocument<HydratedDocument<T>> | null>()
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
  public async delete(id: string): Promise<LeanDocument<HydratedDocument<T>>> {
    await this.connection;
    const doc = await this.Model.findByIdAndDelete(id)
      .lean<LeanDocument<HydratedDocument<T>> | null>()
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
