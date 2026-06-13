import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://89.169.189.230');

// Вспомогательный enum для типов операций
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  GET = "get",
}

// Функция для обработки ошибок PocketBase
export function handlePBError(error: unknown, operationType: OperationType, path: string) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`PB Error [${operationType}] at ${path}:`, message);
  throw new Error(message);
}

// Функция для обработки ошибок Firestore (для совместимости, если потребуется)
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string) {
  handlePBError(error, operationType, path);
}