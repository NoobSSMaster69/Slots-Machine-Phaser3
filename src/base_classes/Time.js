import Config from '../config';

// Клас для відображення часу в грі
export default class Time {
    constructor(scene) {
        // Посилання на сцену
        this.scene = scene;
        // Виклик функції для додавання відображення часу
        this.addTime();
    }

    // Функція для додавання відображення часу
    addTime() {
        // Створення текстового об'єкту для відображення часу
        this.txtTime = this.scene.add.text(Config.width - 1260, Config.height - 700, '', {
            fontSize : '20px',
            color : '#ffffff',
            fontFamily : 'PT Serif'
        });
        
        // Виклик функції обновлення часу
        this.callbackTime();

        // Додавання події для оновлення часу кожну секунду
        this.scene.time.addEvent({
            delay: 1000,
            callback: this.callbackTime,
            callbackScope: this,
            loop: true
        });
    }

    // Функція зворотного виклику для оновлення часу
    callbackTime() {
        // Отримання поточного часу
        const d = new Date();
        let hours = d.getHours();
        // Форматування годин
        hours = hours >= 10 ?  hours : '0' + hours;
        let minutes = d.getMinutes();
        // Форматування хвилин
        minutes = minutes >= 10 ? minutes : '0' + minutes;
        let seconds = d.getSeconds();
        // Форматування секунд
        seconds = seconds >= 10 ? seconds : '0' + seconds;
        // Створення рядка з часом у форматі годин:хвилини:секунди
        const time = hours + ':' + minutes + ':' + seconds;
        // Встановлення тексту відображення часу
        this.txtTime.setText(time);
    }
}