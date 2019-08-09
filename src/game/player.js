class Player extends GameObject {

    /**
     * Player's constructor
     * @param p5.Vector pos 
     * @param p5.Vector vel 
     * @param p5.Vector size 
     * @param number life 
     * @param number playerId
     */
    constructor(pos, vel, size, life, playerId) {
        super(pos, vel, size, life);
        this.speed = 4;
        this.damage = 50;
        this.playerId = playerId;
        this.lookAtVector = this.pos.copy();
    }

    render() {
        push();
        noStroke();
        ellipseMode(CENTER);
        translate(this.pos.x, this.pos.y);
        rotate(this.lookAtVector.heading() - HALF_PI);

        fill(color(80, 255, 255), 255);
        ellipse(0, 0, this.size.x, this.size.y);

        fill(color(255, 100, 50), 255);
        ellipse(0, 0, this.size.x * 0.5, this.size.y * 0.5);


        fill(200);
        rectMode(CENTER);
        rect(0, -(this.size.y / 2), 5, 10);
        pop();
        this.vel.setMag(0);
    }

    lookAt(target) {
        this.lookAtVector = this.pos.copy().sub(target);
    }

    barrelPosition() {
        const vel = this.lookAtVector.copy();
        vel.setMag(20);
        vel.mult(-1);
        const pos = this.pos.copy().add(vel);
        return {
            vel,
            pos
        };
    }

    repelWallsFromPlayer(walls) {
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

    move() {
        if (keyIsPressed) {
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
                this.vel.y = -1;
            }
            if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
                this.vel.y = 1;
            }
            if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
                this.vel.x = -1
            }
            if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                this.vel.x = 1;
            }
            this.vel.setMag(this.speed);
        }
    }

    isWithinDistanceRectangle(target) {
        return (this.pos.x < target.pos.x + target.size.x &&
            this.pos.x + this.size.x + 7 > target.pos.x &&
            this.pos.y < target.pos.y + target.size.y &&
            this.pos.y + this.size.y + 7 > target.pos.y)
    }

    setDamage(damage) {
        this.damage = damage;
    }

}