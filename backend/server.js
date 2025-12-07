import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDb from './DB/DB_Connection.js';
//routes
import createDocRoutes from './Routes/CreateDoc.js';


//controllers
import {handleSocketConnection} from './Controllers/CreateDoc.js';


dotenv.config();
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});


app.use('/api/docs', createDocRoutes);

io.on('connection', (socket) => {
  handleSocketConnection(socket, io);

});


connectDb().then(()=>{
    console.log("Database connected successfully");
    server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
});
