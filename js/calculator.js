var keys = document.querySelectorAll("#calculator span");
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

for(var i=0; i<keys.length; i++){
	keys[i].onclick = function(e){
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		if(btnVal=='C'){
			input.innerHTML = '';
			decimalAdded = false;
		}
		else if(btnVal=='='){
			var equation = inputVal;
			var lastChar = inputVal[inputVal.length-1]
            if(operators.indexOf(lastChar)>-1){
            	equation = equation.replace(/.$/, '');
            }
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			if(equation){
				input.innerHTML = eval(equation);
			}
			decimalAdded = false;
		}
		else if(operators.indexOf(btnVal)>-1){
			var lastChar = inputVal[inputVal.length-1];
			if(inputVal!='' && operators.indexOf(lastChar)==-1){
				input.innerHTML += btnVal;	
			}
			else if(inputVal=='' && btnVal=='-'){
				input.innerHTML += btnVal;
			}
			if(operators.indexOf(lastChar)>-1 && inputVal.length>1){
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			decimalAdded = false;	
		}
		else if(btnVal=='.'){
			if(!decimalAdd){
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		else{
			input.innerHTML += btnVal;
		}
		e.preventDefault();
	}
}