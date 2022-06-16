import Star from './star.js';
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
        this.score = 0;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.speed = 300;

        // Esta label es la UI en la que pondremos la puntuación del jugador
        this.label = this.scene.add.text(60, 60, "");
        this.setInput();
        this.lives = 2;
        this.updateLives();
    }


    /**
    * El jugador ha recogido una estrella por lo que este método añade un punto y
    * actualiza la UI con la puntuación actual.
    */

    point() {
        this.score++;
        this.updateLives();
    }

    setInput() {
        this.a = this.scene.input.keyboard.addKey('A');
        this.d = this.scene.input.keyboard.addKey('D');
    }
  

    /**Actualiza la UI con las vidas actuales */
    updateLives() {
        this.label.text = 'Vidas: ' + this.lives;
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
