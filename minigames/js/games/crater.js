(function() {
    WIW.Games.initGame('crater', function(player, canvas, image) {
        // initialise the location count
        var LOCATION_COUNT = 4,
            THUMB_SIZE = 160,
            CAVITY_WIDTH = THUMB_SIZE,
            CAVITY_HEIGHT = 60;
        
        var context = canvas.getContext('2d'),
            currentIndex = null,
            background = null,
            marker = null,
            markerPos = null,
            locations = [],
            currentX = 0,
            currentY = 0,
            displaySize = 100,
            lastLocation = 0,
            self = new WIW.Games.Game(canvas);
            
        function handleTap(pos) {
            GT.Log.info("tapped at: " + pos.x + ", " + pos.y);
            
            var goodX = (pos.x >= currentX) && (pos.x <= currentX + displaySize),
                goodY = (pos.y >= currentY) && (pos.y <= currentY + displaySize);
                
            if (goodX && goodY) {
                player.chooseArtifact(currentIndex);
            }
        } // handleTap
        
        function initLocations() {
            var halfWidth = (canvas.width - 20) / 2,
                halfHeight = (canvas.height - 20) / 2;
            
            for (var ii = 0; ii < LOCATION_COUNT; ii++) {
                var x = ~~(Math.random() * (halfWidth - CAVITY_WIDTH)),
                    y = THUMB_SIZE - CAVITY_HEIGHT + ~~(Math.random() * (halfHeight - THUMB_SIZE));
                    
                x = x + (ii % 2 === 0 ? halfWidth : 0);
                y = y + (ii > 1 ? halfHeight : 0);
                
                locations[ii] = new T5.Vector(x, y);
            } // for
            
            drawBackground();
        } // initLocations
        
        function drawBackground() {
            context.drawImage(background, 0, 0);
            
            context.fillStyle = "rgba(0, 0, 0, 0.7)";
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            for (var ii = 0; ii < locations.length; ii++) {
                context.drawImage(
                    marker, 
                    locations[ii].x, 
                    locations[ii].y,
                    CAVITY_WIDTH, 
                    CAVITY_HEIGHT);
            } // for
        } // drawBackground
        
        function showTheArtifact(tickCount, worker) {
            drawBackground();
            
            var locationIndex = ~~(Math.random() * locations.length);
            while (locationIndex === lastLocation) {
                locationIndex = ~~(Math.random() * locations.length);
            } // while
            
            currentIndex = player.getRandomArtifact();
            currentX = locations[locationIndex].x + 40;
            currentY = locations[locationIndex].y - THUMB_SIZE + 90;
                
            context.drawImage(
                player.getArtifactImage(currentIndex), 
                currentX, 
                currentY, 
                displaySize, 
                displaySize);
            
            
            /*
            context.clearRect(0, 0, canvas.width, canvas.height);
            if (marker) {
                markerPos = locations[~~(Math.random() * LOCATION_COUNT)];
                context.drawImage(marker, markerPos.x, markerPos.y);
            } // if
            */
            
            lastLocation = locationIndex;
        } // showTheCat
        
        T5.Images.load('images/whacka_bg.jpg', function(bgImage) {
            background = bgImage;
            
            T5.Images.load('images/marker_sinkhole2.png', function(markerImage) {
                marker = markerImage;
                
                initLocations();
                
                GT.Loopage.join({
                    frequency: 750,
                    execute: showTheArtifact
                });
            });
        });
        
        $('.chooser').parent().hide();
        
        GT.observable(self);
        
        T5.captureTouch(canvas, {
            observable: self
        });
        
        self.bind('tap', handleTap);
        
        return self;
    });
})();