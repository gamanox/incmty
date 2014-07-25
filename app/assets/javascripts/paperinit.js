// var raster = new Raster('profile');

// // Hide the raster:
// raster.visible = false;

// // The size of our grid cells:
// var gridSize = 15;

// // Space the cells by 120%:
// var spacing = .5;

// // As the web is asynchronous, we need to wait for the raster to load
// // before we can perform any operation on its pixels.
// raster.on('load', function() {
//   // Since the example image we're using is much too large,
//   // and therefore has way too many pixels, lets downsize it to
//   // 40 pixels wide and 30 pixels high:
//   raster.size = new Size(25, 25);

//   for (var y = 0; y < raster.height; y++) {
//     for(var x = 0; x < raster.width; x++) {
//       // Get the color of the pixel:
//       var color = raster.getPixel(x, y);

//       // Create a circle shaped path:
//       var triangle = new Path.RegularPolygon(new Point(x, y) * gridSize, 3, gridSize / 2 / spacing);
      
      

//       // var path = new Path.Circle({
//       //   center: new Point(x, y) * gridSize,
//       //   radius: gridSize / 2 / spacing
//       // });

//       // Set the fill color of the path to the color
//       // of the pixel:
//       triangle.fillColor = color;
//     }
//   }

//   // Move the active layer to the center of the view, so all 
//   // the created paths in it appear centered.
//   project.activeLayer.position = view.center;
// });

// // Move the active layer to the center of the view:
// project.activeLayer.position = view.center;