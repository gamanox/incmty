# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
console.log 'afuera: '+currentCase
String::capitalize = ->
  @charAt(0).toUpperCase() + @slice(1)
# ratio = $(window).height()/$(window).width()

# if ratio<=1
#     $('')


supportsOrientationChange = "onorientationchange" of window
orientationEvent = (if supportsOrientationChange then "orientationchange" else "resize")
window.addEventListener orientationEvent, (->
  if window.orientation is 0
    $('#rotardispisitivo').css
      display: 'none'
  else if window.orientation is 90
    $('#rotardispisitivo').css
      display: 'block'
  return
), false


if navigator.userAgent.match(/iPhone/i)
  $('#viewport').attr('content', 'width=device-width,minimum-scale=0.8,maximum-scale=0.8,initial-scale=0.8')

resultadoSize = ->
  wH = $(window).height()
  if wH <= 653
    $('#personaje').css
      "padding-top": 0
      console.log 'if'+wH
  else
    personajeH = (wH-653)/2
    $('#personaje').css
      "padding-top": personajeH+"px"
      console.log 'else '+personajeH

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
$(window).resize ->
  setTimeout ->
    $('.main').scrollTo(currentCase, 300)
    resultadoSize()
  , 600
getTotal = ->
  total = 0
  $.each $('#chartmobi .percent'), ->
    valor = parseInt($(this).attr 'value')
    total = total+valor
    console.log 'total: '+total
  console.log 'totalloop: '+total
  $.each $('#chartmobi .percent'), ->
    value = parseInt($(this).attr 'value')

    percent = (value*100)/total
    percent = Math.round(percent*10)/10
    $(this).find('.color').html percent+'%'
    console.log 'percent: '+percent+'%'
  


