let gameManager;

function setup() {
    gameManager = new GameManager();
}

function draw() {
    gameManager.render();
    if (mouseIsPressed) {
        gameManager.fire();
    }
}