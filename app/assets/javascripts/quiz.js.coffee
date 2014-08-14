# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/




$ ->
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
    console.log "click"
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
    $('.main').css
      'background-color': '#a4c060'
  $('.case2-next').on 'click', ->
    $('.main').scrollTo('.container-cuatro', 300)
    $('.main').css
      'background-color': '#b67ba6'
  $('.case3-next').on 'click', ->
    $('.main').scrollTo('.container-cinco', 300)
    $('.main').css
      'background-color': '#3dc0d4'
  $('.case4-next').on 'click', ->
    $('.main').scrollTo('.container-seis', 300)
    $('.main').css
      'background-color': '#86bce3'
  $('.case5-next').on 'click', ->
    $('.main').scrollTo('.container-siete', 300)
    $('.main').css
      'background-color': '#ff9966'
    $("#doughnutChart").drawDoughnutChart(chart)


  $('.entrepeneur').on 'click', ->
    $('.entrepeneur').removeClass 'active'
    $(this).addClass 'active'

  $('.drag-container').sortable()
  $('.briefcase-container').sortable()
  $('.square').draggable()
  $('.ropa').draggable()
  $('.briefcase').droppable() 
  $('.drag-container').disableSelection()