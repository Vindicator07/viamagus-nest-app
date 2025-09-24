import {
  IsString,
  IsOptional,
  IsISO8601,
  IsIn,
  IsObject,
} from 'class-validator';
import type { TaskStatus } from '../tasks.entity';

export class CreateTaskDto {
  @IsString()
  description!: string;

  @IsOptional()
  @IsISO8601()
  dueDate?: string;

  @IsOptional()
  @IsString()
  assigneeId?: string;

  @IsOptional()
  @IsIn(['open', 'in_progress', 'done', 'blocked'])
  status?: TaskStatus;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
