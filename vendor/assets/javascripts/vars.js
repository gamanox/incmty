
var iphone4 = (window.screen.height == (960 / 2));
var iphone5 = (window.screen.height == (1136 / 2));

  
$(function () {
  if(iphone4){
    // alert('iphone4');
  }
  if(iphone5){
    // alert('iphone5');
  }
  if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
    $('#viewport').attr('content', 'width=device-width,minimum-scale=0.8,maximum-scale=0.8,initial-scale=0.7');
  }
  
});

var userData = {
  gender: 'male',
  profile: {
    
  }


}
var sortprofile = [];
var winW;
$(function () {
  winW = $('.networking-mask').width();

  
});
var totalPercent = 0;
var currentCase = '.container-uno'; 
var pageView;
var case2result = '';
pageView = function(page) {
  console.log('analytics: ' + page);
  return ga('send', 'pageview', '/' + page);
};