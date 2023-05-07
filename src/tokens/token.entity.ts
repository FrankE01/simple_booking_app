import { Midwife } from 'src/midwives/midwife.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User || Midwife, (person: User | Midwife) => person.tokens)
  person: User | Midwife;

  @Column()
  access_token: string;

  @Column()
  access_token_expiration_time: Date;

  @Column()
  refresh_token: string;

  @Column()
  refresh_token_expiration_time: Date;
}
