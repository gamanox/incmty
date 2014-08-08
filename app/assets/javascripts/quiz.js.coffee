# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$ ->
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

  $('.quiz-start').on 'click', ->
    $.scrollTo('.container-dos', 600)
  $('.case1-next').on 'click', ->
    $.scrollTo('.container-tres', 600)
  $('.case2-next').on 'click', ->
    $.scrollTo('.container-cuatro', 600)

  $('.drag-container').sortable()
  $('.drag-container').disableSelection()