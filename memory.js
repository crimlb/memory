var btnRegolamento = document.getElementById("idBtnInfo")
var primaCarta = 0
var partitaFinita = false;
var secondiRimasti = 1
var PrimaSelezione;
var lock = false;
var primoClick = true;
var intervalId = null;
var tempoInSecondi = 3 * 60; // 5 minuti


var musicaAttiva;
var sottofondo = new Audio("./sottofondoMemory.mp3");
sottofondo.volume = 0.5;
sottofondo.loop = true;

var coppiaTrovata= new Audio("./campanelline.mp3");
coppiaTrovata.volume= 0.9;

var giraCarte= new Audio("./clipboard.mp3")
giraCarte.volume= 0.9;

var youWin= new Audio("./youWin.mp3")
youWin.volume= 0.9;

var gameOver= new Audio("./gameOver.mp3")
gameOver.volume= 0.9;



  document.addEventListener("DOMContentLoaded", startGame, { once: true });

function startGame(){

    Swal.fire({
            title: "Nuova partita",
            text: "Pronto ad iniziare?", 
            icon: "welcome",  
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
              musicaOnOff();
            }
        })
  
}


function musicaOnOff() {

    if (musicaAttiva) {
        sottofondo.pause();
        document.getElementById("toggleMusic").querySelector("img").src="volumeSbarratoBlu.svg"
        musicaAttiva = false;
    } else {
        sottofondo.play();
        document.getElementById("toggleMusic").querySelector("img").src="volume10Blu.svg"
        musicaAttiva = true;
        
    }
}






var display = document.getElementById('timer');

function fermaTimer() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }

}

function avvioTimer() {
    if (intervalId !== null) return;
    intervalId = setInterval(() => {
        if (partitaFinita || tempoInSecondi <= 0) {
            clearInterval(intervalId);
            intervalId = null;
            if(tempoInSecondi <= 0){
            gameOver.play()
             Swal.fire({
        title: "Game Over",
        text: "Tempo Scaduto!",
        confirmButtonText: "OK"
    }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
}  
            display.textContent = tempoInSecondi <= 0 ? "Tempo Scaduto!" : display.textContent;
            return;
        }
        var minuti = Math.floor(tempoInSecondi / 60);
        var secondi = tempoInSecondi % 60;
        secondi = secondi < 10 ? '0' + secondi : secondi;

        display.textContent = "Countdown: " + minuti + ":" + secondi;
        tempoInSecondi--;
    }, 800);
}

const immagini = [
    { img: "alce.jfif", id: "1a" },
    { img: "alce.jfif", id: "1b" },
    { img: "camaleonte.jfif", id: "2a" },
    { img: "camaleonte.jfif", id: "2b" },
    { img: "civetta.jfif", id: "3a" },
    { img: "civetta.jfif", id: "3b" },
    { img: "coccodrillo.jfif", id: "4a" },
    { img: "coccodrillo.jfif", id: "4b" },
    { img: "coniglio.jfif", id: "5a" },
    { img: "coniglio.jfif", id: "5b" },
    { img: "gatto.jfif", id: "6a" },
    { img: "gatto.jfif", id: "6b" },
    { img: "lama.jfif", id: "7a" },
    { img: "lama.jfif", id: "7b" },
    { img: "leone.jfif", id: "8a" },
    { img: "leone.jfif", id: "8b" },
    { img: "modellOrso.jfif", id: "9a" },
    { img: "modellOrso.jfif", id: "9b" },
    { img: "nutria.jfif", id: "10a" },
    { img: "nutria.jfif", id: "10b" },
    { img: "orsoBruno.jfif", id: "11a" },
    { img: "orsoBruno.jfif", id: "11b" },
    { img: "pappagallo.jfif", id: "12a" },
    { img: "pappagallo.jfif", id: "12b" },
    { img: "scimpanzè.jpeg", id: "13a" },
    { img: "scimpanzè.jpeg", id: "13b" },
    { img: "toro.jfif", id: "14a" },
    { img: "toro.jfif", id: "14b" },
    { img: "zebra.jfif", id: "15a" },
    { img: "zebra.jfif", id: "15b" },
]

function disposizioneCarte() {
    const griglia = document.querySelector(".griglia").querySelectorAll("div")
    const carteMescolate = [...immagini];
    carteMescolate.sort(() => Math.random() - 0.5);

    for (let i = 0; i < carteMescolate.length; i++) {
        let immagine = document.createElement("img")
        immagine.src = carteMescolate[i].img
        immagine.id = carteMescolate[i].id
        immagine.classList.add("immag")
        griglia[i].querySelector("button").appendChild(immagine)
    }
}
disposizioneCarte()

function controlloIndici(carta1, carta2) {
    let nCaratteriCarta1 = carta1.length
    let nCaratteriCarta2 = carta2.length
    carta1 = nCaratteriCarta1 == 2 ? carta1.slice(0, 1) : carta1.slice(0, 2)
    carta2 = nCaratteriCarta2 == 2 ? carta2.slice(0, 1) : carta2.slice(0, 2)
    if (carta1 === carta2) {
        coppiaTrovata.play()
        return true;
        
    } else {
        return false;
    }
}

function selezioneCarta(cartaSel) {
    if (lock) return;
    giraCarte.play()
    let idCarta = cartaSel.querySelector("img").id
    if (primoClick) {
        avvioTimer();
        primoClick = false;
    } else if (!intervalId && !partitaFinita) {
        avvioTimer();
    }

    if (primaCarta == 0) {
        PrimaSelezione = cartaSel.querySelector("img");
        cartaSel.disabled = true;
        cartaSel.querySelector("img").style = "display:block;"
        cartaSel.parentNode.classList.add("cartaGirata")
        primaCarta++
    } else {
        lock = true;
        cartaSel.disabled = true;
        cartaSel.querySelector("img").style = "display:block;"
        cartaSel.parentNode.classList.add("cartaGirata")
        var esito = controlloIndici(PrimaSelezione.id, idCarta)
        setTimeout(() => {

            if (!esito) {
                cartaSel.querySelector("img").style = "display:none;"
                PrimaSelezione.style = "display:none;"
                cartaSel.disabled = false;
                PrimaSelezione.parentNode.disabled = false;
                cartaSel.parentNode.classList.remove("cartaGirata")
                PrimaSelezione.parentNode.parentNode.classList.remove("cartaGirata")
                PrimaSelezione = "";

            } else {
                vittoria()
            }
            lock = false;
        }, 1000);
        primaCarta--
    }
}

function vittoria() {
    var tutteLeImmgini = document.querySelector(".griglia").querySelectorAll("div")
    var immagini = Array.from(tutteLeImmgini);
    const vittoria = immagini.every(img => img.classList.contains("cartaGirata"));

    if (vittoria) {
        secondiRimasti = 0;
        partitaFinita = true;
        youWin.play()
        Swal.fire({
            title: "Hai Vinto!",
            text: "Complimenti hai trovato tutte le coppie!",
            icon: "success",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        })
    }
}

function regolamento() {
    Swal.fire({
        title: "Come si gioca",
        text: "Gira le carte e trova tutte le coppie uguali. Memorizza le posizioni e completa il gioco nel minor tempo possibile.",
        icon: "info",
        confirmButtonText: "OK"
    });
}