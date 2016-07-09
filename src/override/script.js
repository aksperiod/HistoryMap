console.log("App started");
var maxResults = 10;

Vue.filter('favicon', function (value) {
	return "chrome://favicon/"+(value.substr(0,value.indexOf("/",8)+1));
	// return value.substr(0,value.indexOf("/",8)+1)+"favicon.ico";
})

var vm = new Vue({
	el:"#view",
	data:{
		history:[],
		menu:[{
			name:"Visited",
			selected:true
		},{
			name:"Analytics",
			selected:false
		},{
			name:"Searches",
			selected:false
		}]
	},
	ready: function(){
		console.log("vue ready");
		chrome.history.search({
			text:"",
			maxResults: maxResults
		}, function(results){
			dealWithHistoryResults(results);
		});
	}

});

function dealWithHistoryResults(results) {
	console.log(results);
	vm.$set('history',results);
}


/*



*/