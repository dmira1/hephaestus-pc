function productItem ({key, name, urlPath, type, desc, price}) {
    const template =`
        <div class="product-card">
            <div class="product-top">
                <div class="buttons">
                    <a href="#" id="delete" data-key="${key}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    </a>
                    <a href="#" id="edit" data-key="${key}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </a>
                </div>
                <img src="${urlPath}" alt="${name} image">
            </div>
            <div class="product-details">
                <p class="name">${name}</p>
                <p class="type">${type}</p>
                <p class="price">$${price/100}</p>
                <p class="desc">${desc}</p>
            </div>
        </div>
    `
    const element = document.createRange().createContextualFragment(template).children[0]
    addRentalControls(element)
    return element
}

function addRentalControls(rental){
    rental.querySelector('#edit').addEventListener('click', onEditRental)
    rental.querySelector('#delete').addEventListener('click', onRemoveRental)
}

function onEditRental(e){
    const key = e.target.dataset.key
    sessionStorage.setItem('key', key)
    window.location.assign('update.html')
}
function onRemoveRental(e){
    const key = e.target.dataset.key
    sessionStorage.setItem('key', key)
    window.location.assign('delete.html')
}
export {productItem}