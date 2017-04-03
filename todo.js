
window.onload = function(){

    

    if (!JSON.parse(localStorage.getItem("Status"))){
    	//var testArr = ["Sample Item"];
    	localStorage.setItem("List", JSON.stringify(["Sample Item"]));
   		localStorage.setItem("Status", JSON.stringify([""]));
    }

    var form = document.getElementById("formToDo");
    var listDiv = document.getElementById("todo list");

    var submit = document.getElementById("addSubmit");
    var list = document.getElementById('list');

    submit.addEventListener("click", function(event){
    	//var form = document.getElementById("formToDo");
    	var myInput = document.getElementById("itemName");
    	//alert("value is " + form.itemName.value);
    	//addToStorage(form.itemName.value, "blank");
    	addToStorage(myInput.value, "blank");
    	myInput.value = "";
    });

    list.addEventListener("click", function(event){
    	//console.log(event.target.id);
    	var action = event.target.id[0];
    	var number = event.target.id;
    	number = number.substr(1); // cut off the prepended character telling us what action to take.

    	if (event.target.id[0] === 'c'){
    		console.log("complete", number, typeof(event.target.id));
    		event.target.parentNode.style.textDecoration = "line-through";
    		//read the status array
    		var statusArr = JSON.parse(localStorage.getItem("Status"));
    		// put 'complete' into the status array at index number
    		statusArr[number] = "c";
    		// save the status array
    		localStorage.setItem("Status", JSON.stringify(statusArr));

    	}
    	if (event.target.id[0] === 'd'){
    		//console.log("deleting", event.target.id);
    		deleteItem(number);
    	}
    });

    listFromStorage();

// Everything below here is functions.

	function deleteItem(number){
		var li = document.getElementById("i" + number);
		li.parentNode.removeChild(li);
		var listArr = JSON.parse(localStorage.getItem("List"));
		var statusArr = JSON.parse(localStorage.getItem("Status"));
		listArr.splice(number,1);
		statusArr.splice(number,1);
		localStorage.setItem("List", JSON.stringify(listArr));
		localStorage.setItem("Status", JSON.stringify(statusArr));
	}

	function clearList(){	
		while (list.firstChild){
	   		list.removeChild(list.firstChild);
		}
	}

	function addToStorage(item,status){
		var listArr =[];
		listArr = JSON.parse(localStorage.getItem("List"));
		var statusArr = [];
		statusArr = JSON.parse(localStorage.getItem("Status"));
		console.log("listArr start:",listArr);
		listArr.push(item);
		statusArr.push(status);
		console.log("listArr end:",listArr);
		localStorage.setItem("List", JSON.stringify(listArr));
		localStorage.setItem("Status", JSON.stringify(statusArr));
		listFromStorage();
	}

	function listFromStorage(){
		clearList();
		var listArr = JSON.parse(localStorage.getItem("List"));
		var statusArr = JSON.parse(localStorage.getItem("Status"));
		//console.log("listArr from storage:", listArr);

		for (var i = 0 ; i < listArr.length; i++){
			var li = document.createElement("li");
    		li.innerHTML = listArr[i];
    		li.id = "i" + i;
    		if (statusArr[i] === 'c'){
    			li.style.textDecoration = "line-through";
    		}

    		var completeButton = document.createElement("button");
    		completeButton.innerText = "Complete";
    		completeButton.id = "c" + i;
    		li.appendChild(completeButton);

    		var deleteButton = document.createElement("button");
    		deleteButton.innerText = "Delete";
    		deleteButton.id = "d" + i;
    		li.appendChild(deleteButton);

    		list.appendChild(li);
    	}	
	}
}