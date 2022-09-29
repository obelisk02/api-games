import express, { Express ,NextFunction, Request,Response } from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import config from './config/config';
import videogamesRoutes from './routes/videogames';
import userRoutes from './routes/users';
import middleware from './controllers/middleware';
import mongoose, { Mongoose } from 'mongoose' ;


dotenv.config();

//Express app
const app: Express = express();

mongoose.connect(config.mongo.url)
    .then( (result: Mongoose) =>{
        console.log("Mongo connected");
    }).catch( (error) =>{
        console.log(error);
    })
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

/**
 * app.use( (req:Request, res: Response, next: NextFunction)=>{
    logger.info(
        `METHOD: [${req.method}] - URL - [${req.url}] - IP [000]`
    )
})
 */
app.use('/api', userRoutes); //public 
app.use('/api', middleware.verifiedToken,videogamesRoutes); //privates

app.use((req : Request, res: Response) =>{
    const error = new Error("Not Found")
    res.status(400).json({error: 'not found'})
})

const port: string | number = process.env.SERVER_PORT || 3000;


app.get('/', (req:Request, res: Response) =>{
    res.send (" typescript1")
})


app.listen ( port , ()=>{
    console.log(`Server listening on port ${port}`);
})