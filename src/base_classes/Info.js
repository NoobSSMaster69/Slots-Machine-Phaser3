// Импорт необходимых модулей
import Options from '../options';
import Config from '../config';
import Sprite from './Sprite';

// Класс Info
export default class Info {
    // Конструктор класса
    constructor(scene) {
        this.scene = scene;
        this.addInfo();
        this.click = false; // Флаг для отслеживания кликов
    }

    // Метод для добавления информации
    addInfo() {
        // Создание спрайта для информации
        this.info = new Sprite(this.scene, Config.width - 1020, Config.height - 50, 'bgButtons', 'btn-info.png');
        // Добавление текста
        const txtInfo = this.scene.add.dynamicBitmapText(Config.width - 1060, Config.height - 70, 'txt_bitmap', Options.txtInfo, 38);
        txtInfo.setDisplayCallback(this.scene.textCallback);
        // Обработчик события нажатия на спрайт
        this.info.on('pointerdown', this.showPayTable, this);
    }

    // Метод для отображения таблицы выплат
    showPayTable() {
        if(!this.click) { // Если не было клика
            this.click = true; // Устанавливаем флаг в true
            this.scene.audioPlayButton(); // Воспроизводим звук кнопки
            this.showTable(); // Отображаем таблицу
            // Создаем кнопку выхода
            this.btnExit = new Sprite(this.scene, Config.width - 30 , 
                Config.height - 635, 'bgButtons', 'btn_exit.png').
                setScale(0.9).setDepth(1);
            // Обработчик события нажатия на кнопку выхода
            this.btnExit.on('pointerdown', this.deleteTable, this);
        }
    }

    // Метод для отображения таблицы
    showTable() {
        this.payValues = []; // Массив для значений выплат

        // Создание спрайта для таблицы выплат
        this.paytable = new Sprite(this.scene, Config.width / 2, Config.height / 2,
            'about', 'paytable.png').setDepth(1);

        var width = 190, width2 = width, height = 25, height2 = 245;

        for(let i = 0; i < Options.payvalues.length; i++) {
            if(i >= 5) {
                for(let j = 0; j < Options.payvalues[i].length; j++) {
                    height2 -= 30;
                    // Добавляем значения выплат в массив и на сцену
                    this.payValues.push(this.scene.add.text(width2, Config.height / 2 + height2, Options.payvalues[i][j], {
                        fontSize : '30px',
                        color : '#630066',
                        fontFamily : 'PT Serif'
                    }).setDepth(1));
                }
                width2 += 225;
                height2 = 245;
            } else {
                for(let j = 0; j < Options.payvalues[i].length; j++) {
                    height += 30;
                    // Добавляем значения выплат в массив и на сцену
                    this.payValues.push(this.scene.add.text(width, Config.height / 2 - height, Options.payvalues[i][j], {
                        fontSize : '30px',
                        color : '#630066',
                        fontFamily : 'PT Serif'
                    }).setDepth(1));
                }
                width += 225;
                height = 25;
            }
        }
    }

    // Метод для удаления таблицы
    deleteTable() {
        this.click = false; // Сбрасываем флаг клика
        this.scene.audioPlayButton(); // Воспроизводим звук кнопки
        this.paytable.destroy(); // Удаляем спрайт таблицы выплат
        this.btnExit.destroy(); // Удаляем спрайт кнопки выхода
        if(this.payValues.length > 0) { // Если в массиве есть значения выплат
            for(let i = 0; i < this.payValues.length; i++) { 
                this.payValues[i].destroy(); // Удаляем их со сцены
            }
        }
    }
}