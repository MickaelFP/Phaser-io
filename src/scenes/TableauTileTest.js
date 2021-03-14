class TableauTileTest extends Tableau{ 

    preload() 
    {

        super.preload();

        /*
        //// IMAGES ////
        //collectibles
        this.load.image('star', 'assets/star.png');
        //plateformes
        this.load.image('platformStone', 'assets/platformStone.png');
        //this.load.image('tiles', 'assets/tilemaps/tableauTiledTileset.png');
        //monstres
        this.load.image('monster-araignee', 'assets/monster-araignee.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
        //objects
        this.load.image('vase', 'assets/Object/vase1.png');
        //this.load.image('spike', 'assets/images/spike.png');
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
        //this.load.image('background', 'assets/Info2D_FLAESCH-PERREAU_Mickael_platformer2.png');
        //this.load.image('background', 'assets/sky_nuit2.png');
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

        //// TILEMAPS ////
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tableauTiledTest14x7.json');
        */

        //this.load.image('background', 'assets/tilemaps/images/background.png');
        this.load.image('spike', 'assets/tilemaps/images/spike.png');
        // At last image must be loaded with its JSON
        this.load.atlas('player2', 'assets/tilemaps/images/kenney_player.png','assets/tilemaps/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilemaps/tilesets/platformPack_tilesheet.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');

    }// FIN DE PELOAD

    create() 
    {
        super.create();

        /*
        //on appel le(s) son(s)
        this.Halloween1 = this.sound.add('AmbianceHalloween1');
        this.Halloween1.play();
        */

        //on construit la tilemap
        //const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
        //backgroundImage.setScale(2, 0.8);
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');
        const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
        //platforms.setCollisionByExclusion(-1, true);

        /*
        //fait passer les éléments devant le ciel
        this.platforms.setDepth(10)
        this.stars.setDepth(10)
        this.player.setDepth(10)
        //this.backgroundImage.setDepth(10)
        */
    }
}

