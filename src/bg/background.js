
var currentTabs = [];


var SmartTab = function(options){
	this.id = options.id;
	this.startDate = options.date || -1;
	this.endDate = -1;
	this.sourceTab = options.sourceTab || null;
	this.children = null;
	this.sessions = [];
	this.addSession = function(session){
		this.sessions.push(session);
	}
}

var Session = function(options){
	this.title = options.title || "";
	this.url = options.url || "";
	this.favicon = options.favicon || "";
	this.start = options.start || 0;
	this.visits = 0;
}

var TabHandler = function() {
	this.tabs = [];

	this.get = function(id){
		for(var i=0;i<this.tabs.length;i++){
			if(this.tabs[i].id == id) {
				return this.tabs[i];
			}
		}
		console.log("This should never happen, but a tab wasn't found.");
		return -1;
	}

	this.index = function(id){
		for(var i=0;i<this.tabs.length;i++){
			if(this.tabs[i].id == id) {
				return i;
			}
		}
		return -1;
	}

	this.has = function(id){
		for(var i=0;i<this.tabs.length;i++){
			if(this.tabs[i].id == id) {
				return true;
			}
		}
		return false;
	}

	this.add = function(tab) {
		console.log("Tab added.");
		this.tabs.push(tab);
	}

	this.remove =  function(id) {
		console.log("Tab removed.");
		this.tabs.splice(this.index(id),1);
	}
}

var T = new TabHandler();
  

function onUpdated(tabId , info) {
	 if (info.status == "complete") {
        console.log(""+tabId+" has finished loading");
    	chrome.tabs.get(tabId, chromeTabToSession);

    }
}

function onCreated(data){
	T.add(new SmartTab({id:data.id, date:Date.now(), sourceTab:data.openerTabId}));
}

function onRemoved(tabId, removeInfo) {
	console.log(tabId);
	T.remove(tabId);
}

function chromeTabToSession(tab) {
	if(T.has(tab.id)){
		T.get(tab.id)
		.addSession( 
			new Session({
				title: tab.title,
				url: tab.url,
				favicon: tab.favIconUrl,
				start: Date.now()
			})
			);

	}
}


chrome.tabs.onRemoved.addListener(onRemoved);
chrome.tabs.onCreated.addListener(onCreated);
chrome.tabs.onUpdated.addListener(onUpdated);


chrome.tabs.getAllInWindow(function(tabList){
	var i;
	for(i=0;i<tabList.length;i++){
		T.add(new SmartTab({id: tabList[i].id, date: Date.now()}));
		chrome.tabs.get(tabList[i].id, chromeTabToSession);
	}
	console.log("current session has "+T.tabs.length+" tabs.");
});


// var port = chrome.runtime.connect({name: "knockknock"});
// port.postMessage(T.tabs);


