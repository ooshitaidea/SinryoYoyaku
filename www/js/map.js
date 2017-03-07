// This is a JavaScript file

    var roop ="";
    var roopend ="";
$(function(){
    //起動時にmobile backend APIキーを設定
        NCMB.initialize(appKey,clientKey);
});





function map_open(){
$.mobile.changePage('#map_page');
    insta_kousin();
	     	$('.blue_btn').show();
			$('.blue_btn2').hide();
	var currentUser = ncmb.User.getCurrentUser();
	if (currentUser) {
	    objectId = currentUser.get("objectId");
	    userclass = currentUser.get("userclass");
	    instaid = currentUser.get("instaid");
	}
	var Bus = ncmb.DataStore("Bus");
		if(userclass == "管理者"){
		Bus.equalTo('user_id',objectId).fetch()	//現在のログインユーザーがバス情報の中に入ってないかチェック
		   .then(function(Bus_data){
				var bus_name = (Bus_data.get("name"));

				if(bus_name == undefined || bus_name == "登録無し"){
					$('#sousin').hide();
					$('#no_sousin').show();
				}else{
					$('#bus_name').html(bus_name);
					$('#sousin').show();
					$('#no_sousin').hide();
				}
				
			})
			.catch(function(err){
				$('#bus_name').html("登録無し");
				$('#sousin').hide();
				$('#no_sousin').show();
			});
		}
	
	//各バスの位置情報ボタン読み込み
	var SpotClass = ncmb.DataStore("Bus");
    SpotClass.limit(1000)
		.order("No",true)
		.fetchAll()
		.then(function(stores) {
		// 検索が成功した場合の処理
			$('#viwe').html("");
            for (var i = 0; i < stores.length; i++){
				var store = stores[i];
				var storeName = store.get("name");
				var colo = "";
					if (i == 0){
						colo = "4a67ad";
					}else if (i == 1){
						colo = "ff5a60";
					}else if (i == 2){
						colo = "f6b214";
					}
				$('#viwe').prepend('<div id="vi" class="bus_btn" name="'+storeName+'" style="background:#'+ colo +'"><div class="icon"><img src="img/bus_compass.png"></div>'+storeName+'を<br>表示');
			}
			map_view();
			})						
			.catch(function(error) {
				// 検索に失敗した場合の処理
				alert(error.message);
			});
	//バス停登録情報取得
        var Point = ncmb.DataStore ("Point");
        Point.equalTo('instaid',instaid)
        	.limit(1000)
        	.fetch()
    	.then(function(results) {
    		bustei_name = results.get("name");
    		bustei_geo = results.get("geo");
    		bustei_instaid = results.get("instaid");
    		//alert('名前'+bustei_name+'インスタ'+instaid+'検索インスタ'+bustei_instaid);
            var bustei_myLatlng = new google.maps.LatLng(bustei_geo.latitude,bustei_geo.longitude);
			$('#map_log').html(bustei_name+'さんが現在登録されているバス停はこちらです');
              
		//マップ表示
        var mapOptions = {
              //中心地設定
              center: bustei_myLatlng,
              //ズーム設定
              zoom: 15,
              //地図のタイプを指定
              mapTypeId: google.maps.MapTypeId.ROADMAP,
			//マップの表示タイプ変更ボタンを削除
			mapTypeControl: false
            };
        var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
        
	
		//マップ表示ここまで
		
		//初期マップピン表示
		//ピン名、位置情報、Google mapオブジェクトを指定してマーカー作成メソッドを呼び出し
		markToMap("登録地点", bustei_myLatlng, map);
    	})
		.catch(function(err){
			if(userclass !== "管理者"){
				$('#map_log').html("現在登録されているバス停がありません。<br>");
			}
		});
		

	//自作ピンのポップアップ有効化？
		infowindow.set("noSuppress", true);
}

//ピンを立てる
function markToMap(title, myLatlng, map){
		var InfoWindow = new google.maps.InfoWindow({
			position: myLatlng,
			content:title,
			noSuppress: true
		});
	InfoWindow.open(map);
}
	
//デフォルトマップ情報のポップアップ制限
(function fixInfoWindow() {
    var set = google.maps.InfoWindow.prototype.set;
    google.maps.InfoWindow.prototype.set = function(key, val) {
        if (key === "map") {
            if (! this.get("noSuppress")) {
                return;
            }
        }
        set.apply(this, arguments);
    };
})();


