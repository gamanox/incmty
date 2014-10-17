# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
clientId = "270b52d73848e4d"
secret = "596a53b8581fcb2935995fe56bc7a3fe9c25f7d8"
authorization = 'Client-ID '+clientId
fbimage = ''
wW = $(window).width()/2
wH = $(window).height()/2
$ ->
  $('#incmenu .cat').on 'click', ()->
    el=$(this)
    $('#incmenu .cat').removeClass 'active'
    el.addClass 'active'
    `settings.color=el.attr('color');`
    `console.log(settings.color);`
  $("#send").click ->
    ww = $(window).width()
    wh = $(window).height()
    ww = (ww/2)-250
    wh = (wh/2)-250
    console.log ww+' '+wh
    canvas = document.getElementById("cosmos")
    
    # canvas context
    context = canvas.getContext("2d")
    
    # get the current ImageData for the canvas
    data = context.getImageData(0, 0, canvas.width, canvas.height)
    
    # store the current globalCompositeOperation
    compositeOperation = context.globalCompositeOperation
    
    # set to draw behind current content
    context.globalCompositeOperation = "destination-over"
    
    #set background color
    context.fillStyle = "#FFFFFF"
    
    # draw background/rectangle on entire canvas
    context.fillRect 0, 0, canvas.width, canvas.height
    tempCanvas = document.createElement("canvas")
    tCtx = tempCanvas.getContext("2d")
    tempCanvas.width = 500
    tempCanvas.height = 500
    tCtx.drawImage canvas,ww,wh,500,500,0,0,500,500
    
    # write on screen
    img = tempCanvas.toDataURL('image/jpeg', 0.9).split(',')[1]
    # img = tempCanvas.toDataURL("image/png")
    document.write "<a href=\"" + img + "\"><img src=\"" + img + "\"/></a>"        

        
    

    $.ajax
      url: 'https://api.imgur.com/3/image'
      method: 'POST'
      headers:
        Authorization: authorization
        Accept: 'application/json'
      
      data:
        image: img
        type: 'base64'
      
      success: (result)->
        id = result.data.id
        # window.location = 'https://imgur.com/gallery/'+id
        console.log 'https://imgur.com/gallery/'+id
        FB.ui
          method: "feed"
          link: "http://quizdelemprendedor.com/"
          description: "test"
          display: "popup"
          picture: 'https://imgur.com/gallery/'+id+'.jpg'
        , (response) ->
      

    
    return

  # ese= Snap("#svgcircles")
  # smallCircle = ese.circle(wW-350, wH+150, 5)
  # bigCircle = ese.circle(wW-400, wH+120, 50)
  # mediumCircle = ese.circle(wW+400, wH-140, 30)
  # if wW < 850
  #   smallCircle = ese.circle('25%', '80%', 5)
  #   bigCircle = ese.circle('15%', '80%', 30)
  #   mediumCircle = ese.circle('90%', '20%', 10)

  # bigCircle.attr
  #   fill: "#8a00ff"
  # smallCircle.attr
  #   fill: '#51b7d4'
  # mediumCircle.attr
  #   fill: '#fd59ff'
`
`

  