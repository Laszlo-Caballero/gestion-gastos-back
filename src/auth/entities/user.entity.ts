import { Expense } from '../../expense/entities/expense.entity';
import { MaximumQuantity } from '../../maximum-quantity/entities/maximum-quantity.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @OneToMany(() => MaximumQuantity, (maximumQuantity) => maximumQuantity.user)
  maximumQuantities: MaximumQuantity[];
}
