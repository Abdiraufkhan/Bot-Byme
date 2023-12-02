import { NextFunction, Request, Response } from "express";
import BotService from "./bot.service";
import { StatusCode } from "enums/status-code.enum";


class BotController {
  public service = new BotService();

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {body} = req;
        if (body){
            const messageObj = body.message;
           await this.service.handleMessage(messageObj);
        }
        return console.log("salom");
        ;
    } catch (error) {
      next(error);
    }
  };

  public post = async (req: Request, res: Response, next: NextFunction) => {
    try {

      console.log(req.body);
      
      const messageObj = req.body.message;   
      const contact = req.body.message

      if (contact.contact) {
        await this.service.savePhoneNumber(messageObj)
         res.status(StatusCode.Ok).json({
           "message":"Pressed <START> and information was saved succesfullly!"          
         })        
       } else {
        await this.service.handleMessage(messageObj);
        res.status(StatusCode.Ok).json({
          "message":"Pressed <START> and information was saved succesfullly!"          
        })
       }
    } catch (error) {
      console.log(error.message);
      res.status(StatusCode.UnprocessableEntity).json({  
      error: error
      })
    }
  };


}

export default BotController;
