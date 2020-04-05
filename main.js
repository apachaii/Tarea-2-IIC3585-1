function displayDate() {
    document.getElementById("demo").innerHTML = Date();
  }

  function rand(n){
    // creamos un numero al azar entre 1 y 10 (o cual sea la cantidad de imágenes)
     return(Math.floor(Math.random() * n + 1 ));
    }
    //guardas imagenes en el array
    let cambia_imagen = new Array();
    cambia_imagen[0] = "azul.png";
    cambia_imagen[1] = "verde.png";

    

    
    function myFunction() {

         doMove()

    }
    
    function cambiar(){
         document.getElementById("ia").src = cambia_imagen[rand(2)-1];
    }
    let getRandomNumber = size => {
      return Math.floor(Math.random() * size);
    }
    let bajar = size => {
 
    }

    function doMove() {

      let elVirus = document.getElementById("ia");
      elVirus.style.marginLeft = getRandomNumber(500)+"px";
      elVirus.style.marginRight = getRandomNumber(500)+"px";
      

    //   for (let i = 500; i > 0; i--) {
    //      let n =+ i;
    //      let elVirus = document.getElementById("ia");
    //      elVirus.style.marginTop =  n+"px";
    //     console.log(n)
    //  }
      
  }

  let $map = document.getElementById("ia");
  let clicks = 0;

  $map.addEventListener('click', function (e) {
   console.log('click');
   clicks++;
   document.getElementById("puntos").innerHTML = clicks;
});

function bajara(n){
  return n-1;
}


window.onload = (event) => {

  let px = 0
   document.getElementById("puntos").innerHTML = clicks;
   cambiar()
  // setInterval('myFunction()',500)
 myFunction()
 let ff = document.getElementById("ia");
 let py = 0
 setInterval(()=>{
  
    py = px++
   ff.style.marginTop =  py+"px";

  if(py === 740 ){
    myFunction()
    ff.style.marginTop =  0+"px";
   px = 0
   py = 0
  }
 },10)



 

};

