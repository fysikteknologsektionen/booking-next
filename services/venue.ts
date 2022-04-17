import type { Prisma } from '@prisma/client';
import prisma from 'lib/prisma';

export async function createVenue({
  name,
  description,
  managers,
}: Pick<Prisma.VenueCreateInput, 'name' | 'description' | 'managers'>) {
  return prisma.venue.create({
    data: {
      name,
      description,
      managers,
    },
  });
}

export async function getVenuesWithManagers() {
  return prisma.venue.findMany({
    include: {
      managers: true,
    },
    orderBy,
  });
}
