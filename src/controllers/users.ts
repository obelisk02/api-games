import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

import mongoose from "mongoose";
import User from "../models/user"


const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({ error: 'Empty'})
    }

    const user = await User.findOne({ username}).exec();
    if (!user){
        return res.status(400).json({ error: 'username not found'})
    }


    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
        return res.status(400).json({ error: 'invalid password'})
    }

    const token = jwt.sign({
        username: 'sd',
        id: 1
    }, 
    config.secrets.token);

    return res.status(200).json({
        message: 'success',
        token
    })
}

//********************************* */

const register = async (req: Request, res: Response) => {
    const {username, password} =req.body;
    console.log(username, password);
    if (!username || !password){
        return res.status(400).json({ error: 'username or password is empty'})
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)

    const userExists = await User.findOne({username}).exec();
    if(userExists){
        return res.status(400).json({ error: 'user already exists'})
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        password: passwordHash
    })

    const result = await user.save()

    return res.status(200).json({
        message: 'Register user success',
        user: {
            username: result.username,
            id: result._id
        }
    })
}


export default {login ,register}