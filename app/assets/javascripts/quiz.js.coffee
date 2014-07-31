# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$ ->
  $('#postfb').on 'click', ->
    
    $.post 'graph.facebook.com/10152320007902950/feed?message=testing&access_token=CAADtk9jY314BAAS8h6mQjWZBXxr9HPXUHEpc5wQjy51uqVeioh6cbz8spqtaiwzV7h2HSNQs5COOSz5awOfw32I9VgkRVVZAvgfnyxGAIlb8v81zZCIpZA9eYdZClpEzMud0cZCPC7IqZBY4mJfv9hjwGu3BqZAzW7TZApl9BXT9P4ySc8eRmgmaboMIAZBhPXnsQruqYl0Am1zvQnMr0LZChRc', (data)->
      console.log data