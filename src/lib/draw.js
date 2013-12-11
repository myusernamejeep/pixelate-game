var draw_state = null;
var raster = null;
var lastPos;
var loaded;
paper.install(window);
var draw = {

	init : function(img){
  
		paper.setup('canvas_photo');
		console.log('img',img);
		var image = images[img];
	    texture = image.texture;
	    //$('#label').html('Image credit: <a href="' + image.url + '">' + image.credit + '</a>');
	  	//canvas.draw(image.texture).update();
		console.log('image', image);
		raster = new Raster(image);
		loaded = false;
		lastPos = paper.view.center;

		// Move the raster to the center of the view
		raster.position = paper.view.center;

		// Set the opacity of the raster to 10%, so we can see
		// the colored paths on top more clearly:
		raster.opacity = 0.03;

		// The onMouseMove event is fired in increments of 25 pts:
		paper.tool.fixedDistance =  10;

		return this;
	}
 
}

////////////////////////////////////////////////////////////////////////////////
// Initialization code
////////////////////////////////////////////////////////////////////////////////

var canvas;
var texture;

var initCount = 0, loadCount = 1;
var images = {
    'spiderman.jpg': { credit: 'matthigh', url: 'http://www.flickr.com/photos/matthigh/2125630879/' },
    'ironman.jpg': { credit: 'renet', url: 'http://www.flickr.com/photos/renet/12135813/' },
    'mona.jpg': { credit: 'stuckincustoms', url: 'http://www.flickr.com/photos/stuckincustoms/1213760517/' }
};
for (var file in images) {
    var image = images[file].image = new Image();
    image.onload = init;
    image.src = 'images/' + file;
    loadCount++;
}

$(window).load(init);

function init() {
    // Count the images as they load and only initialize when they are all loaded
    if (++initCount < loadCount) return;

    // Try to get a WebGL canvas
    var placeholder = document.getElementById('placeholder');
    /*try {
        canvas = fx.canvas();
    } catch (e) {
        placeholder.innerHTML = e;
        return;
    }
    //$(canvas).attr('id', 'canvas_img');
    canvas.replace(placeholder);*/
    // Load the textures
    for (var file in images) {

        images[file].texture = images[file].image ;
       	console.log(images[file].texture, file);
    	
    }
 		
		
 
}
function onMouseMove(event) {
	// Create a circle shaped path with its center point
	// at the point in the middle between the current mouse
	// position and the position when the last onMouseDrag
	// event was fired:
	/*var path = new Path.Circle({
		center: event.middlePoint,
		radius: 3.5,
		//strokeColor: 'white'
	});*/
	//console.log(event.delta.length / 2);
	if(!draw_state){
		return false;
	}

	var path = new Path.Rectangle({
		point: event.middlePoint,
		size: new Size(10,10),
		//onMouseMove: moveHandler
	});
	// Get the average color of the pixels that fall within
	// the shape of the path:
	path.fillColor =  raster.getAverageColor(path);
}
