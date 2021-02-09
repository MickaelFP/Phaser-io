class TableauM extends Tableau{ 

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-zombie', 'assets/monster-zombie2.png');
        this.load.image('monster-araignee', 'assets/monster-araignee.png');
        this.load.image('monster-slime', 'assets/monster-slime.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
        this.load.image('monster-loupgarou', 'assets/monster-loupgarou.png');
        this.load.image('cimetiereBackground', 'assets/CimetiereBackground.png');
        this.load.image('ground', 'assets/ground.png');

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

        let rouge=this.physics.add.sprite(0,height-64,"ground");
        rouge.setDisplaySize(width,64)//taille de l'objet
        rouge.setOrigin(0,0);//pour positionner plus facilement
        rouge.body.allowGravity=0; //la gravité n'a pas d'effet ici
        rouge.setImmovable(true); //ne bouge pas quand on rentre dedans
        this.physics.add.collider(this.player, rouge);//le joueur rebondit dessus
        this.physics.add.collider(this.stars, rouge);//les étoiles rebondissent dessus


        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'cimetiereBackground'
        );
        this.sky.setOrigin(0,0);

        //fait passer les éléments devant le ciel
        //this.platforms.setDepth(0)
        this.stars.setDepth(10)
        this.player.setDepth(10)

        //nos monstres
        /*this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zombie");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(30);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);*/

        new MonsterFly(this,400,100);
        new MonsterZombie(this,448,408-64);
        new MonsterLoupgarou(this,448,448-64);
        new MonsterAraignee(this,448,height-140-64);
        new MonsterSlime(this,600,height-64-18);

    } // FIN DE CREATE

} // FIN DE LA CLASS TABLEAUM
