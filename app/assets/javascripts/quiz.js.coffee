# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

String::capitalize = ->
  @charAt(0).toUpperCase() + @slice(1)

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
  $('#help').on 'click', ->
    $('#faqs').css
      right: '0px'
    $('#help').css
      visibility: 'hidden'
  $("#faqs").scroller()

  $('#faqs .close').on 'click', ->
    $('#faqs').css
      right: '-300px'
    $('#help').css
      visibility: 'visible'
  # console.log(#{current_user.name})
  # $('.containerscreen').height($(window).height())

  $('#sharebtn-cont').on 'click', ->
    # FB.api('/me/feed', 'post', {
    #   message: 'Hello, world!'
    # }, (response)->
    #   if not response or response.error
    #     alert "Error occured"
    #   else
    #     alert "Action was successful! Action ID: " + response.id
    # )
    $('#shareoverlay').css
      visibility: 'visible'
    $('#help').css
      visibility: 'visible'

    
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
  
  $('#repeatbtn').on 'click', (e)->
    e.preventDefault()
    location.reload()
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
    gender = $('#genderdiv').attr 'gender'
    if gender is 'her-'
      chngBg('#d64f92') 
    else
      chngBg('#86bce3')
  $('.case5-next').on 'click', ->
    $('.main').scrollTo('.container-siete', 300)
    chngBg('#ff9966')
    $("#doughnutChart").drawDoughnutChart(chart)
  $('.case6-next').on 'click', ->
    $('').attr
      href: "http://quizdelemprendedor.com/"+gender+personaje+".zip"
    $('#help').css
      visibility: 'hidden'
    gender = $('#genderdiv').attr 'gender'
    personaje = sortSome(userData.profile)
    if gender is 'her-'
      copy = 'https://twitter.com/home?status=Descubr%C3%AD%20que%20soy%20una%20emprendedora%20'+personaje.capitalize()+',%20descubre%20qu%C3%A9%20tipo%20de%20emprendedor%20eres%20t%C3%BA%20aqu%C3%AD:%20http:/QuizDelEmprendedor.com%20%23INCmty'
    if gender is 'him-'
      copy = 'https://twitter.com/home?status=Descubr%C3%AD%20que%20soy%20un%20emprendedor%20'+personaje.capitalize()+',%20descubre%20qu%C3%A9%20tipo%20de%20emprendedor%20eres%20t%C3%BA%20aqu%C3%AD:%20http:/QuizDelEmprendedor.com%20%23INCmty'

    console.log personaje
    chngBg('#4c72a2')
    $('#twitbtn-cont').attr
      href: copy
    $('#shareoverlay .nombre').html personaje
    $('#personaje .persona.'+personaje).css
        display: 'block'
    $('.main').scrollTo('.container-cargando', 300)
    $('#facebtn-cont').on 'click', ->
      if gender is 'her-'
        copy = 'Yo soy una '+personaje.capitalize()+'. Descubre qué tipo de emprendedor eres tú.'
      if gender is 'him-'
        copy = 'Yo soy un '+personaje.capitalize()+'. Descubre qué tipo de emprendedor eres tú.'

      FB.ui
        method: "feed"
        link: "http://quizdelemprendedor.com/"
        description: ""
        picture: "http://quizdelemprendedor.com/"+gender+personaje+".jpg"
      , (response) ->
    setTimeout ->
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
    , 3000
    

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
