# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
onMouseMove = (event) ->
  
  # Create a circle shaped path with its center point
  # at the point in the middle between the current mouse
  # position and the position when the last onMouseDrag
  # event was fired:
  path = new Path.Circle(
    center: event.middlePoint
    radius: 10
    # strokeColor: "white"
  )
  
  # Get the average color of the pixels that fall within
  # the shape of the path:
  path.fillColor = raster.getAverageColor(path)
  return
$ ->
  s = Snap()
  bigCircle = s.circle(100, 100, 50)



  # Create a raster item using the image tag with id='mona'

  # Move the raster to the center of the view

  # Set the opacity of the raster to 10%, so we can see
  # the colored paths on top more clearly:

  # The onMouseMove event is fired in increments of 25 pts:
  
  raster = new Raster("profilepic")
  raster.position = view.center
  raster.opacity = 0.1
  tool.fixedDistance = 25