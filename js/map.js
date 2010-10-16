var mapview = function() {
  var map = null, centerbox = null;

  var CenterBox = function(mapDiv) {
    var mapWidth = mapDiv.offsetWidth;
    var mapHeight = mapDiv.offsetHeight;
    var boxWidth = 400;
    var boxHeight = Math.round(mapHeight * .80);
    var boxLeft = Math.round((mapWidth - boxWidth)/2) - 90;
    var boxTop = Math.round((mapHeight - boxHeight)/2);

    var centerDiv = document.createElement('div');
    centerDiv.className = 'centerbox';
    centerDiv.style.height = boxHeight + 'px';
    centerDiv.style.width = boxWidth + 'px';
    centerDiv.style.marginLeft = boxLeft + 'px';
    centerDiv.style.marginTop = boxTop + 'px';
    centerDiv.style.display = 'none';

    var headerDiv = document.createElement('div');
    headerDiv.style.fontSize = 'larger';
    headerDiv.style.fontWeight = 'bold';
    headerDiv.style.cssFloat = 'left';
    headerDiv.style.paddingTop = '5px';
    headerDiv.style.paddingLeft = '5px';
    centerDiv.appendChild(headerDiv);

    var topDiv = document.createElement('div');
    topDiv.style.cssFloat = 'right';
    var closeImg = document.createElement('img');
    closeImg.style.cursor = 'pointer';
    closeImg.style.marginTop = '0px';
    closeImg.src = 'http://gmaps-samples.googlecode.com/svn/trunk/images/closebigger.gif';
    topDiv.appendChild(closeImg);
    centerDiv.appendChild(topDiv);

    google.maps.event.addDomListener(closeImg, 'click', function() {
      centerDiv.style.display = 'none';
    });

    var contentDiv = document.createElement('div');
    contentDiv.style.backgroundColor = 'white';
    contentDiv.style.height = (boxHeight - 35) + 'px';
    contentDiv.style.overflowX = 'hidden';
    contentDiv.style.overflowY = 'auto';
    contentDiv.style.clear = 'both';
    contentDiv.style.paddingTop = '5px';
    contentDiv.style.paddingLeft = '5px';
    contentDiv.style.paddingRight = '5px';
    contentDiv.style.wordWrap = 'break-word';
    centerDiv.appendChild(contentDiv);

    this.div_ = centerDiv;
    this.contentDiv_ = contentDiv;
    this.headerDiv_ = headerDiv;
  };

  CenterBox.prototype.getDiv = function() {
    return this.div_;
  }

  CenterBox.prototype.setContent = function(content) {
    this.contentDiv_.innerHTML = '';
    if (content instanceof Element) {
      this.contentDiv_.appendChild(content);
    } else {
      this.contentDiv_.innerHTML = content;
    }
  }

  CenterBox.prototype.setHeader = function(header) {
    this.headerDiv_.innerHTML = header;
  }

  CenterBox.prototype.scrollTo = function(id) {
    this.contentDiv_.scrollTop = 0;
    var targetDiv = document.getElementById(id);
    var me = this;
    window.setTimeout(function() {
      if (targetDiv.offsetTop > 32) {
        me.contentDiv_.scrollTop = (targetDiv.offsetTop - 32);
      }
    }, 100);
  }


  CenterBox.prototype.show = function() {
    this.div_.style.display = 'block';

    var stopEvent = function(e) {
      e.cancelBubble = true;
      e.stopPropagation && e.stopPropagation();
    };
    google.maps.event.addDomListener(this.contentDiv_, 'mousewheel', stopEvent);
    google.maps.event.addDomListener(this.contentDiv_, 'DOMMouseScroll', stopEvent);
  }

  CenterBox.prototype.hide = function() {
    this.div_.style.display = 'none';
  }

  function makeMap() {
    var myLatlng = new google.maps.LatLng(40.65, -73.95);
    var myOptions = {
      zoom: 3,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
   
    map = new google.maps.Map(
        document.getElementById('map'),
        myOptions);
        
        
    centerbox = new CenterBox(document.getElementById('map'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerbox.getDiv());
    
    for (var countryCode in countries) {
      makeMarker(countryCode);
    }
  }

  function makeMarker(countryCode) {
    var countryData = countries[countryCode];
    var position = new google.maps.LatLng(countryData.center[0], countryData.center[1]);
    var title = countryData.name;
    
    var image = new google.maps.MarkerImage('http://chart.apis.google.com/chart?cht=it&chs=20x20&chco=FF0000,000000ff,ffffff01&chl=' + countryCode + '&chx=000000,0&chf=bg,s,00000000&ext=.png',
        new google.maps.Size(20, 20),
        new google.maps.Point(0,0),
        new google.maps.Point(0, 10));
        
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      icon: image,
      map: map
    });
    
    google.maps.event.addListener(marker, 'click', function() {
      map.setCenter(position);
      centerbox.setHeader(title);
      
      var $div = $('<div>');
      
      var url = 'http://ws.geonames.org/wikipediaSearchJSON?q=' + title + '&maxRows=1';
      
      $.getJSON(url, function(data){
        var result = data.geonames[0];
        $div.html('<p><img width="100" height="75" src="' + result.thumbnailImg + '"></p>' + '<p>' + result.summary + '</p>' + '<p><a target="_blank" href="http://' + result.wikipediaUrl + '"> Read more</a>');
        var button = $('<button>');
        button.html('Fly here!');
        button.click(function() {
          $('#map').hide();
          locationview.showLocation(title);
        });
        $div.append(button);
      });
      
      var button = $('<button>');
        button.html('Fly here!');
        button.click(function() {
          $('#map').hide();
          addClue();
          locationview.showLocation(title);
        });
      $div.append(button);
      
      centerbox.setContent($div[0]);
      centerbox.show();
    });
  }

  return {
    showMap: function() {
      $('#map').show();
      if (!map) {
        makeMap();
      } else {
        google.maps.event.trigger(map, 'resize');
      }
    }
  }
}();