let userMessages = [];
let assistantMessages = [];
let myDateTime = '';

function start() {
    const date = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;
    if (date === '') {
        alert('생년월일을 입력해 주세요.');
        return;
    }
    myDateTime = date +  hour;
    console.log(myDateTime);
    document.getElementById('intro').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
}
async function sendFortuneRequest() {
    //로딩 스피너 아이콘 보여 주기
    document.getElementById('loader').style.display = 'block';

    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    //채팅 말풍선에 사용자의 메시지 출력
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user-bubble';
    userBubble.textContent = message;
    document.getElementById('fortuneResponse').appendChild(userBubble);

    //userMessages 배열에 사용자의 메시지 저장
    userMessages.push(messageInput.value);
    
    messageInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                myDateTime: myDateTime,
                userMessages: userMessages,
                assistantMessages: assistantMessages,
             })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        //로딩 스피너 아이콘 숨기기
        document.getElementById('loader').style.display = 'none';

        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot-bubble';
        botBubble.textContent = data.fortune;
        document.getElementById('fortuneResponse').appendChild(botBubble);

        //assistantMessages 배열에 챗도지의 메시지 저장
        assistantMessages.push(data.fortune);


    } catch (error) {
        console.error('Error:', error);
    }
}
