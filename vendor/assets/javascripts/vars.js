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