$ ->
  $('#chartmobi .percent').on 'click', ->
    el=$(this)
    valor = 0
    valor = el.attr 'value'
    valor++
    el.attr
      value: valor
    getTotal()
    $('.case6-next').css
      visibility: 'visible'
      opacity: 1
    result = $(this).attr('resultado')
    if userData.profile.hasOwnProperty(result)
      perfil = userData.profile[result]
      `userData.profile[result]=perfil+1`
    else
      perfil = userData.profile[result]
      `userData.profile[result]=4`
      
  


    
      
  console.log 'screen: '+winW

  $('#caso2-resultado').dragswipe
    width: winW
    current_page_element: '#current_page'
    total_pages_element: '#total_pages'
  $('.container-tres .larrow').on 'click', ->
    $('#caso2-resultado').prevPage()
    currentEntrepeneur = $('#current_page').html()
    switch currentEntrepeneur
      when "1"
        $('#inversionista').trigger 'click'
      when '2'
        $('#emprendedor').trigger 'click'
      when '3'
        $('#gato').trigger 'click'
      when '4'
        $('#staff').trigger 'click'
      when '5'
        $('#amigo').trigger 'click'
      when '6'
        $('#mesero').trigger 'click'
        

      else
        console.log 'error switch'

  $('#caso2-resultado').on 'swiperight', ->
    $('#caso2-resultado').prevPage()
    currentEntrepeneur = $('#current_page').html()
    switch currentEntrepeneur
      when "1"
        $('#inversionista').trigger 'click'
      when '2'
        $('#emprendedor').trigger 'click'
      when '3'
        $('#gato').trigger 'click'
      when '4'
        $('#staff').trigger 'click'
      when '5'
        $('#amigo').trigger 'click'
      when '6'
        $('#mesero').trigger 'click'
        

      else
        console.log 'error switch'
  $('.container-tres .rarrow').on 'click', ->
    $('#caso2-resultado').nextPage()
    currentEntrepeneur = $('#current_page').html()
    switch currentEntrepeneur
      when "1"
        $('#inversionista').trigger 'click'
      when '2'
        $('#emprendedor').trigger 'click'
      when '3'
        $('#gsto').trigger 'click'
      when '4'
        $('#staff').trigger 'click'
      when '5'
        $('#amigo').trigger 'click'
      when '6'
        $('#mesero').trigger 'click'
  $('#caso2-resultado').on 'swipeleft', ->
    $('#caso2-resultado').nextPage()
    currentEntrepeneur = $('#current_page').html()
    switch currentEntrepeneur
      when "1"
        $('#inversionista').trigger 'click'
      when '2'
        $('#emprendedor').trigger 'click'
      when '3'
        $('#gsto').trigger 'click'
      when '4'
        $('#staff').trigger 'click'
      when '5'
        $('#amigo').trigger 'click'
      when '6'
        $('#mesero').trigger 'click'



  $('#caso3-resultado').dragswipe
    width: winW
    current_page_element: '#current_chess'
    total_pages_element: '#total_chess'
  $('.container-cuatro .larrow').on 'click', ->
    $('#caso3-resultado').prevPage()
    currentEntrepeneur = $('#current_chess').html()
    switch currentEntrepeneur
      when "1"
        $('#chess-rey').trigger 'click'
      when '2'
        $('#chess-reina').trigger 'click'
      when '3'
        $('#chess-alfil').trigger 'click'
      when '4'
        $('#chess-caballo').trigger 'click'
      when '5'
        $('#chess-torre').trigger 'click'
      when '6'
        $('#chess-peon').trigger 'click'
        

      else
        console.log 'error switch'
  $('#caso3-resultado').on 'swiperight', ->
    $('#caso3-resultado').prevPage()
    currentEntrepeneur = $('#current_chess').html()
    switch currentEntrepeneur
      when "1"
        $('#chess-rey').trigger 'click'
      when '2'
        $('#chess-reina').trigger 'click'
      when '3'
        $('#chess-alfil').trigger 'click'
      when '4'
        $('#chess-caballo').trigger 'click'
      when '5'
        $('#chess-torre').trigger 'click'
      when '6'
        $('#chess-peon').trigger 'click'
        

      else
        console.log 'error switch'
  $('.container-cuatro .rarrow').on 'click', ->
    $('#caso3-resultado').nextPage()
    currentEntrepeneur = $('#current_chess').html()
    switch currentEntrepeneur
      when "1"
        $('#chess-rey').trigger 'click'
      when '2'
        $('#chess-reina').trigger 'click'
      when '3'
        $('#chess-alfil').trigger 'click'
      when '4'
        $('#chess-caballo').trigger 'click'
      when '5'
        $('#chess-torre').trigger 'click'
      when '6'
        $('#chess-peon').trigger 'click'
  $('#caso3-resultado').on 'swipeleft', ->
    $('#caso3-resultado').nextPage()
    currentEntrepeneur = $('#current_chess').html()
    switch currentEntrepeneur
      when "1"
        $('#chess-rey').trigger 'click'
      when '2'
        $('#chess-reina').trigger 'click'
      when '3'
        $('#chess-alfil').trigger 'click'
      when '4'
        $('#chess-caballo').trigger 'click'
      when '5'
        $('#chess-torre').trigger 'click'
      when '6'
        $('#chess-peon').trigger 'click'
  
  resultadoSize()
  # console.log 
  $('#footer .tw').on 'click', ->
    pageView 'footer-tw'
  $('#footer .fb').on 'click', ->
    pageView 'footer-fb'
  $('#footer .inscribete').on 'click', ->
    pageView 'footer-inscribete'
  $('#footer .legal').on 'click', ->
    pageView 'footer-legal'
  $('#linkincmtyresultado').on 'click', ->
    pageView 'resultado-incmty'
  $('#resultado-inc-fb').on 'click', ->
    pageView 'resultado-incmty-fb'
  $('#resultado-inc-tw').on 'click', ->
    pageView 'resultado-incmty-tw'
  $('#incbtn').on 'click', ->
    pageView 'resultado-incmty-site'
  $('#help').on 'click', ->
    pageView('faqs')
    $('#faqs').css
      right: '0px'
    $('#help').css
      visibility: 'hidden'
    $('#shareoverlay .close').css
      visibility: 'hidden'
  $("#faqs").scroller()
  
  $('.todosbtn-cont').on 'click', ->
    pageView('todos-personajes')
    $('#todospersonajes').fadeIn "fast", ->
      $("#todospersonajes").scroller
        horizontal: true
      # $("#todospersonajes").scroller("reset")

  $('#todospersonajes .close').on 'click', ->
    $('#todospersonajes').fadeOut({},"fast")
  $('#faqs .close').on 'click', ->
    $('#faqs').css
      right: '-300px'
    $('#help').css
      visibility: 'visible'

    $('#shareoverlay .close').css
      visibility: 'visible'

  $('#shareoverlay .close').on 'click', ->
    $('#shareoverlay').css
      visibility: 'hidden'
    $('#help').css
      visibility: 'visible'
  $('.sharebtn-cont').on 'click', ->
    pageView('compartir')

    $('#shareoverlay').css
      visibility: 'visible'
    $('#help').css
      visibility: 'hidden'

  
  $('#repeatbtn').on 'click', (e)->
    pageView('repetir-quiz')
    e.preventDefault()
    location.reload()
  $('.case1-next').on 'click', ->
    `currentCase = '.container-tres'`
    console.log 'click: '+currentCase
    pageView('caso2')
    $('.main').scrollTo('.container-tres', 300)
    chngBg('#a4c060')
    console.log currentCase

    getResult('#caso1-resultado')
  $('.case2-next').on 'click', ->
    `currentCase = '.container-cuatro'`
    console.log currentCase


    pageView('caso3')
    $('.main').scrollTo('.container-cuatro', 300)
    chngBg('#b67ba6')
    getResult('#caso2-resultado')


  $('.case3-next').on 'click', ->
    ancho = $(window).width()
    if ancho>=851
      `currentCase = '.container-cinco'`
      console.log currentCase

      pageView('caso4')
      $('.main').scrollTo('.container-cinco', 300)
      chngBg('#3dc0d4')
    else
      $('.container-cinco').css
        display: 'none'
      $('.container-seis').css
        display: 'none'
      $('.container-siete .case-number').html 'Caso #4'
      pageView('caso6')
      $('.main').scrollTo('.container-siete', 300)
      `currentCase = '.container-siete'`
      console.log currentCase

      chngBg('#ff9966')

  $('.case4-next').on 'click', ->
    `currentCase = '.container-seis'`
    console.log currentCase

    pageView('caso5')
    $('.main').scrollTo('.container-seis', 300)
    gender = $('#genderdiv').attr 'gender'

    if gender is 'her-'
      chngBg('#d64f92') 
    else
      chngBg('#86bce3')
  $('.case5-next').on 'click', ->
    pageView('caso6')
    $('.main').scrollTo('.container-siete', 300)
    `currentCase = '.container-siete'`
    console.log currentCase

    chngBg('#ff9966')
    $("#doughnutChart").drawDoughnutChart(chart)
  $('.case6-next').on 'click', ->
    pageView('resultado')

    $('#help').css
      visibility: 'hidden'
    gender = $('#genderdiv').attr 'gender'
    personaje = sortSome(userData.profile)
    $('#downbtn-cont').attr
      href: "http://quizdelemprendedor.com/"+gender+personaje+".zip"
    if gender is 'her-'
      copy = 'https://twitter.com/home?status=Descubr%C3%AD%20que%20soy%20una%20emprendedora%20'+personaje.capitalize()+'%20%23INCmty%20descubre%20qu%C3%A9%20tipo%20de%20emprendedor%20eres%20t%C3%BA%20aqu%C3%AD:%20http://QuizDelEmprendedor.com'
    if gender is 'him-'
      copy = 'https://twitter.com/home?status=Descubr%C3%AD%20que%20soy%20un%20emprendedor%20'+personaje.capitalize()+'%20%23INCmty%20descubre%20qu%C3%A9%20tipo%20de%20emprendedor%20eres%20t%C3%BA%20aqu%C3%AD:%20http://QuizDelEmprendedor.com'

    console.log personaje
    chngBg('#4c72a2')
    $('#twitbtn-cont').attr
      href: copy
    $('#shareoverlay .nombre').html personaje
    $('#personaje .persona.'+personaje).css
        display: 'block'
    $('.main').scrollTo('.container-cargando', 300)
    $('#facebtn-cont').on 'click', ->
      pageView('compartir-facebook')
      if gender is 'her-'
        copy = 'Yo soy una emprendedora '+personaje.capitalize()+'. Descubre aquí qué tipo de emprendedor eres tú. #INCmty'
      if gender is 'him-'
        copy = 'Yo soy un emprendedor '+personaje.capitalize()+'. Descubre aquí qué tipo de emprendedor eres tú. #INCmty'

      FB.ui
        method: "feed"
        link: "http://quizdelemprendedor.com/"
        description: copy
        picture: "http://quizdelemprendedor.com/"+gender+personaje+".jpg"
      , (response) ->
    setTimeout ->
      `$('.main').scrollTo('.container-result', 300, {onAfter: function(){$('#personaje .persona.'+personaje+' .share-cont-btns').css({"display": 'block'})}});`
      `currentCase = '.container-result'`

      
          
      switch personaje
        when "mastermind"
          chngBg '#f2b121'
          # chngBg '#f1c700'

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
  $('#inversionista').trigger 'click'
  $('#chess-rey').trigger 'click'
