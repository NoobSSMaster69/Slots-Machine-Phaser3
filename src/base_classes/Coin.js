// Импорт конфигурационных файлов и опций
import Config from '../config';
import Options from '../options';

// Импорт класса Sprite
import Sprite from './Sprite';

// Класс Coin
export default class Coin {
    constructor(scene) {
        this.scene = scene; // Сохранение сцены
        this.addCoin(); // Добавление монеты
    }

    addCoin() {
        // Создание нового спрайта для монеты
        this.coin = new Sprite(this.scene, Config.width - 678, Config.height - 50, 'bgButtons', 'btn-coin.png');
        
        // Добавление текста для монеты
        this.txtCoin = this.scene.add.dynamicBitmapText(Config.width - 720, Config.height - 70, 'txt_bitmap', Options.txtCoin, 38);
        this.txtCoin.setDisplayCallback(this.scene.textCallback);
        
        // Добавление счетчика монет
        this.txtCountCoin = this.scene.add.text(Config.width - 700, Config.height - 140, Options.coin, {
            fontSize : '35px',
            color : '#fff',
            fontFamily : 'PT Serif'
        });
        
        // Добавление обработчиков событий для монеты
        this.coin.on('pointerdown', this.onCoin, this);
        this.coin.on('pointerup', () => this.coin.setScale(1));
    }

    onCoin() {
        // Проверка условий для изменения значения монеты
        if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {
            this.coin.setScale(0.9);
            
            // Воспроизведение звука кнопки
            this.scene.audioPlayButton();
            
            if (Options.coin < 50) {
                Options.coin += 10;
                this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText('BET: ' + Options.coin * Options.line);
            } else {
                Options.coin = 10;
                this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText('BET: ' + Options.coin * Options.line);
            }
        }
    }
}