
function initialize() {
    var x = $("#map").data('x') * 1;
    var y = $("#map").data('y') * 1;
     var scale = $("#map").data('zoom')*1;
    var point, zoom;

    if (x && y) {
        point = new google.maps.LatLng(x, y);
        zoom = 15;
    } else {
        point = new google.maps.LatLng(55.751147329114815, 37.6111534886719);
        zoom = 11;
    }
    
    if(scale){
        zoom = scale;
    }

    var mapOptions = {
        center: point,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: [{
					stylers: [{
					  saturation: -100
					}]
				}]
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    var marker = new google.maps.Marker({
        position: point,
        map: map
    });

    var file = $("#map").data('file');

    var str = '<div id="point_info">'+
            '<div id="bodyContent">'+
            '<p>'+$("#map").data('adress')+'</p>'+
            '<p>Тел: '+$("#map").data('phone')+'; Факс '+ $("#map").data('facs')+'</p>'+
            '<p>E-mail: <a href="mailto:'+ $("#map").data('email')+' ">'+$("#map").data('email')+'</a></p>'+
            '<a href="/getfile.php?id='+file+'" class="down-link" target="_blank">Скачать реквизиты</a>'+
            '</div>'+
            '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: str,
		pixelOffset: new google.maps.Size(0, 0)
    });
     google.maps.event.addListener(infowindow, 'domready', function() {

   // Reference to the DIV which receives the contents of the infowindow using jQuery
   var iwOuter = $('.gm-style-iw');

   /* The DIV we want to change is above the .gm-style-iw DIV.
    * So, we use jQuery and create a iwBackground variable,
    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
    */
   var iwBackground = iwOuter.prev();

   // Remove the background shadow DIV
   iwBackground.children(':nth-child(2)').css({'display' : 'none'});
   iwBackground.children(':nth-child(3)').find('div').children().css({'display' : 'none'});
   // Remove the white background DIV
   iwBackground.children(':nth-child(4)').css({'display' : 'none'});
   var iwCloseBtn = iwOuter.next();
   iwCloseBtn.css({
      display: 'none', // by default the close button has an opacity of 0.7
    });

});
    marker.setVisible(false);
   infowindow.open(map,marker);
  
}

$(document).ready(function () {
    initialize();
});