async function products() {
    try {
        const data = await fetch("https://ecommercebackend.fundamentos-29.repl.co/")
        
        const res = await data.json();
window.localStorage.setItem("products", JSON.stringify(res));
return res;

    } catch (error) {
        console.log(error)
        
    }

}

function printProducts(base_datos) {
    
    const productsHTML = document.querySelector(".products")

let html =``

    for (const product of base_datos.products ) {
    
    html +=`
    <div class ="product-garment">
    <div class="product-imag">
    <img src="${product.image}" alt="imagen">
</div>
<div class="product-info">
<p>${product.name}</p>
</div>

    <h3>${product.name} <span><b>Stock</b>: ${product.quantity}</span></h3>
    <h4>$${product.price}</h4>
    ${product.quantity} <i class='bx bx-plus' id="${product.id}"></i> : <span class = "productAgotado"></span>
    </div>
    
    `;
    }

    console.log(html)

    productsHTML.innerHTML = html;

    
}

function drivetrolley() {
    
    
const bxscartHTML = document.querySelector(".bxs-cart");
const trolleyHTML = document.querySelector(".trolley");


bxscartHTML.addEventListener("click", function () {
    trolleyHTML.classList.toggle("accion");
});
    
}

function add_cart_from_product(base_datos) {
    
    const productsHTML = document.querySelector(".products");
    productsHTML.addEventListener("click", function (e) {
    if(e.target.classList.contains("bx-plus")){
    const id = Number(e.target.id);

    const productFind = base_datos.products.find((product) => product.id === id );
    
    if(base_datos.trolley[productFind.id]){
        if(productFind.quantity === base_datos.trolley[productFind.id].amount)
        return alert("se acabaron mi rey");
            base_datos.trolley[productFind.id].amount++;
        
    }else{base_datos.trolley[productFind.id] ={...productFind, amount: 1 };

    }

    window.localStorage.setItem("trolley",JSON.stringify(base_datos.trolley));
    PrintProductTrolley(base_datos);
    Printvalues(base_datos);
    }
    })
    
    
}

function PrintProductTrolley(base_datos) {
    

    const trolleyproducts = document.querySelector(".trolley_products");
    
let html = ``
    for (const product in base_datos.trolley) {
        const {quantity , price , name , image , id , amount } = base_datos.trolley[product];


        html += `
        <div class= "trolley_product">
        <div class="trolley_product--img">

            <img src="${image}" alt="">        
        </div>
        <div class="trolley_product--body">
        <h4>${name} | ${price}</h4>

        <p>Stock: ${quantity}</p>

        
        <div class="trolley_product--body-opcion" id ="${id}">
        <i class='bx bx-minus'></i>
        <span>${amount} united</span>
        <i class='bx bx-plus'></i>
        <i class='bx bx-trash' ></i>
        </div>
        
        </div>
        
        </div>
        
        
        
        `;
        
        
            
        }
        
        trolleyproducts.innerHTML = html;
    }

function executionSumTrolley(base_datos) {

    const trolleyProducts = document.querySelector(".trolley_products");

    trolleyProducts.addEventListener("click", function(e) {
    if(e.target.classList.contains("bx-plus")){
    const id =Number(e.target.parentElement.id);
    
    
    const productFind = base_datos.products.find((product) => product.id === id );
    
if(productFind.quantity === base_datos.trolley[productFind.id].amount)
        return alert("se acabaron mi rey");
    base_datos.trolley[id].amount++;
    }
    if(e.target.classList.contains("bx-minus")) {

        const id =Number(e.target.parentElement.id);
        if( base_datos.trolley[id].amount === 1){
            const response =confirm("¿no va llevar nada mi rey?")
            if(!response) return; 
            
            delete base_datos.trolley[id];

        }else{
            base_datos.trolley[id].amount--;
    
        }
    
    }
    if(e.target.classList.contains("bx-trash")){
        const id =Number(e.target.parentElement.id);
        const response =confirm("¿no va llevar nada mi rey?")
        if(!response) return; 
    delete base_datos.trolley[id];
    }
    
    window.localStorage.setItem("trolley",JSON.stringify(base_datos.trolley))
    PrintProductTrolley(base_datos)
    Printvalues(base_datos)
    });
    
    }

function Printvalues(base_datos) {
    
const infoTotal = document.querySelector(".info_total");
const infoCantidad = document.querySelector(".info_cantidad");

let totalPro = 0;
let amountProduct = 0;

for (const product in base_datos.trolley ) {
    const {amount, price} = base_datos.trolley[product]
    totalPro += price * amount;
    amountProduct += amount;

}
infoTotal.textContent = amountProduct + " units";
infoCantidad.textContent = "$"+ totalPro + ".00";
PrintProductTrolley(base_datos)
}

const butonValue =document.querySelector(".butonValue")

butonValue.addEventListener("click",function() {
if(!Object.values(base_datos.trolley).length)
return alert("esta loco mi rey? COMPRE ALGO!!");

    const response = confirm("¿esta seguro de comprar mi rey?")
if(!response)return;

const compraProduct = [];

for (const product of base_datos.products) {
    const productsTrolley = base_datos.trolley[product.id] 
    if(product.id ===  productsTrolley?.id){
        compraProduct.push({
        ...product,
        quantity:product.quantity - compraProduct.amount
        
    });
    }else{
        compraProduct.push(product)
    }


}
base_datos.products =  compraProduct;
base_datos.trolley = {};

window.localStorage.setItem("products",JSON.stringify(base_datos.products))

window.localStorage.setItem("trolley",JSON.stringify(base_datos.trolley))
Printvalues(base_datos)
PrintProductTrolley(base_datos)
printProducts(base_datos)
});


async function dataInfo() {
    const base_datos ={
        products:JSON.parse(window.localStorage.getItem("products"))  || await products(),
        trolley :JSON.parse(window.localStorage.getItem("trolley")) || {},
    };



    printProducts(base_datos)
    drivetrolley()
    add_cart_from_product(base_datos)
    PrintProductTrolley(base_datos)
    executionSumTrolley(base_datos)
    Printvalues(base_datos)




}
dataInfo()
