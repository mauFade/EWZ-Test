// Import modules
import { PrismaClient } from "@prisma/client";

// Módulo responsável pela conexão com o banco de dados com Prisma
const prisma = new PrismaClient();

export default prisma;
