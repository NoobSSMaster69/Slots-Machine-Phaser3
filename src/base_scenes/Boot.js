// Импорт базового класса Sprite
import Sprite from '../base_classes/Sprite';
// Импорт базового класса Audio
import Audio from '../base_classes/Audio';
// Импорт конфигурационного файла
import Config from '../config';

// Класс BootScene
export default class BootScene extends Phaser.Scene {
    // Конструктор класса
    constructor() {
        super({key: 'Boot'}); // Вызов конструктора родительского класса с ключом сцены
    }

    // Метод для создания объектов на сцене
    create() {
        // Объект для масштабирования
        const scaleObject = {
            default : 1.2,
            scale : 1.1,
            scale2 : 1,
            scale3 : 0.9
        };
        // Класс Audio
        this.audioObject = new Audio(this); // Создание объекта аудио
        this.audioObject.musicBackgroundDefault.play(); // Воспроизведение фоновой музыки по умолчанию
        const bgloading = new Sprite(this, Config.width / 2, Config.height / 2, 'bgPreload', 'bg_menu.png'); // Создание спрайта для фонового изображения
        const title = new Sprite(this, Config.width / 2, Config.height - 500, 
            'logo', 'logo_game.png').setScale(scaleObject.default); // Создание спрайта для логотипа игры с начальным масштабом
        // Таймер для циклического изменения масштаба логотипа
        const timer = this.time.addEvent({
            delay: 150, // Задержка в миллисекундах
            callback: () => { // Функция обратного вызова
                if(title.scale === scaleObject.default) 
                    title.setScale(scaleObject.scale); // Изменение масштаба на scaleObject.scale
                else if(title.scale === scaleObject.scale) 
                    title.setScale(scaleObject.scale2); // Изменение масштаба на scaleObject.scale2
                else if(title.scale === scaleObject.scale2) 
                    title.setScale(scaleObject.scale3); // Изменение масштаба на scaleObject.scale3
                else 
                    title.setScale(scaleObject.default); // Изменение масштаба на scaleObject.default
            },
            callbackScope: this, // Контекст вызова функции
            loop: true // Флаг для повторения таймера
        });
        this.btn = new Sprite(this, Config.width / 2, Config.height - 150, 'bgButtons', 'btn_play.png').setScale(0.9); // Создание спрайта для кнопки игры с начальным масштабом
        this.btn.on('pointerdown', () => { // Обработчик события нажатия на кнопку игры
            this.audioObject.musicBackgroundDefault.stop(); // Остановка фоновой музыки по умолчанию
            timer.remove(); // Удаление таймера для логотипа
            this.audioObject.audioButton.play(); // Воспроизведение звука кнопки
            this.scene.start('Game'); // Переход к сцене игры
        });
    }
}