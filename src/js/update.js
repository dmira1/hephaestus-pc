import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, set, get} from 'firebase/database';
import {db, storage} from "./libs/firebase/firebaseConfig";

const productForm = document.forms['product-form']

function pageInit(){
  const key = sessionStorage.getItem('key')
  const productRef = databaseRef(db, `products/${key}`)
  const productSnapShot = await get(productRef)

  if(productSnapShot.exists()){
    setFieldValues(productSnapShot.val())
  }

  productForm.addEventListener('submit', onUpdateRental)
}

function onUpdateRental(e){
  e.preventDefault();
  const city = e.target.elements['product'].value.trim()
}

function setFieldValues({name, type, price, desc, urlPath}){
    productForm.elements['#productName'].value = name
    productForm.elements['#productType'].value = type
    productForm.elements['#productPrice'].value = price
    productForm.elements['#productDesc'].desc = desc
    document.querySelector('.display img').src = urlPath
}

pageInit();