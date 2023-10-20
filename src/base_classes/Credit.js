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
        this.credits = new Sprite(this.scene, Config.width - 50, Config.height - 395,
            'about', 'btn-credits.png').setScale(0.4);
        // Обработчик события нажатия на спрайт
        this.credits.on('pointerdown', () => {
            // Воспроизведение звука кнопки
            this.scene.audioPlayButton();
            // Создание спрайта для линий выплат
            this.paylines = new Sprite(this.scene,Config.width / 2, Config.height / 2,
                'about', 'palines.png').setDepth(1).setScale(0.57);
            // Создание спрайта для кнопки выхода
            this.btnExit = new Sprite(this.scene, Config.width - 30 , 
                    Config.height - 405, 'bgButtons', 'btn_exit.png').
                    setScale(0.4).setDepth(1);
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