(function() {
    mgengine.initGame('blinds', function(player, canvas, image) {
        var MAX_BLIND_WIDTH = 50;
        
        var context = canvas.getContext('2d'),
            imageWidth = image.width,
            blindWidth = MAX_BLIND_WIDTH;
            
        function reveal(tickCount, worker) {
            var procWidth = 0,
                blindIndex = 0;
            
            blindWidth = blindWidth - 1;
            
            context.drawImage(image, 0, 0);
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            
            while (procWidth < imageWidth) {
                context.fillRect(
                    blindIndex++ * MAX_BLIND_WIDTH,
                    0,
                    blindWidth, 
                    canvas.height);
                    
                procWidth = procWidth + MAX_BLIND_WIDTH;
            } // while
            
            if (blindWidth <= 0) {
                worker.trigger('complete');
            } // if
        } // reveal
        
        context.drawImage(image, 0, 0);
        
        GT.Loopage.join({
            frequency: 100,
            execute: reveal
        });

        return self;
    });
})();