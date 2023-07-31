function goToHome () {
      window.location.href = '/';
  }


  const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const urlGet = window.location.pathname;
    const productId = urlGet
    const cartId = '644582bf3d9bdc4e85d301b3';
    const quantity = 1; // cantidad de productos a agregar al carrito
    const url = `http://localhost:8080/api/carts/${cartId}/product${productId}`;
    
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({ quantity,text: productId  })
    })
      .then((response) => {
        // handle response
      })
      .catch((error) => {
        // handle error
      });
  });
});