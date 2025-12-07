  import Document from '../Models/createDoc.model.js';
  import FindOrCreateDocument from '../Utils/FindOrCreateDocument.js';
  export async function handleSocketConnection(socket, io) {
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
}