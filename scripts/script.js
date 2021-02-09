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
    })
  data = JSON.parse(localStorage.getItem('products'))
  for (prod in data) {
    prodList.appendChild(document.createElement('product-item'))
  }
});