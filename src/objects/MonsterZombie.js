class MonsterZombie extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {                                                                      //OBLIGATOIRE
        super(scene, x, y,"monster-zombie");                                                       //OBLIGATOIRE
        //pas de gravité
        this.body.allowGravity=false;
        
        //this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zombie");
        this.setDisplaySize(64,64);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(30);
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
    }
}