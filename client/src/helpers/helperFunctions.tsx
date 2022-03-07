const io = require("socket.io-client")
const {v4: uuidv4} = require("uuid");

export async function connectToSocket(){
  const newSocket = io('http://localhost:8080', {query: uuidv4()});
  newSocket.on("connect", () => {
    //alert("Welcome to the Game!!!")
  })
  newSocket.on("connect_error", () =>{
    //alert("Sorry.... there's a problem");
  })
  return newSocket;
}
