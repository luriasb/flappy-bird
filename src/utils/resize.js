const resize = () => {
  var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
  var wratio = width / height, ratio = canvas.width / canvas.height;

  if(wratio < ratio){
    canvas.style.left = '50%';
    canvas.style.transform = 'translateX(-50%)';
  } else {
    canvas.style.left = '0';
    canvas.style.transform = 'translateX(0)';
  }
  if (wratio > 0.52) {
      canvas.style.width = "auto";
      canvas.style.height = height + "px";
  } else {
    canvas.style.width = (width / ratio)+15 + "px";
      canvas.style.height = "auto";
  }
}

export default resize