import  http from 'http'
import { initializeSocket } from './socket.js'
import app from './app.js'

const server = http.createServer(app)

initializeSocket(server)

server.listen(process.env.PORT || 4000, () => {
    console.log("Server is running...")
})

