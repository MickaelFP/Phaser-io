class MonsterAraignee extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monster-araignee");
        //pas de gravité
        this.body.allowGravity=false;

        //this.physics.add.sprite(300,this.sys.canvas.height-180,"monster-araignee");
        this.setDisplaySize(64,64);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(70);
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
    }
}