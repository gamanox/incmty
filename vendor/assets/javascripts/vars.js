
var iphone4 = (window.screen.height == (960 / 2));
var iphone5 = (window.screen.height == (1136 / 2));
var startup= "#FAD000";
var scaleup= "#111E90";
var trends= "#7664A0";
var launch= "#80BD01";
var build= "#EA094B";
var award= "#FFA409";
var expo= "#38B5E6";
var party= "#D8006C";
var contador = 0;
var fbids = [];
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
  // console.log('analytics: ' + page);
  return ga('send', 'pageview', '/' + page);
};
var s;
var ese;
var bounds;
var width;
var height;
var triangles =[];
var vertices=[];
var objIndex=0;
var triangleHolder;
var pointMarks;
var touch = null;

 
  // Check to see if there is a touch event handler
  touch = ( 'ontouchstart' in document.documentElement ) ? true : false;
 
  // Get your desired element to handle the interaction event
  // Quick ternary operation based on previous findings
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();//
var dataURL;

var settings = {
    gravity: 3,
    clear: function(){
        entities = [];
    },
    color: "#FAD000",
    random: false,
    elastic: true,
    simultaneous: true, 
    boomCount: 250,
    boom: function(){
        entities = [];
        var n = settings.boomCount,
            rN = Math.sqrt(n);
        for(var i = 0; i < n; i++){
            entities.push(new CelestialBody(
                1,
                {x: wid/2 - (rN/2-i%rN), y: hei/2 - (rN/2-i/rN%rN)},
                {vX: 0, vY: 0},
                true
            ));
        }
    },
    pendulum: function(){
        entities = [
          new CelestialBody(20, {x:wid/5*4, y:hei/2},{vX: 0, vY: 0}),
          new CelestialBody(200,{x:wid/2, y:hei/2},{vX: 0, vY: 0}),
          new CelestialBody(20,{x:wid/5, y:hei/2},{vX: 0, vY: 0})
        ];
    },
    solarSystem: function(){
        settings.gravity = 3;
        entities = [
          new CelestialBody(100, {x: wid/2, y: hei/2}, {vX:0, vY:0}),
          new CelestialBody(1, {x: wid/2+175, y: hei/2}, {vX:0, vY:-1.5}),
          new CelestialBody(1.5, {x: wid/2+250, y: hei/2}, {vX:0, vY:-1.2}),
          new CelestialBody(2, {x: wid/2+300, y: hei/2}, {vX:0, vY:-1.1}),
          new CelestialBody(2, {x: wid/2+375, y: hei/2}, {vX:0, vY:-1}),
        ];
    },
    saturation: .8,
    lightness: .5,
    growthRate: 135,
    pause: false
};



var element;
var can,
    ctx,
    wid,
    hei,
    entities,
    startPoint, curPoint, startTime;
