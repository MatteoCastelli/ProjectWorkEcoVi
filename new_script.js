let row = 5;
let col = 5;
let immagini = ["images/vetro.png", "images/plastica.png", "images/cartone.png", "images/secco.png", "images/riciclo.png", "images/amore.png"];
let matrice = [];
let array = []
let carta = document.getElementsByClassName("card");
let cnt = 0;
let a;
let b;
let carta1 = undefined;
let carta2 = undefined;
let cntEliminazione = 0;
let arraypunti = [];
let puntiCartone = 0;
let puntiPlastica = 0;
let puntiSecco = 0;
let puntiVetro = 0;
let putniTotali = 0
let c = false;

document.getElementById("contenitore").style.gridTemplateColumns = "repeat(" + col + ", 1fr )";
for (y = 0; y < row * col; y++) {
    document.getElementById("contenitore").innerHTML += "<div class='card'> </div>";
}

for (let i = 0; i < row; i++) {
    matrice[i] = [];
    for (let j = 0; j < col; j++) {
        let indiceCasuale = Math.floor(Math.random() * (immagini.length - 2));
        let elementoCasuale = immagini[indiceCasuale];
        // Controllo per le righe
        if (j > 1 && matrice[i][j - 1] === elementoCasuale && matrice[i][j - 2] === elementoCasuale) {
            do {
                indiceCasuale = Math.floor(Math.random() * (immagini.length - 2));
                elementoCasuale = immagini[indiceCasuale];
            } while (j > 1 && matrice[i][j - 1] === elementoCasuale && matrice[i][j - 2] === elementoCasuale);
        }

        // Controllo per le colonne
        if (i > 1 && matrice[i - 1][j] === elementoCasuale && matrice[i - 2][j] === elementoCasuale) {
            do {
                indiceCasuale = Math.floor(Math.random() * (immagini.length - 2));
                elementoCasuale = immagini[indiceCasuale];
            } while (i > 1 && matrice[i - 1][j] === elementoCasuale && matrice[i - 2][j] === elementoCasuale);
        }
        matrice[i][j] = elementoCasuale;
        array.push(matrice[i][j]);
        let img = document.createElement("img");
        img.src = matrice[i][j];
        document.getElementsByClassName("card")[(i * 5) + j].appendChild(img);
    }
}

function updateIndicatorWidth(points, elemento, lunghezza, puntiMax) {
    const maxPoints = puntiMax;
    const columnWidth = lunghezza;
    const indicator = document.getElementById(elemento);
    const width = Math.min(Math.max((points / maxPoints) * columnWidth, 0), columnWidth);
    indicator.style.width = width + "px";
}

