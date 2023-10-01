import Phaser from 'phaser'; // Импорт Phaser
import Config from './config'; // Импорт конфигурации игры

export default class Game { // Экспорт класса Game
  constructor() { // Конструктор класса
    new Phaser.Game(Config); // Создание новой игры Phaser с настройками из Config
  }

  resize() { // Метод для изменения размера игры
    let canvas = document.querySelector('canvas'); // Получение элемента canvas
  
    let windowWidth = window.innerWidth; // Ширина окна браузера
    let windowHeight = window.innerHeight; // Высота окна браузера
    let windowRatio = windowWidth / windowHeight; // Соотношение сторон окна браузера
    let gameRatio = Config.width / Config.height; // Соотношение сторон игры
    if (windowRatio < gameRatio) { 
      canvas.style.width = windowWidth + 'px'; // Установка ширины canvas равной ширине окна браузера
      canvas.style.height = (windowWidth / gameRatio) + 'px'; // Установка высоты canvas с учетом соотношения сторон игры
    } else {
      canvas.style.width = (windowHeight * gameRatio) + 'px'; // Установка ширины canvas с учетом соотношения сторон игры
      canvas.style.height = windowHeight + 'px'; // Установка высоты canvas равной высоте окна браузера
    }
  }
}

// Событие загрузки окна
window.onload = () => {
    const game = new Game(); // Создание нового объекта игры
    game.resize(); // Изменение размера игры под размер окна браузера
    window.addEventListener('resize', game.resize, false); // Добавление слушателя события изменения размера окна браузера
}
