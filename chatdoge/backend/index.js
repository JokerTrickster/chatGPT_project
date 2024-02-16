//import OpenAI from 'openai';

const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: "api key",
});


const express = require('express');
const app = express();

//POST 요청받을 수 있게 만듦 
const cors = require('cors');
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/fortuneTell', async function (req, res) {
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신의 이름은 챗도지입니다." },
            { "role": "user", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신의 이름은 챗도지입니다." },
            { "role": "assistant", "content": "안녕하세요. 저는 챗도지입니다. 당신의 운세를 물어보세요." },
            { "role": "user", "content": "안녕하세요. 오늘의 운세를 알려주세요."},
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 150,
        temperature: 0.7,
    });
    
    let fortune = completion.choices[0].message['content'];
    console.log(fortune);
    res.send(fortune);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
