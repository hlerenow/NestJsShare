import { SetMetadata } from '@nestjs/common';

// SetMetadata 用于设置请求的元信息
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
