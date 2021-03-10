class Cemetery extends Tableau{ 

    preload() 
    {

        super.preload();
        //// IMAGES ////
        //collectibles
        this.load.image('star', 'assets/star.png');
        //plateformes
        this.load.image('platformStone', 'assets/platformStone.png');
        //monstres
        this.load.image('monster-araignee', 'assets/monster-araignee.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
        //objects
        this.load.image('vase', 'assets/Object/vase1.png');
        //backgrounds
        this.load.image('nuitEtoile', 'assets/sky_nuit2.png');
        this.load.image('sol', 'assets/sol_4000.png');
        this.load.image('solFond2', 'assets/Sol_fond2.png');
        this.load.image('tombes', 'assets/tombes2.png');
        this.load.image('grilleHerbe', 'assets/grilleHerbe.png');
        this.load.image('colines', 'assets/colines.png');
        this.load.image('ombresTombes', 'assets/ombresTombes.png');
        this.load.image('chateauLoin', 'assets/chateauLoin.png');
        this.load.image('chateauCiel', 'assets/CielChateau.png');
        this.load.image('tombesGrille', 'assets/tombes_grille.png');
        //animations de mort
        this.load.image('blood', 'assets/bloodblack.png');
        this.load.image('osExplosion', 'assets/persoMort.png');

        //// SONS ////
        this.load.audio('AmbianceHalloween1', 'assets/Sound/Ambiance_halloween_1.mp3');

        //// GIFS ////
        //this.load.gif('corbeau', 'assets/animations/animationCorbeau2.gif');

        //// SPRITESHEET////
        this.load.spritesheet('zombie', 'assets/Spritesheet/zombie1.png', { frameWidth: 32, frameHeight: 48 } );
        this.load.spritesheet('zombie2', 'assets/Spritesheet/zombie2.png', { frameWidth: 32, frameHeight: 48 } );

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
        let randomVariable1 = Phaser.Math.Between(100, 400);
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
        // on active leurs colisions avec les éléments que l'on souhaite
        this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        //this.physics.add.collider(this.EnnemyZombie, this.platforms);
        // FIN DE QUELQUES PLATEFORMES        

        //création du sol
        let rouge=this.physics.add.sprite(0,height-hauteurSol);//,"sol");
        rouge.setDisplaySize(largeurDuTableau,hauteurSol);//taille de l'objet
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
            'nuitEtoile'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0); //fait en sorte que le ciel ne suive pas la caméra
        //this.sky.alpha=0.5; // opacité
        //this.sky2.tileScaleX=this.sky.tileScaleY=0.8;

        this.sky2=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'nuitEtoile'
        );
        this.sky2.setOrigin(0,0);
        this.sky2.setScrollFactor(0);
        this.sky2.alpha=0.1; 

        this.sky3=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'chateauLoin'
        );
        this.sky3.setScrollFactor(0);
        this.sky3.setOrigin(0,0);
        
        this.sky4=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'colines'
        );
        this.sky4.setScrollFactor(0);
        this.sky4.setOrigin(0,0);
        
        this.sky5=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'grilleHerbe'
        );
        this.sky5.setScrollFactor(0);
        this.sky5.setOrigin(0,0);
        
        this.sky6=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'tombes'
        );
        this.sky6.setScrollFactor(0);
        this.sky6.setOrigin(0,0);
       
        this.sky7=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'solFond2'
        );
        this.sky7.setScrollFactor(0);
        this.sky7.setOrigin(0,0);
        
        this.sky8=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'ombresTombes'
        );
        this.sky8.setScrollFactor(0);
        this.sky8.setOrigin(0,0);  

        //quelques monstres 

        let limitSpawnMonster=300;
        this.monstre=this.physics.add.group();
        for(let posX=386;posX<largeurDuTableau-limitSpawnMonster;posX+=largeur)
        {
            new MonsterFly(this,posX,100,"monster-fly");
        }
        for(let posX=386;posX<largeurDuTableau-limitSpawnMonster;posX+=largeur)
        {
            this.monsterZombie = new MonsterZombie(this,posX,420-hauteurSol,'zombie2');
            //this.physics.add.collider(this.EnnemyZombie, rouge);
        }
        // FIN DE QUELQUES MONSTRES

        
         /*       //// création d'objets ////
        //this.platforms=this.physics.add.staticGroup();
        for(let posX=135;posX<largeurDuTableau;posX+=largeur)
        {
            this.ObjectVase = new ObjectVase(this,posX,432-hauteurSol-32,'vase');
            this.physics.add.collider(rouge, this.ObjectVase);
            //this.physics.add.collider(this.player, this.ObjectVase);
        }*/

        //fait passer les éléments devant le ciel
        this.platforms.setDepth(10)
        this.stars.setDepth(10)
        this.player.setDepth(10)
        rouge.setDepth(10)
        //this.ObjectVase.setDepth(10)
        this.blood.setDepth(10)
        this.blood2.setDepth(10)
        //this.ObjectVase.setDepth(10)
        this.sky8.setDepth(12)
        
            
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, this.saigne, this.hitMonster, this , null, this);

    } // FIN DE CREATE

    update()
    {
        super.update();
        //Zombie.update();

        //le ciel et les étoiles
        this.sky.tilePositionX=this.cameras.main.scrollX*0.02;//*0.3//0.15;
        this.sky.tilePositionY=this.cameras.main.scrollY+22;//+24//*0.05;

        //le ciel et les étoiles2
        this.sky2.tilePositionX=this.cameras.main.scrollX*0;//*0.3//0.15;
        this.sky2.tilePositionY=this.cameras.main.scrollY+22;//+24//*0.05;
        
        
        ///le chateau sur la coline
        this.sky3.tilePositionX=this.cameras.main.scrollX*0.1;//*0.6//*0.3+500;
        this.sky3.tilePositionY=this.cameras.main.scrollY+22;//+24//*0.1;
        
        
        //les colines
        this.sky4.tilePositionX=this.cameras.main.scrollX*0.6;//*0.3//*0.6;
        this.sky4.tilePositionY=this.cameras.main.scrollY+22;//+22//*0.2;
        
        
        //la grille avec herbes
        this.sky5.tilePositionX=this.cameras.main.scrollX*0.8;//*0.6//0.15;
        this.sky5.tilePositionY=this.cameras.main.scrollY+22;//+0//*0.05;
        
        
        //les tombes
        this.sky6.tilePositionX=this.cameras.main.scrollX;//*0.6//0.15;
        this.sky6.tilePositionY=this.cameras.main.scrollY+22;//+0//*0.05;
        
        
        //le sol
        this.sky7.tilePositionX=this.cameras.main.scrollX*1.1;//*0.6//0.15;
        this.sky7.tilePositionY=this.cameras.main.scrollY;//+0//*0.05;
        
        
        //les ombres devant
        this.sky8.tilePositionX=this.cameras.main.scrollX*1.3;//*0.6//0.15;
        this.sky8.tilePositionY=this.cameras.main.scrollY;//+0//*0.05;
        

    } // FIN DE UPDATE

} // FIN DE LA CLASSS CEMETERY
