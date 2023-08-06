export abstract class IAsyncInteractorHandler<TInteractor, TResult> {
  executeAsync(args: TInteractor): Promise<TResult> {
    throw new Error('executeAsync method not emplemented');
  }
}
