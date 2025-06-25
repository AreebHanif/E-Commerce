import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true
    }
})

export default mongoose.model("Category",categorySchema)