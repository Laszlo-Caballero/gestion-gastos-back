import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from 'src/types/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('resumen')
  resumen(@Request() req: RequestWithUser) {
    return this.authService.resumen(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  user(@Request() req: RequestWithUser) {
    return this.authService.user(req.user);
  }
}
