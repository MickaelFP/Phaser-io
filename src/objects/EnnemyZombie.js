class EnnemyZombie extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y,) {
        super(scene, x, y, 'zombie');

	scene.add.existing(this);
    scene.physics.add.existing(this);
	scene.physics.add.collider(scene.player, this);

    //this.setOffset(0, 0);
    //this.setDisplaySize(556,612);
    //this.setCollideWorldBounds(false);
    this.body.allowGravity=false;
	this.setBounceX(0);
    //this.setGravityY(0);
    this.setVelocity(0,0);
    this.setBodySize(this.body.width,this.body.height);
    this.scale = 3;
    this.isAlive = true;

    this.anims.create({
        key: 'moving',
        frames: this.anims.generateFrameNumbers('zombie', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    }

  upd(scene){
    this.anims.play('moving', true);
    if (this.body.velocity.x > 0){this.flipX = true;}
    else{this.flipX = false;}

    if (this.body.touching.up && this.isAlive){
        scene.player.setVelocityY(-400);
        this.disableBody(true, true);
        his.isAlive = false;
    }
  }

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