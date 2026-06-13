import PocketBase from 'pocketbase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const pb = new PocketBase('http://89.169.189.230');

// Firebase конфигурация
const firebaseConfig = {
  projectId: "gen-lang-client-0552215593",
  appId: "1:406528043577:web:7380baa113dce45f937be8",
  apiKey: "AIzaSyAtBl4TLTGj0kOLBqJPg_SC30ob-KslYYY",
  authDomain: "gen-lang-client-0552215593.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-3601b419-e855-408d-83fb-79e2a4f801f5",
  storageBucket: "gen-lang-client-0552215593.firebasestorage.app",
  messagingSenderId: "406528043577",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

// Вспомогательная функция для обработки ошибок
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  GET = "get",
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Firestore Error [${operationType}] at ${path}:`, message);
}

export function handlePBError(error: unknown, operationType: OperationType, path: string) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`PB Error [${operationType}] at ${path}:`, message);
  throw new Error(message);
}