function map_view(){
  $('#viwe').on('click', '#vi', function(event) {
		$('.load').show();

    // タップ設定が有効であれば処理を行います
    // これは二重処理の防止です
    if (self.clickEnabled == true) {
      // 一旦二重処理を防ぎます
      self.clickEnabled = false;

      // フラグは1秒後に立て直します
      setTimeout(function(){ self.clickEnabled = true; }, 1000);

//現在地を取得する
	//alert(roop);
    var bus_name = $(this).attr("name");
	
    //alert(bus_name+"の場所取得");
	
    //位置情報が取得できたときの処理
    var onSuccess = function (location){
        
        //現在位置情報オブジェクトを作成
        var geoPoint = new ncmb.GeoPoint(location.coords.latitude, location.coords.longitude);
        //console.log("位置取得"+geoPoint.latitude);
        //console.log("位置取得"+geoPoint.longitude);
        
        
        //値を設定★
        //spot.set("name",title); 
        //spot.set("geo" , geoPoint);
        //alert(location.coords.latitude+"と"+location.coords.longitude);
		//var geoPoint = new ncmb.GeoPoint(latitude, longitude);
		


            //位置情報オブジェクトを作成            
            var location = geoPoint;
            //var myLatlng = new google.maps.LatLng(location.latitude,location.longitude);

            //店舗名、位置情報、Google mapオブジェクトを指定してマーカー作成メソッドを呼び出し
            //markToMap(point, myLatlng, map);
            
	//マップ表示ここまで
		
		
		
    	//読み込み
        //Busクラスのインスタンスを作成★
        var BusClass = ncmb.DataStore("Bus"); 
        //var Bus = new BusClass();
        BusClass.equalTo('name',bus_name)
			.fetch()
			.then(function(stores) {
			jikan = moment(stores.updateDate).format('YYYY年MM月DD日HH時mm分ss秒');
		$('#map_log').html(bus_name+'の現在地表示しました。<br>'+jikan);
			$(".load").hide();
                  // 検索が成功した場合の処理
                      var store = stores;
                      //CREATE DETAIL
                      var detail = "";
                      var storeName = store.get("name");
                      detail += storeName;
                      var storeLocation = store.get("geo");
                      //alert(storeLocation.latitude +"と"+ storeLocation.longitude);
                      var myLatlng = new google.maps.LatLng(storeLocation.latitude, storeLocation.longitude);
                      //var locationLatLng = new google.maps.LatLng(location.lat,location.lng);
					//$('#map_log').prepend("正常"+storeName+"と"+myLatlng+"<br>");
	
             		 //alert(myLatlng);
              
			    //マップ表示
			        var mapOptions = {
			              //中心地設定
			              center: myLatlng,
			              //ズーム設定
			              zoom: 15,
			              //地図のタイプを指定
			              mapTypeId: google.maps.MapTypeId.ROADMAP,
							//マップの表示タイプ変更ボタンを削除
							mapTypeControl: false
			            };

        			//idがmap_canvasのところにGoogle mapを表示
        			var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
	
                      markToMap(detail, myLatlng, map);
               })
              .catch(function(error) {
					$(".load").hide();
                 // 検索に失敗した場合の処理
                 //alert(error.message);
              });
        
    }
    
    //位置情報取得に失敗した場合の処理
    var onError = function(error){
        console.log("error:" + error.message);
    }
    
    var option = {
        timeout: 60000   //タイムアウト値(ミリ秒)
    };
    
    //位置情報を取得
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
    }
    event.stopPropagation();
  });
}






//位置情報取得に成功した場合のコールバック
var onSuccess = function(position){
    //var current = new CurrentPoint();
    //current.distance = CurrentPoint.distance;   //検索範囲の半径を保持する    
   // current.geopoint = position.coords;         //位置情報を保存する
    //search(current);
};

//位置情報取得に失敗した場合のコールバック
var onError = function(error){
	ons.notification.alert({title:'現在位置取得エラー',message:'時間を少し開けてもう一度お試しください。'});
};

//位置情報取得時に設定するオプション
var option = {
    timeout: 60000   //タイムアウト値(ミリ秒)
};

