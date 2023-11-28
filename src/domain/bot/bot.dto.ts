import { IsOptional} from "class-validator";

export class CreatBotUserDto {
  
  @IsOptional()
  chat_id: string;

  @IsOptional()
  username: string;

  @IsOptional()
  first_name: string;
}
