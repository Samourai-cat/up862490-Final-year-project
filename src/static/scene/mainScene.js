var currentScene = 0;

class MainScene extends Phaser.Scene {
    constructor(){
        super("bootGame")
    }
    preload ()
    {
        this.load.image('buttonsnake', 'src/assets/snake_title.png');
        this.load.image('buttonminesweeper', 'src/assets/minesweeper.png');
    }
    create ()
    {
        this.add.text(config.scale.width/2-60,config.scale.height/8,'SnakeSweeper')

        let buttonsnake = this.add.image(config.scale.width/2, config.scale.height/3, 'buttonsnake');
        buttonsnake.setScale(0.7);
        buttonsnake.setInteractive();
        
        this.add.text(config.scale.width/2-30,config.scale.height/3-50,'snake')

        let buttonminesweeper = this.add.image(config.scale.width/2, config.scale.height/2, 'buttonminesweeper');
        buttonminesweeper.setScale(0.09);
        buttonminesweeper.setInteractive();
        this.add.text(config.scale.width/2-50,config.scale.height/2-50,'minesweeper');


        let buttonsnakesweeper = this.add.image(config.scale.width/1.67, config.scale.height/1.5, 'buttonminesweeper');
        let buttonsnakesweeper2 = this.add.image(config.scale.width/2.2, config.scale.height/1.5, 'buttonsnake');
        buttonsnakesweeper2.setScale(0.7);
        buttonsnakesweeper2.setInteractive();

        buttonsnakesweeper.setScale(0.09);
        buttonsnakesweeper.setInteractive();
        this.add.text(config.scale.width/2-50, config.scale.height/1.75,'Snakesweeper');

        buttonsnake.on('pointerdown', function () {
            currentScene = 1;
            this.scene.switch('SnakeGame', SnakeScene, true);

        }, this);

        buttonminesweeper.on('pointerdown', function () {
            currentScene = 2;
            this.scene.switch('MineSweeperGame', MineSweeper, true);

        }, this);

        buttonsnakesweeper2.on('pointerdown', function () {
            currentScene = 3;
            // this.scene.switch('SnakeSweeperSceneGame', SnakeSweeperScene, true);
            this.scene.start('OptionMenuScene', OptionMenu, true);

        }, this);

        buttonsnakesweeper.on('pointerdown', function () {
            currentScene = 3;
            // this.scene.switch('SnakeSweeperSceneGame', SnakeSweeperScene, true);
            this.scene.start('OptionMenuScene', OptionMenu, true);
        }, this);
    }

}