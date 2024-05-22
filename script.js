const htmlTag = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const boton = document.querySelectorAll('.app__card-button');
const inputMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
musica.loop = true;
const botonTiempo = document.querySelector('#start-pause');
const imgBotonTiempo = document.querySelector('.app__card-primary-butto-icon');
const textoTiempo = document.querySelector('#timer');
let tiempoSegundos = 1500;
let idIntervalo = null;
const playSound = new Audio('./sonidos/play.wav');
const pauseSound = new Audio('./sonidos/pause.mp3');
const beepSound = new Audio('./sonidos/beep.mp3');

inputMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{musica.pause()}
});

botonCorto.addEventListener('click', () => {
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click', () => {
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click', () => {
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

function cambiarContexto (contexto) {
    if(idIntervalo) {
        iniciarPausar();
    }
    
    boton.forEach(function(contexto) {
        contexto.classList.remove('active')        
    });
    
    htmlTag.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);
    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            tiempoSegundos = 1500;
            mostrarTiempo();
            
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro?,<br>
            <strong class="app__title-strong">haz una pausa corta.</strong>`;
            tiempoSegundos = 300;
            mostrarTiempo();

            break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie,<br>
            <strong class="app__title-strong">haz una pausa larga.</strong>`;
            tiempoSegundos = 900;
            mostrarTiempo();
            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if (tiempoSegundos <= 0){
        reiniciar()
        alert('tiempo')
        return
    }
    if (tiempoSegundos == parseInt(beepSound.duration)){
        beepSound.play()
    }
    tiempoSegundos -= 1
    mostrarTiempo();
}

botonTiempo.addEventListener('click', iniciarPausar)

function iniciarPausar () {
    if (idIntervalo) {
        imgBotonTiempo.setAttribute("src", "./imagenes/play_arrow.png")
        pauseSound.play()
        reiniciar()
        return
    }
    imgBotonTiempo.setAttribute("src", "./imagenes/pause.png")
    playSound.play()
    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function reiniciar(){
    clearInterval(idIntervalo);
    idIntervalo = null;
}

function mostrarTiempo(){
    const tiempo = new Date (tiempoSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute:'2-digit', second:'2-digit'})
    textoTiempo.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo();