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
            }else{

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

        let key = cart.findIndex((item)=>item.identifier = identifier)

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

    
})

