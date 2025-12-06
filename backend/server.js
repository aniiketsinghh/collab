import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './DB/DB_Connection.js';
import Document from './DB/Models/createDoc.model.js';


const PORT = process.env.PORT || 3002;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const defaultValue = '';

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('get-document', async (documentId) => {
    const document = await FindOrCreateDocument(documentId);

    socket.join(documentId);

    socket.emit('load-document', document.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


const FindOrCreateDocument=async(id)=>{
    if(id==null)return
    const document=await Document.findById(id);
    if(document)return document;
    const newDocument=new Document({_id:id,data:defaultValue});
    await newDocument.save();
    return newDocument;
}

connectDb().then(()=>{
    console.log("Database connected successfully");
    server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
});
