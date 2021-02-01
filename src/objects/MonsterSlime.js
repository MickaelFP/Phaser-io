class MonsterSlime extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monster-slime");
        //pas de gravité
        this.body.allowGravity=false;

        //this.physics.add.sprite(300,this.sys.canvas.height-64,"monster-slime");
        this.setDisplaySize(64,64);
        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setVelocityX(0);
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
    
    }
}