function remove() {
    setTimeout(() => {
        // elimina gli elementi della combinazione su schermo
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (matrice[i][j] == null) {
                    document.getElementsByClassName("card")[i * 5 + j].innerHTML = '';
                }
            }
        }
        for (i = 0; i < arraypunti.length; i++) {
            if (arraypunti[i] == immagini[0]) puntiVetro += 5;
            if (arraypunti[i] == immagini[1]) puntiPlastica += 3;
            if (arraypunti[i] == immagini[2]) puntiCartone += 2;
            if (arraypunti[i] == immagini[3]) puntiSecco += 1;
        }
        arraypunti = []
        updateIndicatorWidth(puntiVetro, "colonnaVetro", 300, 50);
        updateIndicatorWidth(puntiPlastica, "colonnaPlastica", 300, 50);
        updateIndicatorWidth(puntiSecco, "colonnaSecco", 300, 50);
        updateIndicatorWidth(puntiCartone, "colonnaCarta", 300, 50);     
        putniTotali = (puntiVetro + puntiSecco + puntiPlastica + puntiCartone)     
        document.getElementById("puntiVetro").innerHTML = "VETRO:  " + puntiVetro;
        document.getElementById("puntiPlastica").innerHTML = "PLASTICA: " + puntiPlastica;
        document.getElementById("puntiSecco").innerHTML = "SECCO: " + puntiSecco;
        document.getElementById("puntiCarta").innerHTML = "CARTA: " + puntiCartone;
        document.getElementById("puntiTotali").innerHTML = "PUNTI TOTALI: " + putniTotali;
    }, 300);
    setTimeout(() => {
        // sposta gli elementi null verso l'alto
        for (let col = 0; col < 5; col++) {
            for (let row = 4; row > 0; row--) {
                if (matrice[row][col] === null) {
                    for (let i = row - 1; i >= 0; i--) {
                        if (matrice[i][col] !== null) {
                            matrice[row][col] = matrice[i][col];
                            matrice[i][col] = null;
                            break;
                        }
                    }
                }
            }
        }
        setTimeout(() => {
            // abbassa
            let cards = document.getElementsByClassName("card");
            let index = 0;
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    let imgSrc = matrice[i][j];
                    cards[index].innerHTML = "";
                    if (imgSrc !== null) {
                        let img = document.createElement("img");
                        img.src = imgSrc;
                        cards[index].appendChild(img);
                    }
                    index++;
                }
            }
            setTimeout(() => {
                //nuovi
                for (let i = 0; i < row; i++) {
                    for (let j = 0; j < col; j++) {
                        if (matrice[i][j] == null) {
                            let indiceCasuale = Math.floor(Math.random() * (immagini.length - 2));
                            let elementoCasuale = immagini[indiceCasuale];

                            // Controllo per le righe
                            if (j > 1 && matrice[i][j - 1] === elementoCasuale && matrice[i][j - 2] === elementoCasuale) {
                                do {
                                    indiceCasuale = Math.floor(Math.random() * (immagini.length - 2));
                                    elementoCasuale = immagini[indiceCasuale];
                                } while (j > 1 && matrice[i][j - 1] === elementoCasuale && matrice[i][j - 2] === elementoCasuale);
                            }

                            // Controllo per le colonne
                            if (i > 1 && matrice[i - 1][j] === elementoCasuale && matrice[i - 2][j] === elementoCasuale) {
                                do {
                                    indiceCasuale = Math.floor(Math.random() * (immagini.length - 2));
                                    elementoCasuale = immagini[indiceCasuale];
                                } while (i > 1 && matrice[i - 1][j] === elementoCasuale && matrice[i - 2][j] === elementoCasuale);
                            }

                            matrice[i][j] = elementoCasuale;
                            let img = document.createElement("img");
                            img.src = matrice[i][j];
                            document.getElementsByClassName("card")[i * 5 + j].appendChild(img);
                        }
                    }
                }
                setTimeout(() => {
                    array = matrice.flat();
                    setTimeout(() => {
                        if (puntiVetro >= 50 && puntiSecco >= 50 && puntiPlastica >= 50 && puntiCartone >= 50) victory()
                    }, 100);
                }, 100);
            }, 300);
        }, 300);
        return true
    }, 300);
}
function checkQuintetL() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j <= col - 3; j++) {
            // Tris orizzontale
            if (matrice[i][j] === matrice[i][j + 1] && matrice[i][j + 1] === matrice[i][j + 2]) {

                if (i <= row - 3 && (matrice[i][j + 2] === matrice[i + 1][j + 2] && matrice[i + 1][j + 2] === matrice[i + 2][j + 2])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i + 1][j + 2], matrice[i + 2][j + 2]);
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i + 1][j + 2] = null;
                    matrice[i + 2][j + 2] = immagini[5];
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
                if (i <= row - 3 && (matrice[i][j] === matrice[i + 1][j] && matrice[i + 1][j] === matrice[i + 2][j])) {
                    arraypunti.push(matrice[i][j], matrice[i + 1][j], matrice[i + 2][j], matrice[i][j + 1], matrice[i][j + 2])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i + 1][j] = null;
                    matrice[i + 2][j] = immagini[5];
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
                if (i === row - 3 && (matrice[i][j + 2] === matrice[i + 1][j + 2] && matrice[i + 1][j + 2] === matrice[i + 2][j + 2])) {
                    arraypunti.push(matrice[i][j], matrice[i + 1][j + 2], matrice[i + 2][j + 2], matrice[i][j + 1], matrice[i][j + 2])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i + 1][j + 2] = null;
                    matrice[i + 2][j + 2] = immagini[5];
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
                if (i === row - 3 && (matrice[i][j] === matrice[i + 1][j] && matrice[i + 1][j] === matrice[i + 2][j])) {
                    arraypunti.push(matrice[i][j], matrice[i + 1][j], matrice[i + 2][j], matrice[i][j + 1], matrice[i][j + 2])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i + 1][j] = null;
                    matrice[i + 2][j] = immagini[5];
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
                if (i === row - 3 && (matrice[i][j + 2] === matrice[i - 1][j + 2] && matrice[i - 1][j + 2] === matrice[i - 2][j + 2])) {
                    arraypunti.push(matrice[i][j], matrice[i - 1][j + 2], matrice[i - 2][j + 2], matrice[i][j + 1], matrice[i][j + 2])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i - 1][j + 2] = null;
                    matrice[i - 2][j + 2] = null;
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = immagini[5];
                    return true;
                }
                if (i === row - 3 && (matrice[i][j] === matrice[i - 1][j] && matrice[i - 1][j] === matrice[i - 2][j])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i - 1][j], matrice[i - 2][j])
                    console.log(arraypunti);
                    matrice[i][j] = immagini[5];
                    matrice[i - 1][j] = null;
                    matrice[i - 2][j] = null;
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
                if (i > row - 3 && (matrice[i][j + 2] === matrice[i - 1][j + 2] && matrice[i - 1][j + 2] === matrice[i - 2][j + 2])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i - 1][j + 2], matrice[i - 2][j + 2])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i - 1][j + 2] = null;
                    matrice[i - 2][j + 2] = null;
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = immagini[5];
                    return true;
                }
                if (i > row - 3 && (matrice[i][j] === matrice[i - 1][j] && matrice[i - 1][j] === matrice[i - 2][j])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i - 1][j], matrice[i - 2][j])
                    console.log(arraypunti);
                    matrice[i][j] = immagini[5];
                    matrice[i - 1][j] = null;
                    matrice[i - 2][j] = null;
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
                // Verifica se c'è una cinquina a T verticale dritta o capovolta
                if (i < row - 3 && (matrice[i][j + 1] === matrice[i + 1][j + 1] && matrice[i + 1][j + 1] === matrice[i + 2][j + 1])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i + 1][j + 1], matrice[i + 2][j + 1])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i + 1][j + 1] = null;
                    matrice[i + 2][j + 1] = immagini[5];
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
                if (i === row - 3 && (matrice[i][j + 1] === matrice[i + 1][j + 1] && matrice[i + 1][j + 1] === matrice[i + 2][j + 1])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i + 1][j + 1], matrice[i + 2][j + 1])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i + 1][j + 1] = null;
                    matrice[i + 2][j + 1] = immagini[5];
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
                if (i === row - 3 && (matrice[i][j] === matrice[i - 1][j + 1] && matrice[i - 1][j + 1] === matrice[i - 2][j + 1])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i - 1][j + 1], matrice[i - 2][j + 1])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i - 1][j + 1] = null;
                    matrice[i - 2][j + 1] = null;
                    matrice[i][j + 1] = immagini[5];
                    matrice[i][j + 2] = null;
                    return true;
                }
                if (i > row - 3 && (matrice[i][j] === matrice[i - 1][j + 1] && matrice[i - 1][j + 1] === matrice[i - 2][j + 1])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i - 1][j + 1], matrice[i - 2][j + 1])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i - 1][j + 1] = null;
                    matrice[i - 2][j + 1] = null;
                    matrice[i][j + 1] = immagini[5];
                    matrice[i][j + 2] = null;
                    return true;
                }
                // Verifica se c'è una cinquina a T ORIZZONTALE dritta o capovolta
                if (i < row - 1 && i !== 0 && (matrice[i][j + 2] === matrice[i + 1][j + 2] && matrice[i + 1][j + 2] === matrice[i - 1][j + 2])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i + 1][j + 2], matrice[i - 1][j + 2])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i + 1][j + 2] = immagini[5];
                    matrice[i - 1][j + 2] = null;
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
                if (i < row - 1 && i !== 0 && (matrice[i][j] === matrice[i + 1][j] && matrice[i + 1][j] === matrice[i - 1][j])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i + 1][j], matrice[i - 1][j])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i + 1][j] = immagini[5];
                    matrice[i - 1][j] = null;
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
                if (i < row - 1 && i !== 0 && (matrice[i][j + 1] === matrice[i + 1][j + 1] && matrice[i + 1][j + 1] === matrice[i - 1][j + 1])) {
                    arraypunti.push(matrice[i][j], matrice[i][j + 1], matrice[i][j + 2], matrice[i + 1][j + 1], matrice[i - 1][j + 1])
                    console.log(arraypunti);
                    matrice[i][j] = null;
                    matrice[i + 1][j + 1] = immagini[5];
                    matrice[i - 1][j + 1] = null;
                    matrice[i][j + 1] = null;
                    matrice[i][j + 2] = null;
                    return true;
                }
            }
        }
    }
    return false;
}

