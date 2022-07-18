// Chargement des informations utiles
const statut = document.querySelector("h2");
let jeuActif = true;
let joueurActif = "X";
let etatJeu = ["", "", "", "", "", "", "", "", ""];

const conditionsVictoire = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// Messages
const gagne = () => `Le joueur ${joueurActif} à gagné`;
const egalite = () => "Egalité";
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`;

statut.innerHTML = tourJoueur();

document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase));
btnRestart.addEventListener("click", restart);

function gestionClicCase(){
    // Récupération de l'index de la case cliquée
    const indexCase = parseInt(this.dataset.index);
    
    if(etatJeu[indexCase] !== "" || !jeuActif){
        return
    }
    etatJeu[indexCase] = joueurActif;
    if (joueurActif === "O"){
        this.innerHTML = `<span class="text-danger">O</span>`;
    } else {
        this.innerHTML = joueurActif;

    }

    verifGagne()
}

function verifGagne(){
    let tourGagnant = false;

    for(let conditionVictoire of conditionsVictoire){
        let val1 = etatJeu[conditionVictoire[0]];
        let val2 = etatJeu[conditionVictoire[1]];
        let val3 = etatJeu[conditionVictoire[2]];
        if(val1 === "" || val2 === "" || val3 === ""){
            continue;
        }
        if(val1 === val2 && val2 === val3){
            tourGagnant = true;
            break;
        }
    }
    if(tourGagnant){
        statut.innerHTML = gagne();
        jeuActif = false;
        return;
    }
    if(!etatJeu.includes("")){
        statut.innerHTML = egalite();
        jeuActif = false;
        return;
    }

    joueurActif = joueurActif === "X" ? "O" : "X";
    statut.innerHTML = tourJoueur();
}

function restart(){
    joueurActif = "X";
    jeuActif = true;
    etatJeu = ["", "", "", "", "", "", "", "", ""];
    statut.innerHTML = tourJoueur();
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "");
}