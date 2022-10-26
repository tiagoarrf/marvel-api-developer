"use strict"

var li = document.getElementById("comics");
const btCloseModal = document.querySelector("#bt-close-modal")
const modal = document.querySelector("#modal-container")
const comicTitleModal = document.querySelector("#comic-title-modal")
const comicImgModal = document.querySelector("#comic-img-modal")
const comicIDModal = document.querySelector("#comic-id-modal")
const comicIsbnModal = document.querySelector("#comic-isbn-modal")
const comicIssnModal = document.querySelector("#comic-issn-modal")
const comicPagesModal = document.querySelector("#comic-pages-modal")
const comicLinkModal = document.querySelector("#comic-link-page-modal")

const jsonResDataOne = []

btCloseModal.onclick = () => {
    modal.style.display = 'none'
    comicImgModal.setAttribute("src", "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")
    comicTitleModal.textContent = "Title Comic"
    comicIDModal.textContent = "ID: "
    comicIsbnModal.textContent = "ISBN: "
    comicIssnModal.textContent = "ISSN: "
    comicPagesModal.textContent = "Pages: "
    comicLinkModal.setAttribute("href", "https://www.marvel.com/comics")
}

li.addEventListener("click", function (event) {
    const ts = "xxxxxxxxx"
    const keyPub = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    const hash = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

    if (event.target.id != "comics") {
        fetch(`http://gateway.marvel.com/v1/public/comics/${event.target.id}?ts=${ts}&apikey=${keyPub}&hash=${hash}`)
            .then(res => res.json())
            .then(json => {
                comicTitleModal.textContent = json.data.results[0].title
                comicImgModal.setAttribute("src", json.data.results[0].thumbnail.path + '.' + json.data.results[0].thumbnail.extension)
                comicIDModal.textContent = "ID: " + json.data.results[0].id
                comicIsbnModal.textContent = "ISBN: " + json.data.results[0].isbn
                comicIssnModal.textContent = "ISSN: " + json.data.results[0].issn
                comicPagesModal.textContent = "Pages: " + json.data.results[0].pageCount
                comicLinkModal.setAttribute("href", json.data.results[0].urls[0].url)

                if (json.data.results[0]) {
                    modal.style.display = 'inline';
                }
            });
    }

})
