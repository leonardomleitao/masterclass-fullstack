import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type RawUser = {
  name: string;
  email: string;
  password: string;
};

async function readJSON<T>(relPath: string): Promise<T> {
  const filePath = path.resolve(process.cwd(), relPath);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

async function main() {
  const user = await readJSON<RawUser>('prisma/seed/user.json');

  const passwordHash = await bcrypt.hash(user.password, 10);
  await prisma.user.upsert({
    where: { email: user.email },
    update: { name: user.name, password: passwordHash },
    create: {
      name: user.name,
      email: user.email,
      password: passwordHash,
    },
  });

  console.log('✅ Seed concluído');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
