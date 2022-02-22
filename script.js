const Shop = (function(){
    var balance = 1000;

    function checkStorage(storage, prod_count){
        if(storage >= prod_count) return storage -= prod_count;
        else return false;
    }
    function sellProduct(storage, prod_count, price){
        if(checkStorage(storage, prod_count)){
            balance += prod_count * price;
            return prod_count * price;
        }
        else return false;
    }
    function shopBalance(){
        return balance;
    }
    return {
        bank: shopBalance,
        sell: sellProduct,
        bal: shopBalance
    }

}());


var cBeer = 100, cWine = 50, cPepsi = 80, price, sum, type
    buyText = document.querySelector('.order div');
const pBeer = 32, pWine = 85, pPepsi = 30,
addForm = document.forms.addForm,
// pivo = addForm.type,
buyProducts = document.querySelector('.order button');

if(addForm){
    // let string = '';
    addForm.add.addEventListener('click', (e)=>{
        e.preventDefault();
        if(addForm.amount.value && addForm.type.value){
            if(addForm.type.value === 'Пиво') price = 32;
            else if(addForm.type.value === 'Вино') price = 80;
            else if(addForm.type.value === 'Пепсі') price = 28;
            else price = 0;
            buyText.innerHTML += '<p data-price="'+price+'" data-count="'+addForm.amount.value+'" data-type="'+addForm.type.value+'">'+addForm.type.value+': '+addForm.amount.value+'шт.</p>';
        }
        else console.log('error');
    })

    buyProducts.addEventListener('click', ()=>{
        let arrProduct = document.querySelectorAll('.order-list p'),
        getBalance = document.querySelector('.balance'),
        getBeer = document.querySelector('.beer'),
        getWine = document.querySelector('.wine'),
        getPepsi = document.querySelector('.pepsi'),
        b;
        if(arrProduct){
            for(let i=0; i<arrProduct.length; i++){
                if(arrProduct[i].dataset.type === 'Пиво') b = getBeer.textContent;
                else if(arrProduct[i].dataset.type === 'Вино') b = getWine.textContent;
                else if(arrProduct[i].dataset.type === 'Пепсі') b = getPepsi.textContent;

                let a = Shop.sell(parseInt(b), arrProduct[i].dataset.count, arrProduct[i].dataset.price);
                if(a != false){
                    
                }
                else console.log(false);
                // console.log(a);
            }
            getBalance.textContent = Shop.bal()+' грн.';
        }
    })
}