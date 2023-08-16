import { IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(['admin', 'ofisant(ka)'])
  role: 'admin' | 'ofisant(ka)';
}
