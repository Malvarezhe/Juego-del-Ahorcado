//Declaración de variables y/o constantes de tipo global
aciertos = 0;
erroneas = 0;
arrayteclas = [];
const cuadroTexto = document.querySelector(".palabra") //textarea
const cuadroAdivinadas = document.querySelector(".adivinadas")
arrayPalabras = ["ALURA", "ORACLE", "HTML", "JAVA", "BARCO", "WEB", "DESING", "PIRATA", "AHORCADO", "CCS", "PERRO", "MAURICIO", "SHIRLEY", "GAMER", "XBOX", "PYTHON", "GOKU", "SOFIA"];


//Función para capturar y guardar texto ingresado en arrglo
function capturarTexto() {

    let insertado = document.getElementsByClassName("palabra");

    arraynew = [];
    for (var i = 0; i < insertado.length; i++) {
        arraynew[i] = insertado[i].value;
    }

    cuadroTexto.value = ""; //limpiar cuadro texto

    //Válidación de campo de texto vacio
    if (arraynew == '') {
        alert("El campo de texto esta vacío")
        arrayPalabras = arrayPalabras;
    } else {
        arrayPalabras = arrayPalabras.concat(arraynew);
    }

    console.log("Soy el nuevo array: " + arrayPalabras);
    sessionStorage.setItem("Arrayp", arrayPalabras); //almaceno variable en session storage del navegador
}


//Función seleccionar palabra secreta
function seleccionarpalabra(arrayPal) {

    let arregloEntrada = arrayPal;
    let aleatorio = Math.floor(Math.random() * arregloEntrada.length);
    let pseleccionada = arregloEntrada[aleatorio].toUpperCase();

    sessionStorage.setItem("pSecreta", pseleccionada);
    return pseleccionada;
}


//Función para creación de etiquetas html textarea acorde a longitud de palabra secreta
function letrasAdivinadas(palabraSecreta) {

    document.getElementById("letrasAdivinadas").innerHTML = ""; //Limpia el contenido del contenedor para un nuevo juego. 

    let contador = 0;  //contador para construcción de ids

    for (let letra of palabraSecreta) {
        const listaAdivinadas = document.getElementById("letrasAdivinadas");
        const areaTexto = document.createElement("textarea");
        areaTexto.classList.add("words-acertadas");
        areaTexto.setAttribute("id", "letAdivinada" + contador);
        areaTexto.setAttribute("readonly", "true");
        areaTexto.textContent = '';
        listaAdivinadas.appendChild(areaTexto);
        contador++;
    }
}


//Función para creación de etiquetas html textarea para letras erróneas
function letrasErroneas() {

    document.getElementById("letrasIncorrectas").innerHTML = ""; //Limpia el contenido del contenedor para un nuevo juego. 

    let juego_adivinado = [];
    let contador = 0; //contador para construcción de ids

    for (let i = 0; i <= 8; i++) {
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

    //LLamo palabra secreta almacenada en sessionStorage
    let PalSecreta = sessionStorage.getItem("pSecreta");

    let contadorTecla = 0;
    let contadorAciertos = 0;
    const teclaPresionada = evento.key.toLocaleUpperCase();

    arrayteclas.push(teclaPresionada); //almaceno array de teclas

    //Si se repite la tecla presionada aumento el contador
    arrayteclas.forEach((i) => {
        if (i == teclaPresionada) {
            contadorTecla++;
        }
    });

    if (teclaPresionada.match(/^[A-ZÑ]$/i)) { //solo toma caracteres alfabéticos, sin números ni símbolos
        console.log("TeclaPresionada " + teclaPresionada);

    } else {
        cuadroTexto.value = "";
        alert("Caracter no válido")
    }

    if (contadorTecla == 1) {
        for (let letra = 0; letra < PalSecreta.length; letra++) {

            if (PalSecreta[letra] == teclaPresionada) {

                const listaAdivinadas = document.getElementById("letrasAdivinadas");
                const areaTexto = document.getElementById("letAdivinada" + letra);
                areaTexto.textContent = teclaPresionada;

                aciertos++;

                //Contador para validar posteriormente palabras erroneas
                contadorAciertos++;

                if (aciertos == PalSecreta.length) {

                    //Detener evento teclado
                    this.removeEventListener('keyup', validarletras);

                    //Alerta Ganaste
                    Swal.fire({
                        title: '¡Felicidades!',
                        text: 'Ganaste',
                        imageUrl: 'https://user-images.githubusercontent.com/106354407/193883474-ff0ddda1-6b4b-4eb6-ad9a-39fc0d2d919a.png',
                        imageWidth: 400,
                        imageHeight: 300,
                        imageAlt: 'Custom image',
                      })      
                }
            }

        } if (contadorAciertos == 0) {
            erroneas++; //Contador de vidas

            //llamado de función para cambio de imagen(estado) de ahorcado
            imagenes(erroneas);

            //Reemplazo de valores de campo de texto vació por letras erroneas
            const listaErroneas = document.getElementById("letrasIncorrectas");
            const areaTexto = document.getElementById("letIncorrecta" + erroneas);
            areaTexto.textContent = teclaPresionada;

            if (erroneas == 8) {

                //Detener evento teclado
                this.removeEventListener('keyup', validarletras);

                //Alerta perdiste
                Swal.fire({
                    title: '¡ooh Nooo!',
                    text: 'Perdiste',
                    imageUrl: 'https://user-images.githubusercontent.com/106354407/193887000-532a5b26-c432-4241-ad53-04e8d8bb8b8f.png',
                    imageWidth: 400,
                    imageHeight: 300,
                    imageAlt: 'Custom image',
                  })
            }
        }
    } 
}


//Función para cambio de imagen ahorcado
function imagenes(contadorImagen) {

    const ahorcado = "./img/Estado" + contadorImagen + ".png";
    const imagencam = document.getElementById("imgAhorcado").src = ahorcado;
}


//Captura de evento teclado al soltar tecla y llamado de función
document.addEventListener("keyup", validarletras);


//---------------------------------------------------------------------------------------------------
//Función de juego nuevo
function juegoNuevo() {

    
    //Reniciando estados globales
    aciertos = 0;
    erroneas = 0;
    arrayteclas = [];
    document.addEventListener("keyup", validarletras);

    cambiarImg = document.getElementById("imgAhorcado").src = "./img/Estado0.png";
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

