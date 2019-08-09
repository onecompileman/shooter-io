class Wall {

    constructor(pos, size, life) {
        this.pos = pos;
        this.size = size;
        this.life = life;
    }

    render() {
        push();
        noStroke();
        fill(color(255, 100, 64), 192);
        rectMode(CENTER);
        translate(this.pos.x, this.pos.y);
        rect(0, 0, this.size.x, this.size.y);
        pop();
    }

    isWithinDistanceRectangle(target) {
        return (this.pos.x < target.pos.x + target.size.x &&
            this.pos.x + this.size.x > target.pos.x &&
            this.pos.y < target.pos.y + target.size.y &&
            this.pos.y + this.size.y > target.pos.y)
    }
}