class ProductManager {
  constructor() {
    this.products = [];
  }

  getProduct = () => {
    return this.products;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = {
      id: this.products.length + 1,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code , //autoincrementar el id de productos
      stock: stock,
    };
    const findCode = this.products.find((v) => v.code === code);

    if (!findCode) {
      this.#productValueUndefined(
        product.title,
        product.description,
        product.price,
        product.thumbnail,
        product.code,
        product.stock,
        product
      );
    }

    if (findCode) {
      console.log("No se puede repetir el codigo:", code );
    }
  };
  #productValueUndefined = (
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    product
  ) => {
    if (
      title != undefined &&
      description != undefined &&
      price != undefined &&
      thumbnail != undefined  &&
      code != undefined &&
      stock != undefined 
    ) {
      this.products.push(product);
    } else {
      Object.prototype.getKey = function (value) {
        for (let key in this) {
          if (this[key] == value) {
            return key;
          }
        }
      };
      console.log("------------------------------------------>");
      console.log("ERROR: Deben llenarse todos los campos del producto");
      console.log(
        `El valor faltante es: ${product.getKey(undefined)?.toUpperCase()}`
      );
    }
  };

  getProductById = (codeId) => {
    const findCode = this.products.find((v) => v.id === codeId);

    if (!findCode) {
      console.error("Not found ID:",codeId);
      return;
    }
    if (findCode) {
      return this.products.filter((v) => v.id == codeId);
    }
  };
}

const productManager = new ProductManager();
productManager.addProduct(
  "Teclado Multimedia Usb Omega Kb-2000",
  "Este teclado Omega es el mejor complemento para hacer todo tipo de actividades. Es cómodo y práctico al momento de redactar documentos, navegar y hacer búsquedas por internet, ya sea en tu trabajo o en la comodidad del hogar.",
  25900,
  "https://http2.mlstatic.com/D_NQ_NP_697288-MCO47769752960_102021-O.webp",
  2,
  40
);
productManager.addProduct(
  "iPad Pro 11 pulgadas 256 GB 4ta Gen",
  "Con el iPad Pro podrás crear diseños 3D fotorrealistas, diseñar complejos modelos de realidad aumentada y disfrutar juegos con gráficos dignos de una consola a una alta frecuencia de cuadros más rápido que nunca.",
  5599000,
  "https://www.ktronix.com/medias/750Wx750H-master-hotfolder-transfer-incoming-deposit-hybris-interfaces-IN-media-product-194253265153-001.jpg?context=bWFzdGVyfGltYWdlc3wxNzI3MjV8aW1hZ2UvanBlZ3xoZDgvaGZkLzEzNDg1ODE3NTkzODg2Lzc1MFd4NzUwSF9tYXN0ZXIvaG90Zm9sZGVyL3RyYW5zZmVyL2luY29taW5nL2RlcG9zaXQvaHlicmlzLWludGVyZmFjZXMvSU4vbWVkaWEvcHJvZHVjdC8xOTQyNTMyNjUxNTNfMDAxLmpwZ3wwNzZkYmUyMjM4NWUwM2Q2M2MxYmUyMjVhOWQ3MGQ0MTY1MmIyNDUxMzY1ZmZmOGRjNDg2YWNiMTVjZmIyMGYw",
  0,
  10
);
console.log("------------------------------------------>");
console.log("Producto Repetido:");
productManager.addProduct(
  "iPad Pro 11 pulgadas 256 GB 4ta Gen",
  "Con el iPad Pro podrás crear diseños 3D fotorrealistas, diseñar complejos modelos de realidad aumentada y disfrutar juegos con gráficos dignos de una consola a una alta frecuencia de cuadros más rápido que nunca.",
  5599000,
  "https://www.ktronix.com/medias/750Wx750H-master-hotfolder-transfer-incoming-deposit-hybris-interfaces-IN-media-product-194253265153-001.jpg?context=bWFzdGVyfGltYWdlc3wxNzI3MjV8aW1hZ2UvanBlZ3xoZDgvaGZkLzEzNDg1ODE3NTkzODg2Lzc1MFd4NzUwSF9tYXN0ZXIvaG90Zm9sZGVyL3RyYW5zZmVyL2luY29taW5nL2RlcG9zaXQvaHlicmlzLWludGVyZmFjZXMvSU4vbWVkaWEvcHJvZHVjdC8xOTQyNTMyNjUxNTNfMDAxLmpwZ3wwNzZkYmUyMjM4NWUwM2Q2M2MxYmUyMjVhOWQ3MGQ0MTY1MmIyNDUxMzY1ZmZmOGRjNDg2YWNiMTVjZmIyMGYw",
  0,
  10
);

productManager.addProduct("Computador", "esto es un computador");
console.log("------------------------------------------>");
console.log("------------------------------------------>");
console.log("------------------------------------------>");
console.log("Lista de productos");
console.log(productManager.getProduct());
console.log("------------------------------------------>");
console.log("Producto encontrado por ID");
console.log(productManager.getProductById(2));
console.log("------------------------------------------>");
console.log("Producto no encontrado");
console.error(productManager.getProductById(4));
