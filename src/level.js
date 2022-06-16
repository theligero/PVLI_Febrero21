import Player from './player.js';
import Wall from './wall.js';

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
        // this.scale.setGameSize(2000, 500);
        var debug = false;

        this.lives = 2;
        this.bases = this.add.group(); // Agrupación de muros
        this.player = new Player(this, 500, 436);

        // Muros que delimitan el mapa
        new Wall(this, 0, 0, 5000, 64, this.bases, this.player);
        new Wall(this, 0, 500, 5000, 64, this.bases, this.player);
        new Wall(this, 0, 0, 64, 1100, this.bases, this.player);
        new Wall(this, 2000, 0, 64, 1100, this.bases, this.player);

        // Se sigue al jugador nada más se mueve y con un offset en 'y' de 180
        this.cameras.main.startFollow(this.player, false, 1, 1, 0, 180);

        this.cameras.main.setDeadzone(500, 250);
        this.cameras.main.setBounds(0, 0, 2000, 1080);

        if (this.cameras.main.deadzone && debug) {
            const graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
        }

        this.text = this.add.text(60, 40).setScrollFactor(0).setFontSize(25).setColor('#ffffff');
    }

    update() {
        const cam = this.cameras.main;

        if (cam.deadzone) {
            this.text.setText([
                'Vidas: ' + this.lives,
            ]);
        }
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