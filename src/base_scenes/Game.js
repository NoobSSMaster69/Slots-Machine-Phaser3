import Config from '../config';
import Options from '../options';
// Імпорт класів
import Time from '../base_classes/Time';
import Audio from '../base_classes/Audio';
import Sprite from '../base_classes/Sprite';
import Container from '../base_classes/Container';
import Credit from '../base_classes/Credit';
import Info from '../base_classes/Info';
import Coin from '../base_classes/Coin';
import Line from '../base_classes/Line';
import Maxbet from '../base_classes/Maxbet';
import BaseSpin from '../base_classes/BaseSpin';
import AutoSpin from '../base_classes/AutoSpin';

// Клас сцени гри
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key:'Game'});
    }

    create() {
        // Клас Audio
        this.audioObject = new Audio(this);
        // Bitmap text
        Options.hsv = Phaser.Display.Color.HSVColorWheel();
        // Додає фонове зображення
        const bg = new Sprite(this, Config.width / 2, Config.height / 2, 'background', 'bg.jpg');
        // Контейнери
        this.container = new Container(this, Config.width - 590, Config.height - 70);
        this.container2 = new Container(this, Config.width - 475, Config.height - 70);
        this.container3 = new Container(this, Config.width - 360, Config.height - 70);
        this.container4 = new Container(this, Config.width - 250, Config.height - 70);
        this.container5 = new Container(this, Config.width - 135, Config.height - 70);
        // Додає зображення машини
        const machine = new Sprite(this, Config.width / 2, Config.height / 2, 'background', 'machine.png');
        // Текст грошей
        this.valueMoney = localStorage.getItem('money') ? localStorage.getItem('money') : Options.money;
        // this.valueMoney = Options.money;
        this.txtMoney = this.add.text(Config.width - 200, Config.height - 405, this.valueMoney + '$', {
            fontSize : '20px',
            color : '#fff',
            fontFamily : 'PT Serif'
        });
        this.setTextX(this.valueMoney);
        // Клас Clock
        this.times = new Time(this);
        // Клас Credit
        this.credits = new Credit(this);
        // Додає зображення звуку
        const musicName = localStorage.getItem('music') ? localStorage.getItem('music') : 'btn_music_off.png';
        const soundName = localStorage.getItem('sound') ? localStorage.getItem('sound') : 'btn_sound_off.png';
        this.btnMusic = new Sprite(this, Config.width - 140, Config.height - 390, 'sound', musicName).setScale(0.4);
        this.btnSound = new Sprite(this, Config.width - 90, Config.height - 390, 'sound', soundName).setScale(0.4);
        this.audioMusicName = this.btnMusic.frame.name;
        this.audioSoundName = this.btnSound.frame.name;
        this.btnMusic.on('pointerdown', this.onMusic, this);
        this.btnSound.on('pointerdown', this.onSound, this);
        // Відтворює аудіо за замовчуванням
        if(this.audioMusicName === 'btn_music.png') {
            this.audioObject.musicDefault.play();
        }
        // Клас Coin
        this.coin = new Coin(this);
        // Клас Line
        this.btnLine = new Line(this);
        // Клас Maxbet
        this.maxBet = new Maxbet(this);
        // Клас Info
        this.info = new Info(this);
        // Клас AutoSpin
        this.autoSpin = new AutoSpin(this);
        // Клас BaseSpin
        this.baseSpin = new BaseSpin(this);
    }

    // Обробник кліку на кнопці музики
    onMusic() {
        if(!Options.checkClick) {
            if(this.audioMusicName === 'btn_music.png') {
                this.audioMusicName = 'btn_music_off.png';
                // Аудіо стоп
                this.audioObject.musicDefault.stop();
                this.audioObject.audioWin.stop();
            } else {
                this.audioMusicName = 'btn_music.png';
                this.audioPlayButton();
                // Аудіо play
                this.audioObject.musicDefault.play();
            }
            // Зберігає в localStorage
            if(localStorage.getItem('musics')) {
                localStorage.removeItem('musics');
                localStorage.setItem('music', this.audioMusicName);
            } else {
                localStorage.setItem('music', this.audioMusicName);
            } 
            this.btnMusic.setTexture('sound', this.audioMusicName);
        }
    }

    // Обробник кліку на кнопці звуку
    onSound() {
        if(!Options.checkClick) {
            if(this.audioSoundName === 'btn_sound.png') {
                this.audioSoundName = 'btn_sound_off.png';
            } else {
                this.audioSoundName = 'btn_sound.png';
                this.audioObject.audioButton.play();
            }
            // Зберігає в localStorage
            if(localStorage.getItem('sounds')) {
                localStorage.removeItem('sounds');
                localStorage.setItem('sound', this.audioSoundName);
            } else {
                localStorage.setItem('sound', this.audioSoundName);
            } 
            this.btnSound.setTexture('sound', this.audioSoundName);
        }
    }

    // Відтворює аудіо кнопки
    audioPlayButton() {
        if(this.audioSoundName === 'btn_sound.png') {
            this.audioObject.audioButton.play();
        }
    }

    // Встановлює положення тексту грошей
    setTextX(value) {
        if(value >= 100000000) this.txtMoney.x = 217;
        else if(value >= 10000000) this.txtMoney.x = 220;
        else if(value >= 1000000) this.txtMoney.x = 230;
        else if(value >= 100000) this.txtMoney.x = 240;
        else if(value >= 10000) this.txtMoney.x = 240;
        else if(value >= 1000) this.txtMoney.x = 250;
        else if(value >= 100) this.txtMoney.x = 260;
        else if(value >= 10) this.txtMoney.x = 270;
        else this.txtMoney.x = 280;
    }

    // Callback функція для тексту
    textCallback(data) {
        data.tint.topLeft = Options.hsv[Math.floor(Options.i)].color;
        data.tint.topRight = Options.hsv[359 - Math.floor(Options.i)].color;
        data.tint.bottomLeft = Options.hsv[359 - Math.floor(Options.i)].color;
        data.tint.bottomRight = Options.hsv[Math.floor(Options.i)].color;
    
        Options.i += 0.05;
    
        if (Options.i >= Options.hsv.length)
        {
            Options.i = 0;
        }
    
        return data;
    }    
}