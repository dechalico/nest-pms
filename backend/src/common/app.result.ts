export enum AppErrorCodes {
  NotFound = 'NOT_FOUND',
  AlreadyExist = 'ALREADY_EXIST',
  InvalidRequest = 'INVALID_REQUEST',
  InternalError = 'INTERNAL_ERROR',
}

export class ErrorInfo {
  readonly description: string;
  readonly code: AppErrorCodes;
  readonly error: Error;

  constructor(opts: { description: string; code: AppErrorCodes; error: Error }) {
    this.description = opts.description;
    this.code = opts.code;
    this.error = opts.error;
  }
}

export class AppResult<Type> {
  protected _succeeded: boolean;
  protected _message: string;
  protected _target: Type;
  protected _error: ErrorInfo | undefined;

  constructor(opts: {
    succeeded: boolean;
    message: string;
    target: Type;
    error: ErrorInfo | undefined;
  }) {
    this._succeeded = opts.succeeded;
    this._message = opts.message;
    this._target = opts.target;
    this._error = opts.error;
  }

  get succeeded(): boolean {
    return this._succeeded;
  }

  get message(): string {
    return this._message;
  }

  get result(): Type {
    return this._target;
  }

  get error(): ErrorInfo {
    return this._error;
  }

  static createSucceeded<Type>(result: Type, message: string): AppResult<Type> {
    return new AppResult<Type>({
      message,
      succeeded: true,
      target: result,
      error: undefined,
    });
  }

  static createFailed<Type>(
    error: Error,
    message: string,
    errorCode?: AppErrorCodes | undefined,
  ): AppResult<Type> {
    return new AppResult<Type>({
      error: new ErrorInfo({ code: errorCode, description: message, error }),
      message,
      succeeded: false,
      target: undefined,
    });
  }
}

export interface Interactor<TArgs, TResult> {
  execute: (args: TArgs) => TResult;
  executeAsync: (args: TArgs) => Promise<TResult>;
}
