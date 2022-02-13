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

async function editProductData(){
  const key = sessionStorage.getItem('key')
  const dataRef = databaseRef(db, `products/${key}`)

  var file = document.querySelector('#productImage').files
  const name = document.querySelector('#productName').value.trim();
  var typeName = getSelectedName();
  var typeNumber = getSelectedNumber();
  const price = document.querySelector('#productPrice').value.trim();
  const desc = document.querySelector('#productDesc').value.trim();

  file = document.querySelector('#productImage').files[0]
  const imageRef = storageRef(storage, `images/${file.name}`);

  // Upload
  const uploadResult = await uploadBytes(imageRef, file);
  
  // URL of Image
  const urlPath = await getDownloadURL(imageRef)

  // Storage Path
  const storagePath = uploadResult.metadata.fullPath;

  set(dataRef, {
    key,
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