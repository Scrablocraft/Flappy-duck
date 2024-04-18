
window.onload = () => {
    game.init();
}

class Game {
    posX = 40;
    posY = 240;
    gravity = 1.5;
    score = 0;

    pipes = [];
    pipesGap = 120;

    init = () => {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.bird = new Image();
        this.bird.src = 'images/bird.png'

        this.bg = new Image();
        this.bg.src = 'images/bg/1.png'

        this.pipeTop = new Image();
        this.pipeTop.src = 'images/pipeTop.png';

        this.pipeBottom = new Image();
        this.pipeBottom.src = 'images/pipeBottom.png';

        this.flyAudio = new Audio();
        this.flyAudio.src = 'sounds/kwak.mp3';

        document.addEventListener('click', this.moveUp);
        document.addEventListener('keydown', (e) => {
            if (e.key == ' ') {
                this.moveUp();
            }
        })

        this.startGame();
    }

    startGame = () => {
        const fps = 60;
        setInterval(this.updateGame, 1000/60);

        this.addPipe();
    }

    addPipe = () => {
        let x = this.canvas.clientWidth;
        let y = Math.floor(Math.random() * this.pipeTop.height) - this.pipeTop.height;


        this.pipes.push({
            top: {
                img: this.pipeTop,
                x: x,
                y: y,
                width: this.pipeTop.width,
                height: this.pipeTop.height,
            },
            bottom: {
                img: this.pipeBottom,
                x: x,
                y: y + this.pipeTop.height + this.pipesGap,
                width: this.pipeBottom.width,
                height: this.pipeBottom.height,
            }
        });
    }

    updateGame = () => {
        // logika gry
        this.addGravity();

        this.render();
    }

    addGravity = () => {
        this.posY += this.gravity;
    }

    render = () => {
        this.context.drawImage(this.bg, 0, 0);

        this.drawPipes();

        this.context.drawImage(this.bird, this.posX, this.posY)

        this.context.fillStyle = '#FFF';
        this.context.font = "20px Verdana";
        this.context.fillText("Punkty: " + this.score, 20, 20)
    }

    drawPipes = () => {
        const pipesToDraw = [...this.pipes];

        pipesToDraw.forEach(pipe => {
            this.context.drawImage(pipe.top.img, pipe.top.x, pipe.top.y);
            pipe.top.x--;

            this.context.drawImage(pipe.bottom.img, pipe.bottom.x, pipe.bottom.y);
            pipe.bottom.x--;

            if (pipe.top.x == 150) {
                this.addPipe();
            }
    
            if (pipe.top.x + pipe.top.width < -100) {
                this.pipes.shift();
            }
        });
    }

    moveUp = () => {
        this.posY -= 30;
    }
}

const game = new Game();