declare const process: { env: Record<string, string | undefined> };
declare const console: { log: (...args: unknown[]) => void; error: (...args: unknown[]) => void };

declare module "zod" {
  export type infer<T> = T extends { _output: infer Output } ? Output : unknown;
  type Schema<T = unknown> = { _output: T; parse(input: unknown): T; min(n: number): Schema<T>; max(n: number): Schema<T>; email(): Schema<T>; uuid(): Schema<T>; url(): Schema<T>; regex(regex: RegExp): Schema<T>; default(value: T): Schema<T>; int(): Schema<T>; positive(): Schema<T> };
  export const z: {
    string(): Schema<string>;
    number(): Schema<number>;
    coerce: { date(): Schema<Date>; number(): Schema<number> };
    enum<const T extends readonly [string, ...string[]]>(values: T): Schema<T[number]>;
    object<T extends Record<string, Schema>>(shape: T): Schema<{ [K in keyof T]: import("zod").infer<T[K]> }>;
  };
}

declare module "jose" {
  export class SignJWT {
    constructor(payload: Record<string, unknown>);
    setProtectedHeader(header: Record<string, unknown>): this;
    setSubject(subject: string): this;
    setIssuedAt(): this;
    setExpirationTime(expiration: string): this;
    sign(secret: Uint8Array): Promise<string>;
  }
  export function jwtVerify(token: string, secret: Uint8Array): Promise<{ payload: Record<string, unknown> & { sub?: string } }>;
}

declare module "drizzle-kit" { export function defineConfig<T>(config: T): T; }
declare module "drizzle-orm/pg-core" {
  type Column = { defaultRandom(): Column; primaryKey(): Column; notNull(): Column; defaultNow(): Column; references(fn: () => Column): Column };
  export function uuid(name: string): Column;
  export function text(name: string): Column;
  export function integer(name: string): Column;
  export function timestamp(name: string, options?: unknown): Column;
  export function pgEnum<T extends readonly string[]>(name: string, values: T): (columnName: string) => Column;
  export function uniqueIndex(name: string): { on(...columns: Column[]): unknown };
  export function pgTable<T extends Record<string, Column>>(name: string, columns: T, extra?: (table: T) => Record<string, unknown>): T;
}

declare module "dotenv" { export function config(): void; }
declare module "nanoid" { export function nanoid(): string; }

declare module "express" {
  export interface Request { header(name: string): string | undefined; session?: { sub: string; email: string; organizationId: string; role: import("@trimatlas/domain").Role }; }
  export interface Response { status(code: number): Response; json(body: unknown): Response; }
  export type NextFunction = () => void;
  export type Handler = (request: Request, response: Response, next: NextFunction) => void | Promise<void>;
  export interface Router { get(path: string, ...handlers: Handler[]): void; }
  export interface Express { disable(name: string): void; use(...handlers: unknown[]): void; listen(port: number, callback?: () => void): void; }
  export function Router(): Router;
  export namespace e { export type Express = import("express").Express; export function json(options?: unknown): Handler; }
  export function json(options?: unknown): Handler;
  const e: { (): Express; json: typeof json; Router: typeof Router };
  export default e;
}

declare module "cors" { import type { Handler } from "express"; export default function cors(options?: unknown): Handler; }
declare module "helmet" { import type { Handler } from "express"; export default function helmet(options?: unknown): Handler; }
declare module "pino-http" { import type { Handler } from "express"; export default function pinoHttp(options?: unknown): Handler; }

declare module "supertest" { export default function request(app: unknown): { get(path: string): { expect(code: number): Promise<{ body: any }>; set(name: string, value: string): { expect(code: number): Promise<{ body: any }> } } }; }
declare module "vitest" { export function describe(name: string, fn: () => void): void; export function it(name: string, fn: () => void | Promise<void>): void; export function expect(value: unknown): any; }

declare module "next" { export type Metadata = { title?: string; description?: string }; export type NextConfig = Record<string, unknown>; }
declare module "react" { export type ReactNode = unknown; export type ButtonHTMLAttributes<T> = Record<string, unknown> & { className?: string; children?: ReactNode }; }
declare namespace React { type ReactNode = unknown; }
declare namespace JSX { interface IntrinsicElements { [elemName: string]: any; } }
declare module "*.css" {}
declare module "tailwindcss" { export type Config = Record<string, unknown>; }
declare module "clsx" { export type ClassValue = unknown; export function clsx(...inputs: ClassValue[]): string; }
declare module "tailwind-merge" { export function twMerge(...inputs: string[]): string; }
