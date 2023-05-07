import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Midwife } from './midwife.entity';
import { MidwivesService } from './midwives.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('midwives')
export class MidwivesController {
  constructor(private readonly usersService: MidwivesService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers(): Promise<Midwife[]> {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<Midwife> | null {
    return this.usersService.findById(parseInt(id));
  }
}
