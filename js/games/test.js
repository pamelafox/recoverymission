(function() {
    mgengine.initGame('test', function(player, canvas, image) {
        var context = canvas.getContext('2d');
        
        var self = jQuery.extend(new WIW.Games.Game(canvas), {
            
        });
        
        context.fillStyle = '#FF0000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        
        
        return self;
    });
})();