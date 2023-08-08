import { SetMetadata } from '@nestjs/common';

export const IS_ALLOW_ANONYMOUS = 'allow-anonymous';

export const AllowAnonymous = () => SetMetadata(IS_ALLOW_ANONYMOUS, true);
