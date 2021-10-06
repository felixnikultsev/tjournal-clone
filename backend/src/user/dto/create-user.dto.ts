import { IsEmail, Length } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/UniqueValidation';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @Length(3)
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  @UniqueOnDatabase(User, { message: 'Такая почта уже существует' })
  email: string;

  @Length(6, 32, { message: 'Пароль должен состоять минимум из 6 символов' })
  password?: string;
}
