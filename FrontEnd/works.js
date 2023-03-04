fetch('http://localhost:5678/api/works')
    .then(data => data.json())
    .then(resp => {
        works = genererPieces(resp);
        console.log(works)
        ListBtn = [".btn-filtre-Tous", ".btn-filtre-Objets", ".btn-filtre-Appartements", ".btn-filtre-Hôtelsetrestaurants"]
        filtrerTravaux(ListBtn, resp)
        clickButtonFilter()
    })

function genererPieces(resp) {
    if (resp != "") {
        for (let i = 0; i < resp.length; i++) {
            const post = resp[i];
            const selecteurSection = document.querySelector('.gallery');
            const figureElement = document.createElement('figure');
            const titreElement = document.createElement('figcaption');
            titreElement.innerText = post.title;
            const imageElement = document.createElement('img');
            imageElement.src = post.imageUrl;
            selecteurSection.appendChild(figureElement);
            figureElement.appendChild(imageElement);
            figureElement.appendChild(titreElement);
        }
        return resp
    }
}

function filtrerTravaux(parCategorie, resp) {
    for (let i = 0; i < parCategorie.length; i++) {
        const btn = parCategorie[i]
        const bouton = document.querySelector(btn)
        bouton.addEventListener("click", function () {
            const travauxFiltres = resp.filter(function (work) {
                if (bouton.innerText != "Tous") {
                    return work.category.name == bouton.innerText;
                }
                else return resp
            })
            console.log(travauxFiltres)
            document.querySelector(".gallery").innerHTML = "";
            for (let i = 0; i < travauxFiltres.length; i++) {
                const post = travauxFiltres[i];
                const selecteurSection = document.querySelector('.gallery');
                const figureElement = document.createElement('figure');
                const titreElement = document.createElement('figcaption');
                titreElement.innerText = post.title;
                const imageElement = document.createElement('img');
                imageElement.src = post.imageUrl;
                selecteurSection.appendChild(figureElement);
                figureElement.appendChild(imageElement);
                figureElement.appendChild(titreElement);
            }
        });
    }
}


function clickButtonFilter() {
    const btn_tous = document.querySelector('.btn-filtre-Tous')
    btn_tous.classList.remove('btn-filtre-Tous')
    btn_tous.classList.add('btn-hover')
    const btn_objs = document.querySelector('.btn-filtre-Objets')
    const btn_Appart = document.querySelector('.btn-filtre-Appartements')
    const btn_hotelRestau = document.querySelector('.btn-filtre-Hôtelsetrestaurants')
    btn_Appart.addEventListener("click", function () {
        btn_Appart.classList.remove('btn-filtre-Appartements')
        btn_Appart.classList.add('btn-hover')
        btn_objs.classList.remove('btn-hover')
        btn_objs.classList.add('btn-filtre-Objets')
        btn_tous.classList.remove('btn-hover')
        btn_tous.classList.add('btn-filtre-Tous')
        btn_hotelRestau.classList.remove('btn-hover')
        btn_hotelRestau.classList.add('btn-filtre-Hôtelsetrestaurants')
    })
    btn_objs.addEventListener("click", function () {
        btn_Appart.classList.add('btn-filtre-Appartements')
        btn_Appart.classList.remove('btn-hover')
        btn_objs.classList.add('btn-hover')
        btn_objs.classList.remove('btn-filtre-Objets')
        btn_tous.classList.remove('btn-hover')
        btn_tous.classList.add('btn-filtre-Tous')
        btn_hotelRestau.classList.remove('btn-hover')
        btn_hotelRestau.classList.add('btn-filtre-Hôtelsetrestaurants')
    })
    btn_hotelRestau.addEventListener("click", function () {
        btn_Appart.classList.add('btn-filtre-Appartements')
        btn_objs.classList.remove('btn-hover')
        btn_objs.classList.add('btn-filtre-Objets')
        btn_tous.classList.remove('btn-hover')
        btn_tous.classList.add('btn-filtre-Tous')
        btn_hotelRestau.classList.add('btn-hover')
        btn_hotelRestau.classList.remove('btn-filtre-Hôtelsetrestaurants')
        btn_Appart.classList.remove('btn-hover')
    })
    btn_tous.addEventListener("click", function () {
        btn_Appart.classList.add('btn-filtre-Appartements')
        btn_objs.classList.remove('btn-hover')
        btn_objs.classList.add('btn-filtre-Objets')
        btn_tous.classList.add('btn-hover')
        btn_tous.classList.remove('btn-filtre-Tous')
        btn_hotelRestau.classList.remove('btn-hover')
        btn_hotelRestau.classList.add('btn-filtre-Hôtelsetrestaurants')
        btn_Appart.classList.remove('btn-hover')
    })

}