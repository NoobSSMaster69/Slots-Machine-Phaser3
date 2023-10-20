import Config from '../config';
import Options from '../options';
//import Class
import Sprite from './Sprite';
import Tween from './Tween';
//Class Auto Spin
export default class AutoSpin {
    constructor(scene) {
        this.scene = scene;
        this.autoSpin();
    }

    autoSpin() {
        this.buttonAuto = new Sprite(this.scene, Config.width - 115, Config.height - 28, 'bgButtons', 'btn-info.png');
        this.txtAutoSpin = this.scene.add.dynamicBitmapText(Config.width - 135, Config.height - 35, 'txt_bitmap', Options.txtAutoSpin, 38);
        this.txtAutoSpin.setDisplayCallback(this.scene.textCallback);
        this.buttonAuto.setScale(0.4);
        this.txtAutoSpin.setScale(0.4);
        this.buttonAuto.on('pointerdown', () => {
            if (!Options.checkClick) {
                this.buttonAuto.setScale(0.3);
                //fuction play speed auto
                this.playSpeedAuto();
            }
        });
        this.buttonAuto.on('pointerup', () => this.buttonAuto.setScale(0.4));
    }

    playSpeedAuto() {
        //set text auto
        if(Options.txtAutoSpin === 'STOP') {
            Options.txtAutoSpin = 'AUTO';
            this.txtAutoSpin.setText(Options.txtAutoSpin);
            //remove timer event
            if(this.txtSpeed && this.timer) {
                this.txtSpeed.destroy();
                this.timer.remove();
            }   
        } else {
            Options.txtAutoSpin = 'STOP';
            this.buttonAuto.setScale(0.4);
            this.txtAutoSpin.setText(Options.txtAutoSpin);
            //play audio button
            this.scene.audioPlayButton();
        
            this.bgAuto = new Sprite(this.scene, Config.width / 2, Config.height / 2,
                'autoSpin', 'bg_auto.png').setScale(0.58);
            this.auto = new Sprite(this.scene, Config.width / 2, Config.height / 2 - 100,
                'bgButtons', 'btn-spin.png').setScale(0.4);
            
            this.txtAuto = this.scene.add.text(Config.width - 500, Config.height / 2 - 115,
                Options.txtAuto, { fontSize : '20px', color : '#fff', fontFamily : 'PT Serif' });
            
            //function set text x auto
            this.setXAuto();
            
            //function plus
            this.plus();
            
            //function minus
            this.minus();

            //function play
            this.play();

            //function exit
            this.exit();
        }
    }


    plus() {
        this.btnPlus = new Sprite(this.scene, Config.width / 2 - 100, Config.height / 2 - 100,
            'autoSpin', 'btn_plus_bet.png').setScale(0.6);
        this.btnPlus.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton();
            if(Options.txtAuto < 100) {
                this.btnMinus.clearTint();
                this.btnPlus.setScale(0.5);
                Options.txtAuto += 5;
                //set text x auto
                Options.txtAuto < 100 ? this.txtAuto.x = 620 :
                    this.txtAuto.x = 610;
                this.txtAuto.setText(Options.txtAuto);
            }
            if(Options.txtAuto === 100) {
                this.btnPlus.setTint(0xa09d9d);
            }
        });
        this.btnPlus.on('pointerup', () => this.btnPlus.setScale(0.6));
    }

    minus() {
        this.btnMinus = new Sprite(this.scene, Config.width / 2 + 100, Config.height / 2 - 100,
            'autoSpin', 'btn_minus_bet.png').setScale(0.6);
        this.btnMinus.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton(); 
            if(Options.txtAuto > 5) {
                this.btnPlus.clearTint();
                this.btnMinus.setScale(0.5);
                Options.txtAuto -= 5;
                //function set text x auto
                this.setXAuto();
                this.txtAuto.setText(Options.txtAuto);  
            }
            if(Options.txtAuto === 5) {
                this.btnMinus.setTint(0xa09d9d);
            }  
        });
        this.btnMinus.on('pointerup', () => this.btnMinus.setScale(0.6));
    }

    play() {
        this.btnPlay = new Sprite(this.scene, Config.width / 2, Config.height / 2 + 100,
            'bgButtons', 'btn_play.png').setScale(0.5);
        this.btnPlay.on('pointerdown', () => {
            //play audio button
            this.scene.audioPlayButton();
            //function remove image auto
            this.removeImgAuto();
            if(this.scene.valueMoney >= Options.coin * Options.line) 
                this.speedPlay(Options.txtAuto);
            else
                this.setTextAuto();
        });
    }
    
    exit() {
        this.btnExit = new Sprite(this.scene, Config.width - 30 , 
            Config.height - 370,
            'bgButtons', 'btn_exit.png').setScale(0.4);
        this.btnExit.on('pointerdown', () => {
            this.buttonAuto.setScale(0.4);
            //play audio button
            this.scene.audioPlayButton();
            //function remove image auto
            this.removeImgAuto();
            //set text auto
            this.setTextAuto();
        });
    }

    speedPlay(speed) {
        //set text speed
        let width;
        speed > 5 ? width = Config.width - 80 :  width = Config.width - 60;

        this.txtSpeed = this.scene.add.dynamicBitmapText(width , Config.height - 50 , 'txt_bitmap', speed, 80).setScale(0.6);
        this.txtSpeed.setDisplayCallback(this.scene.textCallback);
        this.timer = this.scene.time.addEvent({
            delay: 500,
            callback: function() {
                //set delay 
                this.timer.delay = 4500;
                if(speed > 0 && this.scene.valueMoney >= 
                    Options.coin * Options.line) {
                    //set color
                    this.scene.baseSpin.setColor();
                    //set check click = true
                    Options.checkClick = true;
                    //detroys line array
                    this.scene.baseSpin.destroyLineArr();
                    //funtion remove text win
                    this.scene.baseSpin.removeTextWin();
                    //save localStorage
                    this.scene.baseSpin.saveLocalStorage();
                    this.tweens = new Tween(this.scene);
                    speed --;
                    this.txtSpeed.setText(speed);
                } else {
                    Options.checkClick = false;
                    this.timer.remove(false);
                    this.txtSpeed.destroy();
                    //set text auto
                    this.setTextAuto();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    setTextAuto() {
        Options.txtAutoSpin = 'AUTO';
        this.txtAutoSpin.setText(Options.txtAutoSpin);
    }

    setXAuto() {
        if(Options.txtAuto >= 100) 
            this.txtAuto.x = 610;
        else if(Options.txtAuto >= 10)
            this.txtAuto.x = 620;
        else 
            this.txtAuto.x = 635;
    }
    
    removeImgAuto() {
        this.bgAuto.destroy();
        this.btnPlus.destroy();
        this.btnMinus.destroy();
        this.auto.destroy();
        this.txtAuto.destroy();
        this.btnPlay.destroy();
        this.btnExit.destroy();
    }
}