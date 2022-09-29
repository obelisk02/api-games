import { Request, Response } from "express";
import Videogame from '../models/videogames';
import mongoose from "mongoose";


//********************* GET ALL */
const getAll = async ( req:Request, res:Response) => {


    const data = await Videogame.find({}).exec();
   
    if (!data){
        return res.status(400).json({ error: 'Games not found'})
    }

    console.log(data);
    res.status(200).json({ 
        message: `ok`,
        data: data
    })

}

///********************** GET ONE */
const get = async (req:Request, res:Response) => {
    const id = req.params.id;
    
    if(!id){
        return res.status(400).json({ error: 'Empty Id'})
    }

    const data = await Videogame.findOne({"_id":(id)}).exec();
    if (!data){
        return res.status(400).json({ error: 'Game not found'})
    }

    res.status(200).json({ 
        message: `Found id ${id}`,
        data: data
    })
}


//********************************* */ CREATE
const create = async(req:Request, res:Response) => {
    const {name, company, year} = req.body

    if (name ==='' || company === '' || !company || year <1800){
        res.status(400).json({
            message: 'Name, company or year cannot be empty'
        })
        return;
    }

    /*const videogame: IVideogame = {
        name,
        company,
        year
    } */

    const videogame = new Videogame({
        _id: new mongoose.Types.ObjectId(),
        name,
        company,
        year,
    })

    const result = await videogame.save()

    res.status(200).json({
        message: 'Created',
        data: result
    })
}

const update = (req:Request, res:Response) => {
    const id = req.params.id;
    res.status(200).json({ 
        message: `update ${id}`
    })
}


//**************************  DELETE */
const remove = async(req:Request, res:Response) => {
    const id = req.params.id;
    
    if(!id){
        return res.status(400).json({ error: 'Empty Id'})
    }

    const data = await Videogame.deleteOne({"_id":(id)}).exec();
    if (!data){
        return res.status(400).json({ error: 'Game not found'})
    }

    res.status(200).json({ 
        message: `Deleted id ${id}`,
        data: data
    })
}

export default  { getAll, get , create, update, remove}