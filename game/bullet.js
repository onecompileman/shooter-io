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
        translate(this.pos.x, this.pos.y);
        fill(color(255, 255, 255));
        ellipse(0, 0, this.size.x, this.size.y);
        pop();
    }

}