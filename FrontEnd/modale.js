let modal = null
let modal2 = null
const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close1').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop1').addEventListener('click', stopPropagation)
    modal.querySelector('#btn-add').addEventListener('click', openModalAdd)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    window.setTimeout(function() {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close1').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop1').removeEventListener('click', stopPropagation)
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e)
        closeModal2(e)
    }
    if(e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
})

const openModalAdd = function (e) {
    e.preventDefault()
    modal2 = document.querySelector(e.target.getAttribute('href'))
    modal2.style.display = null
    modal2.removeAttribute('aria-hidden')
    modal2.setAttribute('aria-modal', 'true')
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal2.querySelector('.js-modal-previous').addEventListener('click', PreviousModalAdd)
    modal2.querySelector('.js-modal-close2').addEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-stop2').addEventListener('click', stopPropagation)
}

const PreviousModalAdd = function (e) {
    if (modal2 === null) return
    e.preventDefault()
    window.setTimeout(function() {
        modal2.style.display = "none"
        modal2 = null
    }, 500)
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal')
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
}

const closeModal2 = function (e) {
    if (modal2 === null) return
    e.preventDefault()
    window.setTimeout(function() {
        modal2.style.display = "none"
        modal2 = null
    }, 500)
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal')
    modal2.querySelector('.js-modal-close2').removeEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-stop2').removeEventListener('click', stopPropagation)
    modal.style.display = "none"
}