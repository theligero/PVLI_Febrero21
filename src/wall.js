/**
 * Clase que representan los distintos tipos de muro con los que se puede topar un GameObject
 */
export default class Wall extends Phaser.GameObjects.Sprite {
  
    /**
    * Constructor de la Plataforma
    * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
    * @param {number} x Coordenada x
    * @param {number} y Coordenada y
    * @param {number} scaleX Ancho 
    * @param {number} scaleY Alto
    * @param {Phaser.GameObjects.Group} wallsGroup Grupo en el que se incluirá la base creada por la plataforma
    * @param {Player} player Jugador del juego
    */
    constructor(scene, x, y, scaleX, scaleY, wallsGroup, player) {
        super(scene, x, y, 'platform');
        this.displayWidth = scaleX;
        this.displayHeight = scaleY;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.scene.physics.add.collider(this, player);
        wallsGroup.add(this);

        // Comentar para mostrar los muros
        this.visible = true;
    }
}

