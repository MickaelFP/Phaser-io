class ObjectVase extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {                                                           //OBLIGATOIRE
        super(scene, x, y,"vase");                                                       //OBLIGATOIRE
        //pas de gravité
        this.body.allowGravity=true;
        
        //this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-araignee");
        this.setDisplaySize(32,32);
        this.setCollideWorldBounds(true);
        //this.setBounce(1);
        this.setVelocityX(0);
        //this.setBodySize(this.body.width-5,this.body.height);
        this.setImmovable(false);
        this.setOrigin(0,0);
        this.setBodySize(32,32)
        //object.body.allowGravity=0;
        //this.physics.add.collider(this.player, object);
        //this.physics.add.collider(this.player, this.ObjectVase);
        //this.physics.add.overlap(this.player, this.monstre, this.hitObject, null, this);

        /*let objectY=hauteurSol;
        let object=this.object.create(posX ,objectY,"vase");
        object.setDisplaySize(32,32);
        object.body.allowGravity=0;
        object.setImmovable(false);
        this.physics.add.collider(this.player, rouge);//le joueur rebondit dessus
        object.refreshBody();*/
    }
}