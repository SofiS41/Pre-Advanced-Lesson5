import {checkStorage, sellProduct, shopBalance} from './shop.js';

let elem, arrProduct, selling=0,
	data = {typeProd: [], genCount: [], prodCount: [], prices: []}, 
	buyText = document.querySelector('.order div'),
	reciept = document.querySelector('.shop-sections.receipt');

const addForm = document.forms.addForm,
	buyProducts = document.querySelector('.order button'),
	tooMuch = document.querySelector('.message'),
	tooMuchBtn = document.querySelector('.message button');

if(addForm){
	addForm.add.addEventListener('click', (e)=>{
		e.preventDefault();
		if(addForm.amount.value && addForm.type.value){
			elem = document.querySelector(`.field-content.${addForm.type.value} span`);
			if(checkStorage(Number(elem.textContent), Number(addForm.amount.value)) !== false){
				buyText.innerHTML += '<p>'+addForm.type.value+': '+addForm.amount.value+'шт - '+elem.dataset.price+' грн/шт</p>'
				data.typeProd.push(addForm.type.value);
				data.genCount.push(Number(elem.textContent));
				data.prodCount.push(Number(addForm.amount.value));
				data.prices.push(Number(elem.dataset.price));
			}
			else tooMuch.classList.remove('none');
			addForm.reset();
		}
	});

	buyProducts.addEventListener('click', ()=>{
		arrProduct = document.querySelector('.order-list');
		if(arrProduct.children.length != 0){
			for(let i=0; i<arrProduct.children.length; i++){
				selling += sellProduct(data.prodCount[i], data.prices[i]);
				document.querySelector(`.field-content.${data.typeProd[i]} span`).textContent = checkStorage(data.genCount[i], data.prodCount[i]);
			}
			document.querySelector('.balance  span').textContent = shopBalance();
		}
		reciept.innerHTML += '<div>'+arrProduct.innerHTML+'<p>Всього: '+selling+' грн.</p></div>';
		arrProduct.innerHTML = '';
		data.typeProd = [];
		data.genCount = [];
		data.prodCount = [];
		data.prices = [];
		selling=0;
	});

	tooMuchBtn.addEventListener('click', () => {tooMuch.classList.add('none');} );
}
