class GameOver extends Phaser.Scene {
    
    constructor(){
        super("GameOverScene")
    }
    preload ()
    {
        
    }
    create ()
    {   
        var finalscore;
        var gameOverText = this.add.text(config.scale.width/4,config.scale.height/3-150,'GameOver', { font: "74px Arial Black", fill: "#fff" });
        var ScoreText = this.add.text((config.scale.width/4)-50,config.scale.height/3+100-150,'Score:', { font: "74px Arial Black", fill: "#fff" });
        if(currentScene === 1)
        {
            finalscore = snakeScore;
        }
        else if(currentScene === 2)
        {
            finalscore = mineSweeperScore;
        }
        else
        {
            finalscore = SnakeSweeperScore;
            this.add.text((config.scale.width/2)+50,config.scale.height/3+170-150,"Win", { font: "74px Arial Black", fill: "#fff" });
        }
        var ScoreText = this.add.text((config.scale.width/2)+50,config.scale.height/3+100-150,finalscore, { font: "74px Arial Black", fill: "#fff" });
        var resetButton = this.add.text((config.scale.width/3)-200,config.scale.height/3+300,'reset', { font: "74px Arial Black", fill: "#FF0000" });
        var menuButton = this.add.text((config.scale.width/2)-50,config.scale.height/3+300,'Main Menu', { font: "74px Arial Black", fill: "#fff400" });
        resetButton.setInteractive();
        menuButton.setInteractive();

        resetButton.on('pointerdown', function () {
            if(currentScene === 1)
            {
                this.scene.switch('SnakeGame', SnakeScene, true);
                this.scene.stop();
            }
            else if(currentScene === 2)
            {
                this.scene.switch('MineSweeperGame', MineSweeper, true);
                this.scene.stop();
            }
            else
            {
                this.scene.switch('SnakeSweeperSceneGame', SnakeSweeperScene, true);
                this.scene.stop();
            }
            
        }, this);

        menuButton.on('pointerdown', function () {
            this.scene.switch('bootGame', MainScene, true);
            this.scene.stop();
        }, this);

    }
}