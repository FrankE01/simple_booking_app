import { Token } from 'src/tokens/token.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Midwife {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  firstName: string;

  @Column({
    length: 100,
  })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Token, (token) => token.person)
  tokens: Token[];
}
