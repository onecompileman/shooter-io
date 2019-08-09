class Particle extends GameObject {

    constructor(pos, vel, size, life, col) {
        super(pos, vel, size, life);
        this.col = col;
    }

    render() {
        const lifePercentage = this.life / 255;
        push();
        // fill(this.col, this.life);
        stroke(this.col);
        strokeWeight(2);
        noFill();
        rectMode(CENTER);
        translate(this.pos.x, this.pos.y);
        rect(0, 0, this.size.x * lifePercentage, this.size.y * lifePercentage);
        pop();
    }

    update() {
        this.life -= 5;
        super.update();
    }
}