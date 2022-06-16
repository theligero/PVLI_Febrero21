import Platform from './platform.js';
import Player from './player.js';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {

    /** 
     *  Constructor de la escena 
     */
    constructor() {
        super({ key: 'level' });
    }

    /**
     * Paso de parámetros desde la primera escena a ésta
     * @param {any} data Los datos recibidos del menú
     */
    init(data) {
        this.bubbles = data.bubbles;
    }


    /** 
     *  Creación de los elementos de la escena principal de juego 
     */
    create() {
        this.bases = this.add.group();
        this.player = new Player(this, 500, 436);

        // Suelo
        new Platform(this, this.player, this.bases, 128, 500);
        new Platform(this, this.player, this.bases, 384, 500);
        new Platform(this, this.player, this.bases, 640, 500);
        new Platform(this, this.player, this.bases, 896, 500);

        // Paredes
        new Platform(this, this.player, this.bases, 0, 158).setAngle(90);
        new Platform(this, this.player, this.bases, 0, 341).setAngle(90);

        // Techo
        new Platform(this, this.player, this.bases, 128, 0);
        new Platform(this, this.player, this.bases, 384, 0);
        new Platform(this, this.player, this.bases, 640, 0);
        new Platform(this, this.player, this.bases, 896, 0);

        var camera = this.cameras.main;

        /*camera.x = this.player.x;*/
    }

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */
  starPickt (base) {
    this.player.point();
      if (this.player.score == this.stars) {
        this.scene.start('end');
      }
      else {
        let s = this.bases.children.entries;
        this.spawn(s.filter(o => o !== base));
      }
  }
}