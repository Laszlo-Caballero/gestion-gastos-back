import { User } from '../../auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MaximumQuantity {
  @PrimaryGeneratedColumn()
  maximumQuantityId: number;

  @Column()
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  initialDate: Date;

  @Column({ default: 0 })
  extra: number;

  @ManyToOne(() => User, (user) => user.maximumQuantities)
  user: User;
}
