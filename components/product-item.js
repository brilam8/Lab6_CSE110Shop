// product-item.js


class ProductItem extends HTMLElement {

  static get observedAttributes() {
    return [`src`, `title`, `data-price`, `itemid`];
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    let style = document.createElement('style')
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `

    const main = this

    const list = this.appendChild(document.createElement('li'))
    list.setAttribute('class', 'product')

    const image = this.image = list.appendChild(document.createElement('img'))
    image.setAttribute('width', 200)
    image.src = this.hasAttribute('img') ? this.getAttribute('img') : "undefined.png";
    image.alt = this.hasAttribute('title') ? this.getAttribute('title') : "undefined"

    const p1 = this.p1T = list.appendChild(document.createElement('p'))
    p1.setAttribute('class', 'title')
    p1.textContent = this.hasAttribute('title') ? this.getAttribute('title') : "undefined"

    const p2 = this.p2P = list.appendChild(document.createElement('p'))
    p2.setAttribute('class', 'price')
    p2.textContent = this.getAttribute('data-price')

    const button = this.button = list.appendChild(document.createElement('button'))
    button.onclick =  
      function() {
        if (!localStorage.getItem('cart-items')) {
          localStorage.setItem('cart-items', JSON.stringify([]))
        }
        if (this.textContent == "Add to Cart") {
          let cart = document.getElementById('cart-count')
          cart.textContent = Number(cart.textContent) + 1;
          this.textContent = "Remove from Cart";
          let currItems = JSON.parse(localStorage.getItem('cart-items'))
          currItems.push(main.getAttribute('itemid'))
          localStorage.setItem('cart-items', JSON.stringify(currItems))
          alert('Added to Cart!'); 
        }
        else {
          let cart = document.getElementById('cart-count')
          cart.textContent = Number(cart.textContent) - 1;
          this.textContent = "Add to Cart";
          let currItems = JSON.parse(localStorage.getItem('cart-items'))
          let ind = currItems.indexOf(main.getAttribute('itemid'))
          console.log(ind)
          currItems.splice(ind, 1)
          localStorage.setItem('cart-items', JSON.stringify(currItems))
          alert('Removed from Cart!'); 
        }
        
      }
    
    
    button.textContent = "Add to Cart"

    button.addEventListener

    this.shadowRoot.append(style, list)

  }

  
  attributeChangedCallback(name, oldValue, newValue) {
    //console.log(name)
    if (name === `src`) {
      this.image.setAttribute('src', newValue);
    }
    else if (name === `title`) {
      this.image.setAttribute('alt', newValue);
      this.p1T.textContent = newValue;
    }
    else if (name === `data-price`) {
      this.p2P.textContent = `$${newValue}`
    }
    else if (name === `itemid`) {
      let currItems = JSON.parse(localStorage.getItem('cart-items'))
      let cart = document.getElementById('cart-count')
      if (currItems && currItems.includes(newValue) == true) {
        this.button.textContent = "Remove from Cart"
        cart.textContent = Number(cart.textContent) + 1
      }
      else {
        this.button.textContent = "Add to Cart"
      }
      //this.button.setAttribute("id", newValue)
    }
    // ...
  }
}

customElements.define('product-item', ProductItem);