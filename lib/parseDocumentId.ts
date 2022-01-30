import { Document } from 'mongoose';

/**
 * Parses the ObjectId of a mongoose document into a string
 * @param doc Document to parse
 * @returns Document with _id field parsed as string
 */
export default function parseDocumentId<T extends Document>(doc: T) {
  return {
    ...doc,
    _id: doc._id.toString() as string,
  };
}
