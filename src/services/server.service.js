class ServerService {

    constructor(gameManager) {
        this.socket = io.connect('http://localhost:3000');
        this.gameManager = gameManager;
    }

    sendData() {
        this.socket.emit('data', this.mapGameData());
    }

    getData() {
        this.socket.on('data', (data) => {
            this.gameManager.syncData(this.serializeGameData(data));
        });
    }

    serializeGameData(data) {
        const bullets = this.gameManager.bullets.map(bullet => {
            return new Bullet(
                createVector(bullet.pos.x, bullet.pos.y),
                createVector(bullet.vel.x, bullet.vel.y),
                createVector(bullet.size.x, bullet.size.y),
                bullet.life,
                bullet.playerId
            );
        });
        const players = this.gameManager.players.map(player => {
            return new Player(
                createVector(player.pos.x, player.pos.y),
                createVector(player.vel.x, player.vel.y),
                createVector(player.size.x, player.size.y),
                player.life,
                player.playerId
            );
        });
        return {
            bullets,
            players
        };
    }

    mapGameData() {
        const bullets = this.gameManager.bullets.map(bullet => {
            return {
                playerId: bullet.playerId,
                pos: {
                    x: bullet.pos.x,
                    y: bullet.pos.y
                },
                vel: {
                    x: bullet.vel.x,
                    y: bullet.vel.y
                },
                size: {
                    x: bullet.size.x,
                    y: bullet.size.y
                }
            };
        });
        const players = this.gameManager.players.map(player => {
            return {
                playerId: player.playerId,
                life: player.life,
                pos: {
                    x: player.pos.x,
                    y: player.pos.y
                },
                vel: {
                    x: player.vel.x,
                    y: player.vel.y
                },
                size: {
                    x: player.size.x,
                    y: player.size.y
                }
            };
        });
        return {
            players,
            bullets
        };
    }
}