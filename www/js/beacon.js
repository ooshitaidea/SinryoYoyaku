var PROX_UNKNOWN = 'ProximityUnknown';
var PROX_FAR = 'ProximityFar';
var PROX_NEAR = 'ProximityNear';
var PROX_IMMEDIATE = 'ProximityImmediate';

var app = angular.module('myApp', ['onsen']);
var kadou=0;
var dayle = "";

app.service('iBeaconService', function() {
    this.currentBeaconUuid = null;
    this.onDetectCallback = function(){};
    
    var beacons = {
        "01000000-0000-0000-0000-000000000000": {icon: 'img/beacon.png', rssi: -63, proximity: PROX_UNKNOWN, name: 'BBAAEdit', number: '2', id: '0002D08D', major: 1, minor: 1}
    };
    this.beacons = beacons;
    
    createBeacons = function() {
        var result = [];
        try {
            angular.forEach(beacons, function(value, key) {
                result.push(new cordova.plugins.locationManager.BeaconRegion(value.id, key, value.major, value.minor));
            });
        } catch (e) {
            console.log('createBeacon err: ' + e);
        }
        return result;
    };
    
    this.watchBeacons = function(callback){
        document.addEventListener("deviceready", function(){
            var beacons = createBeacons();
            
            try {    
                var delegate = new cordova.plugins.locationManager.Delegate();

                delegate.didDetermineStateForRegion = function (pluginResult) {
                
                    console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
                
                    cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                        + JSON.stringify(pluginResult));
                };
                
                delegate.didStartMonitoringForRegion = function (pluginResult) {
                    console.log('didStartMonitoringForRegion:', pluginResult);
                
                    console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
                };
                
                delegate.didRangeBeaconsInRegion = function (pluginResult) {
                    var beaconData = pluginResult.beacons[0];
                    var uuid = pluginResult.region.uuid.toUpperCase();
                    if (!beaconData || !uuid) {
                        return;
                    }
                    
                    callback(beaconData, uuid);
                    console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
                };
                
                cordova.plugins.locationManager.setDelegate(delegate);
                
                // required in iOS 8+
                cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
                // or cordova.plugins.locationManager.requestAlwaysAuthorization()
                
                beacons.forEach(function(beacon) {
                    cordova.plugins.locationManager.startRangingBeaconsInRegion(beacon);
                });
                
            } catch (e) {
                console.log('Delegate err: ' + e);   
            }
        }, false);
    };
});

app.controller('InfoPageCtrl', ['$scope', 'iBeaconService', function($scope, iBeaconService) {
    $scope.beacon = iBeaconService.beacons[iBeaconService.currentBeaconUuid];
    $scope.beaconUuid = iBeaconService.currentBeaconUuid;
}]);

app.controller('TopPageCtrl', ['$scope', 'iBeaconService', function($scope, iBeaconService) {        
    
    $scope.beacons = iBeaconService.beacons;
    
    var callback = function(deviceData, uuid)
    {
        var beacon = $scope.beacons[uuid];
        $scope.$apply(function()
        {
            beacon.rssi = deviceData.rssi;
            switch (deviceData.proximity)
            {
                case PROX_IMMEDIATE:
                    beacon.proximity = 'Immediate';
                    break;
                case PROX_NEAR:
                    beacon.proximity = '店舗付近です';
                    break;
                case PROX_FAR:
                    beacon.proximity = 'ご来店中です';
                    break;
                case PROX_UNKNOWN:
                default:
                    break;
            }

            if (iBeaconService.currentBeaconUuid === null && beacon.rssi > -85) {
            	
	var currentUser = ncmb.User.getCurrentUser();
	if (currentUser) {
	    user = currentUser.get("userName");
	    kurasu = currentUser.get("userclass");
	    objectId = currentUser.get("objectId");
	}
    //来店ポイントチェック＆付与
	//更新用の日時を取得
		var now = new Date();
		var y = now.getFullYear();
		var m = now.getMonth() + 1;
		var d = now.getDate();
		var d_n = now.getDate() + 1;
		var mm = ("0" + m).slice(-2);
		var dd = ("0" + d).slice(-2);
		var now_now_data =[String(y),mm,dd];
	
	//ポイント追加データを作成　トップページに行くと取得
	var Point_Log = ncmb.DataStore("Point_Log");
		Point_Log.limit(1000).fetchAll()
			.then(function(pointlog) {
				for (var i = 0; i < pointlog.length; i++) {
				var object = pointlog[i];
				user_id = object.user_id;
				open =  object.open;
				open_y = open[0];
				open_m = open[1];
				open_d = open[2];
				point = object.point;
				log_name =  object.log_name;
				//alert(user_id +"と"+objectId +"さらに"+open+"と"+now_now_data)
				if(user_id == objectId && open_y == y && open_m == mm && open_d == dd){
					dayle = "入手済み";		
				}
				
				
					//$("#beacon_log").html(pointlog.length+' == '+(i+1));
				if(pointlog.length == i+1 && dayle == ""){
						//来店ポイントをログに保存
						var touroku_log = new Point_Log();
							touroku_log.set("user_name", user)
								.set("user_id", objectId)
								.set("log_name","来店ボーナス")
								.set("point", 50)
								.set("open","未取得")
								.save()
								.then(function(object) {
									$(".load").hide();
					ons.notification.alert({title:user+"さんに",message:"ご来店ありがとうございます"});
								})
								.catch(function(err){ // エラー処理
									$(".load").hide();
								});
				}
				
				
				
				}
				
								
			})
			.catch(function(err){ // エラー処理
				ons.notification.alert({title:user+"さんに",message:"ポイント送信に失敗しました。"+err});
				$(".load").hide();
			});
			
						
						
            }
        });
    };
    iBeaconService.watchBeacons(callback);

    
    $scope.enterInfoPage = function(currentUuid) {
        iBeaconService.currentBeaconUuid = currentUuid;
        $scope.ons.navigator.pushPage('info-page.html');
        $scope.ons.navigator.on("prepop", function() {
        	iBeaconService.currentBeaconUuid = null;
        });
    };
    
}]);




//効果音
         var src = "famima.mp3";
         var media = null;

         function getPath(){
             var str = location.pathname;
             var i = str.lastIndexOf('/');
             return str.substring(0,i+1);
         }
         document.addEventListener("deviceready", onDeviceReady, false);
         function onDeviceReady(){
               media = new Media(getPath() + src);
        }
		function sound (){     
               media.play();
        }



