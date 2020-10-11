const main = document.querySelector('main');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const textArea = document.getElementById('text');
const voicesSelect = document.getElementById('voices')
const readBtn = document.getElementById('read')

const data = [
    {
        image:  "./img/drink.jpg",
        text:   "I am Thirsty"
    },
    {
        image:  "./img/angry.jpg",
        text:   "I am Angry"
    },
    {
        image:  "./img/food.jpg",
        text:   "I am Hungry"
    },
    {
        image:  "./img/grandma.jpg",
        text:   "I wanna go to my grandmas"
    },
    {
        image:  "./img/happy.jpg",
        text:   "I am happy"
    },
    {
        image:  "./img/home.jpg",
        text:   "I wanna go home"
    },
    {
        image:  "./img/hurt.jpg",
        text:   "I am hurt"
    },
    {
        image:  "./img/outside.jpg",
        text:   "I want to go outside"
    },
    {
        image:  "./img/sad.jpg",
        text:   "I am sad"
    },
    {
        image:  "./img/scared.jpg",
        text:   "I am scared"
    },
    {
        image:  "./img/school.jpg",
        text:   "I want to go to school"
    },
    {
        image:  "./img/tired.jpg",
        text:   "I am tired"
    }
]

const createBox = (item) => {
    const box = document.createElement('div')
    box.classList.add('box')
    const {image, text} = item;
    box.innerHTML = `
    <img src = "${image}" alt = "${text}"/>
    <p class = "info">${text}</p>
    `;
box.addEventListener('click', () => {
    setTextMessage(text);
    speakText()
    box.classList.add('active')
    setTimeout(() => box.classList.remove('active'), 800);
})

    main.appendChild(box);
}

const message = new SpeechSynthesisUtterance()



function setTextMessage(text){
    message.text = text
}

function speakText(){
    speechSynthesis.speak(message)
}

voicesSelect.addEventListener('change', (e) => {
    message.voice = voices.find(voice => voice.name === e.target.value);
})


readBtn.addEventListener('click', () => {
    setTextMessage(textArea.value);
    speakText();
})


let voices = [];


function getVoices() {
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.innerText = `${voice.name} ${voice.lang}`;
      voicesSelect.appendChild(option);
    });
  }

  speechSynthesis.addEventListener('voiceschanged', getVoices);

data.forEach(createBox);


toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));
closeBtn.addEventListener('click',  () => document.getElementById('text-box').classList.remove('show'));
getVoices();