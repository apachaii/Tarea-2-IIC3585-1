let puntos = 0
let n = 0;
let cambia_tiempo = new Array();
let cuadrado = document.getElementById("div1")
let verde = document.getElementById("div2")
const subject = new Rx.Subject()
cambia_tiempo[0] = 4;
cambia_tiempo[1] = 3;
cambia_tiempo[2] = 3;
cambia_tiempo[3] = 1;
let p = 0



function rand(n){
  return(Math.floor(Math.random() * n  ));
}

window.setInterval(function(){
  p++;
},1000);


cuadrado.style.animation = `mymove3`;
verde.style.animation = `mymove3`;
    window.addEventListener('keypress', function(e){     

      let jugar = e.key;
      if(jugar === "j" ){
        
        setTimeout(cuadradoStart, 5000);
        setTimeout(verdeStart, 3000);

        window.setInterval(function(){
          n++;
        },1000);

        
        setInterval(()=>{
          console.log(n)
         subject.next(n);
        },1000);

      }//fin j
    });//fin 1
    
      function cuadradoStart(){
        cuadrado.style.animation = ``  
      }
      function verdeStart(){
        verde.style.animation = `` 
      }

       

       
       subject.subscribe((n) => {
        //cuadrado azul
      window.addEventListener('keypress', function(e){
        let letra = e.key;
        t = 9+5
        console.log(n)
        if(letra === "z" && + n === t){

          cuadrado.style.animation = `mymove3`;
          puntos = puntos+1
          console.log("puntos" +puntos)             
        }//fin z
                   
       });//fin 2

        if (n === 15){
        console.log("paso por aca")
        cuadrado.style.animation = `mymove3`;
        puntos = puntos-10

       }
      });
      subject.subscribe((n) => {                   
       //cuadrado verde
       window.addEventListener('keypress', function(e){
        let letra = e.key;
        t = 9+3
        console.log(n)
        if(letra === "x" && + n === t){

          verde.style.animation = `mymove3`;
          puntos = puntos+1
          console.log("puntos"+puntos)             
        }//fin z
                   
       });//fin 2
       
      });


   window.onload = function() {


  };