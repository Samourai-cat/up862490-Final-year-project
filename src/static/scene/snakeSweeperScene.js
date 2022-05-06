var snake;
var snake2;
var food;
var food2;
var cursors;
var board;
//  Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
var keyS;
var keyW;
var keyA;
var keyD;
var started = false;
var SnakeSweeperScore = "Player 1";

class SnakeSweeperScene extends Phaser.Scene {
    
    constructor(){
        super("SnakeSweeperSceneGame")
    }
    preload ()
    {
        this.load.spritesheet("board", "src/assets/board.png", {frameWidth: 16, frameHeight: 16});
        this.load.image('food', 'src/assets/food.png');
        this.load.image('body', 'src/assets/body.png');
    }

    create ()
    {
        board = new Board(this, 8, 8, 50, 40, 150);
        var Food = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,
    
            initialize:
    
            function Food (scene, x, y)
            {
                Phaser.GameObjects.Image.call(this, scene)
    
                this.setTexture('food');
                this.setPosition(x * 16, y * 16);
                this.setOrigin(0);
    
                this.total = 0;
    
                scene.children.add(this);
            },
    
            eat: function ()
            {
                this.total++;
            }
    
        });
    
        var Snake = new Phaser.Class({
    
            initialize:
    
            function Snake (scene, x, y,initialHeading)
            {
                this.headPosition = new Phaser.Geom.Point(x, y);
    
                this.body = scene.add.group();
                this.head = this.body.create(x * 16, y * 16, 'body');
                this.head.setOrigin(0);
    
                this.alive = true;
    
                this.speed = 800;
    
                this.moveTime = 0;
    
                this.tail = new Phaser.Geom.Point(x, y);
    
                this.heading = initialHeading;
                this.direction = initialHeading;
            },
    
            update: function (time)
            {
                if (time >= this.moveTime)
                {
                    return this.move(time);
                }
            },
    
            faceLeft: function ()
            {
                if (this.direction === UP || this.direction === DOWN)
                {
                    this.heading = LEFT;
                }
            },
    
            faceRight: function ()
            {
                if (this.direction === UP || this.direction === DOWN)
                {
                    this.heading = RIGHT;
                }
            },
    
            faceUp: function ()
            {
                if (this.direction === LEFT || this.direction === RIGHT)
                {
                    this.heading = UP;
                }
            },
    
            faceDown: function ()
            {
                if (this.direction === LEFT || this.direction === RIGHT)
                {
                    this.heading = DOWN;
                }
            },
    
            move: function (time)
            {
                if (started === true){
                    switch (this.heading)
                    {
                        case LEFT:
                            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 50);
                            break;
        
                        case RIGHT:
                            this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 50);
                            break;
        
                        case UP:
                            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 40);
                            break;
        
                        case DOWN:
                            this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 40);
                            break;
                    }
        
                    this.direction = this.heading;
        

                    Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);
        
        
                    var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);
                    
                    if (hitBody)
                    {
                        console.log('dead');
        
                        this.alive = false;
        
                        return false;
                    }
                    else
                    {
                        this.moveTime = time + this.speed;
        
                        return true;
                    }
                }
            },
    
            grow: function ()
            {
                var newPart = this.body.create(this.tail.x, this.tail.y, 'body');
    
                newPart.setOrigin(0);
            },
    
            collideWithFood: function (collidedfood)
            {
                if (this.head.x === collidedfood.x && this.head.y === collidedfood.y)
                {
                    this.grow();
    
                    collidedfood.eat();
    
                    if (this.speed > 20 && collidedfood.total % 5 === 0)
                    {
                        this.speed -= 5;
                    }
    
                    return true;
                }
                else
                {
                    return false;
                }
            },
    
            updateGrid: function (grid)
            {
                this.body.children.each(function (segment) {
    
                    var bx = segment.x / 16;
                    var by = segment.y / 16;
    
                    grid[by][bx] = false;
    
                });
    
                return grid;
            }
    
        });
    
        food = new Food(this, 24, 19);
        food2 = new Food(this, 25, 19);
        snake = new Snake(this, -1, 0,RIGHT);
        snake2 = new Snake(this, 50,39,LEFT);    
        cursors = this.input.keyboard.createCursorKeys();
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update(time, delta)
    {
        if (!snake.alive)
        {
            started = false;
            this.scene.start('GameOverScene', GameOver, true);
            this.scene.stop();

            return;
        }

        if (cursors.left.isDown)
        {
            snake.faceLeft();
            started = true;
            
        }
        else if (cursors.right.isDown)
        {
            snake.faceRight();
            started = true;
        }
        else if (cursors.up.isDown)
        {
            snake.faceUp();
            started = true;
        }
        else if (cursors.down.isDown)
        {
            snake.faceDown();
            started = true;
        }

        if (snake.update(time) && started === true)
        {
            board.checkCollition(snake,2);

            checkSnakesCollition(snake,snake2);
            if (snake.collideWithFood(food))
            {
                repositionFood(food);
            }
            if (snake.collideWithFood(food2))
            {
                repositionFood(food2);
            }
        }
        if (!snake2.alive)
        {
            started = false;
            this.scene.start('GameOverScene', GameOver, true);
            this.scene.stop();
            return;
        }

        if (keyA.isDown)
        {
            snake2.faceLeft();
            started = true;
        }
        else if (keyD.isDown)
        {
            snake2.faceRight();
            started = true;
        }
        else if (keyW.isDown)
        {
            snake2.faceUp();
            started = true;
        }
        else if (keyS.isDown)
        {
            snake2.faceDown();
            started = true;
        }
        if (snake2.update(time) && started === true)
        {
            board.checkCollition(snake2,1);
 
            if (snake2.collideWithFood(food))
            {
                repositionFood(food);
            }
            if (snake2.collideWithFood(food2))
            {
                repositionFood(food2);
            }
        }

    }
}

function repositionFood (collidedFood)
    {

        var testGrid = [];

        for (var y = 0; y < 30; y++)
        {
            testGrid[y] = [];

            for (var x = 0; x < 40; x++)
            {
                testGrid[y][x] = true;
            }
        }

        snake.updateGrid(testGrid);

        
        var validLocations = [];

        for (var y = 0; y < 30; y++)
        {
            for (var x = 0; x < 40; x++)
            {
                if (testGrid[y][x] === true)
                {

                    validLocations.push({ x: x, y: y });
                }
            }
        }

        if (validLocations.length > 0)
        {

            var pos = Phaser.Math.RND.pick(validLocations);


            collidedFood.setPosition(pos.x * 16, pos.y * 16);

            return true;
        }
        else
        {
            return false;
        }
    }

    function checkSnakesCollition(snakeArray,snake2Array)
    {
        var hitBodySnake2Array = Phaser.Actions.GetFirst(snake.body.getChildren(), { x: snake2Array.head.x, y: snake2Array.head.y }, 0);
        var hitBodySnakeArray = Phaser.Actions.GetFirst(snake2.body.getChildren(), { x: snakeArray.head.x, y: snakeArray.head.y }, 0);
        if (snake2Array.head.x === snakeArray.head.x && snake2Array.head.y === snakeArray.head.y)
        {
            snake.alive = false;
            snake2.alive = false;
            SnakeSweeperScore= "No Winners";
            return false;
        }
        if (hitBodySnake2Array)
        {
            snake.alive = false;
            SnakeSweeperScore= "Player 2";
        }
        if (hitBodySnakeArray)
        {
            snake2.alive = false;
            SnakeSweeperScore= "Player 1";
        }

    }