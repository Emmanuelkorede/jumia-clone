 export let cart = JSON.parse(localStorage.getItem('cart')) || [] ;

export function addToCart(productId) {
     let matchingProduct ;
 
     cart.forEach((cartItem) => {
         if (cartItem.productId === productId) {
             matchingProduct = cartItem ;
         }
     }) ;
 
     if (matchingProduct) {
         matchingProduct.quantity += 1 ;
     } else {
         cart.push({
             productId : productId ,
             quantity : 1
         }) ;
 
     }
     saveToStorgae() ;
     console.log(cart) ;
 }


 function saveToStorgae() {
    localStorage.setItem('cart' , JSON.stringify(cart)) ;
 }

 export function updateCartQuantity() {
     let cartQuantity = 0 ;
 
     cart.forEach((cartItem) => {
         cartQuantity += cartItem.quantity ;
     }) ;
     document.querySelector('.cart-number').innerHTML = cartQuantity ;
  } 

 export function removeFromCart(productId) {
    const newCart = [] ;

    cart.forEach((cartItem)=> {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem)  ;
        }
    }) ;
    cart = newCart ;
    saveToStorgae() ;
  }

export  function increaseCartQuantity(productId) {
    cart.forEach((cartItem)=> {
        if (cartItem.productId === productId) {
            cartItem.quantity++ ;
        }
    }) ;
    saveToStorgae() ;
  }

export function decreaseCartQuantity(productId) {
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId) {
            if (cartItem.quantity > 1) {
                cartItem.quantity--
            } else {
                removeFromCart(productId) ;
            }
        } 
    }) ;
    saveToStorgae() ;
}