//現在地を取得する
function find(){
    CurrentPoint.distance = 50000; //検索距離を5kmに設定
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
}

//現在地を保持するクラスを作成
function CurrentPoint(){
    geopoint=null;  //端末の位置情報を保持する
    distance=0;     //位置情報検索に利用するための検索距離を指定する
}


//mobile backendから位置情報を検索するメソッド
function search(){
    var onSuccess = function (location){
        //現在位置情報オブジェクトを作成
        var geoPoint = new ncmb.GeoPoint(location.coords.latitude, location.coords.longitude);


            //位置情報オブジェクトを作成            
            var location = geoPoint;
            
	//マップ表示ここまで
		
		

		
    //読み込み
        //Busクラスのインスタンスを作成★
        var BusClass = ncmb.DataStore("Point"); 
	BusClass.limit(1000)
			.fetchAll()
              .then(function(stores) {
    //マップ表示
        var mapOptions = {
              //中心地設定
              center: new google.maps.LatLng(geoPoint.latitude,geoPoint.longitude),
              //ズーム設定
              zoom: 15,
              //地図のタイプを指定
              mapTypeId: google.maps.MapTypeId.ROADMAP,
			//マップの表示タイプ変更ボタンを削除
			mapTypeControl: false
            };
              	
        //idがmap_canvasのところにGoogle mapを表示
        var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
            for (var i = 0; i < stores.length; i++){
              	
                  // 検索が成功した場合の処理
                      var store = stores[i];
                      //CREATE DETAIL
                      var detail = "";
                      var storeName = store.get("name");
                      detail += "<h2>"+ storeName +"</h2>";
                      var storeLocation = store.get("geo");
                      //alert(storeLocation.latitude +"と"+ storeLocation.longitude);
                      var myLatlng = new google.maps.LatLng(storeLocation.latitude, storeLocation.longitude);
                      //var locationLatLng = new google.maps.LatLng(location.lat,location.lng);
					//$('#map_log').prepend("正常"+storeName+"と"+myLatlng+"<br>");
                      markToMap(detail, myLatlng, map);
            }
	//ons.notification.alert({title:'',message:storeName+"と"+myLatlng});
        //alert(detail);
               })
              .catch(function(error) {
                 // 検索に失敗した場合の処理
                 alert(error.message);
              });
    }
    
    //位置情報取得に失敗した場合の処理
    var onError = function(error){
        console.log("error:" + error.message);
    }
    
    var option = {
        timeout: 60000   //タイムアウト値(ミリ秒)
    };
    
    //位置情報を取得
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
}

//スポットを登録する
function saveSpot(){
		$('.load').show();
		$('#load_txt').html("バス停登録中");
		$('.blue_btn').hide();
		$('.blue_btn2').show();
    //位置情報が取得できたときの処理
    var onSuccess = function (location){
        
        //値を設定★
	var currentUser = ncmb.User.getCurrentUser();
	if (currentUser) {
		//id = currentUser.get("instaid");
		title = currentUser.get("userName");
	}
		var id = localStorage.getItem('instaid');

        //位置情報オブジェクトを作成
        var geoPoint = new NCMB.GeoPoint(location.coords.latitude, location.coords.longitude);

        //Spotクラスのインスタンスを作成★
        var Point = ncmb.DataStore ("Point");
		var new_Point = new Point();
        Point.equalTo('name',title)
        	.limit(1000)
        	.fetch()
    	.then(function(results) {
            results.set('geo', geoPoint);
            results.set("instaid" , id).update();
			$(".load").hide();
			$('#load_txt').html("ロード中");
			ons.notification.alert({title:'スポットを更新しました',message:'バスがこの近くまで来た時に通知が来ます'});
			$('#map_log').html('現在登録されているバス停はこちらです');
        })
		.catch(function(err){ // エラー処理
			new_Point.set("name",title);
			new_Point.set("geo" , geoPoint);
			new_Point.set("instaid" , id);

			//保存を実行★
			new_Point.save();
			$(".load").hide();
			$('#load_txt').html("ロード中");
			ons.notification.alert({title:'スポットを登録しました',message:'バスがこの近くまで来た時に通知が来ます'});
			$('#map_log').html('現在登録されているバス停はこちらです');
			});
	//マップ表示
        var mapOptions = {
              //中心地設定
              center: new google.maps.LatLng(geoPoint.latitude,geoPoint.longitude),
              //ズーム設定
              zoom: 17,
              //地図のタイプを指定
              mapTypeId: google.maps.MapTypeId.ROADMAP,
			//マップの表示タイプ変更ボタンを削除
			mapTypeControl: false
            };

        //idがmap_canvasのところにGoogle mapを表示
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);

            //console.log("<p>店名：" + point.get("name") + "</p>");

            //位置情報オブジェクトを作成            
            var location = geoPoint;
            var myLatlng = new google.maps.LatLng(location.latitude,location.longitude);

            //店舗名、位置情報、Google mapオブジェクトを指定してマーカー作成メソッドを呼び出し
            markToMap(title, myLatlng, map);
	//マップ表示ここまで
	//前のページに戻る
	     	$('.blue_btn').show();
			$('.blue_btn2').hide();
	};

    //位置情報取得に失敗した場合の処理
    var onError = function(error){
        console.log("error:" + error.message);
    };

    var option = {
        timeout: 60000   //タイムアウト値(ミリ秒)
    };

    //位置情報を取得
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
}


