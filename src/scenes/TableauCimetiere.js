class TableauCimetiere extends Tableau{ 

    preload() 
    {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-zombie', 'assets/monster-zombie2.png');
        this.load.image('monster-araignee', 'assets/monster-araignee.png');
        this.load.image('monster-slime', 'assets/monster-slime.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
        this.load.image('monster-loupgarou', 'assets/monster-loupgarou.png');
        this.load.image('cimetiereBackground', 'assets/CimetiereBackground.png');
        this.load.image('skyNuit', 'assets/sky_nuit.png');
        this.load.image('sol', 'assets/sol.png');
        this.load.image('platformStone', 'assets/platformStone.png');

        //this.load.image('monster-fly2', 'assets/monster-fly2.png');

    } // FIN DE PRELOAD
    create() 
    {
        super.create();

        //on définit la taille du tableau
        let largeurDuTableau=4000;
        let hauteurDuTableau=448; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        
        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        
        //quelques étoiles
        let largeur=128;
        this.stars=this.physics.add.group();
        for(let posX=largeur/2;posX<largeur*32;posX+=largeur)
        {
            this.stars.create(posX ,0,"star");
        }
        this.stars.children.iterate(function (child) 
        {
            child.setBounce(0.3);
            child.setGravity(1);
            child.setCollideWorldBounds(true);
            child.setVelocity(10,Phaser.Math.Between(-100, 100));
            child.setMaxVelocity(0,500);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        
        /* CREER DES PLATFORMES
        //des plateformes
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'platformStone').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'platformStone');
        this.platforms.create(50, 250, 'platformStone');
        this.physics.add.collider(this.player, this.platforms);
        
        //les étoiles rebondissent sur les plateformes
        this.physics.add.collider(this.platforms, this.stars);
        */

        //quelques plateformes
        this.platforms=this.physics.add.staticGroup();
        for(let posX=661;posX<largeurDuTableau;posX+=896){
            let plateY=295;
            let plate=this.platforms.create(posX ,plateY,"platformStone");
            plate.setDisplaySize(115,7);
            plate.refreshBody();
        }
        
        //this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.stars, this.platforms);

        /* CREER DES PLATFORMES ET DES ETOILES
        //quelques étoiles et plateformes qui vont avec
        this.stars=this.physics.add.group();
        this.platforms=this.physics.add.staticGroup();
        for(let posX=20;posX<largeurDuTableau;posX+=100){
            let etoileY=350+Math.sin(posX)*100;
            let star=this.stars.create(posX ,etoileY,"star");
            star.body.allowGravity=false;
            let plate=this.platforms.create(posX ,etoileY+50,"ground");
            plate.setDisplaySize(60,10);
            plate.refreshBody();
        }
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.player,this.platforms);
        */
        

        //création du sol
        let rouge=this.physics.add.sprite(0,height-64,"sol");
        rouge.setDisplaySize(largeurDuTableau,64)//taille de l'objet
        rouge.setOrigin(0,0);//pour positionner plus facilement
        rouge.body.allowGravity=0; //la gravité n'a pas d'effet ici
        rouge.setImmovable(true); //ne bouge pas quand on rentre dedans
        this.physics.add.collider(this.player, rouge);//le joueur rebondit dessus
        this.physics.add.collider(this.stars, rouge);//les étoiles rebondissent dessus


        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'cimetiereBackground'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra

        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'skyNuit'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.alpha=0.2;
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;

        //fait passer les éléments devant le ciel
        this.platforms.setDepth(10)
        this.stars.setDepth(10)
        this.player.setDepth(10)
        rouge.setDepth(10);

        new MonsterFly(this,400,100);
        new MonsterZombie(this,448,408-64);
        new MonsterLoupgarou(this,2000,448-64);
        new MonsterAraignee(this,448,height-140-64);
        new MonsterSlime(this,600,height-64-18);

    } // FIN DE CREATE

    update()
    {
        super.update();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX;//*0.6;
        this.sky.tilePositionY=this.cameras.main.scrollY;//*0.2;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.3+500;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.1+30;

    } // FIN DE UPDATE

} // FIN DE LA CLASSS TABLEAUCIMETIERE