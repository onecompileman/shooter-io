class GameObject {

    constructor(pos, vel, size, life) {
        this.pos = pos;
        this.vel = vel;
        this.size = size;
        this.life = life;
    }

    update() {
        this.pos.add(this.vel);
    }

    isDead() {
        return this.life <= 0;
    }

}