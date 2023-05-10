export const connect = (cb:Function, socket:WebSocket) => {

  socket.onopen = () => {
    console.log('client connected');
  }

  socket.onmessage = msg => {
    cb(msg);
  }

  socket.onclose = () => {
    console.log('client disconnected');
  }

  socket.onerror = (error:unknown) => {
    console.log('Error...', error);
  }

}

export const deliver = (msg:any, socket:WebSocket) => {
  socket.send(msg);
}
