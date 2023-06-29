function init() {
    fetch('http://localhost:5678/api/works')
    .then(data => data.json())
    .then(resp => {
        document.querySelector(".gallery").innerHTML = "";
        document.querySelector("#liste").innerHTML = "";
        works = genererPieces(resp);
        AdminView()

        fetch('http://localhost:5678/api/categories')
            .then(data => data.json())
            .then(resp => {
                console.log(resp)
                filtrerTravaux(resp, works)
                for (let i = 0; i < resp.length; i++) {
                    clickButtonFilter(resp[i])
                }
            })
    })
}

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
        for (let i = 0; i < resp.length; i++) {
            const post = resp[i];
            const selecteurSection = document.querySelector('#liste');
            const figureElement = document.createElement('figure');
            const delElement = document.createElement('i')
            const titreElement = document.createElement('figcaption');
            const addPictures = document.querySelector('#ajoutPhoto')
            const btnValid = document.querySelector('#valid')
            delElement.className += 'fa-solid fa-trash-can';
            titreElement.innerText = "éditer";
            btnValid.addEventListener('click', formValidation)
            addPictures.addEventListener('change', function () {
                picture = document.querySelector('#newPhoto')
                picture.src = "./assets/images/" + addPictures.files[0].name
                pictureObj = addPictures.files[0]
                picture.style.display = null
                icone = document.getElementById('iconePhoto')
                icone.style.display = "none"
                btnPhoto = document.getElementById('btnPhoto')
                btnPhoto.style.display = "none"
                text = document.getElementById('text')
                text.style.display = "none"
            })
            const cat = document.getElementById('cat')
            cat.addEventListener('change', function () {
                if (title.value && cat.value && picture) {
                    btnValid.style.background = "#1D6154"
                }
            })
            const imageElement = document.createElement('img');
            delElement.id = post.id
            imageElement.src = post.imageUrl;
            imageElement.id = post.id;
            delElement.addEventListener('click', deleteWork);
            selecteurSection.appendChild(figureElement);
            figureElement.appendChild(delElement);
            figureElement.appendChild(imageElement);
            figureElement.appendChild(titreElement);
        }
        return resp
    }
}

function filtrerTravaux(parCategorie, works) {
    for (let i = 0; i < parCategorie.length; i++) {
        console.log(parCategorie)
        const btn = "btn-filtre-" + parCategorie[i].id
        console.log(btn)
        const bouton = document.querySelector('.' + btn)
        bouton.addEventListener("click", function () {
            const travauxFiltres = works.filter(function (work) {
                return work.category.name == bouton.innerText
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
            const btn_tous = document.querySelector('.btn-filtre-Tous')
            btn_tous.addEventListener("click", function () {
                const travauxFiltres = works.filter(function (work) {
                    return works
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
            })
        })
    }
}

function clickButtonFilter(btn) {
    const btntous = document.querySelector('.btn-hover')
    let id_inactif1 = 0
    let id_inactif2 = 0
    if (btn.id == 1) {
        id_inactif1 = 2
        id_inactif2 = 3
    }
    else if (btn.id == 2) {
        id_inactif1 = 1
        id_inactif2 = 3
    }
    else {
        id_inactif1 = 1
        id_inactif2 = 2
    }
    console.log(btn)
    const btn_actif = document.querySelector('.btn-filtre-' + btn.id)
    const btn_inactif1 = document.querySelector('.btn-filtre-' + id_inactif1)
    const btn_inactif2 = document.querySelector('.btn-filtre-' + id_inactif2)
    btn_actif.addEventListener("click", function () {
        btn_actif.classList.toggle('btn-filtre-' + btn.id)
        btn_actif.classList.add('btn-hover')
        btn_inactif1.classList.add('btn-filtre-' + id_inactif1)
        btn_inactif1.classList.toggle('btn-hover')
        btn_inactif2.classList.add('btn-filtre-' + id_inactif2)
        btn_inactif2.classList.toggle('btn-hover')
        btntous.classList.add('btn-filtre-Tous')
    })
    btntous.addEventListener('click', function () {
        btn_actif.classList.remove('btn-hover')
        btn_actif.classList.add('btn-filtre-' + btn.id)
        btntous.classList.add('btn-hover')
        btntous.classList.remove('btn-filtre-Tous')

    })
}

function deleteWork(e) {
    e.preventDefault()
    console.log(e.target.id)
    token = sessionStorage.getItem('token')
    fetch(`http://localhost:5678/api/works/${e.target.id}`, {
        method: 'DELETE',
        headers: {
            accept: '*/*',
            Authorization: 'Bearer ' + token
        }
    })
    init()
}

function AdminView() {
    token = sessionStorage.getItem('token')
    if (token) {
        logout = document.querySelector('#login')
        logout.innerText = "logout"
        logout.addEventListener('click', () => {
            sessionStorage.clear()
            location.reload()
        })
        btnTous = document.querySelector('.btn-hover')
        btnFiltrObj = document.querySelector('.btn-filtre-1')
        btnFiltreAppart = document.querySelector('.btn-filtre-2')
        btnFiltreRetR = document.querySelector('.btn-filtre-3')
        btnModale = document.querySelector('.js-modal')
        btnModifier1 = document.querySelector('.modifier1')
        btnModifier2 = document.querySelector('.modifier2')
        btnEditionMode = document.querySelector('.edition-mode')
        btnTous.style.display = "none"
        btnFiltrObj.style.display = "none"
        btnFiltreAppart.style.display = "none"
        btnFiltreRetR.style.display = "none"
        btnModale.style.display = null
        btnModifier1.style.display = null
        btnModifier2.style.display = null
        btnEditionMode.style.display = "flex"
    }
}

function formValidation(e) {
    e.preventDefault()
    token = sessionStorage.getItem('token')
    if (title.value && cat.value && picture) {
        data = new FormData()
        data.append("image", pictureObj)
        data.append("title", title.value)
        data.append("category", Number(cat.value))
        btnValid = document.getElementById('valid')
        btnValid.style.background = "#1D6154"
        console.log(title.value, pictureObj, cat.value)
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: data
        })
    }
}

init()