const productCardTemplate = document.querySelector("[data-product-template]")
const productCardContainer = document.querySelector("[data-product-cards-container]")
const searchInput = document.querySelector("[data-search]")
const searchBtn = document.querySelectorAll(".SearchBtn")



let products = []

for(let i=0;i < searchBtn.length;i++){
    searchBtn[i].addEventListener("click" , e =>{
        const value = e.target.value.toLowerCase()
        products.forEach(product => {
            const isVisible =  product.type.toLowerCase().includes(value)
            product.element.classList.toggle("hide", !isVisible)
        })
    })
}

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()

    products.forEach(product => {
        const isVisible = product.name.toLowerCase().includes(value) || product.type.toLowerCase().includes(value)
        product.element.classList.toggle("hide", !isVisible)
    })
})

fetch("products.json")
    .then(res => res.json())
    .then(data => {
        products = data.map(product => {
            const card = productCardTemplate.content.cloneNode(true).children[0]

            const type = card.querySelector("[data-type]")
            const name = card.querySelector("[data-name]")
            const description = card.querySelector("[data-description]")
            const image = card.querySelector("[data-image]")

            type.textContent = product.type
            name.textContent = product.name
            description.textContent = product.description
            image.src = product.image

            productCardContainer.append(card)
            return { name: product.name, type: product.type, element: card }
        })
    })