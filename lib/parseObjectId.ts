import type { Document, LeanDocument } from 'mongoose';

/**
 * Parses the _id field of mongoose document to string.
 * @param doc Document or array of documents to parse
 * @returns
 */
const parseObjectId = <
  T extends
  | LeanDocument<Document & { _id: any }>
  | LeanDocument<Document & { _id: any }>[],
>(
    doc: T,
  ) => {
  // We can assert the return value to T since we are explicit about generic type and
  // _id is expliticly set to any regardless
  if (Array.isArray(doc)) {
    return doc.map((subdoc) => ({
      ...subdoc,
      _id: subdoc._id.toString(),
    })) as T;
  }
  return {
    ...doc,
    _id: doc._id.toString(),
  } as T;
};

export default parseObjectId;
