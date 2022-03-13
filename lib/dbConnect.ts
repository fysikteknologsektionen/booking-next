import mongoose from 'mongoose';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

/**
 * Gets a cached connection to mongoose or creates a new one if none is cached
 * @returns A (cached) mongoose connection
 */
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    if (!DB_CONNECTION_STRING) {
      throw new Error(
        'Please set the DB_CONNECTION_STRING environment variables inside .env.local',
      );
    }

    cached.promise = mongoose
      .connect(DB_CONNECTION_STRING, opts)
      .then((conn) => conn);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
