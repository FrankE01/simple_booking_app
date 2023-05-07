import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm"
import { User } from "./user.entity";



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    findById(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id })
    }

    findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email })
    }

    async create(details: User): Promise<User> {
        return await this.usersRepository.save(details)
    }

}