//バスget
function get_Bus(resolve, reject) {
	var Bus = ncmb.DataStore("Bus");
        Bus.equalTo('user_id',objectId)
			.fetch()
    	.then(function(results) {
                resolve(results);
        })
		.catch(function(err){ // エラー処理
			ons.notification.alert({title:"",message: 'データベースの読み込みができませんでした'});
		});
};

//位置情報取得
function get_geo(resolve, reject) {
    var onSuccess = function (location){
        var geoPoint = new NCMB.GeoPoint(location.coords.latitude, location.coords.longitude);
		resolve(geoPoint);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
};

//初回マップ生成
function get_map(resolve, reject) {
    var onSuccess = function (location){
        var geoPoint = new NCMB.GeoPoint(location.coords.latitude, location.coords.longitude);
	var myLatlng = new google.maps.LatLng(geoPoint.latitude,geoPoint.longitude);
		//マップ表示
		var mapOptions = {
			//中心地設定
			center: myLatlng,
			//ズーム設定
			zoom: 15,
			//地図のタイプを指定
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			//マップの表示タイプ変更ボタンを削除
			mapTypeControl: false
		};
        var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
		//マップ表示ここまで
		
		//初期マップピン表示
		var InfoWindow = new google.maps.InfoWindow({
			position: myLatlng,
			content:"現在地",
			noSuppress: true
		});
	InfoWindow.open(map);
		
		resolve([map,InfoWindow]);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
};


//現在地送信
function sousin() {
	
	
			$('[id=vi]').hide();
	
	if(roopend == "owari"){
		roopend = "";
	    $('[id=vi]').show();
		return;
	}
	map = "";
	
	if(mode !== "debug"){
	//アプリを閉じなように固定
	window.plugins.insomnia.keepAwake();
	}
	//会員情報から配信バス情報をセット
	var currentUser = ncmb.User.getCurrentUser();
	if (currentUser) {
		objectId = currentUser.get("objectId");
		classname = currentUser.get("userclass");
	}
	var p0 = new Promise(function (resolve, reject) {
		get_geo(resolve, reject);
	});
	var p1 = new Promise(function (resolve, reject) {
		get_Bus(resolve, reject);
	});
	var pmap = new Promise(function (resolve, reject) {
		get_map(resolve, reject);
	});
	
            //alert(myLatlng);
		//$('#map_log').html("");
	//alert(roop);
	if(roop == "") {
		$('#bus_sousin_btn').html('<div class="bus_btn admin" id="sousin" onClick="sousin()" style="background:#fb3e24;"><div class="icon"><img src="img/bus_pin2.png"></div>送信<br>停止する</div>');
		$('#map_log').prepend("バスの現在地を送信中です<br>");
		roop = "on";
	}else if (roop == "on"){
		roop = "";
		roopend = "owari";
		$('#map_log').prepend("現在地送信を停止します<br>");
		$('#bus_sousin_btn').html('<div class="bus_btn admin" id="sousin" onClick="sousin()" style="background:#34a9db;"><div class="icon"><img src="img/bus_pin2.png"></div>現在地<br>発信開始</div>');
		return;
	}
	data_point = [];
	var new_xy = new google.maps.LatLng(33.262569,130.2968555);
	var tokyo  = new google.maps.LatLng(35.681298,139.766247);
	
	Promise.all([p0]).then(function (value) {
			geo_value = value[0];
			//markToMap("東京", new_xy, map);
	});
	//idがmap_canvasのところにGoogle mapを表示
	
	//ここからループ
    var kurikaesi = setInterval(function(){
    
    //ループ内での座標取得
	var p2= new Promise(function (resolve, reject) {
		get_geo(resolve, reject);
	});
	
	Promise.all([p0, p1, p2, pmap]).then(function (value) {
		geo_value = value[0];
		Bus_value = value[1];
		geo_value2 = value[2];
		mapdata = value[3];
		map = mapdata[0];
		InfoWindow = mapdata[1];
		infowindow = mapdata[2];
            var bass = Bus_value.get("name");
            var kyori = Bus_value.get("kyori");
                var user_name = Bus_value.get("user_name");
        //現在位置情報オブジェクトを作成
            var myLatlng = new google.maps.LatLng(geo_value.latitude,geo_value.longitude);
            var new_geo = new google.maps.LatLng(geo_value2.latitude,geo_value2.longitude);
            //alert("バス確認"+bass+"距離"+kyori+"座標"+myLatlng+"新座標"+new_geo);
	//$('#map_log').prepend("座標<br>"+myLatlng+"<br>");
	//$('#map_log').prepend("新座<br>"+new_geo+"<br>");
       
    //会員情報から配信バス情報をセット
	var currentUser = ncmb.User.getCurrentUser();
	if (currentUser) {
	    objectId = currentUser.get("objectId");
	    classname = currentUser.get("userclass");
	}
	
	if (roop == ""){
		if(mode !== "debug"){
			//アプリを閉じれるように解除
			window.plugins.insomnia.allowSleepAgain();
		}
		$('#map_log').prepend("現在地送信を停止しました<br>");
		clearInterval(kurikaesi);
	     	$('[id=vi]').show();
		return;
	}
        
	//登録ポイントに近づいたらプッシュ通知
		//alert(bass);
	var Point = new NCMB.Query('Point');
		Point.withinKilometers("geo",geo_value2,kyori);
    Point.find({
        success: function(points) {
            // 検索が成功した場合の処理
            for (var i = 0; i < points.length; i++){
                var point = points[i];
                var name = point.get("name");
                var instaid = point.get("instaid");
                if ( data_point.indexOf(name) == -1) {
					//alert("バス"+bass+data_point+"ポイント"+name);
					data_point.push(name);
					$("#map_log").html(bass+'が通過したポイント【'+data_point+'】<br>最後に'+name+'の近くに行きました。<br>');
					Bus_value.set('true_point', data_point).update();
					    NCMB.Push.send({
					      title: '【GPS通知】',
					      message: bass+'が'+name+'付近に来ています',
					      immediateDeliveryFlag: true,
					      target: ["ios", "android"],
					      badgeIncrementFlag:false,
					      badgeSetting:1,
						  sound: "default",
					      searchCondition: {
								"objectId": instaid
					      },
					    });
				}
            }
        },
        error: function(error) {
			$("#map_log").append(error.message);
        }
    });
	//中心地変更
		map.panTo(new_geo);
	//データベース座標更新
		Bus_value.set('geo', geo_value2).update();
	//ピン表示
		//markToMap(bass, new_geo, map);
	//ピン表示ダミー
		//markToMap("東京", tokyo, map);
	//ピン移動
		InfoWindow.setPosition(new_geo);
	//ピンはね
		//InfoWindow.setAnimation(google.maps.Animation.BOUNCE);
	
	//自作ピンのポップアップ有効化？
		infowindow.set("noSuppress", true);
				
				
	}, function (value) {
	});
    
    //位置情報取得に失敗した場合の処理
    var onError = function(error){
        console.log("error:" + error.message);
    };
    
    
    
    //位置情報を取得
    },5000);	//ここまでループ
    
    
    var option = {
        timeout: 60000   //タイムアウト値(ミリ秒)
    };
	
}

function onDeviceReady(current) {
};
document.addEventListener("deviceready", onDeviceReady, false);