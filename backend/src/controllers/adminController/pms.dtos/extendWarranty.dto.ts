import { Expose } from 'class-transformer';
import { IsDate, IsDateString, IsString } from 'class-validator';

export class ExtendWarrantyArgs {
  @Expose()
  @IsString()
  warrantyTypeId: string;

  @IsDateString()
  dateExtendedStart: Date;
}

export class ExtendWarrantyResult extends ExtendWarrantyArgs {
  @Expose()
  id: string;

  @Expose()
  warrantyHistoryId: string;
}
