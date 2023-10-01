import Config from '../config';
import Options from '../options';
import Sprite from './Sprite';
//Class Spin
export default class Spin {
    constructor(scene) {
        // Конструктор класу Spin, отримує сцену в якій він працює
        this.scene = scene;
        // Викликає метод printResult для обробки результатів гри
        this.printResult();
        // Викликає метод очистки кольорів
        this.clearColor();
    }

    // Метод для очищення кольорів елементів
    clearColor() {
        // Очищає кольори різних елементів
        this.scene.baseSpin.bgSpin.clearTint();
        this.scene.autoSpin.buttonAuto.clearTint();
        this.scene.maxBet.maxBet.clearTint();
        this.scene.coin.coin.clearTint();
        this.scene.btnLine.btnLine.clearTint();
        this.scene.btnMusic.clearTint();
        this.scene.btnSound.clearTint();
    }

    // Метод для обробки результатів гри
    printResult() {
        // Отримує символи з анімації для кожного барабана
        let s1, s2, s3, s4, s5, autoSpin = this.scene.autoSpin.tweens,
        baseSpin = this.scene.baseSpin.tweens;
        if(autoSpin) {
            s1 = autoSpin.columnTween1.targets[0];
            s2 = autoSpin.columnTween2.targets[0];
            s3 = autoSpin.columnTween3.targets[0];
            s4 = autoSpin.columnTween4.targets[0];
            s5 = autoSpin.columnTween5.targets[0];   
        } else {
            s1 = baseSpin.columnTween1.targets[0];
            s2 = baseSpin.columnTween2.targets[0];
            s3 = baseSpin.columnTween3.targets[0];
            s4 = baseSpin.columnTween4.targets[0];
            s5 = baseSpin.columnTween5.targets[0];
        }
        // Зберігає імена символів в Options.result
        Options.result.push([s1.list[3].frame.name, s1.list[2].frame.name,
        s1.list[1].frame.name],[s2.list[3].frame.name, s2.list[2].frame.name,
        s2.list[1].frame.name],[s3.list[3].frame.name, s3.list[2].frame.name,
        s3.list[1].frame.name],[s4.list[3].frame.name, s4.list[2].frame.name,
        s4.list[1].frame.name],[s5.list[3].frame.name, s5.list[2].frame.name,
        s5.list[1].frame.name]);
        // Викликає метод обробки ліній виграшу
        this.getWinningLines();
    }

    // Метод для обробки виграшних ліній
    getWinningLines() {
        // Проходить по кожній лінії
        for(let lineIndx = 0; lineIndx < Options.line; 
            lineIndx ++) {
            let streak = 0;
            let currentkind = null;
            // Проходить по кожній координаті в лінії
            for(let coordIndx = 0; coordIndx < Options.payLines[lineIndx].
                length; coordIndx ++) {
                let coords = Options.payLines[lineIndx][coordIndx];
                // Отримує ім'я символу за координатою
                let symbolAtCoords = Options.result[coords[0]][coords[1]];
                if(coordIndx === 0) {
                    // Якщо це перший символ, встановлює його як поточний
                    currentkind = symbolAtCoords;
                    streak = 1;
                } else {
                    // Якщо символ не збігається з поточним, виходить з циклу
                    if(symbolAtCoords != currentkind) {
                        break;
                    }
                    streak ++;
                }
            }
            // Перевірка, чи streak >= 3
            if(streak >= 3) {
                lineIndx ++;
                // Додає лінію до виграшних ліній
                Options.winningLines.push(lineIndx);
                // Відтворює звук виграшу
                this.audioPlayWin();
                // Викликає метод обчислення грошей
                this.mathMoney(currentkind, streak);
            }
            // Відтворює звук програшу
            this.audioPlayLose();
        }
        // Отримує масив ліній
        this.getLineArray(Options.winningLines);
        // Скидає Options
        this.resetOptions();
    }

