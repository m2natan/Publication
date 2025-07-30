// lib/prisma.ts

import { PrismaClient } from "./generated/prisma";

// This is a global variable to prevent multiple instances of PrismaClient in development.
// It's crucial for hot-reloading in Next.js.
declare global {
  // eslint-disable-next-line no-var
  var globalForPrisma: { prisma?: PrismaClient };
}

export const prisma =
  global.globalForPrisma?.prisma ||
  (global.globalForPrisma = { prisma: new PrismaClient() }).prisma;

// In development, store the Prisma client instance globally to reuse it across hot-reloads
if (process.env.NODE_ENV !== "production") {
  if (!global.globalForPrisma) {
    global.globalForPrisma = {};
  }
  global.globalForPrisma.prisma = prisma;
}
