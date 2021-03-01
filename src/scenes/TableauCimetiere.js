class TableauCimetiere extends Tableau{ 

    preload() 
    {

        super.preload();
        //collectibles
        this.load.image('star', 'assets/star.png');
        //plateformes
        this.load.image('platformStone', 'assets/platformStone.png');
        //monstres
        this.load.image('monster-zombie', 'assets/monster-zombie2.png');
        this.load.image('monster-araignee', 'assets/monster-araignee.png');
        this.load.image('monster-slime', 'assets/monster-slime.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
        this.load.image('monster-loupgarou', 'assets/monster-loupgarou.png');
        //decors
        this.load.image('nuitEtoile', 'assets/nuitEtoile.png');
        this.load.image('sol', 'assets/sol_4000.png');
        this.load.image('tombes', 'assets/tombes.png');
        this.load.image('barriere', 'assets/grilleCiel.png');
        //this.load.image('barriere', 'assets/barriere.png'); / image corrompue, barriere sans fond impossible !!!
        //animation de mort
        this.load.image('blood', 'assets/bloodblack.png');
        //son
        this.load.audio('AmbianceHalloween1', 'assets/Sound/Ambiance_halloween_1.mp3');

    } // FIN DE PRELOAD

    create() 
    {
        super.create();

        //on appel le(s) son(s)
        this.Halloween1 = this.sound.add('AmbianceHalloween1');
        this.Halloween1.play();

        //on définit la taille du tableau
        /*pour un défilement uniquement horizontale on définie une hauteur identique au cadre du jeu.
        Inversement pour un défilement verticale, on définie une largeur identique au cadre du jeu*/
        let largeurDuTableau=4000;
        let hauteurDuTableau=448;
        let largeur=896;
        let hauteurSol=64;
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        
        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        //quelques étoiles
        this.stars=this.physics.add.group();
        for(let posX=661;posX<largeurDuTableau;posX+=largeur)
        {
            this.stars.create(posX ,0,"star");
        }
        for(let posX=135;posX<largeurDuTableau;posX+=largeur)
        {
            this.stars.create(posX ,0,"star");
        }
        for(let posX=386;posX<largeurDuTableau;posX+=largeur)
        {
            this.stars.create(posX ,0,"star");
        }
        for(let posX=135+(386-135)/2;posX<largeurDuTableau;posX+=largeur)
        {
            this.stars.create(posX ,0,"star");
        }
        for(let posX=386+(661-386)/2;posX<largeurDuTableau;posX+=largeur)
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
        // FIN DE QUELQUES ETOILES

        //quelques plateformes
        this.platforms=this.physics.add.staticGroup();
        for(let posX=661;posX<largeurDuTableau;posX+=896){
            let plateY=295;
            let plate=this.platforms.create(posX ,plateY,"platformStone");
            plate.setDisplaySize(115,7);
            plate.refreshBody();
        }
        for(let posX=135;posX<largeurDuTableau;posX+=896){
            let platY=295;
            let plat=this.platforms.create(posX ,platY,"platformStone");
            plat.setDisplaySize(115,7);
            plat.refreshBody();
        }
        for(let posX=386;posX<largeurDuTableau;posX+=896){
            let plaY=188;
            let pla=this.platforms.create(posX ,plaY,"platformStone");
            pla.setDisplaySize(203,11);
            pla.refreshBody();
        }
        // FIN DE QUELQUES PLATEFORMES
        
        //this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.stars, this.platforms);

        //création du sol
        let rouge=this.physics.add.sprite(0,height-hauteurSol,"sol");
        rouge.setDisplaySize(largeurDuTableau,hauteurSol)//taille de l'objet
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
            'barriere'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        //this.sky.alpha=0.3;

        
        //on ajoute une deuxième couche/plan
        this.sky2=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'nuitEtoile'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.alpha=0.2; // opacité
        //this.sky2.tileScaleX=this.sky.tileScaleY=0.8;
        
        //on ajoute une troixième couche/plan
        
        
        //on ajoute une deuxième couche de ciel
        this.sky3=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'tombes'
        );
        this.sky3.setScrollFactor(0);
        this.sky3.setOrigin(0,0);
        //this.sky3.alpha=0.8;
        



        //quelques monstres 
        new MonsterLoupgarou(this,2000,448-hauteurSol);

        let limitSpawnMonster=300;
        let largeurSizeSlime=50;
        this.monstre=this.physics.add.group();
        for(let posX=386;posX<largeurDuTableau-limitSpawnMonster;posX+=largeur)
        {
            new MonsterFly(this,posX,100,"monster-fly");
        }
        for(let posX=386;posX<largeurDuTableau-limitSpawnMonster;posX+=largeur)
        {
            new MonsterZombie(this,posX,408-hauteurSol,"monster-zombie");
        }
        for(let posX=661+115+largeurSizeSlime;posX<largeurDuTableau-limitSpawnMonster;posX+=largeur)
        {
            new MonsterSlime(this,posX,height-hauteurSol-18,"monster-slime");
        }
        for(let posX=448;posX<largeurDuTableau-limitSpawnMonster;posX+=largeur)
        {
            this.MonsterAraignee = new MonsterAraignee(this,posX,height-140-hauteurSol,"monster-araignee");
            this.MonsterAraignee.setDepth(11)
        }
        // FIN DE QUELQUES MONSTRES

        //fait passer les éléments devant le ciel
        this.platforms.setDepth(10)
        this.stars.setDepth(10)
        this.player.setDepth(10)
        rouge.setDepth(10);
        this.blood.setDepth(10)
        
            
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, this.saigne, this.hitMonster, this , null, this);

    } // FIN DE CREATE

    update()
    {
        super.update();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky3.tilePositionX=this.cameras.main.scrollX;//*0.6;
        this.sky3.tilePositionY=this.cameras.main.scrollY+22;//*0.2;
        ///le deuxième plan se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.6;//*0.3+500;
        this.sky2.tilePositionY=this.cameras.main.scrollY+24;//*0.1;
        
        //le troisième plan se déplace moins vite pour accentuer l'effet
        this.sky.tilePositionX=this.cameras.main.scrollX*0.3;//0.15;
        this.sky.tilePositionY=this.cameras.main.scrollY+24;//*0.05;
        

    } // FIN DE UPDATE

} // FIN DE LA CLASSS TABLEAUCIMETIERE