
const cuadroTexto = document.querySelector(".palabra") //textarea
const cuadroAdivinadas = document.querySelector(".adivinadas")
arrayPalabras = ["ALURA", "ORACLE", "HTML", "JAVASCRIPT", "DEVELOPER"]; 
//let palabraSecreta = "";


function capturarSeleccionar(){
    let insertado = document.getElementsByClassName("palabra");

    arraynew = [];
    for (var i = 0; i < insertado.length; i++) {    
        arraynew[i] = insertado[i].value;   
    }

    cuadroTexto.value = ""; //limpiar cuadro texto
    arrayPalabras = arrayPalabras.concat(arraynew);

    console.log(arrayPalabras);
    sessionStorage.setItem("Arrayp", arrayPalabras);  

    //Seleccionar palabra aleatoria
   /*  var aleatorio = Math.floor(Math.random()*arrayPalabras.length);
    let palabraSecreta = arrayPalabras[aleatorio].toUpperCase();
    console.log("Palabra a adivinar: " + palabraSecreta); */

    //Almacenar palabra secreta de forma temporal
    //sessionStorage.setItem("palabraSecreta", palabraSecreta);  
} 



/* function guardarTexto(arrayGuardar){
    let listPalabras = document.getElementsByClassName("palabra");
        
    for (var i = 0; i < listPalabras.length; i++) {    
        arrayGuardar[i] = listPalabras[i].value;    
    }
        cuadroTexto.value = "" 
        console.log(arrayGuardar);
        return arrayGuardar;
    }   */  


function seleccionarpalabra(arrayPalabras) {

    let arregloEntrada = arrayPalabras;
    
    var aleatorio = Math.floor(Math.random()*arregloEntrada.length);
    let pseleccionada = arregloEntrada[aleatorio].toUpperCase();
    console.log("Soy palabra secreta: " + pseleccionada);
    return pseleccionada;
}

//Función letras adivinadas y creación de spans 
function letrasAdivinadas(palabraSecreta) {

    //let palabraadivinar = seleccionarpalabra(arrayGuardar);
    
    document.getElementById("letrasAdivinadas").innerHTML=""; //Limpia el contenido del contenedor para un nuevo juego. 

    for (let i=0; i < palabraSecreta.length; i++){
        const listaAdivinadas = document.getElementById("letrasAdivinadas");
        const spanjs= document.createElement("span");
        spanjs.classList.add("words-acertadas");
        const letras = document.createTextNode("");
        spanjs.appendChild(letras)
        listaAdivinadas.appendChild(spanjs); 
    }
}

//Función letras erróneas y creación de spans 
function letrasErroneas() {

    document.getElementById("letrasIncorrectas").innerHTML=""; //Limpia el contenido del contenedor para un nuevo juego. 

    for (let i=0; i < 7; i++){
        const listaErroneas = document.getElementById("letrasIncorrectas");
        const spanjs= document.createElement("span");
        spanjs.classList.add("words-incorrectas");
        const letras = document.createTextNode("M");
        spanjs.appendChild(letras)
        listaErroneas.appendChild(spanjs); 
    }
}

//Definición de rango de letras
function validarletras(evento) {
    //console.log(evento.key);
    let letraingresada = evento.key.toLocaleUpperCase();

    if (letraingresada.match(/^[A-ZÑ]$/i)) { //solo toma caracteres alfabéticos, sin números ni símbolos
        console.log("letra " + letraingresada);
    } else {
        alert("Caracter no válido")
    }
}


//función para validar si gana o pierde
function juegoNuevo() {
    document.addEventListener("keyup", validarletras); 
    const cambiarImg = document.getElementById("imgAhorcado").src = "./img/Estado0.png";
    letrasErroneas();  

    //Obtener arreglo de Strings 
    let arrayPalabras = sessionStorage.getItem("Arrayp");
    //Convertir String en un arreglo
    let arreglo = arrayPalabras.split(',');

    console.log("Soy el array: " + arreglo);

    let palabraSecreta = seleccionarpalabra(arreglo);
    console.log(palabraSecreta);
    
    
    letrasAdivinadas(palabraSecreta);

}


/* 
document.getElementById("focusButton").addEventListener("click", () => {
    document.getElementById("myTextField").focus();
  });
 */
/* EVENTO PARA DEJAR DE CAPTURAR EL TECLADO */
/* function noCapturarLetra() {
    document.removeEventListener("keydown", capturarLetra);
}
 */




//for (let letra of errado) {
  
//document.addEventListener("DOMContentLoaded", crearParrafo);

/* window.nuevoJuego = function nuevoJuego() {
    let palabra = palabra_aleatoria()
    juego = {}
    juego.palabra = palabra
    juego.estado = 7
    juego.adivinado = []
    juego.errado = []
    finalizado = false
    dibujar(juego)
} */



//Validar solo alfabeto
/* /^[A-Z]+$/i
Donde:

^ indica que el patrón debe iniciar con los caracteres dentro de los corchetes

[A-Z] indica que los caracteres admitidos son letras del alfabeto

+ indica que los caracteres dentro de los corchetes se pueden repetir

$ indica que el patrón finaliza con los caracteres que están dentro de los corchetes.

i indica que validaremos letras mayúsculas y minúsculas (case-insensitive)

Así, una posible implementación para nuestra validación sería la siguiente: */