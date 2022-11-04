const socket = io()

let name;
let text = document.querySelector('#text');
let messageArea = document.querySelector('.message_area'); 

do{
    name = prompt('please enter your name');
} while(!name)
window.localStorage.removeItem('price');

text.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        if(e.target.value != ""){
            sendMessage(e.target.value);
        } else {
            console.log("Price require");
        }
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        price: message.trim()
    }

    // Append
    appendMessage(msg, 'outgoing');
    text.value = "";
    scrollToBottom();

    // Send to server
    socket.emit('message', msg);
}

function appendMessage(msg, type){
    //console.log("msg====",msg.message);
    var differance;
    var value = localStorage.getItem('price');
    if (value != null){
        msg.message = parseInt(value) + parseInt(msg.price)
        differance = msg.price - value
    } else {
        differance = 0
    }
   
    localStorage.setItem('price',msg.price);
    let mainDiv = document.createElement('tr');
    let className = type
    mainDiv.classList.add(className, 'message');
    let markup;
    if(type == "incoming"){
        markup = `
        <td style="border: 1px solid; color:red;font-weight: 700;font-size: 20px;">${msg.user}</td>
        <td style="border: 1px solid; font-weight: 700;font-size: 20px;">${msg.price}</td>
        <td style="border: 1px solid; font-weight: 700;font-size: 20px;">${differance}</td>
        `
    } else if(type == "outgoing") {
        markup = `
        <td style="border: 1px solid; color:green;font-weight: 700;font-size: 20px;">${msg.user}</td>
        <td style="border: 1px solid; font-weight: 700;font-size: 20px;">${msg.price}</td>
        <td style="border: 1px solid; font-weight: 700;font-size: 20px;">${differance}</td>
        `
    }
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv);
}

// Recive message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}