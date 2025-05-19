import { User } from '../../auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Icome {
  @PrimaryGeneratedColumn()
  icomeId: number;

  @Column()
  source: string;

  @Column({ type: 'double precision' })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => User, (user) => user.icomes)
  user: User;
}
