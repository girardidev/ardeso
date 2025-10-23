import { randomUUID } from "node:crypto";
import { s3Config, validationConfig } from "@/config";
import type { S3Service, StorageRepository } from "@/core";

export interface UploadUrlResult {
  uploadUrl: string;
  fileId: string;
  key: string;
}

export class StorageService {
  constructor(
    private storageRepository: StorageRepository,
    private s3Service: S3Service,
  ) {}

  async getUploadSignedUrl(
    userId: string,
    filename: string,
    mimetype: string,
    size: number,
  ): Promise<UploadUrlResult> {
    if (size > validationConfig.maxFileSize) {
      throw new Error(
        `File size exceeds maximum allowed size of ${validationConfig.maxFileSize} bytes`,
      );
    }

    if (!validationConfig.allowedMimetypes.includes(mimetype)) {
      throw new Error(`Mimetype ${mimetype} is not allowed`);
    }

    const key = this.generateFileKey(userId, filename);
    const uploadUrl = await this.s3Service.generateUploadSignedUrl(
      key,
      mimetype,
      s3Config.uploadExpiresInSeconds,
    );

    const file = await this.storageRepository.create({
      key,
      filename,
      mimetype,
      size,
      bucket: s3Config.bucket,
      userId,
    });

    return {
      uploadUrl,
      fileId: file.id,
      key: file.key,
    };
  }

  async getDownloadSignedUrl(fileId: string, userId: string): Promise<string> {
    const file = await this.storageRepository.findById(fileId);

    if (!file) {
      throw new Error("File not found");
    }

    if (file.userId !== userId) {
      throw new Error("Unauthorized access to file");
    }

    return await this.s3Service.generateDownloadSignedUrl(
      file.key,
      s3Config.downloadExpiresInSeconds,
    );
  }

  async deleteFile(fileId: string, userId: string): Promise<boolean> {
    const file = await this.storageRepository.findById(fileId);

    if (!file) {
      throw new Error("File not found");
    }

    if (file.userId !== userId) {
      throw new Error("Unauthorized access to file");
    }

    await this.s3Service.deleteObject(file.key);
    await this.storageRepository.delete(fileId);

    return true;
  }

  private generateFileKey(userId: string, filename: string): string {
    const timestamp = Date.now();
    const uuid = randomUUID();
    const extension = filename.split(".").pop();
    const baseFolder = s3Config.baseFolder
      ? `${s3Config.baseFolder}/`
      : "unknown/";
    return `${baseFolder}${userId}/${timestamp}-${uuid}.${extension}`;
  }
}
