import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    private usersService: UsersService,
  ) {}

  create(dto: CreateTaskDto) {
    const t = this.taskRepo.create({
      description: dto.description,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      status: dto.status || 'open',
      metadata: dto.metadata || {},
    });
    if (dto.assigneeId) t.assigneeId = dto.assigneeId;
    return this.taskRepo.save(t);
  }

  list() {
    return this.taskRepo.find();
  }

  async findOne(id: string) {
    const t = await this.taskRepo.findOne({ where: { id } });
    if (!t) throw new NotFoundException('Task not found');
    return t;
  }

  async assign(taskId: string, assigneeId: string) {
    const task = await this.findOne(taskId);
    const user = await this.usersService.findOne(assigneeId);
    task.assignee = user;
    task.assigneeId = user.id;
    return this.taskRepo.save(task);
  }

  async update(taskId: string, dto: UpdateTaskDto) {
    const task = await this.findOne(taskId);
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.dueDate !== undefined)
      task.dueDate = dto.dueDate ? new Date(dto.dueDate) : undefined;
    if (dto.status !== undefined) task.status = dto.status;
    if (dto.assigneeId !== undefined) {
      if (dto.assigneeId === null) {
        task.assignee = null;
        task.assigneeId = null;
      } else {
        const user = await this.usersService.findOne(dto.assigneeId);
        task.assignee = user;
        task.assigneeId = user.id;
      }
    }
    if (dto.metadata !== undefined) task.metadata = dto.metadata;
    return this.taskRepo.save(task);
  }

  async remove(taskId: string) {
    const t = await this.findOne(taskId);
    return this.taskRepo.remove(t);
  }
}
