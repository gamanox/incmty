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
//= require jquery.scrollTo.min
//= require serialScroll
//= require miniscroll
//= require turbolinks
//= require tmax
//= require snap.svg-min
//= require delaunay
//= require paper-full.min
//= require chart

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

$(function(){
  $('#facebtn-cont').on('click', function() {
    // return FB.api('/me/feed', 'post', {
    //   message: 'Hello, world!'
    // }, function(response) {
    //   if (!response || response.error) {
    //     return alert("Error occured");
    //   } else {
    //     return alert("Action was successful! Action ID: " + response.id);
    //   }
    // });
  FB.ui({
    method: 'share',
    href: 'https://incmty.herokuapp.com/',
    caption: 'prueba',
    description: 'quiz del emprendedor',
    picture: 'https://incmty.herokuapp.com/her-mastermind.jpg'
  }, function(response){});
  });
});

var userData = {
  gender: 'male',
  profile: {
    
  }


}
var sortprofile = [];


