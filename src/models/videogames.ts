import mongoose, { Schema } from "mongoose";
import IGame from "./interfaces/videogame";

const GameSchema: Schema = new Schema(
    {
        name: { type: String, required: true},
        company: { type: String, required: true},
        year: { type: Number, required: true}
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IGame> ('Game', GameSchema)