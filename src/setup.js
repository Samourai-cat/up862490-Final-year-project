
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 640
    },
    backgroundColor: 0x74992e,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    autoCenter: true,
    scene: [MainScene,MineSweeper,SnakeScene,SnakeSweeperScene,GameOver,OptionMenu]
}
  
var game = new Phaser.Game(config)
  
  