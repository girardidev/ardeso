import { StorageService } from "@/core";
import { getS3Service } from "./di-s3-service";
import { getStorageRepository } from "./di-storage-repository";

let storageService: StorageService;

export function getStorageService(): StorageService {
  if (!storageService) {
    storageService = new StorageService(getStorageRepository(), getS3Service());
  }
  return storageService;
}