    // Метод для отримання масиву ліній
    getLineArray(lineArr) {
        if(!lineArr.length) {
            return;
        }
        for(let i = 0; i < lineArr.length; i++) {
            let lineName = 'payline_' + lineArr[i] + '.png';
            // Додає спрайт лінії
            Options.lineArray.push(new Sprite(this.scene, Config.width / 2, 
                Config.height / 2, 'line', lineName));
        }
    }

    // Метод для обчислення грошей за виграш
    mathMoney(symbolName, streak) {
        let index = streak - 3;
        if(streak === 3)
            this.symbolValue(symbolName, index); 
        else if(streak === 4) 
            this.symbolValue(symbolName, index);
        else 
            this.symbolValue(symbolName, index);
    }

    // Метод для скидання Options
    resetOptions() {
        // Скидає виграш і результат
        Options.win = 0;
        Options.moneyWin = 0;
        Options.result = [];
        Options.winningLines = [];
    }

    // Метод для отримання вартості символу
    symbolValue(symbolName, index) {
        switch(symbolName) {
            case 'symbols_0.png':
                this.getMoney(Options.payvalues[0][index]);
                break;
            case 'symbols_1.png':
                this.getMoney(Options.payvalues[1][index]);
                break;
            case 'symbols_2.png':
                this.getMoney(Options.payvalues[2][index]);
                break;
            case 'symbols_3.png':
                this.getMoney(Options.payvalues[3][index]);
                break;
            case 'symbols_4.png':
                this.getMoney(Options.payvalues[4][index]);
                break;
            case 'symbols_5.png':
                this.getMoney(Options.payvalues[5][index]);
                break;
            case 'symbols_6.png':
                this.getMoney(Options.payvalues[6][index]);
                break;
            case 'symbols_7.png':
                this.getMoney(Options.payvalues[7][index]);
                break;
            case 'symbols_8.png':
                this.getMoney(Options.payvalues[8][index]);
                break;
            default:
                this.getMoney(Options.payvalues[9][index]);
                break;
        } 
    }

    // Метод для відтворення звуку виграшу
    audioPlayWin() {
        if (this.scene.audioMusicName === 'btn_music.png') {
            // Відтворює звук виграшу
            this.scene.audioObject.audioWin.play();
        }
    }

    // Метод для відтворення звуку програшу
    audioPlayLose() {
        if (this.scene.audioMusicName === 'btn_music.png') {
            // Відтворює звук програшу
            this.scene.audioObject.audioLose.play();
        }
    }

    // Метод для отримання грошей
    getMoney(money) {
        let maxBet = Options.line * Options.coin;
        let payValue = money / Options.line;
        Options.win += (payValue * maxBet);
        // Викликає метод встановлення тексту виграшу
        this.setTextureWin(Options.win);
    }

    // Метод для встановлення тексту виграшу
    setTextureWin(value) {
        Options.moneyWin = value;
        this.scene.valueMoney += Options.moneyWin;
        // Викликає метод встановлення ширини тексту виграшу
        let width = this.setTextWidthWin();
        // Перевірка наявності тексту виграшу
        if (!this.scene.txtWin) {
            this.scene.txtWin = this.scene.add.text(width, Config.height - 130, 'WIN: ' + Options.moneyWin + ' $ ', {
                fontSize : '20px',
                color : '#25a028',
                fontFamily : 'PT Serif'
            });
        } else {
            this.scene.txtWin.destroy();
            this.scene.txtWin = this.scene.add.text(width, Config.height - 130, 'WIN: ' + Options.moneyWin + ' $ ', {
                fontSize : '20px',
                color : '#25a028',
                fontFamily : 'PT Serif'
            });
        }
        // Зберігає в localStorage
        this.scene.baseSpin.saveLocalStorage();
    }

    // Метод для встановлення ширини тексту виграшу
    setTextWidthWin() {
        let width;
        if(Options.moneyWin >= 100000) 
            width = Config.width - 340;
        else if(Options.moneyWin >= 10000) 
            width = Config.width - 335;
        else if(Options.moneyWin >= 1000) 
            width = Config.width - 330;
        else if(Options.moneyWin >= 100) 
            width = Config.width - 322;
        else 
            width = Config.width - 340;
        return width;
    }
}
