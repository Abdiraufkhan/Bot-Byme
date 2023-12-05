import { CreatBotUserDto } from "./bot.dto";
import botUser from "./bot.model";

class BotRepo {
  
  public async create(data: CreatBotUserDto): Promise<botUser> {
    return botUser.create({
      ...data,
    });
  }

  public getByChatId(chat_id):Promise<botUser>{

    return botUser.findOne({
      where: {
        chat_id: chat_id,
      },
    });
  }
  public async findByIdAndUpdate(chat_id: string, newData): Promise<botUser | string> {
    try {
      
      const chat_id_str: string = chat_id.toString()
      console.log("stringchik=",  chat_id_str);
      
      const existingUser = await botUser.findOne({
        where: {
          chat_id: chat_id_str,
        },
      });

      await existingUser.update(newData);
      const updatedField = await botUser.findOne({
        where: {
         chat_id: chat_id_str,
        },
      });

      return updatedField;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error while updating the applicant: " + error.message);
    }
  } 
  public getAll (): Promise<botUser[]>{
    return botUser.findAll();
}
}



export default BotRepo;
