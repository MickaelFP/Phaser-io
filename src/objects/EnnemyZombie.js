class EnnemyZombie extends ObjetEnnemi{

    constructor(scene, x, y,) {
        super(scene, x, y, 'zombie');

		//scene.add.existing(this);
        //scene.physics.add.existing(this);
		//scene.physics.add.collider(scene.player, this);
        this.body.allowGravity=false;

        //this.setOffset(0, 0);
        this.setCollideWorldBounds(true);
	    this.setBounceX(1);
        this.setDisplaySize(40,60);
        //this.setGravityY(5000)
        this.setVelocity(-45,0);
        this.setBodySize(this.body.width-10,this.body.height-5);
        //this.setFlipX(false);

        //this.scale = 3;
        //this.isAlive = true;

        
        this.anims.create({
        key: 'moving',
        frames: this.anims.generateFrameNumbers('zombie', { start: 2, end: 3 }),
        frameRate: 2,
        repeat: -1,
        flipX: true,
        });

        this.anims.play('moving', true);
        
        /*
        if (this.body.velocity.x < 0)
        {
            if (this.flipX == true)
            {
                this.flipX = false;
            }
            
            if (this.flipX == false)
            {
                this.flipX = true;
            }
            
        }
        else if (this.body.velocity.x > 0)
        {
            if (this.flipX == true)
            {
                this.flipX = false;
                setFlipX = true;
            }
            if (this.flipX == false)
            {
                this.flipX = true;
                setFlipX = false;
            }
        }
        */
       /*
        if (this.body.velocity.x < 0)
        {
            this.flipX = true;
        }
        else if (this.body.velocity.x > 0)
        {
            this.flipX = true;
        }
        */


  

    }
    update()
    {
        if(this.body.velocity.x > 0)
        {
            this.setFlip(true, false);
        }
        else {
            this.setFlip(false, false);
        }
    }
    /*
    upd(scene){


    
        // Player kill Ennemy
        if (this.body.touching.up && this.isAlive){
        //scene.player.setVelocityY(-400);
        this.disableBody(true, true);
        this.isAlive = false;
        }
        // Ennemy kill Player
        if ((this.body.touching.right && (scene.player.body.touching.right || scene.player.body.touching.left))
        || (this.body.touching.left && (scene.player.body.touching.right || scene.player.body.touching.left))
        && this.isAlive){
        scene.restart();
        }
    }
    */

}






/*
//quelques gifs
//corbeaux
this.gifs=this.physics.add.staticGroup();
//let randomVariable1 = Math.random();
//let randomVariable1 = Phaser.Math.Between(100, 400);
for(let posX = 400 ;posX<largeurDuTableau;posX+=400){
    let corbeauxY=295;
    let corbeaux=this.gifs.create(posX ,corbeauxY,"corbeau");
    //corbeaux.setDisplaySize(556,hauteurDuTableau);
    //corbeaux.refreshBody();
    }
// FIN DE QUELQUES GIFS
*/