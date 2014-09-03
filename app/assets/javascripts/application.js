// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui.min
//= require uimobile
//= require jquery.scrollTo.min
//= require serialScroll
//= require miniscroll
//= require turbolinks
//= require tmax
//= require snap.svg-min
//= require delaunay
//= require paper-full.min
//= require chart
//= require ga

//= require_tree .

// $(function() {
//   $('.btn').on('click', function(e) {
//     e.preventDefault();
//     FB.api '/me/feed', 'post', {
//       message: 'Hello, world!'
//     });
//     console.log("click");
//   });
// });

var currentCase = '';

var userData = {
  gender: 'male',
  profile: {
    
  }


}
var sortprofile = [];




function pageView(page) {
  console.log('analytics: ' + page);
  return ga('send', 'pageview', '/' + page);
};


$(function() {
  $('#help').on('click', function() {
    return pageView('faqs');
  });
  $('#todosbtn-cont').on('click', function() {
    return pageView('todos-personajes');
  });
  $('#sharebtn-cont').on('click', function() {
    return pageView('abrir-compartir');
  });
  $('#repeatbtn').on('click', function(e) {
    return pageView('repetirquiz');
  });
  $('.case1-next').on('click', function() {
    return pageView('caso2');
  });
  $('.case2-next').on('click', function() {
    return pageView('caso3');
  });
  $('.case3-next').on('click', function() {
    return pageView('caso4');
  });
  $('.case4-next').on('click', function() {
    return pageView('caso5');
  });
  $('.case5-next').on('click', function() {
    return pageView('caso6');
  });
  $('.case6-next').on('click', function() {
    return pageView('resultado');
  });
  $('#facebtn-cont').on('click', function() {
    return pageView('compartir-facebook');
  });
  return $('#twitbtn-cont').on('click', function() {
    return pageView('compartir-twitter');
  });
});
