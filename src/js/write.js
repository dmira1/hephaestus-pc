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
    console.log(file)
    document.querySelector(".display img").src = URL.createObjectURL(file);
}

async function uploadNewProduct() {

    // Data
    const file = document.querySelector('#productImage').files[0]
    const name = document.querySelector('#productName').value.trim();
    const type = document.querySelector('#productType').value;
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
        type,
        price,
        urlPath,
        price,
        desc,
        storagePath
    })

    console.log("Item Added")

}