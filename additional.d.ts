import mongoose, { Connection } from 'mongoose';

declare global {
  // This is the correct way to extend globalThis as of node 16+
  // eslint-disable-next-line vars-on-top, no-var
  var mongoose: {
    conn: Connection | null;
    promise: Promise<mongoose> | null;
  };
}