function checkConsecutive() {
    function checkCombination(num) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j <= col - num; j++) {
                // controllo righe
                let consecutivi = true;
                for (let k = 1; k < num; k++) {
                    if (matrice[i][j] !== matrice[i][j + k] || matrice[i][j + k] == immagini[4] || matrice[i][j + k] == immagini[5]) {
                        consecutivi = false;
                        break;
                    }
                }
                if (consecutivi) {
                    for (let k = 0; k < num; k++) {
                        arraypunti.push(matrice[i][j + k]);
                        matrice[i][j + k] = null;
                        if (k == num - 1 && num !== 3) {
                            matrice[i][j + k] = immagini[num]
                            let img = document.createElement("img");
                            img.src = matrice[i][j + k];
                            document.getElementsByClassName("card")[i * 5 + (j + k)].appendChild(img);
                        }
                    }
                    return true;
                }
                //controllo colonne
                consecutivi = true;
                for (let k = 1; k < num; k++) {
                    if (matrice[j][i] !== matrice[j + k][i] || matrice[j + k][i] == immagini[4] || matrice[j + k][i] == immagini[5]) {
                        consecutivi = false;
                        break;
                    }
                }
                if (consecutivi) {
                    for (let k = 0; k < num; k++) {
                        arraypunti.push(matrice[j + k][i]);
                        matrice[j + k][i] = null;
                        if (k == num - 1 && num !== 3) {
                            matrice[j + k][i] = immagini[num];
                            let img = document.createElement("img");
                            img.src = matrice[j + k][i];
                            document.getElementsByClassName("card")[i * 5 + (j + k)].appendChild(img);
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    }

    if (checkQuintetL()) {
        console.log("cinquina L trovata");
        remove();
        return true;
    } else {
        // controlla quintet
        if (checkCombination(5)) {
            console.log("cinquina trovato");
            remove();
            return true;
        }
       // Controlla quartet
        if (checkCombination(4)) {
            console.log("quaterna trovata");
            remove();
            return true;

        }
        // Controlla quintet
        if (checkCombination(3)) {
            console.log("tris trovata");
            remove();
            return true;
        }
    }
    return false;
}

function gestisciAbbinamenti() {

    if (checkConsecutive()) {
        cntEliminazione = 0
        updateIndicatorWidth(cntEliminazione, "errori", 300, 3);
        document.getElementById("puntiErrori").innerHTML = "ERRORI: " + cntEliminazione;
        document.getElementById('contenitore').style.pointerEvents = 'none'; // disable click
        c = true;
        setTimeout(gestisciAbbinamenti, 1850);
    } else {
        document.getElementById('contenitore').style.pointerEvents = 'auto'; // To re-enable click
        c = false;
        console.log(matrice);
    }
}

for (let i = 0; i < carta.length; i++) {
    carta[i].addEventListener("click", () => {

        if (carta1 === undefined) {
            carta1 = array[i];
            cnt++;
            a = i
            console.log(i, carta1);

            let row = Math.floor(i / 5);
            let col = i % 5;

            if (carta1 == 'images/riciclo.png' || carta1 == 'images/amore.png') {
                matrice[row][col] = null;
                cntEliminazione = 0;
                updateIndicatorWidth(cntEliminazione, "errori", 300, 3);
                document.getElementById("puntiErrori").innerHTML = "ERRORI: " + cntEliminazione;

                if (row >= 0 && row <= 4 && col >= 0 && col <= 4) {

                    if (row - 1 >= 0) arraypunti.push(matrice[row - 1][col]);
                    if (row + 1 <= 4) arraypunti.push(matrice[row + 1][col]);
                    if (col - 1 >= 0) arraypunti.push(matrice[row][col - 1]);
                    if (col + 1 <= 4) arraypunti.push(matrice[row][col + 1]);

                    if (row - 1 >= 0) matrice[row - 1][col] = null;
                    if (row + 1 <= 4) matrice[row + 1][col] = null;
                    if (col - 1 >= 0) matrice[row][col - 1] = null;
                    if (col + 1 <= 4) matrice[row][col + 1] = null;

                    if (carta1 == 'images/amore.png') {
                        if (row - 1 >= 0 && col - 1 >= 0) arraypunti.push(matrice[row - 1][col - 1]);
                        if (row - 1 >= 0 && col + 1 <= 4) arraypunti.push(matrice[row - 1][col + 1]);
                        if (row + 1 <= 4 && col - 1 >= 0) arraypunti.push(matrice[row + 1][col - 1]);
                        if (row + 1 <= 4 && col + 1 <= 4) arraypunti.push(matrice[row + 1][col + 1]);

                        if (row - 1 >= 0 && col - 1 >= 0) matrice[row - 1][col - 1] = null;
                        if (row - 1 >= 0 && col + 1 <= 4) matrice[row - 1][col + 1] = null;
                        if (row + 1 <= 4 && col - 1 >= 0) matrice[row + 1][col - 1] = null;
                        if (row + 1 <= 4 && col + 1 <= 4) matrice[row + 1][col + 1] = null;
                    }
                }

                remove();

                setTimeout(() => { gestisciAbbinamenti() }, 1800);

                carta1 = undefined;
                cnt = 0;
            }
        } else {
            carta2 = array[i];
            cnt++
            b = i;
            console.log(i, carta2);
        }

        if (cnt == 2) {
            cnt = 0;

            let diff = b - a;
            if (diff !== 1 && diff !== 5 && diff !== -5 && diff !== -1) {
                console.log("scambio non valido");
                carta1 = undefined;
                carta2 = undefined;

            } else {
                // Trova gli elementi delle immagini corrispondenti a carta1 e carta2
                let img1 = carta[a].getElementsByTagName('img')[0];
                let img2 = carta[b].getElementsByTagName('img')[0];

                //scambio le immagini su schermo
                let temp = img1.src;
                img1.src = img2.src;
                img2.src = temp;

                // scambio gli elemtnti nell'array
                let tempp = array[a];
                array[a] = array[b];
                array[b] = tempp;

                carta1 = undefined;
                carta2 = undefined;

                // aggiorna matrice
                for (let i = 0; i < row; i++) {
                    matrice[i] = [];
                    for (let j = 0; j < col; j++) {
                        let index = i * 5 + j;
                        matrice[i][j] = array[index];
                    }
                }

                gestisciAbbinamenti()

                if (c === false) {
                    cntEliminazione++
                    updateIndicatorWidth(cntEliminazione, "errori", 300, 3);
                    document.getElementById("puntiErrori").innerHTML = "ERRORI: " + cntEliminazione;
                    setTimeout(() => {
                        console.log("Nessun abbinamento trovato, riscambio gli elementi");

                        img1.classList.add('vibrazione');
                        img2.classList.add('vibrazione');
                        setTimeout(() => {
                            let temp = img1.src;
                            img1.src = img2.src;
                            img2.src = temp;
    
                            let tempp = array[a];
                            array[a] = array[b];
                            array[b] = tempp;
    
                            for (let i = 0; i < row; i++) {
                                matrice[i] = [];
                                for (let j = 0; j < col; j++) {
                                    let index = i * 5 + j;
                                    matrice[i][j] = array[index];
                                }
                            }
    
                        }, 200);

                        if (cntEliminazione == 3) {
                            gameover()
                        }
                    }, 750);
                }
                img1.addEventListener('transitionend', () => {
                    img1.classList.remove('vibrazione');
                });
                img2.addEventListener('transitionend', () => {
                    img2.classList.remove('vibrazione');
                });
            }
            c = false;
        }
    });
}

function gameover() {

    let body = document.body;
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }

    let divElement = document.createElement("div");
    divElement.textContent = "HAI PERSO";
    divElement.id = "divPerso";
    document.body.appendChild(divElement);


    setTimeout(() => {
        window.location.reload()
    }, 4000);
}

function victory() {

    let body = document.body;
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }

    let divElement = document.createElement("div");
    divElement.textContent = "HAI VINTO";
    divElement.id = "divVinto";
    let divElement2 = document.createElement("div");
    divElement2.textContent = "HAI TOTALIZZATO: " + putniTotali + " PUNTI TOTALI";
    divElement2.id = "puntiVittoria"
    document.body.appendChild(divElement);
    document.body.appendChild(divElement2);

    setTimeout(() => {
        window.location.reload()
    }, 4000);
}