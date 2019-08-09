class ParticleSystem {
    constructor(pos, count, size, col, isPlayerDead = false) {
        this.particles = this.createParticles(pos, count, size, col, isPlayerDead);
        this.life = 255;
    }

    render() {
        this.life -= 5;
        this.particles.forEach(particle => {
            particle.update();
            particle.render();
        });
    }

    isDead() {
        return this.life <= 0;
    }

    createParticles(pos, count, size, col, isPlayerDead) {

        return Array(count).fill(0).map(n => {
            const vel = p5.Vector.random2D();
            if (isPlayerDead) {
                vel.mult(random(5, 10));
            } else {
                vel.mult(random(3, 6));
            }
            return new Particle(
                pos.copy(),
                vel,
                size,
                255,
                col
            );
        });
    }
}