$(function () {
var $mySVG = $('#svg');
var $myCan = $('#cosmos');
if($mySVG.length){

s = Snap('#svg');
bounds= document.getElementById('svg').getBoundingClientRect();
width = bounds.width;
height = bounds.height;
triangleHolder= s.g();
pointMarks = s.g();




function getRandomPoint(){
  var point={};
  point.x=randomNumber(0, width);
  point.y=randomNumber(0, height);
  return point;
  }

function tweenPoint(tweenObject,targetEl) {
  var point=getRandomPoint();
  var point2=getRandomPoint();
  var randX=point.x;
  var randY=point.y;
  var randX2=point2.x
  var randY2=point2.y;
  TweenLite.to(tweenObject, 16, {bezier:[{x:randX, y:randY}, {x:randX2, y:randY2}],ease:Sine.easeInOut, onComplete:tweenPoint,onCompleteParams:[tweenObject,targetEl],onUpdate:applyValue, onUpdateParams:["{self}",targetEl]});
}

function applyValue(tween,targetEl) {
  vertices[targetEl.data("index")][0]=tween.target.x;
  vertices[targetEl.data("index")][1]=tween.target.y;
  targetEl.attr({cx:tween.target.x,cy:tween.target.y})
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}
 
function makeObj(){
  var point = getRandomPoint();
  var c = s.circle(point.x, point.y, 4);
  c.attr({fill:"rgba(251, 151, 205,0)"})
  // c.attr({fill:"rgba(110,70,110,0)"})
  var dummyObject={}
  dummyObject.x=c.getBBox().x;
  dummyObject.y=c.getBBox().y;
  tweenPoint(dummyObject,c);
  c.data("index",objIndex)
  var returnArr =[dummyObject.x,dummyObject.y,c]
  objIndex++;
  return returnArr;
}


function draw(){
  triangleHolder.clear();
    for(i=triangles.length; i>0 ;i-=3 ) {
      var cString = 
        "M"+vertices[triangles[i-1]][0]+" "+vertices[triangles[i-1]][1]+
        "L"+vertices[triangles[i-2]][0]+" "+vertices[triangles[i-2]][1]+
        "L"+vertices[triangles[i-3]][0]+" "+vertices[triangles[i-3]][1]+"z";
      var c = s.path(cString).attr({  fill: "rgba(213,26,141 ,"+i*0.02+")",
      // var c = s.path(cString).attr({  fill: "rgba(251, 151, 205,"+i*0.02+")",
    stroke: "rgba(251, 151, 205,0.1)",
    strokeWidth: 2});
    triangleHolder.add(c)  
    }

}


for(i=0;i<14;i++){
  
    vertices.push(makeObj());
}


  
function doDelaunay() {
  triangles = Delaunay.triangulate(vertices);
 if(triangles.length>2){draw()};
  
  requestAnimationFrame(doDelaunay);
}
requestAnimationFrame(doDelaunay);



}


if($myCan.length){
  element = document.querySelector( '#cosmos' );
 element.addEventListener("contextmenu", function (e) {
      e.preventDefault();    // Disables system menu
    }, false);
element.addEventListener("MSHoldVisual", function(e) { e.preventDefault(); }, false);
element.addEventListener( touch ? 'touchstart' : 'mousedown', doInputStart );
element.addEventListener( touch ? 'touchend' : 'mouseup', doInputStop );
element.addEventListener( touch ? 'touchmove' : 'mousemove', doInputMove );

    can = document.getElementById("cosmos"),
    ctx = can.getContext('2d'),
    wid = can.width = window.innerWidth,
    hei = can.height = window.innerHeight,
    entities = [];



    function doInputStart( evt ) 
{
  var clientX = null;
  var clientY = null;
 evt.preventDefault();
  // Get the coordinates based on input type
  if( touch )
  {
    // Stop the default handling of the event
    evt.preventDefault();
  
    // Get the touch coordinates
    clientX = evt.touches[0].clientX;
    clientY = evt.touches[0].clientY;
    startPoint = {
        x: clientX,
        y: clientY
    };
    startTime = Date.now();
  } else {
    // Not a tablet so grab mouse coordinates
    clientX = evt.clientX;
    clientY = evt.clientY;
    startPoint = {
        x: clientX,
        y: clientY
    };
    startTime = Date.now();
  }
 
  // Do whatever you want at this point
  console.log( 'Input at: ' + clientX + 'x' + clientY );
}
function doInputStop( evt ) 
{


  var clientX = null;
  var clientY = null;
 
  // Get the coordinates based on input type
  if( touch )
  {
    // Stop the default handling of the event
    
    console.log(evt.touches);
    // Get the touch coordinates
    //clientX = evt.touches[0].clientX;
    //clientY = evt.touches[0].clientY;
    var endPoint = {
        x: clientX,
        y: clientY
    },
    dTime = (Date.now() - startTime)/(151-settings.growthRate),
        dist = distance(startPoint, endPoint),
        ang = angle(startPoint, endPoint),
        vel = {
            vX: Math.cos(ang)*dist/500,
            vY: Math.sin(ang)*dist/500
        };

    entities.push(new CelestialBody(dTime, startPoint, 0));
    startPoint = startTime = undefined;
  } else {
    // Not a tablet so grab mouse coordinates
    clientX = evt.clientX;
    clientY = evt.clientY;
    var endPoint = {
        x: clientX,
        y: clientY
    },
    dTime = (Date.now() - startTime)/(151-settings.growthRate),
        dist = distance(startPoint, endPoint),
        ang = angle(startPoint, endPoint),
        vel = {
            vX: Math.cos(ang)*dist/500,
            vY: Math.sin(ang)*dist/500
        };

    entities.push(new CelestialBody(dTime, startPoint, vel));
    startPoint = startTime = undefined;
  }
 
  // Do whatever you want at this point
  console.log( 'Input at: ' + clientX + 'x' + clientY );
}

function doInputMove( evt ) 
{
 evt.preventDefault();

  var clientX = null;
  var clientY = null;
 
  // Get the coordinates based on input type
  if( touch )
  {
    // Stop the default handling of the event
    evt.preventDefault();
  
    // Get the touch coordinates
    clientX = evt.touches[0].clientX;
    clientY = evt.touches[0].clientY;
    curPoint = {x: clientX, y: clientY};
  } else {
    // Not a tablet so grab mouse coordinates
    clientX = evt.clientX;
    clientY = evt.clientY;
    curPoint = {x: clientX, y: clientY};
  }
 
  // Do whatever you want at this point
  console.log( 'Input at: ' + clientX + 'x' + clientY );
}


function distance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angle(point1, point2) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x);
}

function randomColor() {
    var sat = Math.round(settings.saturation*100),
        hue = Math.floor(Math.random()*361),
        ltn = Math.round(settings.lightness*100);

  return settings.random ? 'hsl(' + [hue, sat+'%', ltn+'%'] + ')' : settings.color;
}

function CelestialBody(radius, position, velocity, isBoom, fill) {
    this.radius = radius;
    this.isBoom = isBoom;
    this.mass = 4 * Math.PI * radius * radius;
    this.position = position || {
        x: 0,
        y: 0
    };
    this.velocity = velocity || {
        vX: 0,
        vY: 0
    };
    this.force = {x:0, y:0};
    this.fillStyle = fill || randomColor();
}
CelestialBody.prototype.updatePosition = function () {
    this.resolveForce();
    this.position.x += this.velocity.vX;
    this.position.y += this.velocity.vY;
};
CelestialBody.prototype.render = function (context) {
    context.fillStyle = this.fillStyle;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
};
CelestialBody.prototype.attract = function (body2) {
    var dist = distance(this.position, body2.position),
        ang = angle(this.position, body2.position),
        G = settings.gravity/1000,
        force = G * body2.mass * this.mass / dist / dist;

  if (settings.simultaneous){
    this.force.x += Math.cos(ang) * force / this.mass;
    this.force.y += Math.sin(ang) * force / this.mass;
    body2.force.x -= Math.cos(ang) * force / body2.mass;
    body2.force.y -= Math.sin(ang) * force / body2.mass;
  } else {
    this.velocity.vX += Math.cos(ang) * force / this.mass;
    this.velocity.vY += Math.sin(ang) * force / this.mass;
    body2.velocity.vX -= Math.cos(ang) * force / body2.mass;
    body2.velocity.vY -= Math.sin(ang) * force / body2.mass;
  }
};
CelestialBody.prototype.resolveForce = function(){
    this.velocity.vX += this.force.x;
    this.velocity.vY += this.force.y;
    this.force = {x:0, y:0};
};
CelestialBody.prototype.hasCollided = function(body2){
    if (Math.abs(body2.position.x - this.position.x) > body2.radius + this.radius || 
        Math.abs(body2.position.y - this.position.y) > body2.radius + this.radius)
      return false;
    
    var dist = distance(this.position, body2.position);
    
    return dist <= this.radius + body2.radius;
};
CelestialBody.prototype.performCollision = function(body2){
    //http://www.exeneva.com/2012/06/multiple-balls-bouncing-and-colliding-example/
    var dx = this.position.x - body2.position.x;
    var dy = this.position.y - body2.position.y;
    var cAng = Math.atan2(dy, dx);
    
    // Get velocities of each ball before collision
    var v1 = Math.sqrt(this.velocity.vX * this.velocity.vX + this.velocity.vY * this.velocity.vY);
    var v2 = Math.sqrt(body2.velocity.vX * body2.velocity.vX + body2.velocity.vY * body2.velocity.vY);
    
    // Get angles (in radians) for each ball, given current velocities
    var d1 = Math.atan2(this.velocity.vY, this.velocity.vX);
    var d2 = Math.atan2(body2.velocity.vY, body2.velocity.vX);
    
    // Rotate velocity vectors so we can plug into equation for conservation of momentum
    var rVX1 = v1 * Math.cos(d1 - cAng);
    var rVY1 = v1 * Math.sin(d1 - cAng);
    var rVX2 = v2 * Math.cos(d2 - cAng);
    var rVY2 = v2 * Math.sin(d2 - cAng);
    
    // Update actual velocities using conservation of momentum
    /* Uses the following formulas:
       velocity1 = ((mass1 - mass2) * velocity1 + 2*mass2 * velocity2) / (mass1 + mass2)
       velocity2 = ((mass2 - mass1) * velocity2 + 2*mass1 * velocity1) / (mass1 + mass2)
    */
    var finalVelocityX1 = ((this.mass - body2.mass) * rVX1 + (body2.mass + body2.mass) * rVX2) 
    / (this.mass + body2.mass);
    var finalVelocityX2 = ((this.mass + this.mass) * rVX1 + (body2.mass - this.mass) * rVX2) 
    / (this.mass + body2.mass);
    
    // Y velocities remain constant
    var finalVelocityY1 = rVY1;
    var finalVelocityY2 = rVY2;
    
    // Rotate angles back again so the collision angle is preserved
  if(settings.simultaneous){
    this.force.x += Math.cos(cAng) * finalVelocityX1 + Math.cos(cAng + Math.PI/2) * finalVelocityY1 - this.velocity.vX;
    this.force.y += Math.sin(cAng) * finalVelocityX1 + Math.sin(cAng + Math.PI/2) * finalVelocityY1 - this.velocity.vY;
    body2.force.x += Math.cos(cAng) * finalVelocityX2 + Math.cos(cAng + Math.PI/2) * finalVelocityY2 - body2.velocity.vX;
    body2.force.y += Math.sin(cAng) * finalVelocityX2 + Math.sin(cAng + Math.PI/2) * finalVelocityY2 - body2.velocity.vY;
  } else {
    this.velocity.vX = Math.cos(cAng) * finalVelocityX1 + Math.cos(cAng + Math.PI/2) * finalVelocityY1;
    this.velocity.vY = Math.sin(cAng) * finalVelocityX1 + Math.sin(cAng + Math.PI/2) * finalVelocityY1;
    body2.velocity.vX = Math.cos(cAng) * finalVelocityX2 + Math.cos(cAng + Math.PI/2) * finalVelocityY2;
    body2.velocity.vY = Math.sin(cAng) * finalVelocityX2 + Math.sin(cAng + Math.PI/2) * finalVelocityY2;
  }
  
    //this.updatePosition();
    //body2.updatePosition();
    
};

function update() {
    if (!settings.pause){
      var i = 0,
          j = 1,
          len = entities.length;

      for (; i < len - 1; i++) {
          for (j = i + 1; j < len; j++) {
              if(entities[i].hasCollided(entities[j])){
                  // entities[i].performCollision(entities[j]);
              }
              else{
                  entities[i].attract(entities[j]);
              }
          }
      }
      entities.forEach(function (ent) {
          ent.updatePosition();
      });
    }
    setTimeout(update, 10);
}

function render() {
    requestAnimFrame(render);

    ctx.clearRect(0, 0, wid, hei);

    entities.forEach(function (ent) {
        ent.render(ctx);
    });
    
    if(startPoint){
        var dist = Date.now() - startTime;
        ctx.strokeStyle = "#f00";
        ctx.beginPath();
        ctx.arc(startPoint.x,startPoint.y,dist/(151-settings.growthRate),0,2*Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(curPoint.x, curPoint.y);
        ctx.closePath();
        ctx.stroke();
    }
}
requestAnimFrame(render);
update();
}

});


$(function () {
  
  
});

