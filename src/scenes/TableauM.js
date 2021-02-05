class TableauM extends Tableau{ 

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-zombie', 'assets/monster-zombie.png');
        this.load.image('monster-araignee', 'assets/monster-araignee.png');
        this.load.image('monster-slime', 'assets/monster-slime.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
        this.load.image('monster-loupgarou', 'assets/monster-loupgarou.png');

        //this.load.image('monster-fly2', 'assets/monster-fly2.png');

    } // FIN DE PRELOAD
    create() {
        super.create();
        //quelques étoiles
        let largeur=128*2;
        this.stars=this.physics.add.group();


        for(let posX=largeur/2;posX<largeur*3;posX+=largeur){
            this.stars.create(posX ,0,"star");
        }
        this.stars.children.iterate(function (child) {
            child.setBounce(0.3);
            child.setGravity(1);
            child.setCollideWorldBounds(true);
            child.setVelocity(10,Phaser.Math.Between(-100, 100));
            child.setMaxVelocity(0,500);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //nos monstres
        /*this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zombie");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(30);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);*/

        new MonsterFly(this,400,100);
        new MonsterZombie(this,448,408);
        new MonsterLoupgarou(this,448,448);
        new MonsterAraignee(this,448,height-140);
        new MonsterSlime(this,600,height);

    } // FIN DE CREATE

} // FIN DE LA CLASS TABLEAUM
