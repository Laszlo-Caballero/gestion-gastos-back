import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModule } from './expense/expense.module';
import { MaximumQuantityModule } from './maximum-quantity/maximum-quantity.module';
import { AuthModule } from './auth/auth.module';
import { IcomeModule } from './icome/icome.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: ['dist/**/*.entity.js'],
    }),
    ExpenseModule,
    MaximumQuantityModule,
    AuthModule,
    IcomeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
