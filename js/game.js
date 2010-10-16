var url = 'http://api.powerhousemuseum.com/api/v1/item/json/?api_key=24ef7a17f5816b4&width=200'
  var url = 'http://api.powerhousemuseum.com/api/v1/multimedia/json/?api_key=24ef7a17f5816b4&flickr_id_isblank=1';
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(data){
       data.multimedia.sort(function() {
         return (Math.round(Math.random())-0.5);
       });
       var items = {};
       for (var i = 0; i < data.multimedia.length; i++) {
         var multimedia = data.multimedia[i];
         if (!multimedia.old_image) {
           var item_id = multimedia.connections[0];
           items[item_id] = multimedia.images.thumbnail.url;
         }
       }
       
       var itemNum = 0;
       var targetItemUrl;
       var distractorItemUrls = [];
       for (var itemUrl in items) {
         if (itemNum == 0) {
           targetItemUrl = items[itemUrl];
           var url = 'http://api.powerhousemuseum.com/' + itemUrl;
           $.ajax({url: url, dataType: 'jsonp', success: function(data){
             // Make array of clues
             var clues = [];
             var item = data.item;
             if (item.dimensions.width) {
               clues.push("Width: " + item.dimensions.width);
               clues.push("Height: " + item.dimensions.height);
             }
             if (item.subjects.length > 0) {
               clues.push('About: ' + item.subjects.join(','));
             }
             if (item.categories.length > 0) {
               clues.push('Categories: ' + item.categories.join(','));
             }
             if (item.provenance.length > 0) {
                clues.push('From: ' + item.provenance[0].place + ',' + item.provenance[0].date_latest);
             }
             showClues(clues);
           }});
         } else if (itemNum < 11) {
           distractorItemUrls.push(items[itemUrl]);
         } else {
           break;
         }
         itemNum++;
       }
       //playGame(targetItemUrl, distractorItemUrls);
     }
  }); 