

const ws = require('ws')
const host = 'localhost'
const port = 9000
const server = new ws.Server({
    host,
    port
})


//编号
let count = 10000
const clients =[]
server.on('connection',client=>{
    client.name = ++count
    clients[client.name] = client
    //获取数据处理
    client.on('message',msg=>{
        console.log(msg.toString())
        boradcast(client,msg)
    })
})

function boradcast(client,msg){
    client.send(msg.toString())
}

server.on('listening',()=>{
    console.log(`The server is running at: ws:${host}:${port}`)
})