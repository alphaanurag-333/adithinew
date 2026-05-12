import { io } from 'socket.io-client'

// const socket = io('http://localhost:5000', {
//   autoConnect: true,
//   reconnection: true,
// })
const socket = io("https://sorryteacher.com:5001", {
  autoConnect: true,
  reconnection: true,
});

export default socket
