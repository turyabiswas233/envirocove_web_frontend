class Product {
    constructor(image, title, price, total) {
        this.image = image,
            this.title = title,
            this.price = price,
            this.total = total,
            this.inStock = total,
            this.sold = 0
    }
}
function newProduct(image, title, price, total) {
    return new Product(image, title, price, total)
}
export { newProduct }