

const container = document.querySelector('.container')
const h = document.documentElement.clientHeight
container.style.height = h - 100 + 'px'
const btn = document.querySelector('button')
const stin = document.querySelector('input')
const ul = document.querySelector('ul')
let userName = ''

//弹框
// const nameBox = document.querySelector('.name-box')
// const cancel = document.querySelector('#cancel')
// const confirm = document.querySelector('.confirm')
// const user = document.querySelector('#userName')
// function nameBox (){
//     nameBox.style.display = 'none'
// }
// cancel.onclick = closeNameBox

// confirm.onclick = function(){
//     window.userName = user.value
//     closeNameBox()
// }
const nameBox = document.querySelector('.name-box')
const cancel = document.querySelector('#cancel')
const confirm = document.querySelector('#confirm')
const user = document.querySelector('#username')
function closeNameBox () {
  nameBox.style.display = 'none'
}

cancel.onclick = closeNameBox

confirm.onclick = function () {
  window.userName = user.value
//连接服务器
const port = 9000
const host = 'localhost'
const serverURL = `ws://${host}:${port}`
const client = new WebSocket(serverURL)

//第一次发送
client.onopen = function(){
    client.send(`欢迎${window.userName}`)
}

//写内容
client.onmessage = function(msg){
    const li = document.createElement('LI')
    li.innerHTML = msg.data
    ul.appendChild(li)
}

//点击回车发送
btn.onclick = sendSMS 
document.onkeydown = function(e){
    if(e.keyCode == 13){
        sendSMS()
    }
}
function sendSMS(){
    const val = stin.value
    client.send(val)
    stin.value = ''
}
}

