export type ReturnType<T = unknown> =
  | {
      ok: true;
      status: number;
      data: T;
      message?: string;
    }
  | {
      ok: false;
      status: number;
      data?: T | null;
      message: string;
    };
