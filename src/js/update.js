import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, set, get} from 'firebase/database';
import {db, storage} from "./libs/firebase/firebaseConfig";

document.querySelector('#productImage').addEventListener("change", onImageSelected);
const productForm = document.forms['product-form']

async function pageInit(){
  const key = sessionStorage.getItem('key')
  const productRef = databaseRef(db, `products/${key}`)
  const productSnapShot = await get(productRef)

  if(productSnapShot.exists()){
    setFieldValues(productSnapShot.val())
  }

  productForm.addEventListener('submit', onEditProduct)
}

function onEditProduct(e){
  e.preventDefault();
  editProductData();
}

function setFieldValues({name, typeNumber, price, desc, urlPath}){
    productForm.elements['productName'].value = name
    productForm.elements['productType'].value = typeNumber
    productForm.elements['productPrice'].value = price
    productForm.elements['productDesc'].value = desc
    document.querySelector('#uploadImage img').src = urlPath
}

function getSelectedName() {
  var select = document.getElementById('productType')
  selectedName = select.options[select.selectedIndex].text
  return selectedName
}

function getSelectedNumber() {
  var select = document.getElementById('productType')
  selectedNumber = select.options[select.selectedIndex].value
  return selectedNumber
}

function onImageSelected(e) {
  let file = e.target.files[0];
  document.querySelector(".display img").src = URL.createObjectURL(file);
}

async function editProductData(){
  const key = sessionStorage.getItem('key')
  const dataRef = databaseRef(db, `products/${key}`)
  const productSnapShot = await get(dataRef)

  console.log(productSnapShot.val().storagePath)
  var file = document.querySelector('#productImage').files
  const name = document.querySelector('#productName').value.trim();
  var typeName = getSelectedName();
  var typeNumber = getSelectedNumber();
  const price = document.querySelector('#productPrice').value.trim();
  const desc = document.querySelector('#productDesc').value.trim();
  
  if (file.length !== 0) {
    const imageRef = storageRef(storage, `images/${file.name}`);
    const uploadResult = await uploadBytes(imageRef, file);
    const urlPath = await getDownloadURL(imageRef)
    const storagePath = productSnapShot.val().storagePath
    set(dataRef, {
      key: key,
      name,
      typeNumber,
      typeName,
      urlPath,
      price,
      desc,
      storagePath
    })}else{
    const imageRef = storageRef(storage, `images/${file.name}`);
    const uploadResult = await uploadBytes(imageRef, file);
    const urlPath = await getDownloadURL(imageRef)
    const storagePath = uploadResult.metadata.fullPath 
    set(dataRef, {
      key: key,
      name,
      typeNumber,
      typeName,
      urlPath,
      price,
      desc,
      storagePath
    })
  } 
  window.alert("Successfully updated product.")
}
pageInit();