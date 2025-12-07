import Document from '../Models/createDoc.model.js';
const defaultValue='';
const FindOrCreateDocument=async(id)=>{
    if(id==null)return
    const document=await Document.findById(id);
    if(document)return document;
    const newDocument=new Document({_id:id,data:defaultValue});
    await newDocument.save();
    return newDocument;
}
export default FindOrCreateDocument;