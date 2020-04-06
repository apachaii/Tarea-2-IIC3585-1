
  function rand(n){
    // creamos un numero al azar entre 1 y 10 (o cual sea la cantidad de imágenes)
     return(Math.floor(Math.random() * n  ));
    }
    //guardas imagenes en el array
    let cambia_imagen = new Array();
    cambia_imagen[0] = "azul.png";
    cambia_imagen[1] = "verde.png";

    let cambia_psicion = new Array();
    cambia_psicion[0] = 100;
    cambia_psicion[1] = 250;
    cambia_psicion[2]= 400;
    let playButton = document.getElementById("play"); 
    let otro=  document.getElementById("otro")
    let ia = document.getElementById("ia")
    let myaudio = document.getElementById("myaudio");
    let punto = 0
    let dddd = document.getElementById("puntos")
    dddd.innerText = punto
    function myFunction() {

         doMove()

    }
    function myFunction2() {

      doMove2()

 }

    let getRandomNumber = size => {
      return Math.floor(Math.random() * size);
    }

    function doMove() {
      ia.style.marginLeft = cambia_psicion[rand(3)]+"px";
      // ia.style.marginRight = cambia_psicion[rand(3)]+"px";
      console.log(ia.style.marginLeft )

  }

  function doMove2() {

    otro.style.marginLeft =cambia_psicion[rand(3)]+"px";
    // otro.style.marginRight = cambia_psicion[rand(3)]+"px";

}



  
  playButton.addEventListener("click",function(){
     myaudio.play();
     let px = 0
     let px2 = 0
     ia.src  = "azul.png"
     otro.src = "verde.png";

     window.addEventListener('keypress', function(e){
      let letra = e.key;

      if(letra === "z"){
        
        let dd = ia.style.marginTop
        console.log()
        if(parseInt(dd) > 560 && parseInt(dd) < 650){
           punto = punto+1
           
          console.log(punto)
        }
        else{
          punto = punto-1
        }
        dddd.innerText = punto
      }
       
     });
   
     // setInterval('myFunction()',500)
    myFunction()
    myFunction2()
    let py2 = 0
   
    setInterval(()=>{
       py2 = px2++
      ia.style.marginTop =  py2+"px";
   
     if(py2 === 640 ){
       myFunction()
       ia.style.marginTop =  0+"px";
      px2 = 0
      py2 = 0
     }
    },10)
  }); 



function bajara(n){
  return n-1;
}


window.onload = (event) => {



//  setInterval(()=>{
//   py = px++
//  otro.style.marginTop =  py+"px";

// if(py === 640 ){
//   myFunction2()
//   otro.style.marginTop =  0+"px";
//  px = 0
//  py = 0
// }
// },10)





};

