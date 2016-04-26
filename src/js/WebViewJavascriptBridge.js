
			var myIOSSendData,myIOSGetData;
			var urlData2 = CS.decodeURL(window.location.href);
			var userIdIOS,tokenIOS;
			var jsonObj ;
			
		function connectWebViewJavascriptBridge(callback) {
					if (window.WebViewJavascriptBridge) {
						callback(WebViewJavascriptBridge)
					} else {
						document.addEventListener('WebViewJavascriptBridgeReady', function() {
							callback(WebViewJavascriptBridge)
						}, false)
					}
				}
				
				connectWebViewJavascriptBridge(function(bridge) {
					var uniqueId = 1
					function log(message, data) {
						var log = document.getElementById('log')
						var el = document.createElement('div')
						el.className = 'logLine'
						el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
						if (log.children.length) { log.insertBefore(el, log.children[0]) }
						else { log.appendChild(el) }
					}
					bridge.init(function(message, responseCallback) {
						
						
						myIOSGetData = message;
						
						
						jsonObj = eval("("+myIOSGetData+")");
						
						
						try{
							if(undefined==jsonObj || null==jsonObj){
								userIdIOS='';
								tokenIOS='';
							}else{
								userIdIOS = jsonObj.userid;
								tokenIOS = jsonObj.token;
								
								if(undefined==userIdIOS || null==userIdIOS){
									userIdIOS='';
								}
								if(undefined==tokenIOS || null==tokenIOS){
									tokenIOS='';
								}
							}
							
							
						}catch(e){
						}
						
								CS.ajax({
									data:{"id":urlData2.id,"user":userIdIOS,"token":tokenIOS},
									async:false,
									url:"action2/disease-SingleHealthInfoDetail.tz",
									success:function(res){
										
										if(res.responseJSON.result=='share'){
											
											window.location.href="http://www.tuozhen.com/healthInformation/showInfor.action?informationId="+urlData.id;
										}else{
											
											
											$("#url").attr("src",res.responseJSON.result.currMap.url);
											
											
											CS.acceptDetailData($("#detailInfo"), '.n-label',res.responseJSON.result.currMap);
											
											$("#content").html(res.responseJSON.result.currMap.content);
											
											
											var html = "";
											html=CS.json2Html(res.responseJSON.result.relatedList,tpl);
											$("#relatedLst").html(html);
											
											
											var adRetMp = {};
											//返回数据给Android
											adRetMp.id=res.responseJSON.result.currMap.id;
											adRetMp.comment=res.responseJSON.result.currMap.comment;
											adRetMp.collection=res.responseJSON.result.currMap.collection;
											adRetMp.url=res.responseJSON.result.currMap.visitedLink;
											adRetMp.title=res.responseJSON.result.currMap.title;
										
											myIOSSendData=$.toJSON(adRetMp);
											
											//
											$("#beforeRet").removeClass("displayBlock").addClass("hideBlock");
											$("#mainPage").removeClass("hideBlock").addClass("displayBlock");
											//
											$(document).attr('title',res.responseJSON.result.currMap.title);
										}
									}
								});
						
						//var data = { 'Javascript Responds':'Wee!' }
						
						responseCallback(""+myIOSSendData);
								
					})
			
					bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
						
						var responseData = { 'Javascript Says':'Right back atcha!' }
						responseCallback(responseData)
					})
			
					var button = document.getElementById('buttons').appendChild(document.createElement('button'))
					button.innerHTML = 'Send message to ObjC'
					button.onclick = function(e) {
						e.preventDefault()
						bridge.send(myIOSSendData, function(responseData) {
						})
					}
			
					document.body.appendChild(document.createElement('br'))
			
					var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
					callbackButton.onclick = function(e) {
						bridge.callHandler('testObjcCallback', {'foo': 'bar'}, function(response) {
							//myIOSGetData=response;
						})
					}
				})
	
	
	
	
	