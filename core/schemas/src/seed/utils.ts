import { faker } from "@faker-js/faker";

faker.seed(123);

export function genEmails(length: number) {
  return Array.from({ length }, (_, i) => `user${i}@mail.com`);
}

export function genAvatars(length: number) {
  return Array.from({ length }, (_) => faker.image.avatarGitHub());
}

export function genUuids(length: number) {
  return Array.from({ length }, (_) => faker.string.uuid());
}
