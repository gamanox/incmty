// var s;
// $(function() {
//   s = Snap('svg');

//   var bounds= document.getElementById('svg').getBoundingClientRect();
//   var width = bounds.width;
//   var height = bounds.height;
//   var triangles =[];
//   var vertices=[];
//   var triangleHolder= s.g();
//   var pointMarks = s.g();
//   var objIndex=0;


//   function getRandomPoint(){
//     var point={};
//     point.x=randomNumber(0, width);
//     point.y=randomNumber(0, height);
//     return point;
//     }

//   function tweenPoint(tweenObject,targetEl) {
//     var point=getRandomPoint();
//     var point2=getRandomPoint();
//     var randX=point.x;
//     var randY=point.y;
//     var randX2=point2.x
//     var randY2=point2.y;
//     TweenLite.to(tweenObject, 16, {bezier:[{x:randX, y:randY}, {x:randX2, y:randY2}],ease:Sine.easeInOut, onComplete:tweenPoint,onCompleteParams:[tweenObject,targetEl],onUpdate:applyValue, onUpdateParams:["{self}",targetEl]});
//   }

//   function applyValue(tween,targetEl) {
//     vertices[targetEl.data("index")][0]=tween.target.x;
//     vertices[targetEl.data("index")][1]=tween.target.y;
//     targetEl.attr({cx:tween.target.x,cy:tween.target.y})
//   }

//   function randomNumber(min, max) {
//       return Math.floor(Math.random() * (1 + max - min) + min);
//   }
   
//   function makeObj(){
//     var point = getRandomPoint();
//     var c = s.circle(point.x, point.y, 4);
//     c.attr({fill:"rgba(110,70,110,0)"})
//     var dummyObject={}
//     dummyObject.x=c.getBBox().x;
//     dummyObject.y=c.getBBox().y;
//     tweenPoint(dummyObject,c);
//     c.data("index",objIndex)
//     var returnArr =[dummyObject.x,dummyObject.y,c]
//     objIndex++;
//     return returnArr;
//   }


//   function draw(){
//     triangleHolder.clear();
//       for(i=triangles.length; i>0 ;i-=3 ) {
//         var cString = 
//           "M"+vertices[triangles[i-1]][0]+" "+vertices[triangles[i-1]][1]+
//           "L"+vertices[triangles[i-2]][0]+" "+vertices[triangles[i-2]][1]+
//           "L"+vertices[triangles[i-3]][0]+" "+vertices[triangles[i-3]][1]+"z";
//         var c = s.path(cString).attr({  fill: "rgba(173,216,94,"+i*.004+")",
//       stroke: "rgba(173,216,94,0.1)",
//       strokeWidth: 2});
//       triangleHolder.add(c)  
//       }

//   }


//   for(i=0;i<14;i++){
    
//       vertices.push(makeObj());
//   }


    
//   function doDelaunay() {
//     triangles = Delaunay.triangulate(vertices);
//    if(triangles.length>2){draw()};
    
//     requestAnimationFrame(doDelaunay);
//   }
//   requestAnimationFrame(doDelaunay);

// });