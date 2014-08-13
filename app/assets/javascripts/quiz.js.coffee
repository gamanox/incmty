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
  $('.quiz-start').on 'click', ->
    $('.main').scrollTo('.container-dos', 600)
  $('.case1-next').on 'click', ->
    $('.main').scrollTo('.container-tres', 600)
  $('.case2-next').on 'click', ->
    $('.main').scrollTo('.container-cuatro', 600)
  $('.case3-next').on 'click', ->
    $('.main').scrollTo('.container-cinco', 600)
  $('.case4-next').on 'click', ->
    $('.main').scrollTo('.container-seis', 600)


  $('.entrepeneur').on 'click', ->
    $('.entrepeneur').removeClass 'active'
    $(this).addClass 'active'

  $('.drag-container').sortable()
  $('.briefcase-container').sortable()
  $('.square').draggable()
  $('.ropa').draggable()
  $('.briefcase').droppable() 
  $('.drag-container').disableSelection()