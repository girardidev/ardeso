export interface S3Service {
  generateUploadSignedUrl(
    key: string,
    mimetype: string,
    expiresIn: number,
  ): Promise<string>;
  generateDownloadSignedUrl(key: string, expiresIn: number): Promise<string>;
  deleteObject(key: string): Promise<void>;
}
