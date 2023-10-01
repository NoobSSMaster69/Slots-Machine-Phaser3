import Preload from './base_scenes/Preload'; // Импорт сцены предзагрузки
import Boot from './base_scenes/Boot'; // Импорт начальной сцены
import Game from './base_scenes/Game'; // Импорт игровой сцены

export default {
    type: Phaser.WEBGL, // Тип рендерера Phaser
    parent: "slot-game-phaser3", // ID родительского элемента для игры
    width: 1280, // Ширина игрового поля
    height: 720, // Высота игрового поля
    physics : { // Настройки физики
        default : 'arcade', // Тип физики по умолчанию
        arcade : {
            debug : false // Отключение отладки физики
        }
    },
    fps : { // Настройки FPS (кадров в секунду)
        min: 30, // Минимальное значение FPS
        target: 60 // Целевое значение FPS
    },
    scene : [Preload, Boot, Game] // Массив сцен для загрузки
};