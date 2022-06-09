//sprite naming list, since i couldn't code an enum in JS
const cell_states = {
    ZERO: 0,
    ONE: 1, 
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    COVERED: 9,
    FLAGGED: 10,
    MARKED: 11,
    GRAY_MINE: 12,
    RED_MINE: 13,
    WRONG_MINE: 14,
    MARKED_CLICKED: 15
}

class Cell extends Phaser.GameObjects.Sprite{

    constructor(board, scene, x, y, xpos, ypos, mine){
        let default_state = cell_states.COVERED;
        if(darkmode===false){
            super(scene, x, y, "board", default_state);
        }else{
            super(scene, x, y, "boardDark", default_state);
        }
        
        scene.add.existing(this);

        this.x = x;
        this.y = y;
        this.xpos = xpos; //board coordinate
        this.ypos = ypos;
        this.already_clicked = false;
        this.board = board;
        this.mined = mine;
        this.flagged = false;
        this.cell_state = cell_states.COVERED;
        this.nearby_mines = 0;

        /* this.on("pointerup", function(){
            this.setFrame(default_state);
        }); */
        /* this.on("pointerout", function(){
            this.setFrame(default_state);
        }); */

        this.click = function(){
            if (currentScene===2 ){
                if(game.input.activePointer.rightButtonDown()){
                    this.rightClick();    
                }

                else{
                    this.leftClick();
                }
            }
        }

        this.leftClick = function(){
            if(!(this.cell_state == cell_states.FLAGGED)){
                
                if(this.board.click_count == 0){
                    //keep creating random mines until current cell isn't mined on the first click
                    do{
                        this.board.createRandomMines();
                    }while(this.mined);
    
                }
                this.board.click_count++;
    
                if(this.mined){ //if player loses, this happens
                    
                    for(let i = 0; i < this.board.cells.length; i++){
                        for(let j = 0; j < this.board.cells[0].length; j++){
                            if(this.board.cells[i][j].mined){
                                this.board.cells[i][j].setState(cell_states.GRAY_MINE);
                            }
                            else if(this.board.cells[i][j].flagged){
                                this.board.cells[i][j].setState(cell_states.WRONG_MINE);
                            }
                        }
                    }

                    this.setState(cell_states.RED_MINE);
                    if (currentScene===3 ){
                        snake.alive = false;
                    }else{
                        scene.scene.start('GameOverScene', GameOver, true);
                        scene.scene.stop();
                    }
                }
                else{
                    
                    //recursive function
                    this.discoverBoard();
                }
            }
        }

        this.rightClick = function(){
            if(this.cell_state == cell_states.COVERED || this.cell_state == cell_states.FLAGGED){
                this.flagged = !this.flagged;
                this.setState(this.flagged ? cell_states.FLAGGED : cell_states.COVERED);
            }      
        }

        this.discoverBoard = function(flag){ //recursively discovers cells with no adjacent mines until it finds an edge
            let mines = this.getNearbyMines();
            
            if(!flag){
                flag = 0;  //initialize flag for first recursion
            }

            if(mines > 0){
                flag++; //if there's an edge, add one to the flag
            }

            if(!this.mined){
                this.setState(mines); //change sprite depending on surrounding mines
            }
            
            this.already_clicked = true; //this is here in order to avoid the function to iterate infintely over the same cells

            for(let i = this.xpos - 1; i <= this.xpos + 1; i++){
                for(let j = this.ypos - 1; j <= this.ypos + 1; j++){
                    if(!(i == this.xpos && j == this.ypos)){
                        if((i > -1 && i < this.board.cells.length) && (j > -1 && j < this.board.cells[0].length)){
                            if((!this.board.cells[i][j].already_clicked) && (this.board.cells[i][j].cell_state != cell_states.FLAGGED)){
                                if(flag > 0){
                                    return; //if flag is modified, that means we're at an edge and it's time to stop recursion
                                }
                                this.board.cells[i][j].discoverBoard(flag);
                            }
                        }                        
                    }
                }
            }
        }

        this.getNearbyMines = function(){ //this scans all adjacent cells and checks for mines, returning an int
            let sum = 0;
            for(let i = this.xpos - 1; i <= this.xpos + 1; i++){
                for(let j = this.ypos - 1; j <= this.ypos + 1; j++){
                    if(!(i == this.xpos && j == this.ypos)){
                        if((i > -1 && i < this.board.cells.length) && (j > -1 && j < this.board.cells[0].length))
                        sum += this.board.cells[i][j].mined ? 1 : 0;
                    }
                }
            }
            return sum;
        }

        this.setState = function(state){
            this.cell_state = state;
            this.setFrame(state);        
        }

        this.setInteractive();  //enable mouse events for every cell
        this.on("pointerdown", this.click);
    }
}

class Board{
    constructor(scene, x, y, width, height, mines){

        this.cells = []; //column array
        this.click_count = 0;

        for(let i = 0; i < width; i++){
            this.cells[i] = []; //columns are created 
            for(let j = 0; j < height; j++){
                //there's a cell every 16 pixels
                this.cells[i][j] = new Cell(this, scene, x + (16*i), y + (16*j), i, j, false); //columns are filled
            }
        }
        this.createRandomMines = function(){
            let mine_count = 0;
            while(mine_count < mines){
                let rand_x = Math.floor(Math.random() * width); //this creates a random number between 0 and width
                let rand_y = Math.floor(Math.random() * height);//same with this but with height

                //if cell isn't mined already, mine it
                if(!this.cells[rand_x][rand_y].mined && !(this.cells[rand_x][rand_y].xpos === 0 && this.cells[rand_x][rand_y].ypos === 0)&& !(this.cells[rand_x][rand_y].xpos === 39 && this.cells[rand_x][rand_y].ypos === 49)){
                    this.cells[rand_x][rand_y].mined = true;
                    mine_count++;
                }
                //console.log(mine_count); debug
            }
            
        }
        this.checkCollition = function(snake,currentLoser){

            for(let i = 0; i < width; i++){
                for(let j = 0; j < height; j++){

                    if (this.cells[i][j].xpos === snake.head.x/16 && this.cells[i][j].ypos === snake.head.y/16 && this.cells[i][j].cell_state === cell_states.COVERED){
                        this.cells[i][j].leftClick();
                        if (currentLoser===1)
                        {
                            SnakeSweeperScore= "Player 1";
                        }else{
                            SnakeSweeperScore= "Player 2";
                        }
                    }
                }
            }
        }
    }
}