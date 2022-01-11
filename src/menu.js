import Button from "./button.js";

/**
 * Menú principal del juego.
 * @extends Phaser.Scene
 */
 export default class MenuScene extends Phaser.Scene {
    /**
     * Constructor del menú
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     */

     constructor() {
         super({ key: 'menu' });
     
        }
        
   /**
    * Creación del menú 
    */
    create()
    {

        this.f = this.input.keyboard.addKey('F');

        this.f.on('down', function () {

            if (this.scale.isFullscreen)
                this.scale.stopFullscreen();
            else
                this.scale.startFullscreen();

        }, this);

		var camera = this.cameras.main;

        camera.x = 0;
        camera.y = 0;




        this.easyButton = new Button(this, 470, 270, 25, 65, 'Fácil', { fill: '#fff' });
        this.add.existing(this.easyButton);
        this.easyButton.on('pointerup', () => {
            this.scene.start('level', { bubbles: 3 });
        });

        this.normalButton = new Button(this, 470, 300, 25, 65, 'Normal', { fill: '#fff' });
        this.add.existing(this.normalButton);
        this.normalButton.on('pointerup', () => {
            this.scene.start('level', { bubbles: 6 });
        });

        this.difficultButton = new Button(this, 470, 330, 25, 65, 'Difícil', { fill: '#fff' });
        this.add.existing(this.difficultButton);
        this.difficultButton.on('pointerup', () => {
            this.scene.start('level', { bubbles: 9 });
        });
     }
}