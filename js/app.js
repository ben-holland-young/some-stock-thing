//function createCORSRequest(method, url) {
  //var xhr = new XMLHttpRequest();
  //if ("withCredentials" in xhr) {

    //// Check if the XMLHttpRequest object has a "withCredentials" property.
    //// "withCredentials" only exists on XMLHTTPRequest2 objects.
    //xhr.open(method, url, true);

  //} else if (typeof XDomainRequest != "undefined") {

    //// Otherwise, check if XDomainRequest.
    //// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    //xhr = new XDomainRequest();
    //xhr.open(method, url);

  //} else {

    //// Otherwise, CORS is not supported by the browser.
    //xhr = null;

  //}
  //return xhr;
//}


var app = new Vue({
    el: '#app',
    data: {
		searchSymbol: "FB",
        object: {},

        prices: [ 
            {symbol: "APPL", date: "2017-01-14", low : "133.25", open: "133.47", close:"135.01", high:"135.09", volume:"35569698",link: "https://chart.finance.yahoo.com/z?s=AAPL&t=1d"}

        ]
    },
    methods: {
        addSymbol: function() {
            if(this.searchSymbol == "") {
                alert("put in a symbol");
            }
            var chart = "https://chart.finance.yahoo.com/z?s"+this.searchSymbol+"&t=1d";
            var url = "https://www.quandl.com/api/v3/datasets/WIKI/"+this.searchSymbol+".json?api_key=xzBh9JuvESDS6uyTEX2D";

            //finance data api
            

            this.$http.get(url).then(response => {
                //console.log(response.body);
                var dataset = response.body["dataset"];
                var data = dataset["data"][0];
                var object = {};

                object.symbol = dataset["dataset_code"];
                object.date = data[0].toString();
                object.low = data[1].toString();
                object.open = data[2].toString();
                object.close = data[3].toString();
                object.high = data[4].toString();
                object.link = "https://chart.finance.yahoo.com/z?s=FB&t=1";
                object.volume = data[5].toString();
                
                this.prices.push(object);
                //console.log(this.object);

            }, response => {
                //error
            });
            var n = this.prices.length;
            var target = n - 1;
            //when i fix the cors error you can do this 
            this.$http.get(chart).then(response => {
                    var link = response.body;
                    this.prices[target].link = link;
            }, response => {
                //error

            });

            console.log(this.prices);

            
        },

        removeSymbol: function() {}

    }


})

//{
  //// GET /someUrl
  //this.$http.get('/someUrl').then(response => {

    //// get body data
    //this.someData = response.body;

  //}, response => {
    //// error callback
  //});
//}
//<script src="https://cdn.jsdelivr.net/vue.resource/1.2.0/vue-resource.min.js"></script>
