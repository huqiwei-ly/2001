const net = require('net')
const server =net.createServer()
const PORT = '5000'
const HOST_NAME = 'localhost'

let count = 9999
const clients = []
server.on('connection',socket => {
    //socket 客户端
    socket.name = ++count
    clients[socket.name] = socket
    if(clients.length === 100){
        console.log('满了')
    }

    //接收客户端
    socket.on('data',msg =>{
        //msg是客户端发来的数据
        console.log( socket.name+'说:'+msg.toString().replace('他',socket.name))
        broadcast(socket,msg)
    })
    socket.on('error',error=>{
        console.log(error)
    })

    socket.on('close',()=>{
        console.log(socket.name+'下线了')
        delete(clients[socket.name])
    })

})
    //把客户端数据信息广播出来
    function broadcast(socket,msg){   
        socket.write(msg)
    }

server.listen(PORT,HOST_NAME,()=>{
    console.log(`The server is running at:http://${HOST_NAME}:${PORT}`)
})