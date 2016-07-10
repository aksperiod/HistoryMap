console.log("App started");
var maxResults = 10;

var b = chrome.extension.getBackgroundPage();

// Vue.filter('favicon', function (value) {
// 	return "chrome://favicon/"+(value.substr(0,value.indexOf("/",8)+1));
// 	// return value.substr(0,value.indexOf("/",8)+1)+"favicon.ico";
// })


var vm = new Vue({
	el:"#view",
	data:{
		history:[],
		tabs: b.T.tabs,
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

	}
});



// chrome.runtime.onConnect.addListener(function(port) {
// 	port.onMessage.addListener(function(msg) {
// 		console.log("new Tab information: ",msg);
// 		vm.$set("tabs", msg);
// 	});
// });



// function dealWithHistoryResults(results) {
// 	console.log(results);
// 	vm.$set('history',results);
// }


/*



*/