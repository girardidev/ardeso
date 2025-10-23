import { storageTable } from "@core/schemas";
import { eq } from "drizzle-orm";
import type { NewStorageFile, StorageFile, StorageRepository } from "@/core";
import { db } from "@/shared";

export class DrizzleStorageRepository implements StorageRepository {
  async create(file: NewStorageFile): Promise<StorageFile> {
    const now = new Date();

    const [result] = await db
      .insert(storageTable)
      .values({
        ...file,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    if (!result) {
      throw new Error("Failed to create storage file");
    }

    return result;
  }

  async findById(id: string): Promise<StorageFile | null> {
    const result = await db
      .select()
      .from(storageTable)
      .where(eq(storageTable.id, id))
      .limit(1);

    return result[0] || null;
  }

  async findByUserId(userId: string): Promise<StorageFile[]> {
    return await db
      .select()
      .from(storageTable)
      .where(eq(storageTable.userId, userId));
  }

  async findByKey(key: string): Promise<StorageFile | null> {
    const result = await db
      .select()
      .from(storageTable)
      .where(eq(storageTable.key, key))
      .limit(1);

    return result[0] || null;
  }

  async delete(id: string): Promise<void> {
    await db.delete(storageTable).where(eq(storageTable.id, id));
  }
}
