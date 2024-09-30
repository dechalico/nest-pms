export class LockPmsHistoryInteractorArgs {
  pmsId: string;
  isLock: boolean;
  warrantyHistoryId: string;
}

export class LockPmsHistoryInteractorResult {
  id: string;
  warrantyHistoryId: string;
  isLock: boolean;
}
