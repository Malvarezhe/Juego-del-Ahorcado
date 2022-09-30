
const cuadroTexto = document.querySelector(".palabra") //textarea
const cuadroAdivinadas = document.querySelector(".adivinadas")
arrayPalabras = ["ALURA", "ORACLE", "HTML", "JAVASCRIPT", "DEVELOPER"]; 


//Función para capturar y guardar texto ingresado en arrglo
function capturarTexto(){

    let insertado = document.getElementsByClassName("palabra");

    arraynew = [];
    for (var i = 0; i < insertado.length; i++) {    
        arraynew[i] = insertado[i].value;   
    }

    cuadroTexto.value = ""; //limpiar cuadro texto

    //Válidación de campo de texto
    if (arraynew == '') {
        alert("El campo de texto esta vacío")
        arrayPalabras = arrayPalabras;
    } else {
        arrayPalabras = arrayPalabras.concat(arraynew);
    }

    console.log("Soy el nuevo array: " + arrayPalabras);
    sessionStorage.setItem("Arrayp", arrayPalabras);  
} 


 //Función seleccionar palabra secreta
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

    let contador = 0;

    for (let i=0; i < palabraSecreta.length; i++){
        const listaAdivinadas = document.getElementById("letrasAdivinadas");
        const spanjs= document.createElement("span");
        spanjs.classList.add("words-acertadas");
        spanjs.setAttribute("id","letAdivinada" + contador);
        const letras = document.createTextNode("");
        spanjs.appendChild(letras)
        listaAdivinadas.appendChild(spanjs); 
        contador++;
    }

}

//Función letras erróneas y creación de spans 
function letrasErroneas() {

    document.getElementById("letrasIncorrectas").innerHTML=""; //Limpia el contenido del contenedor para un nuevo juego. 

    let contador = 0; //Vontador para ids

    for (let i=0; i < 7; i++){
        const listaErroneas = document.getElementById("letrasIncorrectas");
        const spanjs= document.createElement("span");
        spanjs.classList.add("words-incorrectas");
        spanjs.setAttribute("id","letIncorrecta" + contador);
        const letras = document.createTextNode("M");
        spanjs.appendChild(letras)
        listaErroneas.appendChild(spanjs); 
        contador++;
    }
}

//Función validar evento teclado y construcción de palabra adivinada
function validarletras(evento) {

    const teclaPresionada = evento.key.toLocaleUpperCase();

    //LLamo palabra secreta almacenada en sessionStorage
    let PalSecreta = sessionStorage.getItem("pSecreta");

    if (teclaPresionada.match(/^[A-ZÑ]$/i)) { //solo toma caracteres alfabéticos, sin números ni símbolos
        console.log("letra " + teclaPresionada);
            
    } else {
        alert("Caracter no válido")
    }

    for (let letra = 0; letra < PalSecreta.length; letra++) {
                
        if (PalSecreta[letra] == teclaPresionada) {
            console.log("Son iguales")

            document.getElementById("letrasIncorrectas").innerHTML=""; //Limpia el contenido del contenedor para un nuevo juego. 
          
            const listaAdivinadas = document.getElementById("letrasAdivinadas");
            const spanjs= document.getElementById("letAdivinada" + letra);
            const letras = document.createTextNode(PalSecreta[letra]);
            spanjs.appendChild(letras)
        }
    }  
} 

//Captura de evento teclado y llamado de función
document.addEventListener("keyup", validarletras); 

//Función de juego nuevo
function juegoNuevo() {

    const cambiarImg = document.getElementById("imgAhorcado").src = "./img/Estado0.png";
    console.log("Soy array original: "+ arrayPalabras);
    
    //Obtener arreglo de Strings guardado de sessionStorage
    let arrayguardado = sessionStorage.getItem("Arrayp");
    
    let palabraSecreta = "";

    //Si no se usa la opción de guardar palabras se valida para usar el array de palabras predefinido
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

}

