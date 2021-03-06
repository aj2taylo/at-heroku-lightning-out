
function forceInit() {
	force.init(config);
};

function forceLogin(key) {
	forceInit();
	force.login(function(success) {
		var oauth = force.getOauth();
		setupLightning();
	});	
}

var _lightningReady = false;

function setupLightning(callback) {
	console.log('called setupLightning');
	var appName = config.loApp;
	console.log(appName);

	var oauth = force.getOauth();
    if (!oauth) {
        alert("Please login to Salesforce.com first!");
        return;
    }

	if (_lightningReady) {
		if (typeof callback === "function") {
			callback();
		}
	} else {
	    // Transform the URL for Lightning
	    var url = oauth.instanceUrl.replace("my.salesforce", "lightning.force");
		console.log(url);

	    $Lightning.use(
	    	appName, 
	        function() {
				_lightningReady = true;
				//document.getElementById("chatterFeedButton").style.display = "";
				document.getElementById("contactUsButton").style.display = "";
				if (typeof callback === "function") {
					callback();
				}
	        },
			/*$Lightning.createComponent(
	            "ltngx:contactUs",
	            { },
	            "myDivId",
	            function(cmp) {
	                console.log('component created');
	                console.log(cmp);
	            }
	        ),	 */        
	        url, oauth.access_token
	    );
	}
}

function createChatterFeed(type, subjectId) {
    setupLightning(function() {
		$Lightning.createComponent("forceChatter:feed", {type: type, subjectId: subjectId}, "chatterFeed"); 
   });
}

function showContactForm() {
    setupLightning(function() {
		//$Lightning.createComponent("forceChatter:feed", {type: type, subjectId: subjectId}, "chatterFeed"); 
		$Lightning.createComponent("c:contactUs", { }, "myDivId", function(cmp) {
	                console.log('component created');
	                console.log(cmp);
	            }); 
    });
}
