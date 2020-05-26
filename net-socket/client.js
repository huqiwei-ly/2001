const net = require('net')
const rl = require('readline')
const  socket = new net.Socket()
const PORT = '5000'
const HOST_NAME = 'localhost'


//提供接口读取可读流
const r = rl.createInterface({
    input:process.stdin,
    output:process.stdout
})

socket.connect(PORT,HOST_NAME,()=>{
    socket.write('他来了')
})

socket.on('data',msg=>{
    console.log(msg.toString())
    say()
})

socket.on('error',error=>{
    console.log(error)
})
socket.on('close',()=>{
    console.log('正常下线')
    socket.destroy()
    r.close()
})

function say(){
    r.question('输入:',message=>{
        if(message == '88'){
            socket.destroy()
            r.close()
        }else{
            socket.write(message + '\n')
        }
    })
}