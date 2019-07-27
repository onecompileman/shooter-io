class GameManager {

    constructor() {
        this.canvas = null;
        this.players = [];
        this.bullets = [];
        this.canvas = createCanvas(innerWidth, innerHeight);
        this.player = new Player(
            createVector(width / 2, height / 2),
            createVector(0, 0),
            createVector(40, 40),
            100,
            generateRandomId(10)
        );
        this.players.push(this.player);
    }
    render() {
        background(0);
        this.renderPlayers();
        this.renderBullets();
    }

    fire() {
        if (frameCount % 10 === 0) {
            const bulletPos = this.player.barrelPosition().pos;
            const bulletVel = this.player.barrelPosition().vel;
            bulletVel.setMag(5);
            this.bullets.push(
                new Bullet(
                    bulletPos,
                    bulletVel,
                    createVector(8, 8),
                    100,
                    this.player.playerId
                )
            );
        }
    }

    renderPlayers() {
        this.player.lookAt(createVector(mouseX, mouseY));
        this.players.forEach(player => {
            player.update();
            player.render();
        });
    }

    renderBullets() {
        this.bullets.forEach(bullet => {
            bullet.update();
            bullet.render();
        });
    }
}