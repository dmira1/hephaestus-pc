import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set} from 'firebase/database'
import { db, storage } from "./libs/firebase/firebaseConfig";

document.querySelector('#productImage').addEventListener("change", onImageSelected);
document.forms["product-form"].addEventListener("submit", onAddProduct);


function onAddProduct(e) {
    e.preventDefault();
    uploadNewProduct();
}

function onImageSelected(e) {
    let file = e.target.files[0];
    document.querySelector(".display img").src = URL.createObjectURL(file);
}

async function uploadNewProduct() {

    // Data
    const file = document.querySelector('#productImage').files[0]
    const name = document.querySelector('#productName').value.trim();
    const typeNumber = document.querySelector('#productType').value;
    console.log(typeNumber)
    if (typeNumber.value == "0") {
        typeString = null
    }
    else if (typeNumber.value == "1") {
        typeString = "Mini Tower"
    }
    else if (typeNumber.value == "2") {
        typeString = "Mid Tower"
    }
    else if (typeNumber.value == "3") {
        typeString = "Full Tower"
    }
    else {
        typeString = "Custom"
    }
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
        typeString,
        price,
        urlPath,
        price,
        desc,
        storagePath
    })

    console.log("Item Added")

}