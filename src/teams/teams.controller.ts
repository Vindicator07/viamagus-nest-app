import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-teams.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() dto: CreateTeamDto) {
    return this.teamsService.create(dto);
  }

  @Get()
  list() {
    return this.teamsService.list();
  }

  @Post(':teamId/members/:userId')
  addMember(@Param('teamId') teamId: string, @Param('userId') userId: string) {
    return this.teamsService.addMember(teamId, userId);
  }
}
