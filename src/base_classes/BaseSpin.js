// Импорт конфигурационных файлов и опций
import Config from '../config';
import Options from '../options';

// Импорт классов
import Sprite from './Sprite';
import Tween from './Tween';

// Класс BaseSpin
export default class BaseSpin {
    constructor(scene) {
        this.scene = scene; // Сохранение сцены
        this.addSpin(); // Добавление спина
    }

    addSpin() {
        // Создание нового спрайта для фона спина
        this.bgSpin = new Sprite(this.scene, Config.width - 275, Config.height - 50, 'bgButtons', 'btn-spin.png');
        
        // Добавление текста спина
        this.txtSpin = this.scene.add.dynamicBitmapText(Config.width - 315, Config.height - 70, 'txt_bitmap', Options.txtSpin, 38);
        this.txtSpin.setDisplayCallback(this.scene.textCallback);
        
        // Добавление обработчиков событий для спина
        this.bgSpin.on('pointerdown', this.playTweens, this);
        this.bgSpin.on('pointerup', () => this.bgSpin.setScale(1));
    }

    playTweens() {
        if (!Options.checkClick && this.scene.valueMoney >=
            (Options.coin * Options.line) && Options.txtAutoSpin === 'AUTO') {
            //detroy line array
            this.destroyLineArr();
            
            // Установка цвета
            this.setColor();
            
            Options.checkClick = true;
            this.bgSpin.setScale(0.9);
            
            // Удаление текста выигрыша
            this.removeTextWin();
            
            // Сохранение в localStorage
            this.saveLocalStorage();
            
            // Создание новой анимации
            this.tweens = new Tween(this.scene);
        }
    }

    destroyLineArr() {
        // Удаление всех элементов из массива линий
        if (Options.lineArray.length > 0) {
            for (let i = 0; i < Options.lineArray.length; i++) {
                Options.lineArray[i].destroy();
            }
            Options.lineArray = [];
        }
    }

    removeTextWin() {
        // Воспроизведение звука кнопки
        this.scene.audioPlayButton();
            
        if(this.scene.audioMusicName === 'btn_music.png') {
            // Остановка звука выигрыша и воспроизведение звука барабанов
            this.scene.audioObject.audioWin.stop();
            this.scene.audioObject.audioReels.play();
        }
        
        // Обновление денег игрока
        this.scene.valueMoney -= (Options.coin * Options.line);
        this.scene.txtMoney.setText(this.scene.valueMoney + '$');
        
        // Удаление текста выигрыша
        if (this.scene.txtWin) {
            this.scene.txtWin.destroy();
        }
    }

    setColor() {
        // Установка цвета для различных элементов интерфейса
        this.bgSpin.setTint(0xa09d9d);
        this.scene.autoSpin.buttonAuto.setTint(0xa09d9d);
        this.scene.maxBet.maxBet.setTint(0xa09d9d);
        this.scene.coin.coin.setTint(0xa09d9d);
        this.scene.btnLine.btnLine.setTint(0xa09d9d);
        this.scene.btnMusic.setTint(0xa09d9d);
        this.scene.btnSound.setTint(0xa09d9d);
    }

    saveLocalStorage() {
        // Сохранение текущего количества денег игрока в localStorage
        if (localStorage.getItem('money')) {
            localStorage.removeItem('money');
            localStorage.setItem('money', this.scene.valueMoney);
        }
        
        localStorage.setItem('money', this.scene.valueMoney);
        
        // Обновление отображаемого количества денег игрока
        this.scene.setTextX(this.scene.valueMoney);
        this.scene.txtMoney.setText(this.scene.valueMoney + '$');
    }
}