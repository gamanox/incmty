$ ->

  $('body').prepend('<div id="fb-root"></div>')



  $.ajax

    url: "#{window.location.protocol}//connect.facebook.net/es_LA/all.js"

    dataType: 'script'

    cache: true





window.fbAsyncInit = ->

  FB.init(appId: '261219254067038', cookie: true)



  $('#sign_in').click (e) ->

    e.preventDefault()

    FB.login (response) ->

      window.location = '/auth/facebook/callback' if response.authResponse
    , 
      scope: 'publish_actions'


  $('#sign_out').click (e) ->

    FB.getLoginStatus (response) ->

      FB.logout() if response.authResponse

    true
