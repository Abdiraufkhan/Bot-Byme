import botUser from "./bot.model";
import BotRepo from "./bot.repo";
import SendRequest from "./request.axios";
import { AxiosResponse } from "axios";


class BotService {

    public SendSms= new SendRequest()
    public repo = new BotRepo()

    public async sendMessageWithButton(messageObj, messageText, buttons){
        try {
            const keyboard = {
                keyboard: buttons,
                resize_keyboard: true,
                one_time_keyboard: true,
              };
    
              return this.SendSms.post("sendMessage", { 
                chat_id: messageObj.chat.id, 
                text: messageText,
                reply_markup: keyboard, 
            }); 
            
        } catch (error) {
            console.error("Error in sendMessage:", error);
            throw error;
            
        }
    }
    public async sendMessage(messageObj, messageText){
        try {
               
              return this.SendSms.post("sendMessage", { 
                chat_id: messageObj.chat.id, 
                text: messageText,
            }); 
            
        } catch (error) {
            console.error("Error in sendMessage:", error);
            throw error;
            
        }
    }

    public async ReplyToStart(messageObj){
        try {

              const chat_id = messageObj.chat.id
              const username = messageObj.chat.username 
              const first_name: string = messageObj.chat.first_name
              
              const NewData = {
                chat_id : chat_id,
                username: username,
                first_name: first_name
              }
              const checkUser = await this.repo.getByChatId(`${chat_id}`)
              console.log("user", checkUser);
              
              if (!checkUser) {
                await this.repo.create(NewData);
                return this.SendSms.post("sendMessage", { 
                    chat_id: messageObj.chat.id, 
                    text: `👋Salom ${first_name}! Sizga yordam berishdan mamnunmiz! telefon raqamingizni kiriting!`,
                    reply_markup: {
                    keyboard: [[{ text: "Jo'natish", request_contact: true,}]],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                },
              });

               
              } else {
                return this.SendSms.post("sendMessage", { 
                    chat_id: messageObj.chat.id, 
                    text: `👋Salom ${first_name}! Sizga yordam berishdan mamnunmiz! telefon raqamingizni kiriting!`,
                    reply_markup: {
                        keyboard: [
                        [{ text: "Jo'natish", request_contact: true,  }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true,
                    
                },
              }) 
              }
                          
        } catch (error) {
            console.error("Error in sendMessage:", error);
            throw error;
            
        }
    }
    public async ReplyToPhoneNumber(messageObj){
        try {
               
              return this.SendSms.post("sendMessage", { 
                chat_id: messageObj.chat.id, 
                text: `Tabriklaymiz! Ro'yhatdan muvaffaqiyatli o'tdingiz! Xizmatlarimizdan foydalanish uchun quyidagi kanallarga a'zo bo'ling`,
                reply_markup: {
                keyboard: [[
                    { text: "⚡️Web.me⚡️", url: 'https://t.me/byme_web_files' }, 
                    { text: "⚡️PSD.me⚡️", url: 'https://t.me/byme_photoshop_files' }, 
                ]],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
          });
            
        } catch (error) {
            console.error("Error in sendMessage:", error);
            throw error;
            
        }
    }

    public async ReplyToPhoneNumber2(messageObj): Promise<AxiosResponse> {
        try {
            const chatId = messageObj.chat.id;
            const userId = messageObj.from.id;
    
            // Replace YOUR_CHANNEL_ID with the actual ID of your channel
            const channelId = "@byme_web_files";
    
            // Check if the user is a member of the channel
            const chatMemberInfo: AxiosResponse = await this.SendSms.get("getChatMember", {
                chat_id: channelId,
                user_id: userId,
            });
    
            const status = chatMemberInfo.data.result.status
    
            if ( status === "member" || status ==='administrator' || status === 'creator') {
                

                const forceReplyOptions = {
                    force_reply: true,
                    input_field_placeholder: 'Enter your response...',
                    selective: false, // Set to true if you want to force reply from specific users only
                  };


                return this.SendSms.post("sendMessage", {
                    chat_id: chatId,
                    text: `SIZNI KEYINGI BOSQICHDA KO'RISHDAN CHIN DILDAN XURSANDMIZ 🤩🤩🤩`,
                    has_protected_content: true,
                    reply_markup: 
                    {
                        keyboard: [
                            [
                                { text: "Kredit Kalkulyatori" }
                            ],
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },
                    force_reply: true,	
                });
            } else {

                return this.SendSms.post("sendMessage", {
                    chat_id: chatId,
                    text: `Tabriklaymiz! Ro'yhatdan muvaffaqiyatli o'tdingiz! Xizmatlarimizdan foydalanish uchun quyidagi kanalga a'zo bo'ling`,
                    has_protected_content: true,
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "⚡️ Web.me ⚡️", url: 'https://t.me/byme_web_files' },
                            ],
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },
                    
                });
            }
        } catch (error) {
            console.error("Error in ReplyToPhoneNumber:", error);
            throw error;
        }
    }

    public async savePhoneNumber(messageObj){

        const chat_id = messageObj.chat.id
        const phone_number = messageObj.contact.phone_number

        const newData = {
            phone_number: phone_number,
        }

        
        await this.repo.findByIdAndUpdate(chat_id, newData)

        return this.ReplyToPhoneNumber2(messageObj); 

    
 

    }
    public handleMessage(messageObj){
        const messageText = messageObj.text || ''; 
 
    if (messageText.charAt(0) == "/"){ 
 
        const command = messageText.substr(1); 
 
        switch (command) { 
            case "start":
                const buttons = [
                    [{ text: 'Button 1' }],
                    [{ text: 'Button 2' }],
                  ];
            return this.ReplyToStart(messageObj) 
            default: 
            return this.sendMessage(messageObj, "salom, afsuski men bu buyruqni bilmayman")    ;        
        } 
    } else { 
        return this.sendMessage(messageObj, messageText); 
    } 
 

    }

    public async getAll(): Promise<botUser[]> {
        return this.repo.getAll();
      }
    
  
}

export default BotService;