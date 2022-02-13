import {ref as databaseRef, set, get} from 'firebase/database';
import {db, storage} from "./libs/firebase/firebaseConfig";

const productForm = document.forms['product-form']

async function pageInit(){
    const key = sessionStorage.getItem('key')
    const productRef = databaseRef(db, `products/${key}`)
    const productSnapShot = await get(productRef)

    if(productSnapShot.exists()){
      setFieldValues(productSnapShot.val())
    }
    
    productForm.addEventListener('submit', (e)=>{
      e.preventDefault()
      var answer = window.confirm("Are you sure you want to delete this product?")
      if (answer){
        set(productRef, {
          key: null
        })
        window.alert("Delete successful.")
        resetForm()
        window.location.assign("read.html")
      }else{
        e.preventDefault()
        window.alert("Delete cancelled.")
      }
    })
}

function setFieldValues({name, typeNumber, price, desc, urlPath}){
  productForm.elements['productName'].value = name
  productForm.elements['productType'].value = typeNumber
  productForm.elements['productPrice'].value = price
  productForm.elements['productDesc'].value = desc
  document.querySelector('#uploadImage img').src = urlPath
}

function resetForm(){
  productForm.elements['productName'].value = null
  productForm.elements['productType'].value = null
  productForm.elements['productPrice'].value = null
  productForm.elements['productDesc'].value = null
}
pageInit();