import App from "app";
import BotRoute from "domain/bot/bot.router";
import UserRoute from "domain/management/user/user.route";



const app = new App([
    new BotRoute(),
    new UserRoute() 

]);

app.run();
