// Script.js

localStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {
  prodList = document.getElementById('product-list')
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(data))
      }
      else {
        console.log("already fetched the info and stored it")
      }
      console.log(data[0])
      for (let i = 0; i < data.length; i++ ) {
        let prodEle = prodList.appendChild(document.createElement('product-item'))
        //console.log(data[i].image)
        
        prodEle.title = data[i].title
        prodEle.setAttribute('src', data[i].image)
        prodEle.setAttribute("data-price", data[i].price)
        prodEle.setAttribute("id", data[i].id)
      }
    })
  
});