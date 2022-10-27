"use strict"

const divComics = document.querySelector("#comics")
const btMore = document.querySelector("#bt-more button")
const input = document.querySelector("input")
const btSubmit = document.querySelector("#bt-submit")
let jsonResDataAll = []
let jsonResDataSearch = []
let jsonResDataLocal = []
let modeSearche = false
var i = 0;
var k = 0;
var qtdViewsComics = 8;

function showMore(jsonDataSelected) {
    while (k < qtdViewsComics && jsonDataSelected[i] != undefined) {
        const srcImg = jsonDataSelected[i].thumbnail.path + '.' + jsonDataSelected[i].thumbnail.extension
        const nameComic = jsonDataSelected[i].title
        const idComic = jsonDataSelected[i].id
        createElement(divComics, srcImg, nameComic, idComic)
        k++;
        i++;
    }
    k = 0;
    if (jsonDataSelected[i] == undefined) {
        btMore.style.display = 'none';
    }
}

function searchComic(searcName) {
    i = 0;
    k = 0;
    qtdViewsComics = 8;
    divComics.innerHTML = ""
    jsonResDataAll.forEach(element => {
        const nameComic = element.title
        if (nameComic.toUpperCase().includes(searcName)) {
            jsonResDataSearch.push(element)
        }
    });
    if (jsonResDataSearch.length >= 8) {
        modeSearche = true
        btMore.style.display = 'inline';
    }
    else {
        modeSearche = false
        btMore.style.display = 'none';
    }
    let index = 0
    while (k < qtdViewsComics && jsonResDataSearch[index] != undefined) {
        const srcImg = jsonResDataSearch[index].thumbnail.path + '.' + jsonResDataSearch[index].thumbnail.extension
        const nameComic = jsonResDataSearch[index].title
        const idComic = jsonResDataSearch[index].id
        createElement(divComics, srcImg, nameComic, idComic)
        k++;
        index++;
    }
    k = 0;
}

function getData() {
    const ts = "xxxxxxxxx"
    const keyPub = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    const hash = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

    fetch(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${keyPub}&hash=${hash}&limit=100`)
        .then(res => res.json())
        .then(json => {
            jsonResDataAll = json.data.results
            while (k < qtdViewsComics && json.data.results[i] != undefined) {
                const srcImg = json.data.results[i].thumbnail.path + '.' + json.data.results[i].thumbnail.extension
                const nameComic = json.data.results[i].title
                const idComic = json.data.results[i].id
                createElement(divComics, srcImg, nameComic, idComic)
                k++;
                i++;
            }
            k = 0;
        });
}

function createElement(divToAppend, srcImg, nameComic, idComic) {
    const divMae = document.createElement('div')
    const divFilho = document.createElement('div')
    const buttomDetails = document.createElement('button')
    const buttomOrder = document.createElement('button')
    const img = document.createElement('img')

    buttomDetails.textContent = "Details"
    buttomOrder.textContent = "Buy Now"
    img.src = srcImg

    divFilho.appendChild(img)
    divFilho.appendChild(buttomDetails)
    divFilho.appendChild(buttomOrder)
    divMae.appendChild(divFilho)
    divToAppend.appendChild(divMae)

    divMae.classList.add("comic")
    buttomDetails.classList.add("bt-details")
    buttomDetails.setAttribute("id", idComic);
    buttomOrder.classList.add("bt-order")
}

btSubmit.onclick = () => {
    if (input.value != '') {
        jsonResDataSearch = []
        searchComic(input.value.toUpperCase())
    } else {
        modeSearche = false
        i = 0;
        k = 0;
        qtdViewsComics = 8;
        divComics.innerHTML = ""
        getData()
        btMore.style.display = 'inline';
    }

    input.value = ''
}

btMore.onclick = () => {
    modeSearche ? showMore(jsonResDataSearch) : showMore(jsonResDataAll)
}

window.onload = () => {
    getData()
}
