// Класс Sprite
export default class Sprite extends Phaser.GameObjects.Sprite {
    // Конструктор класса
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); // Вызов конструктора родительского класса
        scene.add.existing(this); // Добавление этого объекта в сцену
        this.setInteractive(); // Установка этого объекта как интерактивного
    }
}