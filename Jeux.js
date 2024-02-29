function grille_init() {
    let grille = [] 
    for (let i = 0; i < 6; i++) {
        let row = []
        for (let j = 0; j < 7; j++) {
            row.push(0)
        }
        grille.push(row)
    }

    
    return grille

}

// initialisation de la grille, on peut initialiser la grille et en même temps le tableau html ?

function affiche_grille(grille) {
    const table = document?.getElementById("puissance_grille")
    const tbody = table?.getElementsByTagName("tbody")?.[0]
    const thead = table?.getElementsByTagName("thead")?.[0]
    
    let headrow = thead.insertRow()

    for(let i = 0; i < 7; i++){
        let headcell = headrow.insertCell()
        headcell.textContent = i+1
    }
    

    for(let i = 0; i < 6; i++) {
        let row = tbody.insertRow()
        for(let j = 0; j < 7; j++) {
            let cell = row.insertCell()
            cell.textContent = grille[i][j]
            console.log(grille[i][j])
        }
    }
    
}

function re_table(){
    const table = document?.getElementById("puissance_grille")
    const tbody = table?.getElementsByTagName('tbody')?.[0]
    const thead = table?.getElementsByTagName("thead")?.[0]
    const row = tbody?.getElementsByTagName("tr")
    const headrows = thead?.getElementsByTagName("tr")
    thead.removeChild(headrows[0])

    for (let i = row.length - 1; i >= 0; i--) {
        
        tbody.removeChild(row[i])
    }
}

function colonne_libre(grille, colonne) {
    let libre = true
    for (let i = 0; i < 6; i++) {
        if (grille[5 - i][colonne] !== 0) {
            libre = false
            
        }
        else{
            libre = true
        }
    }
    return libre
}

function place_jeton(grille, colonne, joueur) {
    for (let i = 0; i < 6; i++) {
        if (grille[5 - i][colonne] === 0) {
            grille[5 - i][colonne] = joueur
            break
        }
    }
    return grille
}

function horizontale(grille, joueur) {
    let suite = 0
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (grille[i][j] === joueur) {
                suite++
                if (suite === 4) {
                    return true
                }
            } else {
                suite = 0
            }
        }
    }
    return false
}

function verticale(grille, joueur) {
    let suite = 0
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 6; i++) {
            if (grille[i][j] === joueur) {
                suite++
                if (suite === 4) {
                    return true
                }
            } else {
                suite = 0
            }
        }
    }
    return false
}

function diagonale(grille, joueur) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (
                grille[i][j] === joueur &&
                grille[i + 1][j + 1] === joueur &&
                grille[i + 2][j + 2] === joueur &&
                grille[i + 3][j + 3] === joueur
            ) {
                return true
            }
        }
    }
    for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (
                grille[i][j] === joueur &&
                grille[i - 1][j + 1] === joueur &&
                grille[i - 2][j + 2] === joueur &&
                grille[i - 3][j + 3] === joueur
            ) {
                return true
            }
        }
    }
    return false
}

function gagne(grille, joueur) {
    return horizontale(grille, joueur) || verticale(grille, joueur) || diagonale(grille, joueur)
}



function egalite(grille) {
    for (let i = 0; i < 7; i++) {
        if (colonne_libre(grille, i)) {
            return false
        }
    }
    return true
}

let grille = grille_init()


function jouer() {
    let tour = 0 
    
    const form = document?.getElementById("form")
    const input = document?.getElementById("input")
    const button = document?.getElementById("button")
    let colonne

    input.addEventListener("input", () => {
        colonne = input.value - 1

    })
    affiche_grille(grille) 
    button.addEventListener("click", () => {
        if (colonne_libre(grille, colonne)) {
            let joueur = tour % 2 === 0 ? 1 : 2
            grille = place_jeton(grille, colonne, joueur)
            re_table()
            affiche_grille(grille) 
            if (gagne(grille, joueur)) {
                console.log(`Le joueur ${joueur} a gagné !`)
                return alert("JOUEUR " + joueur + " A GAGNE")
            } else if (egalite(grille)) {
                return alert("ÉGALITÉ !")
            } else {
                tour++
            }
        } else {
            alert("Veuillez sélectionner une colonne non remplie.")
        }
    })
    
}

document.addEventListener("DOMContentLoaded", jouer)
