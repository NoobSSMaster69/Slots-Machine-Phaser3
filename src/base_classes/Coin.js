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
        this.coin = new Sprite(this.scene, Config.width - 520, Config.height - 28, 'bgButtons', 'btn-coin.png');
        this.coin.setScale(0.4);
        // Добавление текста для монеты
        this.txtCoin = this.scene.add.dynamicBitmapText(Config.width - 535, Config.height - 35, 'txt_bitmap', Options.txtCoin, 38);
        this.txtCoin.setDisplayCallback(this.scene.textCallback);
        this.txtCoin.setScale(0.4);

        // Добавление счетчика монет
        this.txtCountCoin = this.scene.add.text(Config.width - 483, Config.height - 38, Options.coin, {
            fontSize : '20px',
            color : '#fff',
            fontFamily : 'PT Serif'
        });
        
        // Добавление обработчиков событий для монеты
        this.coin.on('pointerdown', this.onCoin, this);
        this.coin.on('pointerup', () => this.coin.setScale(0.4));
    }

    onCoin() {
        // Проверка условий для изменения значения монеты
        if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {
            this.coin.setScale(0.3);
            
            // Воспроизведение звука кнопки
            this.scene.audioPlayButton();
            
            if (Options.coin < 50) {
                Options.coin += 10;
                this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText(Options.coin * Options.line);
            } else {
                Options.coin = 10;
                this.txtCountCoin.setText(Options.coin);
                this.scene.maxBet.txtCountMaxBet.setText(Options.coin * Options.line);
            }
        }
    }

}