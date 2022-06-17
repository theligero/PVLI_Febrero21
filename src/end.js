/**
 * Escena de fin de juego. Cuando se han recogido todas las estrellas, se presenta un
 * texto que indica que el juego se ha acabado.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class End extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'end' });
    }

    init(data) {
        this.didIWin = data.didIWin;
    }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   */
    create() {

        var timedEvent;

        if (this.didIWin) {
            this.add.text(425, 175,
                '¡HAS GANADO!');
        }

        else {
            this.add.text(425, 175,
                '¡HAS PERDIDO!');
        }

        this.add.text(500, 250, 'Pulsa cualquier tecla para volver a jugar')
            .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto
            .setAlign('center');  // Centramos el texto dentro del cuadro de texto

    // Añadimos el listener para cuando se haya pulsado una tecla. Es probable que no
    // lleguemos a ver el mensaje porque veníamos con una tecla pulsada del juego (al 
    // ir moviendo al jugador). Se puede mejorar añadiendo un temporizador que 
    // añada este listener pasado un segundo
        this.input.keyboard.on('keydown', function (event) {
            this.scene.start('level');
        }, this);
        // PARTE DISFUNCIONAL
        //timedEvent = this.time.delayedCall(3000, this.input.keyboard.on('keydown', function (event) {
        //    this.scene.start('menu');
        //}, this), [], this);
    }

    // NO SIRVE ME CAGO EN LOS TEMPORIZADORES
    //changeScene() {
    //    if (this.input.keyboard.on('keydown')) { this.scene.start('menu'); }
    //}
}