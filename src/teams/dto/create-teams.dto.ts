import { IsString, IsOptional, IsArray, ArrayUnique } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  memberIds?: string[];
}
