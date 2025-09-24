import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username!: string;

  @IsString()
  displayName!: string;

  @IsOptional()
  @IsString()
  email?: string;
}
