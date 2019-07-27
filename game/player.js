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
        this.playerId = playerId;
        this.lookAtVector = this.pos.copy();
    }

    render() {
        push();
        fill(color(255, 100, 100));
        translate(this.pos.x, this.pos.y);
        rotate(this.lookAtVector.heading() - HALF_PI);
        ellipseMode(CENTER);
        ellipse(0, 0, this.size.x, this.size.y);

        fill(200);
        rectMode(CENTER);
        rect(0, -(this.size.y / 2), 5, 20);
        pop();
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

}