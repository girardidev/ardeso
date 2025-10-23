import type { NewStorageFile, StorageFile } from "@/core";

export interface StorageRepository {
  create(file: NewStorageFile): Promise<StorageFile>;
  findById(id: string): Promise<StorageFile | null>;
  findByUserId(userId: string): Promise<StorageFile[]>;
  findByKey(key: string): Promise<StorageFile | null>;
  delete(id: string): Promise<void>;
}
