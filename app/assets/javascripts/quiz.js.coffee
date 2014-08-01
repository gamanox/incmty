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