
gaua = 'UA-42769061-4'


pageView = (page)->
  console.log 'analytics: '+page
  ga('send', 'pageview', '/'+page);


((i, s, o, g, r, a, m) ->
  i["GoogleAnalyticsObject"] = r
  i[r] = i[r] or ->
    (i[r].q = i[r].q or []).push arguments
    return

  i[r].l = 1 * new Date()

  a = s.createElement(o)
  m = s.getElementsByTagName(o)[0]

  a.async = 1
  a.src = g
  m.parentNode.insertBefore a, m
  return
) window, document, "script", "//www.google-analytics.com/analytics.js", "ga"
ga "create", gaua, "auto"
ga "send", "pageview"


$ ->
  $('#help').on 'click', ->
    pageView('faqs')
  $('#todosbtn-cont').on 'click', ->
    pageView('todos-personajes')


  $('#sharebtn-cont').on 'click', ->
    pageView('abrir-compartir')
  $('#repeatbtn').on 'click', (e)->
    pageView('repetirquiz')
  $('.case1-next').on 'click', ->
    pageView('caso2')
  $('.case2-next').on 'click', ->
    pageView('caso3')
  $('.case3-next').on 'click', ->
    pageView('caso4')
  $('.case4-next').on 'click', ->
    pageView('caso5')
  $('.case5-next').on 'click', ->
    pageView('caso6')
  $('.case6-next').on 'click', ->
    pageView('resultado')
  $('#facebtn-cont').on 'click', ->
    pageView('compartir-facebook')
  $('#twitbtn-cont').on 'click', ->
    pageView('compartir-twitter')

