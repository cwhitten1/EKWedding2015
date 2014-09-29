function checkFormValues(){
	var inputsValid = true;
	var x;
	
	//Check the code input field
	validateCode();

	//Check the Main Guest input field
	var nameForm= document.forms["guestForm"]["main_guest"];
	var value = nameForm.value.trim();
	if(!value)
	{
		alert("Name field cannot be empty");
		inputsValid = false;
		return inputsValid;
	}

	//Make sure if any additional guests are coming, form is filled out
	var guestBox = document.getElementById("guest_checkbox");
	if(guestBox.checked)
	{
		var guestInputs = document.forms["guestForm"];
		var guestDiv = document.getElementById("guest_input");
		//Checks for which state the guest_input div is in. 
		if(guestDiv.getAttribute("data-state")==="blank")
		{
			alert("Please enter guest names");
		}
		else
		{
			var length = guestInputs.length-1; //Had to use length because a for/in loop was grabbing elements which contained meta-data vs inputs.

			//For each guest input, check if it is empty. Return if as soon as an empty input is found.
			for(i=1; i<length; i++)
			{
				var input = guestInputs[i];
				var value = input.value.trim();
				if(!value)
				{
					alert("Guest names cannot be empty");
					inputsValid = false;
					return inputsValid;
				}
			}
		}
	}	

	return inputsValid;
}

//Validate the code in the code field
function validateCode(){
	var xmlhttp;

	if(window.XMLHttpRequest)
	{
		//for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else
	{
		//for IE6, IE5
		xmlhttp = new ActiveXObject();
	}

	xmlhttp.onreadystatechange() = function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	var codes = xmlhttp.responseText;
	    }
	}

	xmlhttp.open("GET", "getCodes.php", true);
	xmlhttp.send();


}
