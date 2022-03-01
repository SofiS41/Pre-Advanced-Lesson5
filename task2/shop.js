var balance = 1000;

function checkStorage(storage, prod_count){
    if(prod_count <= storage && storage != 0) return storage -= prod_count;
    else return false;
}
function sellProduct(prod_count, price){
    balance += prod_count * price;
    return prod_count * price;
}
function shopBalance(){
    return balance;
}

export {checkStorage, sellProduct, shopBalance};
