import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set} from 'firebase/database'
import { db, storage } from "./libs/firebase/firebaseConfig";

document.querySelector('#productImage').addEventListener("change", onImageSelected);
const productForm = document.forms['product-form']

async function pageInit() {
    productForm.addEventListener('submit', onAddProduct)
}

function onAddProduct(e) {
    e.preventDefault();
    uploadNewProduct();
}

function getSelectedName() {
    var select = document.getElementById('productType')
    const selectedName = select.options[select.selectedIndex].text
    return selectedName
}

function getSelectedNumber() {
    var select = document.getElementById('productType')
    const selectedNumber = select.options[select.selectedIndex].value
    return selectedNumber
}


function onImageSelected(e) {
    let file = e.target.files[0];
    document.querySelector(".display img").src = URL.createObjectURL(file);
}

async function uploadNewProduct() {

    // Data
    const file = document.querySelector('#productImage').files[0]
    const name = document.querySelector('#productName').value.trim();
    const typeName = getSelectedName();
    const typeNumber = getSelectedNumber();
    const price = document.querySelector('#productPrice').value.trim();
    const desc = document.querySelector('#productDesc').value.trim();
    // Paths
    const imageRef = storageRef(storage, `images/${file.name}`);
    const dataRef = databaseRef(db, 'products')

    // Upload
    const uploadResult = await uploadBytes(imageRef, file);
    
    // URL of Image
    const urlPath = await getDownloadURL(imageRef)

    // Storage Path
    const storagePath = uploadResult.metadata.fullPath;

    const itemRef = await push(dataRef)

    set(itemRef, {
        key:itemRef.key,
        name,
        typeNumber,
        typeName,
        price,
        urlPath,
        desc,
        storagePath
    })

}

pageInit();