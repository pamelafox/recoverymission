var locationview = function() {
   var widget = null;
   
   var makeLocation = function(locationName) {
     
      var $panodev = $('<div>')
        .attr('id', 'location-pano')
        .html('<a href="http://www.panoramio.com"> Panoramio - Photos of the World</a>');
      $('#location').append($panodev);
      
      var options = {
         'width': $('#location').width(),
         'height': $('#location').height()
      };
      var request = {
         'tag': locationName
      };
      widget = new panoramio.PhotoWidget('location-pano', request, options);
      widget.setPosition(0);
      widget.enableNextArrow(false);
      widget.enablePreviousArrow(false);
  };
  
  return {
    showLocation: function(locationName) {
      $('#location').show();
      makeLocation(locationName);
    }
  }
}();