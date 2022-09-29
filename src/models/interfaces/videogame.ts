import { Document } from "mongoose";

export default interface IVideogame extends Document {
    name: string;
    company: string;
    year: number;
}