class Enemy extends GameObject {

    constructor(pos, vel, size, life) {
        super(pos, vel, size, life);
        this.acc = createVector(0, 0);
    }

    render() {
        push();
        rectMode(CENTER);
        translate(this.pos.x, this.pos.y);
        noStroke();
        fill(180);
        rotate(frameCount / 4);
        rect(0, 0, this.size.x, this.size.y);
        fill(color(255, 50, 50), 255);
        ellipse(0, 0, this.size.x * 0.8, this.size.y * 0.8);
        pop();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(2.2);
        super.update();
    }

    addForce(force) {
        this.acc.add(force);
    }

    follow(target) {
        const targetVelocity = target.copy().sub(this.pos);
        targetVelocity.setMag(0.5);
        this.acc = targetVelocity.copy();
    }

    repelToNearEnemies(enemies) {
        let repelled = false;
        enemies.forEach(enemy => {
            if (this.isWithinDistanceCircle(enemy, 10) && enemy.pos != this.pos && !repelled) {
                const oppositeVel = enemy.pos.copy().sub(this.pos);
                oppositeVel.mult(-1);
                oppositeVel.setMag(4);
                repelled = true;
                this.vel.add(oppositeVel);
            }
        });
    }

    repelToNearWalls(walls) {
        let repelled = false;
        walls.forEach(wall => {
            if (this.isWithinDistanceRectangle(wall) && !repelled) {
                const oppositeVel = wall.pos.copy().sub(this.pos);
                oppositeVel.mult(-1);
                oppositeVel.setMag(6);
                repelled = true;
                this.vel.add(oppositeVel);
            }
        });
    }

    isWithinDistanceCircle(target, distance) {
        return (distance + ((target.size.x / 2) + (this.size.x / 2))) >
            this.pos.dist(target.pos);
    }

    isWithinDistanceRectangle(target) {
        return (this.pos.x < target.pos.x + target.size.x &&
            this.pos.x + this.size.x > target.pos.x &&
            this.pos.y < target.pos.y + target.size.y &&
            this.pos.y + this.size.y > target.pos.y)
    }

    takeDamage(damage) {
        this.life -= damage;
    }
}