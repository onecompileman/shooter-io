class GameManager {

    constructor() {
        this.canvas = null;
        this.players = [];
        this.bullets = [];
        this.particleSystems = [];
        this.walls = [];
        this.enemies = [];
        this.score = 0;
        this.isGameOver = false;
        this.canvas = createCanvas(innerWidth, innerHeight);
        this.enemies = Array(5).fill(0).map(c => {
            return new Enemy(
                createVector(random(width), random(height)),
                createVector(0, 0),
                createVector(25, 25),
                100
            );
        });
        this.player = new Player(
            createVector(width / 2, height / 2),
            createVector(0, 0),
            createVector(30, 30),
            100,
            generateRandomId(10)
        );
        this.generateWalls();
        this.players.push(this.player);
    }

    generateWalls() {
        const wallCount = 5;
        this.walls = Array(wallCount).fill(0).map(c => {
            return new Wall(
                createVector(random(0, width), random(0, height)),
                createVector(random(30, 60), random(30, 60)),
                10
            );
        });
    }

    generateEnemies() {
        if (random() <= 0.03) {
            this.enemies.push(
                new Enemy(
                    createVector(random(width), random(height)),
                    createVector(0, 0),
                    createVector(25, 25),
                    100
                )
            );
        }
    }

    render() {
        background(32);
        if (!this.isGameOver) {
            this.player.move();
            this.generateEnemies();
            this.renderPlayers();
            this.renderBullets();
            this.renderWalls();
            this.renderParticleSystems();
            this.renderEnemies();
            this.displayScore();
        } else {
            this.displayGameOver();
        }
    }

    syncData(data) {
        this.bullets = data.bullets;
        this.players = data.players;
    }

    fire() {
        if (frameCount % 8 === 0) {
            const bulletPos = this.player.barrelPosition().pos;
            const bulletVel = this.player.barrelPosition().vel;
            bulletVel.setMag(10);
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
        let isHit = false;
        this.enemies.forEach(enemy => {
            if (enemy.isWithinDistanceRectangle(this.player) && !isHit) {
                setTimeout(() => {
                    this.isGameOver = true;
                }, 2000);
                this.enemies = this.enemies.forEach(enemy => {
                    const size = createVector(35, 35);
                    this.createParticleSystem(enemy.pos.copy(), 10, size, color(255, 40, 80));
                });
                this.enemies = [];
                isHit = true;
                const size = createVector(40, 40);
                this.createParticleSystem(this.player.pos.copy(), 50, size, color(100, 250, 80));
                this.players = [];
            }
        });
        this.players.forEach(player => {
            player.repelWallsFromPlayer(this.walls);
            player.update();
            player.render();
        });

    }

    renderWalls() {
        this.walls.forEach(wall => {
            let isHit = false;
            this.bullets = this.bullets.map(bullet => {
                if (wall.isWithinDistanceRectangle(bullet) && !isHit) {
                    bullet.life = 0;
                    const size = createVector(20, 20);
                    this.createParticleSystem(bullet.pos.copy(), 7, size, color(143, 20, 255));
                    isHit = true;
                }
                return bullet;
            })
            wall.render();
        });
    }

    renderBullets() {
        this.bullets.forEach(bullet => {
            bullet.update();
            bullet.render();
        });

        this.bullets = this.bullets.filter(bullet => !bullet.isDead());
    }

    renderEnemies() {
        this.enemies = this.enemies.map(enemy => {
            enemy.repelToNearEnemies(this.enemies);
            enemy.repelToNearEnemies(this.walls);
            let isHit = false;
            this.bullets = this.bullets.map(bullet => {
                if (enemy.isWithinDistanceCircle(bullet, 0) && !isHit) {
                    enemy.takeDamage(this.player.damage);
                    bullet.life = 0;
                    isHit = false;
                    const size = createVector(20, 20);
                    this.createParticleSystem(bullet.pos.copy(), 7, size, color(143, 20, 255));
                }
                return bullet;
            });

            enemy.follow(this.player.pos);
            enemy.update();
            enemy.render();
            return enemy;
        });

        this.enemies = this.enemies.filter(enemy => {
            if (enemy.isDead()) {
                this.score += 10;
                const size = createVector(35, 35);
                this.createParticleSystem(enemy.pos.copy(), 10, size, color(255, 40, 80));
            }
            return !enemy.isDead();
        });
    }

    createParticleSystem(pos, count, size, col) {
        this.particleSystems.push(new ParticleSystem(pos, count, size, col));
    }

    renderParticleSystems() {
        this.particleSystems.forEach(particleSystem => {
            particleSystem.render();
        });
        this.particleSystems = this.particleSystems.filter(particleSystem => !particleSystem.isDead());
    }

    displayScore() {
        push();
        fill(255);
        textSize(40);
        text(`Score: ${this.score}`, 30, 50)
        pop();
    }

    displayGameOver() {
        fill(255);
        textSize(40);
        textAlign(CENTER);
        text('Game Over \nDeveloped by: Stephen Vinuya', (width / 2) - 10, (height / 2) - 40);
    }
}