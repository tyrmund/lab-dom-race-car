window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game

  function keyboardMovement(event) {

    const key = event.key
    const validInput = [
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft'
    ]

    if (validInput.includes(key)) {

      event.preventDefault()

      switch (key) {
        case "ArrowRight": {
          game.player.directionX = 1
          break
        }
        case "ArrowLeft": {
          game.player.directionX = -1
          break
        }
        case "ArrowUp": {
          game.player.directionY = -1
          break
        }
        case "ArrowDown": {
          game.player.directionY = 1
          break
        }
      }

    }

  }

  window.addEventListener('keydown', keyboardMovement)

  startButton.addEventListener("click", function () {
    startGame();
  })

  function startGame() {
    console.log("start game");
    game = new Game()
    game.start()
  }

  restartButton.addEventListener('click', () => {
    restartGame()
  })

  function restartGame() {
    location.reload()
  }

}
