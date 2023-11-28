import App from "app";
import BotRoute from "domain/bot/bot.router";



const app = new App([
    new BotRoute() 

]);

app.run();
