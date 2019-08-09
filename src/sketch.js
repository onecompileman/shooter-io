let gameManager;
let socket;
let serverService;

function setup() {
    gameManager = new GameManager();
    // serverService = new ServerService(gameManager);
    // serverService.getData();
}

function draw() {
    // serverService.sendData();
    gameManager.render();
    if (mouseIsPressed) {
        gameManager.fire();
    }
}