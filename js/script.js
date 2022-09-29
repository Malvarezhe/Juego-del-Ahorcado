
const cuadroTexto = document.querySelector(".palabra") //textarea
const cuadroAdivinadas = document.querySelector(".adivinadas")
arrayPalabras = ["ALURA", "ORACLE", "HTML", "JAVASCRIPT", "DEVELOPER"]; 


//Función para capturar y guardar texto ingresado en arrglo
function capturarTexto(){

    let insertado = document.getElementsByClassName("palabra");

    /* if (insertado.includes(insertado)) {
        return
    }
 */
    arraynew = [];
    for (var i = 0; i < insertado.length; i++) {    
        arraynew[i] = insertado[i].value;   
    }

    cuadroTexto.value = ""; //limpiar cuadro texto

    //Válidación de campo de texto
    if (arraynew == '') {
        alert("El campo de texto esta vacío")
        arrayPalabras = arrayPalabras;
    } 
    
    else {
        arrayPalabras = arrayPalabras.concat(arraynew);
    }

    console.log("Soy el nuevo array: " + arrayPalabras);
    sessionStorage.setItem("Arrayp", arrayPalabras);  

    //Seleccionar palabra aleatoria
   /*  var aleatorio = Math.floor(Math.random()*arrayPalabras.length);
    let palabraSecreta = arrayPalabras[aleatorio].toUpperCase();
    console.log("Palabra a adivinar: " + palabraSecreta); */

    //Almacenar palabra secreta de forma temporal
    //sessionStorage.setItem("palabraSecreta", palabraSecreta);  
} 



 //FUnción seleccionar palabra secreta
function seleccionarpalabra(arrayPal) {

    let arregloEntrada = arrayPal;
    var aleatorio = Math.floor(Math.random()*arregloEntrada.length);
    let pseleccionada = arregloEntrada[aleatorio].toUpperCase();

    sessionStorage.setItem("pSecreta", pseleccionada);  
    return pseleccionada;
}

//Función letras adivinadas y creación de spans 
function letrasAdivinadas(palabraSecreta) {
    
    document.getElementById("letrasAdivinadas").innerHTML=""; //Limpia el contenido del contenedor para un nuevo juego. 

    for (let i=0; i < palabraSecreta.length; i++){
        const listaAdivinadas = document.getElementById("letrasAdivinadas");
        const spanjs= document.createElement("span");
        spanjs.classList.add("words-acertadas");
        spanjs.setAttribute("id","letAdivinada");
        const letras = document.createTextNode("");
        //const letras = document.createTextNode(palabraSecreta[i]);
        spanjs.appendChild(letras)
        listaAdivinadas.appendChild(spanjs); 
    }

   /*  document.getElementById("letrasAdivinadas").innerHTML="";
    for (let i=0; i < palabraSecreta.length; i++){
        const listaAdivinadas = document.getElementById("letrasAdivinadas");
        const spanjs= document.createElement("span");
        spanjs.classList.add("words-acertadas");
        spanjs.setAttribute("id","letAdivinada");
        const letras = document.createTextNode(palabraSecreta[i]);
        spanjs.appendChild(letras)
        listaAdivinadas.appendChild(spanjs); 
    } */
    /* document.getElementById("letAdivinada").innerHTML="M";
    document.getElementById("letAdivinada").innerHTML="A"; */
}

//Función letras erróneas y creación de spans 
function letrasErroneas() {

    document.getElementById("letrasIncorrectas").innerHTML=""; //Limpia el contenido del contenedor para un nuevo juego. 

    for (let i=0; i < 7; i++){
        const listaErroneas = document.getElementById("letrasIncorrectas");
        const spanjs= document.createElement("span");
        spanjs.classList.add("words-incorrectas");
        spanjs.setAttribute("id","letIncorrecta");
        const letras = document.createTextNode("M");
        spanjs.appendChild(letras)
        listaErroneas.appendChild(spanjs); 
    }
    
}

function validarletras(evento) {
    //console.log(evento.key);
    const teclaPresionada = evento.key.toLocaleUpperCase();

    let PalSecreta = sessionStorage.getItem("pSecreta");
    //document.querySelector("#letAdivinada").textContent = letraingresada.detail;

        if (teclaPresionada.match(/^[A-ZÑ]$/i)) { //solo toma caracteres alfabéticos, sin números ni símbolos
            console.log("letra " + teclaPresionada);
            
        } else {
            alert("Caracter no válido")
        }

        for (let letra = 0; letra < PalSecreta.length; letra++) {
                
            if (PalSecreta[letra] == teclaPresionada) {
                    console.log("Son iguales")
                    //document.getElementById("letAdivinada").innerHTML="M";
            }  
        }

            //document.getElementById("letAdivinada").innerHTML="M";
    }
    

document.addEventListener("keyup", validarletras); 

//Definición de rango de letras
/* function validarletras(evento) {
    //console.log(evento.key);
    let letraingresada = evento.key.toLocaleUpperCase();
    //document.querySelector("#letAdivinada").textContent = letraingresada.detail;

    if (letraingresada.match(/^[A-ZÑ]$/i)) { //solo toma caracteres alfabéticos, sin números ni símbolos
        console.log("letra " + letraingresada);

       

    } else {
        alert("Caracter no válido")
    }
  
} */


    
function juegoNuevo() {
    
    //document.addEventListener("keyup", validarletras); 

    const cambiarImg = document.getElementById("imgAhorcado").src = "./img/Estado0.png";
    console.log("Soy array original: "+ arrayPalabras);
    
    //Obtener arreglo de Strings guardado de sessionStorage
    let arrayguardado = sessionStorage.getItem("Arrayp");
    
    let palabraSecreta = "";

    if (arrayguardado == null) {
        palabraSecreta = seleccionarpalabra(arrayPalabras);
       
    }else {
        //Convertir String en un arreglo
        let arreglo = arrayguardado.split(',');
        palabraSecreta = seleccionarpalabra(arreglo);
    }

    console.log("Soy arra final: "+ arrayguardado);
    console.log("Soy palabra secreta: " + palabraSecreta);
    letrasErroneas();  
    letrasAdivinadas(palabraSecreta);
    //document.getElementById("letAdivinada").innerHTML="M";

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
/* function seleccionarpalabraEntrada(arrayPal) {

        let arregloEntrada = arrayPal;
        
        var aleatorio = Math.floor(Math.random()*arregloEntrada.length);
        let pseleccionada = arregloEntrada[aleatorio].toUpperCase();
        console.log("Soy palabra secreta: " + pseleccionada);
        return pseleccionada;
}
 */



//Validar solo alfabeto
/* /^[A-Z]+$/i
Donde:

^ indica que el patrón debe iniciar con los caracteres dentro de los corchetes

[A-Z] indica que los caracteres admitidos son letras del alfabeto

+ indica que los caracteres dentro de los corchetes se pueden repetir

$ indica que el patrón finaliza con los caracteres que están dentro de los corchetes.

i indica que validaremos letras mayúsculas y minúsculas (case-insensitive)

Así, una posible implementación para nuestra validación sería la siguiente: */