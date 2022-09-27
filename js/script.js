
const cuadroTexto = document.querySelector(".palabra") //textarea
const cuadroAdivinadas = document.querySelector(".adivinadas")

//Capturar texto entrada y retornar arreglo con palabra ingresada
function guardarTexto(arrayGuardar){
    let listPalabras = document.getElementsByClassName("palabra");
        
    for (var i = 0; i < listPalabras.length; i++) {    
        arrayGuardar[i] = listPalabras[i].value;    
        }
        cuadroTexto.value = "" //limpiar cuadro texto
        return arrayGuardar;
    }    

//Seleccionar palabra a adivinar de forma aleatoria
function seleccionarpalabra(arrayGuardar) {
   //arrayGuardar = ["ALURA", "ORACLE", "HTML", "JAVASCRIPT", "DEVELOPER"]; 
    //let arregloEntrada = guardarTexto(arrayGuardar);
    let arregloEntrada = arrayGuardar;
    
    //console.log(arregloEntrada);

    var aleatorio = Math.floor(Math.random()*arregloEntrada.length);
    palabraSecreta = arregloEntrada[aleatorio].toUpperCase();
    //console.log(palabraSecreta)

    return palabraSecreta;
}

//Función letras adivinadas y creación de spans 
function letrasAdivinadas(arrayGuardar) {

    let palabraadivinar = seleccionarpalabra(arrayGuardar);
    

    //cuadroAdivinadas.value = "" //Reiniciar estado ??
    for (let i=0; i < palabraadivinar.length; i++){
        const listaAdivinadas = document.getElementById("letrasAdivinadas");
        const spanjs= document.createElement("span");
        spanjs.classList.add("words-acertadas");
        const letras = document.createTextNode("");
        spanjs.appendChild(letras)
        listaAdivinadas.appendChild(spanjs); 
    }
    
    return palabraadivinar;
}

//Función letras erróneas y creación de spans 
function letrasErroneas() {
    const listaErroneas = document.getElementById("letrasIncorrectas");
    const spanjs= document.createElement("span");
    spanjs.classList.add("words-incorrectas");
    const letras = document.createTextNode("M");
    spanjs.appendChild(letras)

    listaErroneas.appendChild(spanjs); 
}

//Capturar evento teclado y definición de rango de letras
function validarletras(evento) {
    //console.log(evento.key);
    let letraingresada = evento.key.toLocaleUpperCase();

    if (letraingresada.match(/^[A-ZÑ]$/i)) { //solo toma caracteres alfabéticos, sin números ni símbolos
        console.log("letra " + letraingresada);
    } else {
        alert("Caracter no válido")
    }
}

//Va en función de nuevo game
//Capturar evento teclado
document.addEventListener("keyup", validarletras);

//función para validar si gana o pierde
function juegoNuevo() {

    //const cambiarImg = document.getElementById("ahorcado");
    
    const cambiarImg = document.getElementById("imgAhorcado").src = "./img/Estado0.png";
    arrayGuardar = ["ALURA", "ORACLE", "HTML", "JAVASCRIPT", "DEVELOPER"]; 
    let palabra = letrasAdivinadas(arrayGuardar);
    console.log(palabra);
    //document.getElementsByClassName("words-acertadas").remove();
}



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