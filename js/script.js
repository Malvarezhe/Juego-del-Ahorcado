let letrasErradas = "";
aciertos = 0;
erroneas = 0;
arrayteclas = [];
const cuadroTexto = document.querySelector(".palabra") //textarea
const cuadroAdivinadas = document.querySelector(".adivinadas")
arrayPalabras = ["ALURA", "ORACLE", "HTML", "JAVASCRIPT", "DEVELOPER"];


//Función para capturar y guardar texto ingresado en arrglo
function capturarTexto() {

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
    let aleatorio = Math.floor(Math.random() * arregloEntrada.length);
    let pseleccionada = arregloEntrada[aleatorio].toUpperCase();

    sessionStorage.setItem("pSecreta", pseleccionada);
    return pseleccionada;
}

//Función letras adivinadas y creación de spans 
function letrasAdivinadas(palabraSecreta) {

    document.getElementById("letrasAdivinadas").innerHTML = ""; //Limpia el contenido del contenedor para un nuevo juego. 

    let contador = 0;

    for (let letra of palabraSecreta) {
        const listaAdivinadas = document.getElementById("letrasAdivinadas");
        const areaTexto = document.createElement("textarea");
        areaTexto.classList.add("words-acertadas");
        areaTexto.setAttribute("id", "letAdivinada" + contador);
        areaTexto.setAttribute("readonly", "true");
        //areaTexto.setAttribute("value", "el mejor");
        areaTexto.textContent = '';
        listaAdivinadas.appendChild(areaTexto);
        contador++;
    }

}

//Función letras erróneas y creación de spans 
function letrasErroneas() {

    document.getElementById("letrasIncorrectas").innerHTML = ""; //Limpia el contenido del contenedor para un nuevo juego. 

    let juego_adivinado = [];
    let contador = 0; //Vontador para ids

    for (let i = 0; i < 8; i++) {
        const listaErroneas = document.getElementById("letrasIncorrectas");
        const areaTexto = document.createElement("textarea");
        areaTexto.classList.add("words-incorrectas");
        areaTexto.setAttribute("id", "letIncorrecta" + contador);
        areaTexto.setAttribute("readonly", "true");
        areaTexto.textContent = '';
        listaErroneas.appendChild(areaTexto);
        contador++;
    }
}

//Función validar evento teclado y construcción de palabra adivinada
function validarletras(evento) {

    const teclaPresionada = evento.key.toLocaleUpperCase();
    console.log("Soy tecla preciosonada: " + typeof(teclaPresionada))

    let contando = 0;
    //arrayteclas.push(teclaPresionada) //almaceno array de teclas
    arrayteclas = arrayteclas + teclaPresionada;
    console.log("Soy arrayteclas: " + typeof(arrayteclas))

    /* arrayteclas.forEach(element => {
        if(element == teclaPresionada) {
            
            return console.log("si estoy")
        }else {
            return console.log("no estoy")
        }
    }); */

    for (let i = 0; i < arrayteclas.length; i++) {
        if (teclaPresionada == arrayteclas[i] && !arrayteclas.includes(teclaPresionada)) {
            console.log("si estoy")
        }else {
            console.log("no estoy")
        }
    }

    /* if (teclaPresionada. arrayteclas) {
        console.log("si estoy")
    }else {
        console.log("no estoy")
    } */


    //LLamo palabra secreta almacenada en sessionStorage
    let PalSecreta = sessionStorage.getItem("pSecreta");

    if (teclaPresionada.match(/^[A-ZÑ]$/i)) { //solo toma caracteres alfabéticos, sin números ni símbolos
        console.log("letra " + teclaPresionada);

    } else {
        alert("Caracter no válido")
    }


    /* for (let letra = 0; letra < PalSecreta.length; letra++) {

        if (PalSecreta[letra] == teclaPresionada) {
            console.log("letra secreta: " + PalSecreta[letra] + " letra oprimida: " + teclaPresionada)

            const listaAdivinadas = document.getElementById("letrasAdivinadas");
            const areaTexto = document.getElementById("letAdivinada" + letra);
            areaTexto.textContent = teclaPresionada;

            aciertos++;

            console.log("Aciertos: " + aciertos)

            if (aciertos == PalSecreta.length) {
                console.log("Ganaste");
            } else {
                letrasErradas++;
                console.log("Letras erradas: " + letrasErradas)
            }

        } 
    }
 */
    /* for (let letra = 0; letra < PalSecreta.length; letra++) {

        if (PalSecreta[letra] != teclaPresionada) {
            console.log("letra secreta: " + PalSecreta[letra] + " letra erronea: " + teclaPresionada)
            
            erroneas++;
            //letrasErradas += teclaPresionada;

            const listaErroneas = document.getElementById("letrasAdivinadas");
            const areaTexto = document.getElementById("letIncorrecta" + letra);
            areaTexto.textContent = teclaPresionada;

            

            console.log("Erroneas: " + erroneas)

            if (erroneas > PalSecreta.length) {
                console.log("Ganaste");
            }
        } 
    } */
}

//Captura de evento teclado y llamado de función
document.addEventListener("keyup", validarletras);

//Función de juego nuevo
function juegoNuevo() {

    const cambiarImg = document.getElementById("imgAhorcado").src = "./img/Estado0.png";
    console.log("Soy array original: " + arrayPalabras);

    //Obtener arreglo de Strings guardado de sessionStorage
    let arrayguardado = sessionStorage.getItem("Arrayp");

    let palabraSecreta = "";

    //Si no se usa la opción de guardar palabras se valida para usar el array de palabras predefinido
    if (arrayguardado == null) {
        palabraSecreta = seleccionarpalabra(arrayPalabras);

    } else {
        //Convertir String en un arreglo
        let arreglo = arrayguardado.split(',');
        palabraSecreta = seleccionarpalabra(arreglo);
    }

    console.log("Soy arra final: " + arrayguardado);
    console.log("Soy palabra secreta: " + palabraSecreta);
    letrasErroneas();
    letrasAdivinadas(palabraSecreta);
}

