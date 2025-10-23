import type { AuthCodeRepository } from "@/core";
import { DrizzleAuthCodeRepository } from "@/infrastructure";

let authCodeRepository: AuthCodeRepository;

export function getAuthCodeRepository(): AuthCodeRepository {
  if (!authCodeRepository) {
    authCodeRepository = new DrizzleAuthCodeRepository();
  }
  return authCodeRepository;
}
