
class OptionMenu extends Phaser.Scene {
    
    constructor(){
        super("OptionMenuScene")
    }
    preload ()
    {
        this.load.image('on', 'src/assets/toggle-on.png');
        this.load.image('off', 'src/assets/toggle-off.png');
    }
    create ()
    {
        
    }
}
