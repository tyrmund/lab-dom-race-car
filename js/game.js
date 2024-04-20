class Game {
    // code to be added
    constructor() {
        this.startScreen = document.querySelector('#game-intro')
        this.gameScreen = document.querySelector('#game-screen')
        this.gameEnd = document.querySelector('#game-end')
        this.height = 600
        this.width = 500
        this.player = new Player(this.gameScreen,
            this.width,
            this.height,
            200,
            450,
            100,
            150,
            "./images/car.png")
        this.obstacles = []
        this.score = 0
        this.lives = 3
        this.gameIsOver = false
        this.gameIntervalId
        this.gameLoopFrequency = Math.round(1000 / 60)
    }

    start() {
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`

        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'

        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency)
    }

    gameLoop() {


        if (!this.gameIsOver) {
            this.update()
        } else {
            clearInterval(this.gameIntervalId)
        }

    }

    update() {
        this.player.move()

        // Check for collision and if an obstacle is still on the screen
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            // If the player's car collides with an obstacle
            if (this.player.didCollide(obstacle)) {
                // Remove the obstacle element from the DOM
                obstacle.element.remove();
                // Remove obstacle object from the array
                this.obstacles.splice(i, 1);
                // Reduce player's lives by 1
                this.lives--;
                // Update the counter variable to account for the removed obstacle
                i--;
            } // If the obstacle is off the screen (at the bottom)
            else if (obstacle.top > this.height) {
                // Increase the score by 1
                this.score++;
                // Remove the obstacle from the DOM
                obstacle.element.remove();
                // Remove obstacle object from the array
                this.obstacles.splice(i, 1);
                // Update the counter variable to account for the removed obstacle
                i--;
            }
            this.updateStats()
        }

        if (this.lives === 0) {
            this.endGame()
        }

        if (Math.random() < 0.02 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen))
        }
    }

    endGame() {

        this.gameIsOver = true
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.updateStats()
        const endScreen = document.querySelector('#game-end')
        endScreen.style.display = 'block'
        this.gameScreen.style.display = 'none'

        const restartBtn = document.querySelector('#restart-button')
        restartBtn.addEventListener('click', () => {
            this.restartGame()
        })

    }

    restartGame() {
        location.reload()
    }

    updateStats() {
        const livesCounter = document.querySelector('#lives')
        const scoreCounter = document.querySelector('#score')
        livesCounter.innerText = this.lives
        scoreCounter.innerText = this.score
    }
}