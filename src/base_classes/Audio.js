// Класс Audio
export default class Audio {
    // Конструктор класса принимает сцену в качестве параметра
    constructor(scene) {
        this.scene = scene; // Сохраняем сцену в свойстве объекта
        this.loadAudio(); // Вызываем метод загрузки аудио
    }

    // Метод для загрузки аудиофайлов
    loadAudio() {
        // Загружаем фоновую музыку по умолчанию
        this.musicBackgroundDefault = this.scene.sound.add('backgroundDefault', {
            loop: true, // Музыка будет повторяться
            volume: 1.5 // Устанавливаем громкость на 1.5
        });
        // Загружаем звук барабанов
        this.audioReels = this.scene.sound.add('reels');
        // Загружаем звук остановки барабанов
        this.audioReelStop = this.scene.sound.add('reelStop');
        // Загружаем звук выигрыша, который будет повторяться
        this.audioWin = this.scene.sound.add('win', { loop : true });
        // Загружаем звук кнопки
        this.audioButton = this.scene.sound.add('button');
        // Загружаем звук проигрыша с громкостью 2.5
        this.audioLose = this.scene.sound.add('lose', { volume: 2.5 });
        // Загружаем обычную музыку, которая будет повторяться и иметь громкость 2
        this.musicDefault = this.scene.sound.add('musicDefault', { 
            loop: true,
            volume: 2
        });
    }
}