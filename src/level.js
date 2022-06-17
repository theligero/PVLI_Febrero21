import Player from './player.js';
import Wall from './wall.js';
import Bubble from './bubble.js';

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
        // this.scale.setGameSize(2000, 500); // Si no se bugueará funcionaría
        var debug = false; // Debug para ver (o no) cosas de desarrollador

        this.walls = this.add.group(); // Agrupación de muros
        this.bubblesGroup = this.add.group(); // Agrupación de pompas
        this.player = new Player(this, 500, 436); // Instancia del jugador
        this.generateBubbles(this.bubbles); // 

        // Muros que delimitan el mapa
        new Wall(this, 0, 0, 5000, 64, this.walls, this.player);
        new Wall(this, 0, 500, 5000, 64, this.walls, this.player);
        new Wall(this, 0, 0, 64, 1100, this.walls, this.player);
        new Wall(this, 2000, 0, 64, 1100, this.walls, this.player);

        // Se sigue al jugador nada más se mueve y con un offset en 'y' de 180
        this.cameras.main.startFollow(this.player, false, 1, 1, 0, 180);

        this.cameras.main.setDeadzone(500, 250); // Cuadrante (deadzone) de desplazamiento
        this.cameras.main.setBounds(0, 0, 2000, 1080); // Límites de la cámara

        if (this.cameras.main.deadzone && debug) { // Dibujo de deadzone si debug es true
            const graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
        }

        this.text = this.add.text(60, 40).setScrollFactor(0).setFontSize(25).setColor('#ffffff'); // Texto de vidas
    }

    update() {
        const cam = this.cameras.main;

        if (cam.deadzone) {
            this.text.setText([
                'Vidas: ' + this.player.lives,
            ]);
        }
    }

    /**
     * Método para la generación aleatoria de pompas a lo largo del mapa;
     * se encarga de marcar la posición en x e y, y su dirección en dichos
     * ejes.
     * @param {number} bubbles número de pompas que me llegan del menú
     */
    generateBubbles(bubbles) {
        for (var i = 0; i < bubbles; i++) {
            new Bubble(this, Phaser.Math.Between(64, 1936), Phaser.Math.Between(64, 436),
                Phaser.Math.Between(0, 1), Phaser.Math.Between(0, 1), this.bubblesGroup);
        }
    }

    /**
     * Método llamado por el jugador para terminar la partida 
     */
    finishGame() {
        this.scene.start('end');
    }
}