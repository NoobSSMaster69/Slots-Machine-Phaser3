// Импорт необходимых модулей
import Options from '../options';
import Sprite from './Sprite';
import Config from '../config';

// Класс Credit
export default class Credit {
    // Конструктор класса
    constructor(scene) {
        this.scene = scene;
        this.addCredit();
    }

    // Метод для добавления кредитов
    addCredit() {
        // Создание спрайта для кредитов
        this.credits = new Sprite(this.scene, Config.width - 235, Config.height - 680,
            'about', 'btn-credits.png').setScale(0.7);
        // Обработчик события нажатия на спрайт
        this.credits.on('pointerdown', () => {
            // Воспроизведение звука кнопки
            this.scene.audioPlayButton();
            // Создание спрайта для линий выплат
            this.paylines = new Sprite(this.scene,Config.width / 2, Config.height / 2,
                'about', 'palines.png').setDepth(1);
            // Создание спрайта для кнопки выхода
            this.btnExit = new Sprite(this.scene, Config.width - 30 , 
                    Config.height - 635, 'bgButtons', 'btn_exit.png').
                    setScale(0.9).setDepth(1);
            // Обработчик события нажатия на кнопку выхода
            this.btnExit.on('pointerdown', this.deleteCredit, this);     
        });
    }

    // Метод для удаления кредитов
    deleteCredit() {
        // Воспроизведение звука кнопки
        this.scene.audioPlayButton();
        // Удаление спрайта кнопки выхода и линий выплат
        this.btnExit.destroy();
        this.paylines.destroy();
    }
}