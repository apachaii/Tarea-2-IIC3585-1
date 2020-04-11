let puntos = 0
let n = 0;
let cuadrado = document.getElementById("div1")
let verde = document.getElementById("div2")
let rojo = document.getElementById("div3")
const subject = new Rx.Subject()
let cambia_tiempo = new Array();
cambia_tiempo[0] = 1000;
cambia_tiempo[1] = 3000;
cambia_tiempo[2] = 5000;

let p = 0

let red=0
let blue =0
let greeen =0

function rand(n){
  return(Math.floor(Math.random() * n  ));
}

window.setInterval(function(){
  p++;
},1000);

rojo.style.animation = `mymove3`;
cuadrado.style.animation = `mymove3`;
verde.style.animation = `mymove3`;

    window.addEventListener('keypress', function(e){     

      let jugar = e.key;
      if(jugar === "j" ){
        red =cambia_tiempo[rand(3)]
        greeen =  cambia_tiempo[rand(3)]
        blue = cambia_tiempo[rand(3)]

        
        setTimeout(cuadradoStart, blue);
        setTimeout(verdeStart,greeen);
        setTimeout(rojoStart, red);

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
      function rojoStart(){
        rojo.style.animation = `` 
      }


       

       
       subject.subscribe((n) => {
        //cuadrado azul
        t = 9+(blue/1000)
      window.addEventListener('keypress', function(e){
        let letra = e.key;
       
        console.log(n)
        if(letra === "z" && + n === t){

          cuadrado.style.animation = `mymove3`;
          puntos = puntos+1
          console.log("puntos" +puntos)     
    
        }//fin z
                   
       });//fin 2

        if (n === t){
        console.log("paso por aca")
        cuadrado.style.animation = `mymove3`;
        puntos = puntos-10

       }
      });

      subject.subscribe((n) => {                   
       //cuadrado verde
       t = 9+(greeen/1000)
       window.addEventListener('keypress', function(e){
        let letra = e.key;
        
        console.log(n)
        if(letra === "x" && + n === t){

          verde.style.animation = `mymove3`;
          puntos = puntos+1
          console.log("puntos"+puntos)  
         
        }//fin z
                   
       });//fin 2

       if (n === t){
        console.log("paso por aca")
        verde.style.animation = `mymove3`;
        puntos = puntos-10
 
       }
       
      });

      subject.subscribe((data) => {
       //cuadrado rojo
       t = 9+(red/1000)
      window.addEventListener('keypress', function(e){
        let letra = e.key;
      
        console.log(n)
        if(letra === "c" && + n === t){

          rojo.style.animation = `mymove3`;
          puntos = puntos+1
          console.log("puntos" +puntos)        
  
        }//fin z
                   
       });//fin 2

        if (n === t){
        console.log("paso por aca")
        rojo.style.animation = `mymove3`;
        puntos = puntos-10

       }

    });
      
   window.onload = function() {


  };