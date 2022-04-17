import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

// Reuse prisma client in development, fixes issue with hot reloading
// clearing the cache
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
