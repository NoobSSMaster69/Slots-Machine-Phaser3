import Options from '../options';

// Клас, що представляє собою контейнер барабану
export default class Container extends Phaser.GameObjects.Container {
    // Конструктор, який встановлює сцену та координати контейнера
    constructor(scene, x, y) {
        // Виклик конструктора батьківського класу
        super(scene, x, y);
        // Додавання контейнера на сцену
        scene.add.existing(this);

        // Створення та додавання спрайтів символів до контейнера
        const symbols1 = scene.add.sprite(0, 0, 'symbols', 'symbols' + this.randomBetween(0, 9) + '.png');
        const symbols2 = scene.add.sprite(0, - Options.symbolHeight, 'symbols', 'symbols' + this.randomBetween(0, 9) + '.png');
        const symbols3 = scene.add.sprite(0, - Options.symbolHeight * 2, 'symbols', 'symbols' + this.randomBetween(0, 9) + '.png');
        const symbols4 = scene.add.sprite(0, - Options.symbolHeight * 3, 'symbols', 'symbols' + this.randomBetween(0, 9) + '.png');
        const symbols5 = scene.add.sprite(0, - Options.symbolHeight * 4, 'symbols', 'symbols_' + this.randomBetween(0, 9) + '.png');

        // Додавання масиву спрайтів до контейнера
        this.add([symbols1, symbols2, symbols3, symbols4, symbols5]);
    }

    // Генерація випадкового числа в межах вказаного діапазону
    randomBetween(min, max) {
        return Phaser.Math.Between(min, max); 
    }
}