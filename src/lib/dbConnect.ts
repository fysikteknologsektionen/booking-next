import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

/**
 * Gets a cached connection to mongoose or creates a new one if none is cached
 * @returns A (cached) mongoose connection
 */
export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

    if (!DB_CONNECTION_STRING) {
      throw new Error(
        'Environment variable "DB_CONNECTION_STRING" is not set. Please set it.',
      );
    }

    cached.promise = mongoose.connect(DB_CONNECTION_STRING, opts);
  }

  cached.conn = await cached.promise;

  if (!cached.conn) {
    throw new Error('Unable to connect to MongoDB.');
  }

  return cached.conn;
}
