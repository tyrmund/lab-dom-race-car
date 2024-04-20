class Player {

    constructor(gameScreen, gameWidth, gameHeight, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.directionX = 0
        this.directionY = 0
        this.element = document.createElement('img')

        this.element.src = imgSrc
        this.element.style.position = 'absolute'

        this.element.style.width = `${width}px`
        this.element.style.height = `${height}px`
        this.element.style.top = `${top}px`
        this.element.style.left = `${left}px`

        this.gameScreen.appendChild(this.element)
    }

    move() {

        this.left += this.directionX
        this.top += this.directionY

        if (this.left < 10) this.left = 10
        if (this.top < 10) this.top = 10
        if (this.left > (this.gameWidth - this.width - 10)) {
            this.left = (this.gameWidth - this.width - 10)
        }
        if (this.top > (this.gameHeight - this.height - 10)) {
            this.top = (this.gameHeight - this.height - 10)
        }

        this.updatePosition()

    }

    updatePosition() {
        this.element.style.top = `${this.top}px`
        this.element.style.left = `${this.left}px`
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect()
        const obstacleRect = obstacle.element.getBoundingClientRect()

        if (playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top)
            return true
        else return false

    }

}