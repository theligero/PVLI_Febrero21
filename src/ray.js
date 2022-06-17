/**
 * Clase que representan el rayo vertical que lanza el player
 */
export default class Ray extends Phaser.GameObjects.Sprite {
  
    /**
    * Constructor de la Plataforma
    * @param {Phaser.Scene} scene Escena a la que pertenece el rayo
    * @param {number} x Coordenada x
    * @param {number} y Coordenada y
    * @param {number} scaleX Ancho 
    * @param {number} scaleY Alto
    * @param {Player} player Jugador del juego
    */
    constructor(scene, x, y, scaleX, scaleY, player) {
        super(scene, x, y, 'base');
        this.displayWidth = scaleX;
        this.displayHeight = scaleY;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.scene.physics.add.collider(this, player);

        // Comentar para no mostrar el rayo
        this.visible = true;
    }
}

