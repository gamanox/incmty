# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
currentCase = '.container-uno'
String::capitalize = ->
  @charAt(0).toUpperCase() + @slice(1)

resultadoSize = ->
  wH = $(window).height()
  if wH <= 653
    $('#personaje').css
      "padding-top": 0
  else
    personajeH = wH-653
    $('#personaje').css
      "paddint-top": personajeH+"px"

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

pageView = (page)->
  console.log 'analytics: '+page
  ga('send', 'pageview', '/'+page)
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
  , 1000



$ ->
  
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
  $('#help').on 'click', ->
    pageView('faqs')
    $('#faqs').css
      right: '0px'
    $('#help').css
      visibility: 'hidden'
    $('#shareoverlay .close').css
      visibility: 'hidden'
  $("#faqs").scroller()
  $("#todospersonajes").scroller
    horizontal: true
  $('#todosbtn-cont').on 'click', ->
    pageView('todos-personajes')
    $('#todospersonajes').fadeIn({},"fast")
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
      visibility: 'hidden'
  $('#sharebtn-cont').on 'click', ->
    pageView('compartir')

    $('#shareoverlay').css
      visibility: 'visible'
    $('#help').css
      visibility: 'visible'

  
  $('#repeatbtn').on 'click', (e)->
    pageView('repetir-quiz')
    e.preventDefault()
    location.reload()
  $('.case1-next').on 'click', ->
    currentCase = '.container-tres'
    console.log currentCase
    pageView('caso2')
    $('.main').scrollTo('.container-tres', 300)
    chngBg('#a4c060')
    console.log currentCase

    getResult('#caso1-resultado')
  $('.case2-next').on 'click', ->
    currentCase = '.container-cuatro'
    console.log currentCase


    pageView('caso3')
    $('.main').scrollTo('.container-cuatro', 300)
    chngBg('#b67ba6')
    getResult('#caso2-resultado')


  $('.case3-next').on 'click', ->
    currentCase = '.container-cinco'
    console.log currentCase

    pageView('caso4')
    $('.main').scrollTo('.container-cinco', 300)
    chngBg('#3dc0d4')

  $('.case4-next').on 'click', ->
    currentCase = '.container-seis'
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
    currentCase = '.container-siete'
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
        copy = 'Yo soy una emprendedora '+personaje.capitalize()+'. Descubre aquí qué tipo de emprendedor eres tú.'
      if gender is 'him-'
        copy = 'Yo soy un emprendedor '+personaje.capitalize()+'. Descubre aquí qué tipo de emprendedor eres tú.'

      FB.ui
        method: "feed"
        link: "http://quizdelemprendedor.com/"
        description: copy
        picture: "http://quizdelemprendedor.com/"+gender+personaje+".jpg"
      , (response) ->
    setTimeout ->
      $('.main').scrollTo('.container-result', 300)
      currentCase = '.container-result'

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
