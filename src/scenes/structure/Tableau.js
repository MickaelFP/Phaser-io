/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        this.load.image('sky', 'assets/skyNuit.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.image('blood', 'assets/bloodblack.png');
        this.load.image('osExplosion', 'assets/persoMort.png');
        this.load.audio('os', 'assets/Sound/os_sound.mp3');
        this.load.audio('splash', 'assets/Sound/splash.mp3');
        this.load.audio('crack', 'assets/Sound/crack.mp3');
        // this.load.spritesheet('corbeau', 'assets/annimations.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('player',
            'assets/player.png',
            { frameWidth: 32, frameHeight: 48  }  //default(32,48)
        );
    }
    create(){
        Tableau.current=this;
        this.sys.scene.scale.lockOrientation("landscape")
        console.log("On est sur "+this.constructor.name+" / "+this.scene.key);
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0,0);
        this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0);
        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this,0,0);
        
        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood")
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

        this.blood2=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"osExplosion")
        this.blood2.displayWidth=64;
        this.blood2.displayHeight=64;
        this.blood2.visible=false

    }
    update()
    {
        super.update();
        this.player.move();
    }

    // on définit une animation de destruction de monstre
    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    saigne(object,onComplete)
    {
        let me=this;
        me.blood.visible=true;
        me.blood.rotation = Phaser.Math.Between(0,6);
        me.blood.x=object.x;
        me.blood.y=object.y;
        me.tweens.add(
            {
            targets:me.blood,
            duration:200,
            displayHeight:
            {
                from:40,
                to:70,
            },
            displayWidth:
            {
                from:40,
                to:70,
            },
            onComplete: function () 
            {
                me.blood.visible=false;
                onComplete();
            }
        })
    } // FIN DE SAIGNE

    // on définit une animation de destruction du joueur
    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    saignePlayer(object,onComplete)
    {
        let me=this;
        me.blood2.visible=true;
        me.blood2.rotation = Phaser.Math.Between(0,6);
        me.blood2.x=object.x;
        me.blood2.y=object.y;
        me.tweens.add(
            {
            targets:me.blood2,
            duration:200,
            displayHeight:
            {
                from:40,
                to:70,
            },
            displayWidth:
            {
                from:40,
                to:70,
            },
            onComplete: function () 
            {
                me.blood2.visible=false;
                onComplete();
            }
        })
    } // FIN DE SAIGNEPLAYER

    ramasserEtoile (player, star)
    {
        star.disableBody(true, true);
        ui.gagne();
        this.music = this.sound.add('os');

        var musicConfig = 
        {
            mute: false,
            volume: 0.3,
            rate : 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay:0,
        }
        this.music.play(musicConfig);

        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        let totalActive=0;
        for(let child of this.children.getChildren())
        {
            if(child.texture && child.texture.key==="star"){
                if(child.active){
                    totalActive++;
                }
            }
        }
        if(totalActive===0)
        {
            this.win();
        }
        /*
        // this.stars est un groupe (plus tard)
        if (this.stars.countActive(true) === 0)
        {
           this.win();
        }
         */
    }
    
    /**
     * Aïeee ça fait mal
     * @param player
     * @param spike
     */
    // on définit une fonction de destruction
    hitSpike (player, spike)
    {

        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.restart();

    } // FIN DE HITSPIKE

    // on définit qui meurt, quand et pourquoi
    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
    hitMonster(player, monster)
    {
        let me=this;
        if(monster.isDead !== true)
        { //si notre monstre n'est pas déjà mort
            if(
                // si le player descend
                player.body.velocity.y > 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top+30

            ){
                ui.gagne();
                monster.isDead=true; //ok le monstre est mort
                monster.visible=false;
                monster.disableBody(true, true);
                this.saigne(monster,function()
                {
                    //à la fin de la petite anim...ben il se passe rien :)
                })
                this.music = this.sound.add('splash');

                var musicConfig = 
                {
                    mute: false,
                    volume: 0.3,
                    rate : 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay:0,
                }
                this.music.play(musicConfig);
                //notre joueur rebondit sur le monstre
                player.directionY=500;
            }else{
                //le joueur est mort
                if(!me.player.isDead)
                {
                    me.player.isDead=true;
                    me.player.visible=false;
                    //ça saigne...
                    me.saignePlayer(me.player,function()
                    {
                        //à la fin de la petite anim, on relance le jeu
                        me.blood2.visible=false;
                        me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                    })
                    this.music = this.sound.add('crack');

                    var musicConfig = 
                    {
                        mute: false,
                        volume: 0.3,
                        rate : 1,
                        detune: 0,
                        seek: 0,
                        loop: false,
                        delay:0,
                    }
                    this.music.play(musicConfig);
                }
            }
        }
    } // FIN DE HITMONSTER

    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy()
    {

        this.player.stop();
        this.scene.stop();

    } // FIN DE DESTROY

    /**
     * Quand on a gagné
     */
    // on définit ce qui se passe en cas de victoire
    win()
    {

        Tableau.suivant();

    } // FIN DE WIN

    /**
     * Va au tableau suivant
     */
    static suivant()
    {
        let ceSeraLaSuivante=false;
        let nextScene=null;
        if(Tableau.current)
        {
            for(let sc of game.scene.scenes)
            {
                if(sc.scene.key !== "ui")
                {
                    if(!nextScene)
                    {
                        if(ceSeraLaSuivante)
                        {
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key)
                        {
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene)
        {
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau)
    {
        if(Tableau.current)
        {
            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }


}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;