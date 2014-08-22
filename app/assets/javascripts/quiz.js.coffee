# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

chngBg = (color)->
  $('.main').css
    'background-color': color

sortSome = (array)->
  pusharray = []
  for position of array
    pusharray.push [
      position
      array[position]
    ]
  pusharray.sort (a, b) ->
    b[1] - a[1]
  pusharray[0][0]


getResult = (respuesta)->
  console.log respuesta
  result = $(respuesta).attr('resultado')
  if result isnt ''
    if userData.profile.hasOwnProperty(result)
      propiedad = userData.profile[result]
      userData.profile[result]=propiedad+1

    else
      userData.profile[result]=1
  console.log userData.profile
  


$ ->
  
  # console.log 
  $("#faqs").scroller()
  $('#faqs .close').on 'click', ->
    $('#faqs').css
      right: '-300px'
  # console.log(#{current_user.name})
  # $('.containerscreen').height($(window).height())
  $('.btn').on 'click', ->
    FB.api('/me/feed', 'post', {
      message: 'Hello, world!'
    }, (response)->
      if not response or response.error
        alert "Error occured"
      else
        alert "Action was successful! Action ID: " + response.id
    )
    
  # $(".main").serialScroll
    
  #   items: ".containerscreen" # Selector to the items ( relative to the matched elements, '#sections' in this case )
  #   # prev: "img.prev" # Selector to the 'prev' button (absolute!, meaning it's relative to the document)
  #   next: ".case-next" # Selector to the 'next' button (absolute too)
  #   axis: "y"
  #   start:0
  #   # stop:true # The default is 'y' scroll on both ways
  #   # navigation: ".case-next"
  #   duration: 700 # Length of the animation (if you scroll 2 axes and use queue, then each axis take half this time)
  #   force: true
  #   queue:false
  # $('.quiz-start').on 'click', ->
  #   $('.main').scrollTo('.container-dos', 300)
  #   $('.main').css
  #     'background-color': '#ed6e5e'
  $('.case1-next').on 'click', ->
    $('.main').scrollTo('.container-tres', 300)
    chngBg('#a4c060')
    getResult('#caso1-resultado')
  $('.case2-next').on 'click', ->
    $('.main').scrollTo('.container-cuatro', 300)
    chngBg('#b67ba6')
    getResult('#caso2-resultado')

  $('.case3-next').on 'click', ->
    $('.main').scrollTo('.container-cinco', 300)
    chngBg('#3dc0d4')
  $('.case4-next').on 'click', ->
    $('.main').scrollTo('.container-seis', 300)
    chngBg('#86bce3')
  $('.case5-next').on 'click', ->
    $('.main').scrollTo('.container-siete', 300)
    chngBg('#ff9966')
    $("#doughnutChart").drawDoughnutChart(chart)
  $('.case6-next').on 'click', ->
    personaje = sortSome(userData.profile)
    console.log personaje
    
    $('#personaje .persona.'+personaje).css
        display: 'block'
    
    $('.main').scrollTo('.container-result', 300)
    switch personaje
      when "mastermind"
        chngBg '#f1c700'

      when 'goldseeker'
        chngBg '#2d458c'

      when 'lifestyler'
        chngBg '#c8238d'

      when 'coolhunter'
        chngBg '#89c01f'

      when 'spotlighter'
        chngBg '#eda200'

      when 'greatcreator'
        chngBg '#e52653'

      else
        console.log 'error switch'
    

  $('.pieza').on 'click', ->
    $('.case3-next').css
      visibility: 'visible'
      opacity: 1
    $('.pieza').removeClass 'active'
    $(this).addClass 'active'
  $('.entrepeneur').on 'click', ->
    $('.case2-next').css
      visibility: 'visible'
      opacity: 1
    $('.entrepeneur').removeClass 'active'
    $(this).addClass 'active'
    primero = $(this).attr('respuesta')
    console.log primero
    $("#caso2-resultado").attr
      resultado: primero
    console.log $("#caso2-resultado").attr('resultado')

  $('.drag-container').sortable
    stop: ->
      $('.case1-next').css
        visibility: 'visible'
        opacity: 1
      primero = $("#caso1-resultado li").first().attr('respuesta')
      $("#caso1-resultado").attr
        resultado: primero
      console.log $("#caso1-resultado").attr('resultado')
      
  # $('.briefcase-container').sortable()
  $('.square').draggable
    snap: '.briefcase-sort'
    # snap: 'true'
    # containment: '.briefcase-sort-cont'
    snapMode: 'inner'
    connectToSortable: ".briefcase-sort"
    helper: "clone"
    revert: "invalid"
  $('.ropa').draggable()
  $('.briefcase-sort').sortable
    revert: true
    tolerance: 'pointer'
    grid: [50, 50]
  $('.drag-container').disableSelection()
