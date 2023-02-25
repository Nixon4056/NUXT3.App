import { serverSupabaseUser } from '#supabase/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized!' });
  }
  const data = await prisma.wyceny.findMany({
    where: {
      user: user.id,
    },
    select: {
      id: true,
      created_at: true,
      title: true,
      price: true,
      positions: true,
      user: true,
      company: true
    },
  });
  return data
});