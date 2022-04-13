let untyped = '';
let typed = '';
let score = 0;

const untypedfiled = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

const textLists = [
    'こんにちは',
    'おはよう',
    'とうきょう',
    'おおさか',
    'あいうえお',
    'かきくけこ',
    'さしすせそ',
    'たちつてと',
    'なにぬねの',
    'はひふへほ',
    'まみむめも',
    'やゆよ',
    'らりるれろ',
    'わをん',
    'あかさたなはまやらわ',
];

const createText = () => {
    typed = '';
    typedfield.textContent = typed;
    //console.log(Math.floor(Math.random() * textLists.length));
    let random = Math.floor(Math.random() * textLists.length);

    //untyped = textLists[0];
    untyped = textLists[random];
    untypedfiled.textContent = untyped;
};
//createText();

const keyPress = e => {
    //console.log(e.key);
    if (e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');

        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }
    score++;
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfiled.textContent = untyped;

    if (untyped === '') {
        createText();
    }
};

const rankCheck = score => {

    //return `${score}文字打てました!`;

    let text = '';

    if (score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if (score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if (score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else if (score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

const gameOver = id => {
    clearInterval(id);

    //console.log('ゲーム終了');
    const result = confirm(rankCheck(score));

    if (result == true) { window.location.reload() };
};

const timer = () => {

    let time = 60;
    const id = setInterval(() => {
        if (time <= 0) {
            //clearInterval(id);
            gameOver(id);
        }
        count.textContent = time--;
    }, 1000);
};

//document.addEventListener('keypress', keyPress);

start.addEventListener('click', () => {
    timer();

    createText();

    start.style.display = 'none';

    document.addEventListener('keypress', keyPress);
});

untypedfiled.textContent = 'スタートボタンで開始';