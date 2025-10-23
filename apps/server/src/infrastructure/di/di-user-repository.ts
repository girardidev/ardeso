import type { UserRepository } from "@/core";
import { DrizzleUserRepository } from "@/infrastructure";

let userRepository: UserRepository;

export function getUserRepository(): UserRepository {
  if (!userRepository) {
    userRepository = new DrizzleUserRepository();
  }
  return userRepository;
}
