
function weatherPull(){
	
	bootstrap_alert = function() {}
		bootstrap_alert.warning = function(message) {
            $('#alert').html('<div class="alert alert-danger fade in"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
        }
	
	var textVal = document.getElementById("weatherText").value;
	if(!textVal.match(/\S/))
	{
		bootstrap_alert.warning('<strong>Error!</strong> Enter a city!');
	}
	else{
	try{
	var city = document.getElementById("weatherText").value;
	var state = document.getElementById("stateSelect").value;
    var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text = \"\'" + city + "', '" + state + "'\"\ and country = 'United States') and u='f'";
  

  
  $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json").success(function(data){
		try
		{
			 var result = data;
			 
			 if(data.query.results.channel == null)
			 {
				 throw('New exception');
			 }

				    console.log(data);
				$('#temp').html("The Temperature in " + city + " is " + data.query.results.channel.item.condition.temp + " °F");
				$('#cond').html("Current Condition: " + data.query.results.channel.item.condition.text);
			 
		}
		catch(exception)
		{
					bootstrap_alert.warning('<strong>Error!</strong> That is not a city!');
		}
  });
	}
	catch(e)
	{
		
		bootstrap_alert.warning('<strong>Error!</strong> That is not a city 2!');
	}
	}//end else
	
};

function clearPage()
{
	
	$('#temp').html('');
	$('#temp2').html('');
	location.reload();

	
}

function fillComboBox()
{
	    var select = document.getElementById("stateSelect"); 
		var states = [
			"AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"
		];
		for(var i = 0; i < states.length; i++) {
			var opt = states[i];
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt;
			select.appendChild(el);
		}
}

