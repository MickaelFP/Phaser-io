class MonsterZombie extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {                                                                      //OBLIGATOIRE
        super(scene, x, y,"zombie");                                                       //OBLIGATOIRE
        //pas de gravité
        this.body.allowGravity=false;
        
        //this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zombie");
        this.setDisplaySize(40,60);
        this.setCollideWorldBounds(true);
        //this.setBounce(1);
        this.setVelocityX(0);
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('zombie', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1,
        });
        this.anims.play('moving', true);

        // X
        this.originalX=x;
        this.minX=x-((386-135)-(115/2));
        this.maxX=x+(661-386-(115/2));
        
        // Y
        this.originalY=y;
        this.minY=y;
        this.maxY=y;
        
     // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
            targets:this,
            duration:200,
            delay:Math.random()*1000,
            
            alpha:{
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            },
            onComplete: function () {
                me.start();
             }
        })

    }

    start(){
        this.scene.tweens.add(
            {
            targets: this,
            x: 
            {
                from: this.minX,
                to:this.maxX,
                duration: 10*1500,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1,
                flipX:true,
                
            },
            y: 
            {
                from: this.minY,
                to:this.maxY,
                duration: 500,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });
    }
}