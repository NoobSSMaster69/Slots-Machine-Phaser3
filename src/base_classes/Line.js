// Импорт необходимых модулей
import Config from '../config';
import Options from '../options';
import Sprite from './Sprite';

// Класс Line
export default class Line {
    // Конструктор класса
    constructor(scene) {
        this.scene = scene;
        this.addLine();
    }

    // Метод для добавления линии
    addLine() {
        // Создание спрайта для линии
        this.btnLine = new Sprite(this.scene, Config.width - 595, Config.height - 28, 'bgButtons', 'btn-line.png');
        this.btnLine.setScale(0.4);
        // Добавление текста
        this.txtLine = this.scene.add.dynamicBitmapText(Config.width - 615, Config.height - 35, 'txt_bitmap', Options.txtLine, 38);
        this.txtLine.setDisplayCallback(this.scene.textCallback);
        this.txtLine.setScale(0.4);
        // Добавление текста для количества линий
        this.txtCountLine = this.scene.add.text(Config.width - 550, Config.height - 405, Options.line, {
            fontSize : '15px',
            color : '#fff',
            fontFamily : 'PT Serif'
        });
        
        // Обработчик события нажатия на спрайт
        this.btnLine.on('pointerdown', () => {
            if (!Options.checkClick && Options.txtAutoSpin === 'AUTO') {
                this.btnLine.setScale(0.3);
                // Воспроизведение звука кнопки
                this.scene.audioPlayButton();
            
                if (Options.line < 5) {
                    Options.line ++;
                    this.txtCountLine.setText(Options.line);
                    this.scene.maxBet.txtCountMaxBet.setText( Options.line * Options.coin);
                } else {
                    Options.line = 1;
                    this.txtCountLine.setText(Options.line);
                    this.scene.maxBet.txtCountMaxBet.setText(Options.line * Options.coin);
                }
            }
        });
        // Обработчик события отпускания кнопки мыши
        this.btnLine.on('pointerup', () => this.btnLine.setScale(0.4));
    }
}