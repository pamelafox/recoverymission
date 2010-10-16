(function() {
    mgengine.initGame('easy', function(player, canvas, image) {
        var context = canvas.getContext('2d');
        
        var self = jQuery.extend(new WIW.Games.Game(canvas), {
            
        });
        
        context.drawImage(image, 0, 0);
        
        
        return self;
    });
})();