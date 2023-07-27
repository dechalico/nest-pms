export class ErrorInfo {
  readonly description: string;
  readonly code: string;
  readonly error: Error;

  constructor(opts: { description: string; code: string; error: Error }) {
    this.description = opts.description;
    this.code = opts.code;
    this.error = opts.error;
  }
}

export class AppResult<Type> {
  protected succeeded: boolean;
  protected message: string;
  protected target: Type;
  protected error: ErrorInfo | undefined;

  constructor(opts: {
    succeeded: boolean;
    message: string;
    target: Type;
    error: ErrorInfo | undefined;
  }) {
    this.succeeded = opts.succeeded;
    this.message = opts.message;
    this.target = opts.target;
    this.error = opts.error;
  }

  get Succeeded(): boolean {
    return this.succeeded;
  }

  get Message(): string {
    return this.message;
  }

  get Result(): Type {
    return this.target;
  }

  get Error(): ErrorInfo {
    return this.error;
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
    errorCode?: string | undefined,
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
