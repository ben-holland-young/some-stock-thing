var app = new Vue({
    el: '#app',
    data: {
		searchSymbol: "MSFT",

        prices: [ 
            {symbol: "APPL", date: "2017-01-14", low : "133.25", open: "133.47", close:"135.01", high:"135.09", volume:"35569698",link: "https://chart.finance.yahoo.com/z?s=AAPL&t=1d"}

        ]
    },
    methods: {
        addSymbol: function() {
            
            var url = "https://www.quandl.com/api/v3/datasets/WIKI/"+this.searchSymbol+".json?api_key=xzBh9JuvESDS6uyTEX2D";
            this.$http.get(url).then(response => {
                console.log(response.body);

                //get data here
                var dataset = response.body["dataset"];
                var symbol = dataset["dataset_code"];
                var data = dataset["data"];
                var date = data[0][0];
                var open = data[0][1];
                var high = data[0][2];
                var low = data[0][3];
                var close = data[0][4];
                var volume = data[0][5]
                //MARK - integrate yahoo chart api from paw and url format like in example price object 
                var new_symbol = {symbol: symbol, date: date, low: low, open: open, close: close, high: high, volume: volume};
                this.prices.push(new_symbol);

            }, response => {
                //error
            });

            
        }

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
