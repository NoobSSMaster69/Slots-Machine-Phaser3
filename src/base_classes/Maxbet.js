// Импорт необходимых модулей
import Config from '../config';
import Options from '../options';
import Sprite from './Sprite';

// Класс Maxbet
export default class Maxbet {
    // Конструктор класса
    constructor(scene) {
        this.scene = scene;
        this.addMaxbet();
    }

    // Метод для добавления максимальной ставки
    addMaxbet() {
        // Создание спрайта для максимальной ставки
        this.maxBet = new Sprite(this.scene, Config.width - 415, Config.height - 28, 'bgButtons', 'btn-maxbet.png');
        // Добавление текста
        this.txtMaxBet = this.scene.add.dynamicBitmapText(Config.width - 445, Config.height - 35, 'txt_bitmap', Options.txtMaxBet, 38);
        this.txtMaxBet.setDisplayCallback(this.scene.textCallback);
        this.maxBet.setScale(0.4);
        this.txtMaxBet.setScale(0.4);
        // Добавление текста для количества максимальных ставок
        this.txtCountMaxBet = this.scene.add.text(Config.width - 610, Config.height - 405, Options.coin * Options.line, {
            fontSize : '15px',
            color : '#fff',
            fontFamily : 'PT Serif'
        });
        // Обработчик события нажатия на спрайт
        this.maxBet.on('pointerdown', this.onMaxbet, this);
        // Обработчик события отпускания кнопки мыши
        this.maxBet.on('pointerup', () => this.maxBet.setScale(0.4));
    }

    // Метод для обработки максимальной ставки
    onMaxbet() {
        if (!Options.checkClick && Options.line * Options.coin
            < 1000 && Options.txtAutoSpin === 'AUTO') {
            this.maxBet.setScale(0.3);
            // Воспроизведение звука кнопки
            this.scene.audioPlayButton();
            Options.line = 5;
            this.scene.btnLine.txtCountLine.setText(Options.line);
            Options.coin = 50;
            this.scene.coin.txtCountCoin.setText(Options.coin);
            this.txtCountMaxBet.setText(Options.line * Options.coin);
        }
    }
}