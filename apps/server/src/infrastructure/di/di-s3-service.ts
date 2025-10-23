import type { S3Service } from "@/core";
import { S3ServiceImpl } from "@/infrastructure";

let s3Service: S3Service;

export function getS3Service(): S3Service {
  if (!s3Service) {
    s3Service = new S3ServiceImpl();
  }
  return s3Service;
}
