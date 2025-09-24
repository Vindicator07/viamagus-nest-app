import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './teams.entity';
import { CreateTeamDto } from './dto/create-teams.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRepo: Repository<Team>,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateTeamDto) {
    const members: User[] = [];
    if (dto.memberIds?.length) {
      for (const id of dto.memberIds) {
        const u = await this.usersService.findOne(id);
        members.push(u);
      }
    }
    const t = this.teamRepo.create({ name: dto.name, members });
    return this.teamRepo.save(t);
  }

  list() {
    return this.teamRepo.find({ relations: ['members'] });
  }

  async addMember(teamId: string, userId: string) {
    const team = await this.teamRepo.findOne({
      where: { id: teamId },
      relations: ['members'],
    });
    if (!team) throw new NotFoundException('Team not found');

    const user = await this.usersService.findOne(userId);
    if (!team.members) team.members = [];
    team.members.push(user);

    return this.teamRepo.save(team);
  }
}
