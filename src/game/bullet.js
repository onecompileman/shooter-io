class Bullet extends GameObject {

    /**
     * Bullet constructor
     * @param p5.Vector pos 
     * @param p5.Vector vel
     * @param p5.Vector size
     * @param number life
     * @param number playerId
     */
    constructor(pos, vel, size, life, playerId) {
        super(pos, vel, size, life);
        this.playerId = playerId;
    }

    render() {
        push();
        ellipseMode(CENTER);
        translate(this.pos.x, this.pos.y);
        fill(color(80, 255, 255));
        ellipse(0, 0, this.size.x, this.size.y);
        pop();
    }

    update() {
        if (this.isOutOfBounds()) {
            this.life = 0;
        }
        super.update();

    }

    isWithinDistanceCircle(target, distance) {
        return (distance + (this.size.x / 2) + (target.x / 2)) >
            this.pos.dist(target.pos);
    }

    isOutOfBounds() {
        return (this.pos.x + this.size.x > width || this.pos.x + this.size.x < 0 ||
            this.pos.y + this.size.y > height || this.pos.y + this.size.y < 0);
    }

}