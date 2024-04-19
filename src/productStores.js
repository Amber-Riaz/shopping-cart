// coffee:  price_1P6rkpRwZy31Jhg8wURkhuXm
// sunglasses: price_1P6roRRwZy31Jhg8IUolM5R6
// Camera:  price_1P6rqARwZy31Jhg8MSVfJAY4


const productsArray=[
    {
        id:'price_1P6rkpRwZy31Jhg8wURkhuXm',
        title:'coffee',
        price:4.99
    },
    {
        id:'price_1P6roRRwZy31Jhg8IUolM5R6',
        title:'Sunglasses',
        price:9.99
    },
    {
        id:'price_1P6rqARwZy31Jhg8MSVfJAY4',
        title:'Camera',
        price:39.99
    },
]

function getProductData(id){
    let productData= productsArray.find(product=>product.id===id)
    if (productData === undefined){
        console.log("Product of this id does not exist")
        return undefined;
    }

    return productData;

}
export {productsArray, getProductData};