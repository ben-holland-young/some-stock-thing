
var app = new Vue({
    el: '#app',
    data: {
        searchSymbol: "",
        deleteSymbol: "",
        prices: [
            {symbol: "APPL", date: "2017-01-14", low : "133.25", open: "133.47", close:"135.01", high:"135.09", volume:"35569698",link: "https://chart.finance.yahoo.com/z?s=AAPL&t=1d"}

        ]
    },
    methods: {
        addSymbol: function() {
            var url = "https://www.quandl.com/api/v3/datasets/WIKI/"+this.searchSymbol+".json?api_key=xzBh9JuvESDS6uyTEX2D";

            //finance data api


            this.$http.get(url).then(response => {
                var dataset = response.body["dataset"];
                var data = dataset["data"][0];
                var object = {};

                object.symbol = dataset["dataset_code"];
                object.date = data[0].toString();
                object.low = data[1].toString();
                object.open = data[2].toString();
                object.close = data[3].toString();
                object.high = data[4].toString();
                object.link = "https://chart.finance.yahoo.com/z?s="+object.symbol+"&t=1d";
                object.volume = data[5].toString();

                this.prices.push(object);

            }, response => {
                //error
                var dialog = new BootstrapDialog({
                    title: 'Stock Error',
                    message: 'stock not found',
                    buttons: [{
                        label: 'Close this dialog.',
                        action: function(dialogRef){
                            dialogRef.close();
                        }
                    }]
                });

                dialog.open();
            });

            console.log(this.prices);



        },

        removeSymbol: function() {
            var n = this.prices.length;

            for(var i = 0;i < n; i++) {
                if (this.prices[i].symbol == this.deleteSymbol) {
                    this.prices.splice(i,1);
                }
            }
            if (this.prices.length == n) {

                var dialog = new BootstrapDialog({
                    title: 'Deleting Error',
                    message: 'No such stock',
                    buttons: [{
                        label: 'Close this dialog.',
                        action: function(dialogRef){
                            dialogRef.close();
                        }
                    }]
                });

                dialog.open();
            }

        },
        removeAll: function() {
            for(var i = 0; i <= this.prices.length; i++) {
                this.prices.splice(i);
            }

        }

    }


});

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
