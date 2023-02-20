  function _(item){
  return document.querySelector(item);
}
let isDrawing = false;
const canvas = _("canvas");
var color = _("#favcolor");
var size = _("#size");
var reset =_("#reset");
var submit =_("#submit");
var popup = _("#popup");
var imgdataa = _("#datval");
var control =_("#controls");
var ctx = canvas.getContext("2d");
resize();
reset.addEventListener("click",function(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
});

submit.addEventListener("click",function(){
  var imagedata = canvas.toDataURL();
imgdataa.value = imagedata;
  popup.style.display="block";
  size.style.display="none";

});
canvas.addEventListener("touchstart",function(event){
// console.log(event);
isDrawing = true;
ctx.beginPath();

});
canvas.addEventListener("mousedown",function(event){
isDrawing = true;
ctx.beginPath();
ctx.moveTo(event.clientX,event.clientY);

});
canvas.addEventListener("touchmove",function(event){
// console.log(event);
  if(isDrawing==false){
    return;
  }
  ctx.lineWidth = size.value;
  ctx.lineCap ="round";
  ctx.strokeStyle=color.value;

  ctx.lineTo(event.touches[0].clientX,event.touches[0].clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(event.touches[0].clientX,event.touches[0].clientY);

});
canvas.addEventListener("mousemove",function(event){
  if(isDrawing==false){
    return;
  }
  ctx.lineWidth = size.value;
  ctx.lineCap ="round";
  ctx.strokeStyle=color.value;

  ctx.lineTo(event.clientX,event.clientY);
  ctx.stroke();

});
canvas.addEventListener("touchend",function(event){
  isDrawing=false;

});
canvas.addEventListener("mouseup",function(event){
  isDrawing=false;

});
function resize(){
  canvas.height = window.innerHeight - (control.offsetHeight);
  canvas.width = window.innerWidth;
}
