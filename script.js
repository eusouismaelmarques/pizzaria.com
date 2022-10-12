let cart = []
let modalQt = 1;
let modalKey = 0;


const c = (el) =>  document.querySelector(el);
const cs = (el) =>  document.querySelectorAll(el);

//Listagem da pizzas
pizzaJson.map((pizza,index)=>{
        let pizzaItem = c('.models .pizza-item').cloneNode(true);

        pizzaItem.setAttribute('data-key', index)// Setando um atributo
    //Preencer as informações em pizzaitem
        pizzaItem.querySelector('.pizza-item--name').innerHTML=pizza.name;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML=pizza.description;
        pizzaItem.querySelector('.pizza-item--price').innerHTML=`R$ ${pizza.price.toFixed(2)}`;
        pizzaItem.querySelector('.pizza-item--img img').src = pizza.img

    //Clique na pizza
        pizzaItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault(); // Cancela o evento no clique
            let key = e.target.closest('.pizza-item').getAttribute('data-key')
            modalQt = 1;
            modalKey = key;

            document.querySelector('.pizzaInfo h1').innerHTML= pizzaJson[key].name
            document.querySelector('.pizzaInfo .pizzaInfo--desc').innerHTML= pizzaJson[key].description
            document.querySelector('.pizzaInfo .pizzaInfo--desc').innerHTML= pizzaJson[key].description
            document.querySelector('.pizzaInfo .pizzaInfo--actualPrice').innerHTML= `R$ ${pizzaJson[key].price.toFixed(2)}`
            document.querySelector('.pizzaBig img').src = pizzaJson[key].img;
            document.querySelector('.pizzaInfo--size').classList.remove('selected')
            document.querySelectorAll('.pizzaInfo--size').forEach((size, sezeIndex) => {
                if(sezeIndex == 2){
                    size.classList.add('selected')
                }
                size.querySelector('span').innerHTML = pizzaJson[key].sizes[sezeIndex]
            });
            document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;

            document.querySelector('.pizzaWindowArea').style.opacity = 0;
            document.querySelector('.pizzaWindowArea').style.display = 'flex';   
    // Tempo para carregar a o modal
            setInterval( ()=>{
                    document.querySelector('.pizzaWindowArea').style.opacity = 1;
                }, 200)
    });
    //Add uma do lado da outra
        c('.pizza-area').append(pizzaItem)
})

//Eventos do Modal
function fecharModal(){
    document.querySelector('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none'
    }, 200)
    
    
}

document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => 
item.addEventListener('click', fecharModal));

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () =>{
    
    if(modalQt > 1){
        modalQt--;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
    }    
})
document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () =>{
    modalQt++;
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
})

document.querySelectorAll('.pizzaInfo--size').forEach((size, sezeIndex) => {
    size.addEventListener('click', (e)=> {
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected');
    })
});

document.querySelector('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let sizePizza = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'))

    //identificador 
        let identifier = pizzaJson[modalKey].id+'@'+sizePizza;
        let key = cart.findIndex((item)=>item.identifier == identifier)
        if(key > -1){
            cart[key].qt += modalQt
        }else{
            cart.push({
                identifier,
                id:pizzaJson[modalKey].id,
                sizePizza,
                qt:modalQt
            })
        }
    // Atualiza o carrinho
        udateCart()
    // Fecha Modal, a pós add no carrinho
        fecharModal()
})

document.querySelector('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        document.querySelector('aside').style.left = "0"
    }
})
document.querySelector('.menu-closer').addEventListener('click', ()=>{
    
    document.querySelector('aside').style.left = "100vw"
})

function udateCart(){

    document.querySelector('.menu-openner span').innerHTML= cart.length;
    if(cart.length > 0){


        document.querySelector('aside').classList.add('show')
        c('.cart').innerHTML=""

            let subtotal = 0;
            let desconto =0;
            let total = 0;
            let teleEntrega = 5;


        for(let i in cart){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true)
            let pizzaSizeName;
            
            subtotal += pizzaItem.price * cart[i].qt


            switch(cart[i].sizePizza) {
                case 0:
                    pizzaSizeName ='P';
                    break;
            
                case 1:
                    pizzaSizeName ='M';
                    break;
            
                case 2:
                    pizzaSizeName = 'G';
                    break; 
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})` 
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--
                }else{
                    cart.splice(i, 1)
                }
                udateCart()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                udateCart()
            })
            document.querySelector('.cart').append(cartItem)
        }

        desconto = subtotal * 0.1;
        
        total = subtotal + teleEntrega - desconto

        document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        document.querySelector('.teleEntrega span:last-child').innerHTML = `R$ ${teleEntrega.toFixed(2)}`;
        document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
        document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;


    }else{
        document.querySelector('aside').classList.remove('show')
        document.querySelector('aside').style.left = "100vw"
    }
}

