import express, { Application } from "express";
import { Sequelize } from "sequelize-typescript";
import psql from "loaders/sequelize";
import { IRoute } from "interfaces/route.interface";
import { errorResponder } from "middlewares/error.middleware";
import cors from "cors";
import expressFileUpload from "express-fileupload";
import path from "path";



class App {
  private routes: IRoute[];
  private app: Application = express();
  private db: Sequelize;
  

  constructor(routes: IRoute[]) {
    this.routes = routes;
  }

  private initApplication() {
    const PORT = process.env.PORT || 3000;
    
    this.app.listen(PORT, () => {
      console.log('===============================');
      console.log("  SERVER READY AT PORT:", PORT );
      console.log('===============================');}
      );
     
  }

  private initRoutes() {
    this.routes.map((route) => {
      if (route.router && route.path) {
        this.app.use(route.path, route.router);
      }
    });
  }

  private async initDB() {
    this.db = await psql();
    console.log('===============================');    
    console.log("+ + CONNECTED TO DATABASE + +");
    console.log('===============================')
    console.log('   SITE for TRANSFER STUDENTS'); 
  }

  private initMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(expressFileUpload());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use('/public', express.static(path.join(__dirname, 'public')));
  }

  public async run() {
    await this.initDB();
    this.initApplication();
    this.initMiddlewares();
    this.initRoutes();

    this.app.use(errorResponder);
  }
}

export default App;
