/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
export default class Bubble extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de Bubble
   * @param {Sceme} scene Escena en la que aparece la estrella
   * @param {number} x coordenada x
   * @param {number} y coordenada y
   * @param {number} directionX dirección en x
   * @param {number} directionY dirección en y
   * @param {Phaser.GameObjects.Group} bubblesGroup Grupo en el que se incluirán las pompas
   */
    constructor(scene, x, y, directionX, directionY, bubblesGroup) {
        super(scene, x, y, 'star');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        bubblesGroup.add(this);
        moveTo(this.scene.player.x, this.scene.player.y);
    }

  /**
   * Redefinición del preUpdate de Phaser
   * @override
   */
  preUpdate() {
    // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    // no se podrá ejecutar la animación del sprite. 
    super.preUpdate();
    if (this.scene.physics.overlap(this.scene.player, this)) {
        // Delegamos en la escena para decidir qué hacer al 
        // haber cogido una estrella
        this.scene.player.looseLives();
        this.destroy();
    }
  }
}
