var mineSweeperScore = 0;
class MineSweeper extends Phaser.Scene {
    
    constructor(){
        super("MineSweeperGame")
    }
    preload ()
    {
        this.load.spritesheet("board", "src/assets/board.png", {frameWidth: 16, frameHeight: 16});
    }
    create ()
    {
        let board = new Board(this, 8, 8, 50, 40, 200);
    }
}
