import { User } from '../../auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  expenseId: number;

  @Column()
  expenseName: string;

  @Column({ type: 'double precision' })
  expenseAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expenseDate: Date;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;
}
