(function() {
    WIW.Games.initGame('falling', function(player, canvas, image) {
        // initialise some constants
        var THUMB_SIZE = 160;
        
        var fallingImages = [],
            context = canvas.getContext('2d');
        
        function addFaller() {
            var newImage = {
                x: ~~(Math.random() * (canvas.width - THUMB_SIZE)),
                y: -THUMB_SIZE,
                artifact: player.getRandomArtifact()
            };
            
            var tween = T5.tweenValue(
                -THUMB_SIZE, 
                canvas.height + THUMB_SIZE, 
                T5.easing('quad.in'),
                null,
                ~~(Math.random() * 1000) + 1000);
                
            tween.requestUpdates(function(value, complete) {
                newImage.y = value;
                
                // TODO: if complete, remove
                if (complete) {
                    
                } // if
            });
            
            fallingImages.unshift(newImage);
        } // addFaller
        
        function drawFallers() {
            // context.fillStyle = '#000';
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            for (var ii = fallingImages.length; ii--; ) {
                var faller = fallingImages[ii];
                
                context.drawImage(
                    player.getArtifactImage(faller.artifact),
                    faller.x,
                    faller.y);
            } // for
        } // drawFallers
        
        function handleTap(pos) {
            var tapX = pos.x,
                tapY = pos.y;
                
            for (var ii = fallingImages.length; ii--; ) {
                var fallerX = fallingImages[ii].x,
                    fallerY = fallingImages[ii].y,
                    goodX = (tapX >= fallerX) && (tapX <= fallerX + THUMB_SIZE),
                    goodY = (tapY >= fallerY) && (tapY <= fallerY + THUMB_SIZE);
                    
                if (goodX && goodY) {
                    player.chooseArtifact(fallingImages[ii].artifact);
                } // for
            } // for
        } // handleTap
        
        GT.Loopage.join({
           frequency: 400,
           execute: addFaller 
        });
        
        GT.Loopage.join({
            frequency: 50,
            execute: drawFallers
        });

        GT.observable(self);
        
        T5.captureTouch(canvas, {
            observable: self
        });
        
        context.globalAlpha = 0.9;
        self.bind('tap', handleTap);
        
        return self;
    });
})();