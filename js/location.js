var locationview = function() {
   var widget = null;
   
   var makeLocation = function(locationName) {
     
      $('#location-pano').html('<a href="http://www.panoramio.com"> Panoramio - Photos of the World</a>');
      
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
      
      $('#location-bubble').html('');
      window.setTimeout(function() {
        if (locationName == 'Australia') {
          speech.say("pirate", "location-bubble" , 2, "He said 'Adios' and mentioned something about bulls!");
        }
      }, 300);
      addClue();
  };
  
  return {
    showLocation: function(locationName) {
      $('#location').show();
      makeLocation(locationName);
    }
  }
}();