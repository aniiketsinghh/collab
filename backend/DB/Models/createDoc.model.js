import mongoose from 'mongoose';
const DocSchema=new mongoose.Schema({
    _id:String,
    data:Object
},{ timestamps:true });
const Document=mongoose.model("Document",DocSchema);
export default Document;