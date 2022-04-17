import type { Prisma } from '@prisma/client';
import { Role } from '@prisma/client';
import prisma from 'lib/prisma';

export async function getUser(id: number) {
  return prisma.user.findUnique({ where: { id }, rejectOnNotFound: true });
}

export async function getUserRole(id: number) {
  const user = await prisma.user.findUnique({
    select: { role: true },
    where: { id },
    rejectOnNotFound: true,
  });
  return user.role;
}

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getManagers() {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true },
    where: { role: { in: [Role.MANAGER, Role.ADMIN] } },
  });
}

export async function upsertUser(
  googleId: string,
  { name, email, image }: Pick<Prisma.UserCreateInput, 'name' | 'email' | 'image'>,
) {
  return prisma.user.upsert({
    where: {
      googleId,
    },
    create: {
      googleId,
      name,
      email,
      image,
    },
    update: {
      name,
      email,
      image,
    },
  });
}

export async function updateUserRole(id: number, role: Role) {
  return prisma.user.update({
    where: { id },
    data: { role },
  });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}
