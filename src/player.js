import Bubble from './bubble.js';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.lives = 2;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.speed = 300;

        this.setInput();
        this.setAnimation();
        this.play('player_idle');
    }

    /**
     * Método para pérdida de vidas cuando se colisiona con una
     * pompa, y si se llega a 0 vidas se llamá al fin de partida
     */
    looseLives() {
        this.lives--;
        if (this.lives == 0) {
            this.scene.finishGame();
        }
    }

    /**
     * Método de inputs para la A y la D 
     */
    setInput() {
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');
    }

    /**
     * Método para la animación básica de 3 frames 
     */
    setAnimation() {
        this.scene.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 2,
            repeat: -1 // Animación en bucle
        });
    }


    /** Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
    * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
    * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
    * @override
    */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.a.isDown) {
            this.body.setVelocityX(-this.speed);
        }

        else if (this.d.isDown) {
            this.body.setVelocityX(this.speed);
        }

        else {
            this.body.setVelocityX(0);
        }
    }
}
