import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Midwife } from './midwife.entity';

@Injectable()
export class MidwivesService {
  constructor(
    @InjectRepository(Midwife)
    private midwifesRepository: Repository<Midwife>,
  ) {}

  findAll(): Promise<Midwife[]> {
    return this.midwifesRepository.find();
  }

  findById(id: number): Promise<Midwife | null> {
    return this.midwifesRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<Midwife | null> {
    return this.midwifesRepository.findOneBy({ email });
  }

  async create(details: Midwife): Promise<Midwife> {
    return await this.midwifesRepository.save(details);
  }
}
