jQuery.ajax({
    url: "https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json",
    type: "GET",
    data: {
        "api_key": "xzBh9JuvESDS6uyTEX2D",
    },
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
	var dataset = data["dataset"];
    var symbol = dataset["dataset_code"];
	var date = dataset["column_names"][0] + ": " + dataset["data"][0][0];
	var open = dataset["column_names"][1] + ": " + dataset["data"][0][1];
	var high = dataset["column_names"][2] + ": " + dataset["data"][0][2];
	var low = dataset["column_names"][3] + ": " + dataset["data"][0][3];
	var close = dataset["column_names"][4] + ": " + dataset["data"][0][4];
	var volume =  dataset["column_names"][5] + ": " + dataset["data"][0][5];
	
	$(".symbol").text(symbol);
	$(".date").text(date);
	$(".open").text(open);
	$(".high").text(high);
	$(".low").text(low);
	$(".close").text(close);
	$(".volume").text(volume);





	jQuery.ajax({
		url: "https://chart.finance.yahoo.com/z",
		type: "GET",
		data: {
			"s": symbol,
			"t": "1d",
		},
	})
	.done(function(data, textStatus, jqXHR) {
		console.log("HTTP Request Succeeded: " + jqXHR.status);
		$(".chart").html('<img class="chart" src='+data+'" alt="">');
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		console.log("HTTP Request Failed");
	})
	.always(function() {
		/* ... */
	});




})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
})
.always(function() {
    /* ... */
});



