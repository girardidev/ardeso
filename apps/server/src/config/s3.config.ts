import { env } from "./env.config";

export const s3Config = {
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
  bucket: env.AWS_S3_BUCKET,
  baseFolder: env.AWS_S3_BASE_FOLDER,
  uploadExpiresInSeconds: env.AWS_S3_UPLOAD_EXPIRES_IN,
  downloadExpiresInSeconds: env.AWS_S3_DOWNLOAD_EXPIRES_IN,
};
