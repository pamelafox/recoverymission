(function() {
    WIW.Games.initGame('easingblinds', function(player, canvas, image) {
        var context = canvas.getContext('2d'),
            imageWidth = image.width,
            startWidth = 50;
            
        function reveal(revealWidth) {
            var procWidth = 0,
                blindIndex = 0;
            
            context.drawImage(image, 0, 0);
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            
            while (procWidth < imageWidth) {
                context.fillRect(
                    blindIndex++ * startWidth,
                    0,
                    revealWidth, 
                    canvas.height);
                    
                procWidth = procWidth + startWidth;
            } // while
        } // reveal
        
        var self = jQuery.extend(new WIW.Games.Game(canvas), {
            
        });
        
        // draw the image
        context.drawImage(image, 0, 0);
        
        var tween = T5.tweenValue(50, 0, T5.easing('quad.in'), null, 5000);
        tween.requestUpdates(function(value, complete) {
            reveal(value);
        });

        return self;
    });
})();