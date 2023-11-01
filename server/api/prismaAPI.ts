
import { PrismaClient } from "@prisma/client";


export async function createNewUser(prisma: PrismaClient, data: { username: string, password: string, email: string }) {
    return await prisma.entry.create({
        data: {
            username: data.username,
            password: data.password,
            content: data.email, // Assuming content field is used to store email
            // Include other default or required fields as necessary
        }
    });
}


async function getPasswordByUsername(prisma, username: string) {
    const entry = await prisma.entry.findFirst({
      where: {
        title: username,
      },
      select: {
        password: true
      }
    });
    return entry?.password;
  }

  
  async function getSkillsByUsername(prisma, username: string) {
    const entry = await prisma.entry.findFirst({
      where: {
        title: username,
      },
      select: {
        skills: true
      }
    });
    return entry?.skills;
  }

  async function deleteEntryByUsername(prisma, username: string) {
    await prisma.entry.delete({
      where: {
        title: username,
      }
    });
  }

 

  async function modifyEntryByUsername(prisma, username: string, data: Partial<{ password: string, content: string, skills: Skills }>) {
    const updatedEntry = await prisma.entry.update({
      where: {
        title: username,
      },
      data: data
    });
    return updatedEntry;
  }

  
  async function getTableIdByUsername(prisma, username: string) {
    const entry = await prisma.entry.findFirst({
      where: {
        title: username,
      },
      select: {
        id: true
      }
    });
    return entry?.id;
  }
  