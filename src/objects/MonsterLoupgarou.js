
class MonsterLoupgarou extends ObjetEnnemi
{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) 
    {                                                                      //OBLIGATOIRE
        super(scene, x, y, "monster-loupgarou");                                                       //OBLIGATOIRE
        //pas de gravité
        this.body.allowGravity=false;
        
        //this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zombie");
        this.setDisplaySize(55,55);
        this.setCollideWorldBounds(true);
        //this.setBounce(1);
        this.setVelocityX(0);
        this.setBodySize(this.body.width-20,this.body.height);
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        // X
        this.originalX=x;
        this.minX=x-1900;
        this.maxX=x+1900;
        
        // Y
        this.originalY=y;
        this.minY=y-28;
        this.maxY=y-33;
        
        // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add(
        {
            targets:this,
            duration:200,
            delay:Math.random()*1000,
            
            alpha:
            {
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            },
            onComplete: function() 
            {
                me.start();
            }
        })

    } // FIN DU CONSTRUCTOR

    start()
    {
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
    } // FIN DE START

} // FIN DE LA CLASSE MONSTERLOUPGAROU