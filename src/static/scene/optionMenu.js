
class OptionMenu extends Phaser.Scene {
    
    constructor(){
        super("OptionMenuScene")
    }
    preload ()
    {
        this.load.image('on', 'src/assets/toggle-on.png');
        this.load.image('off', 'src/assets/toggle-off.png');
        this.load.image('easy', 'src/assets/easy.png');
        this.load.image('normal', 'src/assets/normal.png');
        this.load.image('hard', 'src/assets/hard.png');
    }
    create ()
    {
        this.add.text(config.scale.width/2-50,config.scale.height/8,'Options')

        let buttonEasy = this.add.image(config.scale.width/1.5, config.scale.height/1.5, 'easy');
        buttonEasy.setScale(0.7);
        buttonEasy.setInteractive();

        let buttonNormal = this.add.image(config.scale.width/2, config.scale.height/1.5, 'normal');
        buttonNormal.setScale(0.7);
        buttonNormal.setInteractive();

        let buttonHard = this.add.image(config.scale.width/3, config.scale.height/1.5, 'hard');
        buttonHard.setScale(0.7);
        buttonHard.setInteractive();

        this.add.text(config.scale.width/2-120, config.scale.height/3+5,'darkmode')
        var buttonDarkmode = this.add.image(config.scale.width/2, config.scale.height/3, (true) ? 'on' : 'off').setOrigin(0).setScrollFactor(0);
        buttonDarkmode.setInteractive();
        buttonDarkmode.setData('enabled', true);
        buttonDarkmode.setTexture('off');
        darkmode = false;
        buttonDarkmode.on('pointerdown', function () {
            if (buttonDarkmode.getData('enabled'))
            {
                buttonDarkmode.setTexture('on');
                darkmode = true;
                buttonDarkmode.setData('enabled', false);
            }
            else
            {
                buttonDarkmode.setData('enabled', true);
                buttonDarkmode.setTexture('off');
                darkmode = false;
            }
        });

        this.add.text(config.scale.width/2-120, config.scale.height/2+5,'Multiplayer')
        var button = this.add.image(config.scale.width/2, config.scale.height/2, (true) ? 'on' : 'off').setOrigin(0).setScrollFactor(0);
        button.setInteractive();
        button.setData('enabled', false);
        multiplayer = true;
        button.on('pointerdown', function () {
            if (button.getData('enabled'))
            {
                button.setTexture('on');
                multiplayer = true;
                button.setData('enabled', false);
            }
            else
            {
                button.setData('enabled', true);
                button.setTexture('off');
                multiplayer = false;
            }
        });

        buttonEasy.on('pointerdown', function () {
            currentScene = 3;
            snakeSpeed= 1000;
            this.scene.switch('SnakeSweeperSceneGame', SnakeSweeperScene, true);

        }, this);
        buttonNormal.on('pointerdown', function () {
            currentScene = 3;
            snakeSpeed= 800;
            this.scene.switch('SnakeSweeperSceneGame', SnakeSweeperScene, true);

        }, this);
        buttonHard.on('pointerdown', function () {
            currentScene = 3;
            snakeSpeed=400;
            this.scene.switch('SnakeSweeperSceneGame', SnakeSweeperScene, true);

        }, this);
    }
}
