import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'mareln_admin_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

function getAdminConfig() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!password || !secret) {
    return null;
  }

  return { password, secret };
}

export function isAuthConfigured(): boolean {
  return getAdminConfig() !== null;
}

export function validateAdminCredentials(inputPassword: string): boolean {
  const config = getAdminConfig();
  if (!config) {
    return false;
  }

  // Comparação em tempo constante para evitar timing attacks
  const expectedBuffer = Buffer.from(config.password);
  const inputBuffer = Buffer.from(inputPassword);

  if (expectedBuffer.length !== inputBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, inputBuffer);
}

export function generateSessionToken(): string | null {
  const config = getAdminConfig();
  if (!config) {
    return null;
  }

  const issuedAt = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', config.secret)
    .update(issuedAt)
    .digest('hex');

  return `${issuedAt}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  const config = getAdminConfig();
  if (!config || !token) {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return false;
  }

  const [issuedAtStr, providedSignature] = parts;
  const issuedAt = parseInt(issuedAtStr, 10);

  if (isNaN(issuedAt)) {
    return false;
  }

  // Verifica expiração
  if (Date.now() - issuedAt > SESSION_DURATION_MS) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', config.secret)
    .update(issuedAtStr)
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature);
  const providedBuffer = Buffer.from(providedSignature);

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return false;
    }

    return verifySessionToken(sessionCookie.value);
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<boolean> {
  const token = generateSessionToken();
  if (!token) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 dias em segundos
  });

  return true;
}

export async function clearAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
  } catch {
    // Silently continue
  }
}
