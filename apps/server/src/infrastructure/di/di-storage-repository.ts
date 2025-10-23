import type { StorageRepository } from "@/core";
import { DrizzleStorageRepository } from "@/infrastructure";

let storageRepository: StorageRepository;

export function getStorageRepository(): StorageRepository {
  if (!storageRepository) {
    storageRepository = new DrizzleStorageRepository();
  }
  return storageRepository;
}
