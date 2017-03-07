//	var appKey	= "b8160c6f2e87c4c4f93e7e806d2a39f90c898740892cf4c07268f6dbcd88ec12";	//kitohon appKey
//	var clientKey = "b4d748a05afad17285aef9ffd5ee193f4caaf294d1d26a190dbe439b10ca7088"; //kitohon clientKey
	var appKey	= "15d3db26f75d519ba9273ff34537d248d76ec93a80ce49124d22c176a4e6ef13";	//kitohon_test appKey
	var clientKey = "737f03998a79931fd2206e7ec21ffd8469342884776b7afff9c35f20c4399e95"; //kitohon_test clientKey
		var imgsrc = "https://mb.api.cloud.nifty.com/2013-09-01/applications/kLtbizLInZzZhemo/publicFiles/"; //test imgurl
		var projectno = "432306700091"; //プロジェクトkey
		var appname = "web(1.0.0)";
		var mailsave = "http://ideaxidea.net/phpmail/index.php?title=";
		var mode = "ビルド";//debug
		var ncmb = new NCMB(appKey, clientKey);
		this.clickEnabled = true;

	var app_data = new Promise(function (resolve, reject) {
	var appdata = ncmb.DataStore("appdata");
		appdata.equalTo('').fetch()
		.then(function(results) {
			localStorage.setItem('app_time', results.time);
			localStorage.setItem('app_money', results.money);
		});
	}); 
		
function test_script() {
		var app_time = localStorage.getItem('app_time');
		var app_money = localStorage.getItem('app_money');
		alert(app_time);
		alert(app_money);
}
		window.onload = function() {
			var ctx = document.getElementById("canvas").getContext("2d");
			youbi_Chart = new Chart(ctx, {
				type: 'bar',
				data: chartData,
				options: {
					responsive: true,title: {display: true,text: ''},
					tooltips: { mode: 'index',intersect: true}
				}
			});
			
			var ctx = document.getElementById("time_canvas").getContext("2d");
			time_Chart = new Chart(ctx, {
				type: 'bar',
				data: time_chartData,
				options: {
					responsive: true,title: {display: true,text: ''},
					tooltips: { mode: 'index',intersect: true}
				}
			});
		
			var ctx = document.getElementById("dj_canvas").getContext("2d");
			dj_Chart = new Chart(ctx, {
				type: 'pie',
				data: dj_chartData,
				options: {
					responsive: true,title: {display: true,text: ''},
					tooltips: { mode: 'index',intersect: true}
				}
			});
		
			var day_ctx = document.getElementById("day_canvas").getContext("2d");
			day_Chart = new Chart(day_ctx, {
				type: 'bar',
				data: day_chartData,
				options: {
					responsive: true,title: {display: true,text: ''},
					tooltips: { mode: 'index',intersect: true}
				}
			});
		
			var ctx = document.getElementById("age_canvas").getContext("2d");
			age_Chart = new Chart(ctx, {
				type: 'pie',
				data: dj_chartData,
				options: {
					responsive: true,title: {display: true,text: ''},
					tooltips: { mode: 'index',intersect: true}
				}
			});
		};
			

function onLoginBtn() {
	$('.load').show();
	var username = $("#login_username").val();
	var password = $("#login_password").val();
	if (username == ""){
		ons.notification.alert({title:"",message: '管理者名が入力されていません'});
		$(".load").hide();
		return;
	}else if(password == ""){
		ons.notification.alert({title:"",message: 'パスワードが入力されていません'});
		$(".load").hide();
		return;
	}
	
	if(username == "admin" && password == "kitohon8803"){
		username="web";
		password="web";
			localStorage.setItem('user_s_id', username);
			localStorage.setItem('user_s_pass', password);
	}else{
			localStorage.setItem('user_s_id', username);
			localStorage.setItem('user_s_pass', password);
	}
	
	// ユーザー名とパスワードでログイン
	//location.reload();
	ncmb.User.login(username, password)
	.then(function(user) {
		if(user.userclass == "管理者"){
			currentLoginUser = ncmb.User.getCurrentUser();
			ons.notification.alert({title:'',message:"ログインしました。"});
			var currentUser = ncmb.User.getCurrentUser();		
			if (currentUser) {
				userName = currentUser.get("userName");
				menupage();
			 		$(".load").hide();
			}
		}else{
			ons.notification.alert({title:'エラー',message:"このアカウントは管理者用アカウントではありません。。"});
			$(".load").hide();
			ncmb.User.logout();
			currentLoginUser = null;
			$.mobile.changePage('#LoginPage');
		}
		})
		.catch(function(error) {
			 $(".load").hide();

	//エラー時の手動エラーチェックコード
	ncmb.User.fetchAll()
		 .then(function(results){
		 	var check1 = "このユーザー名は見つかりません";
		 	var check2 = "パスワードが違うようです";
		 	var user_on = "";
			for (var i = 0; i < results.length; i++) {
			  var object = results[i];
				check_Name = (object.get("userName"));
				check_pass = (object.get("userpass"));
				if(check_Name == username){
						ons.notification.alert({title:"",message:check2});
						user_on = "ok";
				}else{
					if(i >= results.length-1 && user_on !== "ok"){
						ons.notification.alert({title:"",message:check1});
					}
				}
			//alert(results.length);
			}
		  })
		 .catch(function(err){
			alert(err);
				ons.notification.alert({title:"",message: 'NCMBからのパスコードの読み込みができませんでした！'});
		  });
			 
			 
			 
			//alert("ログイン失敗！次のエラー発生: " + error);
		//ons.notification.alert({title:"エラー",message: 'ログイン失敗！再度ログインしてください。'+error});
		ncmb.User.logout();
		currentLoginUser = null;
		$.mobile.changePage('#LoginPage');
		});
}


function insta_kousin(){
}



//メニューページ
function menupage(){
	$.mobile.changePage('#MenuPage');
}
	  
function osirase() {
	$('.load').show();
	var currentUser = ncmb.User.getCurrentUser();
	if (currentUser) {
		objectId = currentUser.get("objectId");
	}
	
		$('#push_list').html('');
	//お知らせリスト表示
	$('#nyuten_list').html('<tr><td>ご利用日時</td><td>利用者名</td><td>利用時間</td><td>利用金額</td><td>性別</td><td>年代</td></tr>');
	var Admission_Log = ncmb.DataStore("Admission_Log");
	Admission_Log.limit(1000)
			.order("createDate",true)
			.fetchAll()
			.then(function(results){
		var pushlist = results.length;
		//先にリセット

		//oshiraseの検索
		//alert(userclass);
		kijicount = "";
	   	sex = "";
	   	age = "";
		var now = new Date();
		var now_time = now.getTime();
	   for (var i = 0; i < results.length; i++) {
	   	money_time = results[i].money_time;
	   	money  = results[i].money;
	   	user_name = results[i].user_name;
	   	admission_out = results[i].admission_out;
	   	admission_in = results[i].admission_in;
	   	qr_name = results[i].qr_name;
	   	createDate = results[i].createDate;
	   	sex = results[i].sex;
	   	age = results[i].age;
	   	if(admission_out == ""){
			now_in = '<div class="red">入店中</div>';
			var time_bc = Math.floor((now_time - admission_in)/1000);
			var time_fc = Math.floor(time_bc/60);
			var time_jc = Math.floor(time_fc/60);
			var time_b = time_bc - (time_fc*60);
			var time_f = time_fc - (time_jc*60);
			var time_j = time_jc;
	   		
	   	}else{
	   		now_time = (admission_in - admission_out)/1000;
	   		now_in = '';
			time_b = money_time[2];
			time_f = money_time[1];
			time_j = money_time[0];
	   	}
	createDate = moment(createDate).format('YYYY年MM月DD日 HH:mm:ss');

		//alert(title);
			$('#nyuten_list').append('<tr><td>'+createDate+'</td><td>'+user_name+now_in+'</td><td>'+time_j+'時間'+time_f+'分'+time_b+'秒</td><td>'+
			money.toLocaleString()+'円</td><td>'+sex+'</td><td>'+age+'</td></tr>');

	
	}
	oshiraseDeleteLink();
	//自分のクラスに記事がない場合
			 $(".load").hide();
			 
	 })
	.catch(function(err){
	   // エラー処理
		 //alert("エラー" + err);
		//$('#push_list').html('読込中にエラーが発生しました。'+err);
		//ons.notification.alert({title:"アカウントエラー",message: '読込できません！再度ログインしてください'});
			 $(".load").hide();
		$('[id=load_err]').html('<div class="white_block" onclick="onLogoutBtn()">読込できません！再度ログインしてください<br><i class="fa fa-sign-out"></i></div>'+err);
	 });
		$.mobile.changePage('#OSIRASE');
}

//お知らせのデリート処理
function oshiraseDeleteLink() {
  $('#push_list').on('click', '#delete', function(event) {

	// タップ設定が有効であれば処理を行います
	// これは二重処理の防止です
	if (self.clickEnabled == true) {
	  // 一旦二重処理を防ぎます
	  self.clickEnabled = false;

	  // フラグは1秒後に立て直します
	  setTimeout(function(){ self.clickEnabled = true; }, 1000);

	var data_objectId = $(this).attr("class");
	var data_li = $(this).parents("li");
	 
	var oshirase = ncmb.DataStore("oshirase");
		oshirase.equalTo('objectId',data_objectId)
			.fetch()
		.then(function(results) {
				var delete_title = (results.get("title"));
		
		ons.notification.confirm({
			title: '',
			message: delete_title+'を削除してもよろしいですか？',
			buttonLabels: ['いいえ', 'はい'],
			animation: 'default',
			cancelable: true,
			callback: function(index) {
				if(index == -1) {
					console.log('confirmのコールバック:キャンセル');
					localStorage.setItem('totyu', 0);
				} else if(index == 0) {
					console.log('confirmのコールバック:No');
					localStorage.setItem('totyu', 0);
				} else if(index == 1) {
					$('.load').show();
					data_li.hide();
					console.log('confirmのコールバック:Yes');
					//終了タグは後ろ
					
					
					
	var oshirase = ncmb.DataStore("oshirase");
	var oshirase = new oshirase();
	oshirase.set("objectId", data_objectId)
	  .delete()
	  .then(function(result){
	  		$(".load").hide();
			ons.notification.alert({title:"",message: 'お知らせを削除しました。'});
	  		//osirase();
	  		})
	  .catch(function(err){$(".load").hide();alert(err+"で失敗しました。");});
	  

			}}});//ダイアログ終了タグ
		})
		.catch(function(err){ // タイトル取得エラー
			ons.notification.alert({title:"",message: 'NCMBからのパスコードの読み込みができませんでした！'});
		});
	}
	event.stopPropagation();
  });
}



function siborikomi() {
	var id_year = $("#id_year").val();
	var id_month = $("#id_month").val();
	analytics(id_year,id_month);
}

//アナリティクスページ  
function analytics(id_year,id_month) {
		$.mobile.changePage('#analytics');
		//chartData.datasets.forEach(function(dataset) {
		//dataset.data = dataset.data.map(function() {
		//return 7;
		//});
		//});
			//youbi_Chart.update();
		all_ok = "ok";
		$('[id=toukei_day]').html("過去30日間<br>（"+moment().subtract(30, 'days').format('YYYY月MM年DD日')+"～"+moment().format('YYYY月MM年DD日')+')');
		
	count_day30 = moment().subtract(30, 'days');//３０日前の日付データ
	//count_day30 = moment([2017, 02, 01]);
	
	if(id_year){
		//alert(id_year+id_month);
		all_ok = "no";
		$('[id=toukei_day]').html(id_year+'年'+id_month+'月分');
		m_day_count = moment(id_month).daysInMonth();
	}
	$('.load').show();
	var currentUser = ncmb.User.getCurrentUser();
	if (currentUser) {
		objectId = currentUser.get("objectId");
	}
		$('[id=load_err]').html('');
	youbi_list = ["月曜日","火曜日","水曜日","木曜日","金曜日","土曜日","日曜日"];
	youbi_count = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	av_money = [0,0,0,0,0,0,0];
	av_money_time = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	jikan_data = 0;
	
	jikan_list = ['1時','2時','3時','4時','5時','6時','7時','8時','9時','10時','11時','12時',
					"13時","14時","15時","16時","17時","18時","19時","20時","21時","22時","23時","24時"];
	jikan_count = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
					[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	
	avjikan_money = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	
	avjikan_time = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
					[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	
	true_count = 0;
	true_money = 0;
	true_sex = [0,0];
	true_time = [0,0,0];
	
	dj_count1 =0;
	dj_count2 =0;
	avdj_money1 =0;
	avdj_money2 =0;
	avdj_time1 =[0,0,0];
	avdj_time2 =[0,0,0];
	
	var m = moment();
	var day_data_now =[m.year(),m.month(),m.date()];	//monthは1月＝0、2月＝1なので処理するときは＋１
	day_ymd = "";
	day_count =0;
	day_sex =[0,0];
	day_time =[0,0,0];
	day_time_h =[0,0,0];	//average
	day_money =0;
	day_money_h =0;	//average
	day_data = [];
	day_data_money =[];
	day_label =[];
	if(all_ok == "ok"){
		for (var i = 0; i < 30; i++) {
			//alert(i);
			day_data.push(0);
			day_data_money.push(0);
			if(i == 0){
				day_label.push('本日');
			}else{
				day_label.push(i+'日前');
			}
		}
	}else{
		m_daycount = moment([id_year,id_month]).daysInMonth();
		alert(m_daycount+"日");
		for (var i = 0; i < m_daycount; i++) {
			//alert(i);
			day_data.push(0);
			day_data_money.push(0);
			day_label.push(i+1+'日');
		}
	}
	day_7 = 0;
	mon_7 = 0;
	
	var t = moment();
	var mon_data_now =[t.year(),t.month(),t.date()];	//monthは1月＝0、2月＝1なので処理するときは＋１
	mon_ymd = "";
	mon_count =0;
	mon_sex =[0,0];
	mon_time =[0,0,0];
	mon_time_h =[0,0,0];	//average
	mon_money =0;
	mon_money_h =0;	//average
	mon_data = [];
	mon_data_money =[];
	mon_label =[];
	
	age_data = ['15～19歳','20～25歳','26～30歳','31～35歳','36～40歳','41～45歳','46～50歳','51～55歳','56～60歳','61～65歳','66歳以上','未設定'];
	age_count = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	age_money = [0,0,0,0,0,0,0,0,0,0,0];
	age_time = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
	not_age =0;

		$('.true_list').html('<tr><th>利用者数(男:女)</th><th>合計利用金額</th><th>平均利用時間</th><th>平均利用金額</th></tr>');
		$('.tukibetu_list').html('<tr><th>日付</th><th>利用者数(男:女)</th><th>利用金額</th><th>平均利用時間</th><th>平均利用金額</th></tr>');
		$('.day_list').html('<tr><th>日付</th><th>利用者数(男:女)</th><th>利用金額</th><th>平均利用時間</th><th>平均利用金額</th></tr>');
		$('.age_table').html('<tr><th>日付</th><th>利用者数(男:女)</th><th>平均利用金額</th><th>平均利用時間</th></tr>');
		$('#time_table .dl_table').html('<tr><th>ご利用時間帯</th><th>利用者数</th><th>平均利用時間</th><th>平均利用金額</th></tr>');
		$('#youbi_table table').html('<tr><th>ご利用曜日</th><th>利用者数</th><th>平均利用時間</th><th>平均利用金額</th></tr>');
		$('#toukei_h1').html('＜全データ＞');
	//集計リスト表示
	sex=0;
	age=0;
	var Admission_Log = ncmb.DataStore("Admission_Log");
	Admission_Log.limit(1000)
		.order("createDate",true)
		.fetchAll()
		.then(function(results){
		var pushlist = results.length;
		//先にリセット
		kijicount = "";
		for (var i = 0; i < results.length; i++) {
		money_time = results[i].money_time;
		money  = results[i].money;
		user_name = results[i].user_name;
		admission_out = results[i].admission_out;
		admission_in = results[i].admission_in;
		qr_name = results[i].qr_name;
		sex = results[i].sex;
		age = results[i].age;
		createDate = results[i].createDate;
		money_time_j = money_time[0];
		money_time_f = money_time[1];
		money_time_b = money_time[2];
		ymd = results[i].ymd;
	// lang:jaを登録。これ以降はlangを指定しなくても自動的にjaが使用される。
	jikan_data = moment(createDate).format('H');
	jikan_year = moment(createDate).format('YYYY');
	jikan_month = moment(createDate).format('M');
	youbi_data = moment(createDate).format('dddd');
	data_now = moment(createDate);
	time_now = moment();
	money = Number(money);
	
	
	//月別に取得
	if(mon_data_now[0] == ymd[0] &&  mon_data_now[1]+1 == ymd[1]){
		//集計中の年と月が一致していれば現在計算している数値に加算
		mon_count++ ;
		if(sex == "男性"){mon_sex[0]++}else if(sex == "女性"){mon_sex[1]++};
		mon_time[0] = mon_time[0] + money_time_j;
		mon_time[1] = mon_time[1] + money_time_f;
		mon_time[2] = mon_time[2] + money_time_b;
		mon_money = mon_money+money;
		if(mon_money_h == 0){
			mon_money_h = money;
			//alert(day_data_now[2]+'日の平均利用額は初期なので'+day_money_h);
			mon_time_h = [money_time_j,money_time_f,money_time_b];
		}else{
			mon_money_h = Math.floor(mon_money/mon_count);
			//alert(day_data_now[2]+'日の平均利用額は'+day_money_h);
			mon_time_h[0] = Math.floor(mon_time[0]/mon_count);
			mon_time_h[1] = Math.floor(mon_time[1]/mon_count);
			mon_time_h[2] = Math.floor(mon_time[2]/mon_count);
		}
		
		 
		//最後のアウトプット（月は移動してないけど最後の集計だった場合はその時点でアウトプットする）
		if(i == results.length-1){
			m_touroku=0;
			mon_data[mon_7] = mon_count;
			mon_data_money[mon_7] = mon_money_h/1000;
			
			
		//会員情報から登録人数を引き出す
		syuukeibi = moment(mon_data_now).format("YYYY年MM月");
			tourokubi = moment(t).format("YYYY年MM月");
			$('.tukibetu_list').append('<tr><td>'+tourokubi+'</td><td>'+mon_count+
				'(男:'+mon_sex[0]+'/女:'+mon_sex[1]+')</td><td>'+mon_money.toLocaleString()+'円</td><td>'+mon_time_h[0]+'時間'+
				mon_time_h[1]+'分'+mon_time_h[2]+'秒</td><td>'+mon_money_h.toLocaleString()+'円</td><td></tr>');
		}
	}else{
		//計算中の月以外のデータが来たら、一度アウトプットして、次の計算を開始する
		//出力とリセット
		mon_data[mon_7] = mon_count;
		mon_data_money[mon_7] = mon_money_h/1000;
		mon_7++;
		
		//会員情報から登録人数を引き出す
		syuukeibi = moment(mon_data_now).format("YYYY年MM月");
			tourokubi = moment(t).format("YYYY年MM月");
			
		$('.tukibetu_list').append('<tr><td>'+tourokubi+'</td><td>'+mon_count+
			'(男:'+mon_sex[0]+'/女:'+mon_sex[1]+')</td><td>'+mon_money.toLocaleString()+'円</td><td>'+mon_time_h[0]+'時間'+
			mon_time_h[1]+'分'+mon_time_h[2]+'秒</td><td>'+mon_money_h.toLocaleString()+'円</td><td></tr>');

		mon_count = 1;
		if(sex == "男性"){mon_sex=[1,0]}else if(sex == "女性"){mon_sex=[0,1]};
		mon_money =money;
		mon_time_h =[0,0,0];	//average
		mon_money_h =money;	//average
		//momentから一日引く
		t.subtract('months', 1).format();
		mon_data_now =[t.year(),t.month(),t.date()];
		//alert(day_data_now[0] +"と"+ ymd[0] +"と"+  day_data_now[1]+1 +"と"+ ymd[1] +"と"+ day_data_now[2] +"と"+ ymd[2]);
		//alert(day_data_now);
		
		//月をマイナス修正した後でも、まだ不一致の場合はノーデータとして出力する。さらに一致するまで繰り返す
		while (mon_data_now[1]+1 !== ymd[1]){
			//alert(mon_data_now+"と"+ymd+"は一致していないのでプットして集計中月をマイナス");
		//会員情報から登録人数を引き出す
		syuukeibi = moment(mon_data_now).format("YYYY年MM月");
			tourokubi = moment(object.get("createDate")).format("YYYY年MM月");
			//alert('最後'+touroku_count);
			
			$('.tukibetu_list').append('<tr><td>'+t.year()+'年'+t.month()+1+'月</td><td>0(NoData)</td><td>0円</td><td>0時間'+
					'0分0秒</td><td>0円</td></td></tr>');
			
			t.subtract('months', 1).format();
			mon_data_now =[t.year(),t.month(),t.date()];
			mon_7++;
			//alert("データ無し");
		}
	}
	
 //月別フィルター
 if(id_year == jikan_year && id_month ==jikan_month || all_ok == "ok"){
		//alert(results[i].objectId);
		
	
	//月合計を取得 フィルターありならその月　外なら３０日
	//count_day30(今日から３０日前)はdata_now(読み取りデータの日付)より古い場合は月別の処理実行
	day_true =count_day30.isBefore(data_now);
	//alert(day_true+"前："+count_day30.format('YYYY月MM年DD日 dddd曜日')+"　後ろ"+data_now.format('YYYY月MM年DD日 dddd曜日'));
	if(day_true == true){
		true_count++;
		if(sex == "男性"){true_sex[0]++}else if(sex == "女性"){true_sex[1]++};
		true_money = true_money+money;
		true_time[0] = true_time[0] + money_time_j;
		true_time[1] = true_time[1] + money_time_f;
		true_time[2] = true_time[2] + money_time_b;
	}
	//出力処理はフィルター外

 //月別切り替え後の一月分の処理
 if(all_ok =="no"){
	//特定の月を日付分集計
	if(day_data_now[0] == ymd[0] &&  day_data_now[1]+1 == ymd[1] && day_data_now[2] == ymd[2]){
		//同日の集計データを計算
		day_count++ ;
		if(sex == "男性"){day_sex[0]++}else if(sex == "女性"){day_sex[1]++};
		day_time[0] = day_time[0] + money_time_j;
		day_time[1] = day_time[1] + money_time_f;
		day_time[2] = day_time[2] + money_time_b;
		day_money = day_money+money;
		if(day_money_h == 0){
			day_money_h = money;
			//alert(day_data_now[2]+'日の平均利用額は初期なので'+day_money_h);
			day_time_h = [money_time_j,money_time_f,money_time_b];
		}else{
			day_money_h = Math.floor(day_money/day_count);
			//alert(day_data_now[2]+'日の平均利用額は'+day_money_h);
			day_time_h[0] = Math.floor(day_time[0]/day_count);
			day_time_h[1] = Math.floor(day_time[1]/day_count);
			day_time_h[2] = Math.floor(day_time[2]/day_count);
		}
		if(i == results.length-1){
		day_data[day_7] = day_count;
		day_data_money[day_7] = day_money_h/1000;
		$('.day_list').append('<tr><td>'+moment(m).format("YYYY年MM月DD日")+'</td><td>'+day_count+
			'(男:'+day_sex[0]+'/女:'+day_sex[1]+')</td><td>'+day_money.toLocaleString()+'円</td><td>'+day_time_h[0]+
			'時間'+day_time_h[1]+'分'+day_time_h[2]+'秒</td><td>'+day_money_h.toLocaleString()+'円</td></tr>');
		}
	}else{
		//出力とリセット
		day_data[day_7] = day_count;
		day_data_money[day_7] = day_money_h/1000;
		day_7++;
		$('.day_list').append('<tr><td>'+moment(m).format("YYYY年MM月DD日")+'</td><td>'+day_count+
			'(男:'+day_sex[0]+'/女:'+day_sex[1]+')</td><td>'+day_money.toLocaleString()+'円</td><td>'+day_time_h[0]+
			'時間'+day_time_h[1]+'分'+day_time_h[2]+'秒</td><td>'+day_money_h.toLocaleString()+'円</td></tr>');
		day_count = 1;
		if(sex == "男性"){day_sex=[1,0]}else if(sex == "女性"){day_sex=[0,1]};
		day_money =money;
		day_time_h =[0,0,0];	//average
		day_money_h =money;	//average
		//momentから一日引く
		m.subtract('days', 1).format();
		day_data_now =[m.year(),m.month(),m.date()];
		//alert(day_data_now[0] +"と"+ ymd[0] +"と"+  day_data_now[1]+1 +"と"+ ymd[1] +"と"+ day_data_now[2] +"と"+ ymd[2]);
		//alert(day_data_now);
		while (day_data_now[2] !== ymd[2]){
			$('.day_list').append('<tr><td>'+moment(m).format("YYYY年MM月DD日")+'</td><td>0(NoData)</td><td>0円</td><td>0時間0分0秒</td><td>0円</td></tr>');
			m.subtract('days', 1).format();
			day_data_now =[m.year(),m.month(),m.date()];
			day_7++;
			alert("データ無し");
		}
	}
 }else{
	//過去３０日分の出力
	//データの年とデータの月とデータの日が一致してる場合
	if(day_data_now[0] == ymd[0] &&  day_data_now[1]+1 == ymd[1] && day_data_now[2] == ymd[2]){
		//同日の集計データを計算
		day_count++ ;
		if(sex == "男性"){day_sex[0]++}else if(sex == "女性"){day_sex[1]++};
		day_time[0] = day_time[0] + money_time_j;
		day_time[1] = day_time[1] + money_time_f;
		day_time[2] = day_time[2] + money_time_b;
		day_money = day_money+money;
		if(day_money_h == 0){
			day_money_h = money;
			//alert(day_data_now[2]+'日の平均利用額は初期なので'+day_money_h);
			day_time_h = [money_time_j,money_time_f,money_time_b];
		}else{
			day_money_h = Math.floor(day_money/day_count);
			//alert(day_data_now[2]+'日の平均利用額は'+day_money_h);
			day_time_h[0] = Math.floor(day_time[0]/day_count);
			day_time_h[1] = Math.floor(day_time[1]/day_count);
			day_time_h[2] = Math.floor(day_time[2]/day_count);
		}
		if(i == results.length-1){
		day_data[day_7] = day_count;
		day_data_money[day_7] = day_money_h/1000;
		$('.day_list').append('<tr><td>'+moment(m).format("YYYY年MM月DD日")+'</td><td>'+day_count+
			'(男:'+day_sex[0]+'/女:'+day_sex[1]+')</td><td>'+day_money.toLocaleString()+'円</td><td>'+day_time_h[0]+
			'時間'+day_time_h[1]+'分'+day_time_h[2]+'秒</td><td>'+day_money_h.toLocaleString()+'円</td></tr>');
		}
	}else{
		//出力とリセット
		day_data[day_7] = day_count;
		day_data_money[day_7] = day_money_h/1000;
		day_7++;
		$('.day_list').append('<tr><td>'+moment(m).format("YYYY年MM月DD日")+'</td><td>'+day_count+
			'(男:'+day_sex[0]+'/女:'+day_sex[1]+')</td><td>'+day_money.toLocaleString()+'円</td><td>'+day_time_h[0]+
			'時間'+day_time_h[1]+'分'+day_time_h[2]+'秒</td><td>'+day_money_h.toLocaleString()+'円</td></tr>');
		day_count = 1;
		if(sex == "男性"){day_sex=[1,0]}else if(sex == "女性"){day_sex=[0,1]};
		day_money =money;
		day_time_h =[0,0,0];	//average
		day_money_h =money;	//average
		//momentから一日引く
		m.subtract('days', 1).format();
		day_data_now =[m.year(),m.month(),m.date()];
		//alert(day_data_now[0] +"と"+ ymd[0] +"と"+  day_data_now[1]+1 +"と"+ ymd[1] +"と"+ day_data_now[2] +"と"+ ymd[2]);
		//alert(day_data_now);
		while (day_data_now[2] !== ymd[2]){
			$('.day_list').append('<tr><td>'+moment(m).format("YYYY年MM月DD日")+'</td><td>0(NoData)</td><td>0円</td><td>0時間0分0秒</td><td>0円</td></tr>');
			m.subtract('days', 1).format();
			day_data_now =[m.year(),m.month(),m.date()];
			day_7++;
			//alert("データ無し");
		}
	}
 }
	
	
	//曜日別データ集計
	var y = youbi_list.indexOf(youbi_data);
	if(y > -1){
		youbi_count[y][0]++;
		if(sex=="女性"){youbi_count[y][2]++;}else if(sex=="男性"){youbi_count[y][1]++;};
		if(av_money[y] == 0){
			av_money[y]= money;
			av_money_time[y] = [money_time_j,money_time_f,money_time_b];
		}else{
			av_money[y]= (money+av_money[y])/2;
			av_money_time[y][0] = (av_money_time[y][0]+money_time_j)/2;
			av_money_time[y][1] = (av_money_time[y][1]+money_time_f)/2;
			av_money_time[y][2] = (av_money_time[y][2]+money_time_b)/2;
		}
	}else{
		not_y++;
	}
	time_b = money_time[2];
	time_f = money_time[1];
	time_j = money_time[0];
	
					//alert(avjikan_time18[1]+"+"+money_time_f+"÷２＝"+(avjikan_time18[1]+money_time_f)/2);
			
	jikan_data_j = jikan_data+'時';
	var fj = jikan_list.indexOf(jikan_data_j);
	if(fj > -1){
		jikan_count[fj][0]++;
		if(sex=="女性"){jikan_count[fj][2]++;}else if(sex=="男性"){jikan_count[fj][1]++;};
			if(avjikan_money[fj] == 0){
				avjikan_money[fj] = money;
				avjikan_time[fj] = [money_time_j,money_time_f,money_time_b];
			}else{
				avjikan_money[fj] = (money+avjikan_money[fj])/2;
				avjikan_time[fj][0] = (avjikan_time[fj][0]+money_time_j)/2;
				avjikan_time[fj][1] = (avjikan_time[fj][1]+money_time_f)/2;
				avjikan_time[fj][2] = (avjikan_time[fj][2]+money_time_b)/2;
			}
	}else{
		alert("時間データが読み込めませんでした。"+jikan_data);
	}

	if(sex == "男性"){
		dj_count1++;
		if(avdj_money1 == 0){
			avdj_money1 = money;
			avdj_time1 =[money_time_j,money_time_f,money_time_b];
		}else{
			avdj_money1 = (money+avdj_money1)/2;
			avdj_time1[0] =(avdj_time1[0]+money_time_j)/2;;
			avdj_time1[1] =(avdj_time1[1]+money_time_f)/2;;
			avdj_time1[2] =(avdj_time1[2]+money_time_b)/2;;
		}
	}else if(sex == "女性"){
		dj_count2++;
		if(avdj_money2 == 0){
			avdj_money2 = money;
			avdj_time2 =[money_time_j,money_time_f,money_time_b];
		}else{
			avdj_money2 = (money+avdj_money2)/2;
			avdj_time2[0] =(avdj_time2[0]+money_time_j)/2;;
			avdj_time2[1] =(avdj_time2[1]+money_time_f)/2;;
			avdj_time2[2] =(avdj_time2[2]+money_time_b)/2;;
		}
			
	}
	
	

	//年齢別集計
	var age_no = age_data.indexOf(age);
	if(age_no > -1){
		age_count[age_no][0]++;
		if(sex=="女性"){age_count[age_no][2]++;}else if(sex=="男性"){age_count[age_no][1]++;};
		if(age_money[age_no] == 0){
			age_money[age_no] = money;
			age_time[age_no] =[money_time_j,money_time_f,money_time_b];
		}else{
			age_money[age_no] = (money+age_money[age_no])/2;
			age_time[age_no][0] =(age_time[age_no][0]+money_time_j)/2;;
			age_time[age_no][1] =(age_time[age_no][1]+money_time_f)/2;;
			age_time[age_no][2] =(age_time[age_no][2]+money_time_b)/2;;
		}
	}else{
		not_age++;
	}
			
			
			
			

 }//月フィルダーここまで
		
		//集計した月の累計を出力　最後の処理が指定月以外だったら出力できないため、外に配置
		if(i == results.length-1){
			true_time[0] = Math.floor(true_time[0]/true_count);
			true_time[1] = Math.floor(true_time[1]/true_count);
			true_time[2] = Math.floor(true_time[2]/true_count);
			$('.true_list').append('<tr><td>'+true_count+'(男:'+true_sex[0]+'/女:'+true_sex[1]+')</td><td>'+true_money.toLocaleString()+'円</td><td>'+
			true_time[0]+'時間'+true_time[1]+'分'+true_time[2]+'秒</td><td>'+Math.floor(true_money/true_count).toLocaleString()+'円</td></tr>');
		}
	
	}//集計forループここまで
	oshiraseDeleteLink();
	//自分のクラスに記事がない場合
			 $(".load").hide();
			 
	 //年齢別テーブル
	for(var fi = 0; fi < age_data.length-1; fi++){
		$('.age_table').append('<tr><td>'+age_data[fi]+'</td><td>'+age_count[fi][0]+'(男:'+age_count[fi][1]+'/女:'+age_count[fi][2]+')</td><td>'+age_money[fi]+'円</td><td>'+
		Math.round(age_time[fi][0])+'時間'+Math.round(age_time[fi][1])+'分'+Math.round(age_time[fi][2])+'秒</td></tr>');
	}
			 
			 
	 //曜日別テーブル
	for(var fi = 0; fi < youbi_list.length; fi++){
		$('#youbi_table table').append('<tr><td>'+youbi_list[fi]+'</td><td>'+youbi_count[fi][0]+"(男:"+youbi_count[fi][1]+"女:"+youbi_count[fi][2]+
		")</td><td>"+Math.round(av_money_time[fi][0])+"時間"+Math.round(av_money_time[fi][1])+"分"+Math.round(av_money_time[fi][2])+"秒</td><td>"+
		Math.round(av_money[fi])+"円</td></tr>");
	}
			
	//時間別テーブル出力
	for(var fj = 0; fj < jikan_list.length; fj++){
			$('#time_table table').append('<tr><td>'+jikan_list[fj]+'</td><td>'+jikan_count[fj][0]+'(男:'+jikan_count[fj][1]+'/女:'+jikan_count[fj][2]+')</td><td>'+
			Math.round(avjikan_time[fj][0])+'時間'+Math.round(avjikan_time[fj][1])+'分'+Math.round(avjikan_time[fj][2])+'秒</td><td>'+Math.round(avjikan_money[fj])+'円</td></tr>');
	}
	
	//時間別グラフ用データ作成(数値の大きさ合わせる)
	var ct_avjikan_money =[];
	var ct_avmtime_f = [];
	var ct_avmtime_h = [];
	for(var fj = 0; fj < jikan_list.length; fj++){
		ct_avjikan_money[fj]= Math.round(avjikan_money[fj]/1000);
		ct_avmtime_f[fj] = Math.round((avjikan_time[fj][0]*60) + avjikan_time[fj][1]);
		ct_avmtime_h[fj] = jikan_count[fj][0];
	}
		
	
	//曜日別グラフ用データ作成(数値の大きさ合わせる)
	var av_money_time_g =[];
	var youbi_count_g = [];
	var av_money_g = [];
	for(var fj = 0; fj < youbi_list.length; fj++){
		av_money_time_g[fj] = Math.round((av_money_time[fj][0]*60) + av_money_time[fj][1]);
		youbi_count_g[fj] = youbi_count[fj][0];
		av_money_g[fj]= Math.round(av_money[fj]/1000);
	}
		//男女別
		$('#dj_count1').html(dj_count1);
		$('#dj_count2').html(dj_count2);
		$('#avdj_money1').html(Math.round(avdj_money1)+"円");
		$('#avdj_money2').html(Math.round(avdj_money2)+"円");
		$('#avdj_time1').html(Math.round(avdj_time1[0])+"時間"+Math.round(avdj_time1[1])+"分"+Math.round(avdj_time1[2])+"秒");
		$('#avdj_time2').html(Math.round(avdj_time2[0])+"時間"+Math.round(avdj_time2[1])+"分"+Math.round(avdj_time2[2])+"秒");
		
		//日別グラフ
		day_Chart.destroy();
		var day_chartData = {
			labels: day_label,
			datasets: [{
				type: 'bar',
				label: '日別利用人数',
				borderColor: window.chartColors.blue,
				borderWidth: 2,
				fill: false,
				data: day_data
			}, {
				type: 'bar',
				label: '日別平均利用金額(千円)',
				backgroundColor: window.chartColors.green,
				data: day_data_money
			}]

		};
	
			var day_ctx = document.getElementById("day_canvas").getContext("2d");
			day_Chart = new Chart(day_ctx, {
				type: 'bar',
				data: day_chartData,
				options: {
					responsive: true,title: {display: true,text: ''},
					tooltips: { mode: 'index',intersect: true}
				}
			});
			
			
	
		//曜日別グラフ
		youbi_Chart.destroy();
		var chartData = {
			labels: youbi_list,
			datasets: [{
				type: 'line',
				label: '平均利用時間(分)',
				borderColor: window.chartColors.blue,
				borderWidth: 2,
				fill: false,
				data: av_money_time_g
			}, {
				type: 'bar',
				label: '利用者数(人)',
				backgroundColor: window.chartColors.red,
				data: youbi_count_g,
				borderColor: 'white',
				borderWidth: 2
			}, {
				type: 'bar',
				label: '平均利用金額(千円)',
				backgroundColor: window.chartColors.green,
				data: av_money_g
			}]

		};
	
			var ctx = document.getElementById("canvas").getContext("2d");
			youbi_Chart = new Chart(ctx, {
				type: 'bar',
				data: chartData,
				options: {
					responsive: true,title: {display: true,text: ''},
					tooltips: { mode: 'index',intersect: true}
				}
			});
			
			
	
		//時間別グラフ
		time_Chart.destroy();
		var time_chartData = {
			labels: jikan_list,
			datasets: [{
				type: 'line',
				label: '平均利用時間(分)',
				borderColor: window.chartColors.blue,
				borderWidth: 2,
				fill: false,
				data: ct_avmtime_f
			}, {
				type: 'bar',
				label: '利用者数(人)',
				backgroundColor: window.chartColors.red,
				data: ct_avmtime_h,
				borderColor: 'white',
				borderWidth: 2
			}, {
				type: 'bar',
				label: '平均利用金額(千円)',
				backgroundColor: window.chartColors.green,
				data: ct_avjikan_money
			}]

		};
	
			var time_ctx = document.getElementById("time_canvas").getContext("2d");
			time_Chart = new Chart(time_ctx, {
				type: 'bar',
				data: time_chartData,
				options: {
					responsive: true,title: {display: true,text: ''},
					tooltips: { mode: 'index',intersect: true}
				}
			});
			
		
		//男女別グラフ
		dj_Chart.destroy();
		var dj_ChartData = {
			labels: ["男性", "女性"],
			datasets: [{
				borderColor: window.chartColors.blue,
				borderWidth: 2,
				fill: false,
				backgroundColor: [
					window.chartColors.blue,
					window.chartColors.red,
				],
				data: [dj_count1,dj_count2]
			}]

		};
	
			var dj_ctx = document.getElementById("dj_canvas").getContext("2d");
			dj_Chart = new Chart(dj_ctx, {
				type: 'pie',
				data: dj_ChartData,
				options: {
					responsive: true,title: {display: true,text: ''},
					tooltips: { mode: 'index',intersect: true}
				}
			});
		
		//年齢別グラフ
		age_Chart.destroy();
		var age_ChartData = {
			labels: age_data,
			datasets: [{
				borderColor: window.chartColors.blue,
				borderWidth: 2,
				fill: false,
				backgroundColor: [
			  window.chartColors.red,
			  window.chartColors.orange,
			  window.chartColors.yellow,
			  window.chartColors.green,
			  window.chartColors.blue,
			  window.chartColors.red,
			  window.chartColors.orange,
			  window.chartColors.yellow,
			  window.chartColors.green,
			  window.chartColors.blue,
			  window.chartColors.red,
			  window.chartColors.orange,
			  window.chartColors.yellow,
			  window.chartColors.green,
			  window.chartColors.blue,
				],
				data: [age_count[0][0],age_count[1][0],age_count[2][0],age_count[3][0],age_count[4][0],age_count[5][0],age_count[6][0],age_count[7][0],age_count[8][0],age_count[9][0],age_count[10][0],not_age]
			}]

		};
	
			var age_ctx = document.getElementById("age_canvas").getContext("2d");
			age_Chart = new Chart(age_ctx, {
				type: 'pie',
				data: age_ChartData,
				options: {
					responsive: true,title: {display: true,text: ''},
					tooltips: { mode: 'index',intersect: true}
				}
			});
		
		
		
		
		})
	.catch(function(err){
	   // エラー処理
		 //alert("エラー" + err);
		//$('#push_list').html('読込中にエラーが発生しました。'+err);
		//ons.notification.alert({title:"アカウントエラー",message: '読込できません！再度ログインしてください'});
			 $(".load").hide();
		$('[id=load_err]').html('<div class="white_block" onclick="onLogoutBtn()">読込できません！再度ログインしてください<br><i class="fa fa-sign-out"></i></div>'+err);
	 });
}








//登録者リスト管理ページ	
function userlist_page() {
	localStorage.setItem('totyu', 0);
		//保護者リスト取得
		ncmb.User.limit(1000)
		.fetchAll()
		.then(function(results){
		$('.userlist_table').html('<tr><th>名前</th><th>性別</th><th>年齢</th><th>クラス</th><th>登録日</th></tr>');
		$('.usercount_table').html('<tr><th>集計内容</th><th>集計結果</th></tr>');
		
		usercount = [0,0,0,0];
		userage_data = ['15～19歳','20～25歳','26～30歳','31～35歳','36～40歳','41～45歳','46～50歳','51～55歳','56～60歳','61～65歳','66歳以上'];
		userage_count = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		age_txt="";
		age_no=0;
		not_age=0;
		for (var i = 0; i < results.length; i++) {
			var object = results[i];
			objectId = (object.get("objectId"));
			userName = (object.get("userName"));
			userclass = (object.get("userclass"));
			sex = (object.get("sex"));
			age = (object.get("age"));
			createDate = (object.get("createDate"));
			if(sex ==undefined || sex == ""){sex='未登録'}
			if(age ==""){age='未登録'}
		createDate = moment(createDate).format("YYYY年MM月DD日");
		
		class_data = [objectId,userName]
		class_select =	'<select name="class_change" id="class_change" class="'+objectId+'">'
		class_select +=	'<option value="ビジター">ビジター</option>'
		class_select +=	'<option value="フェロー">フェロー</option>'
		class_select +=	'</select>'
		class_select +=	'<div onclick="class_changebtn(this)" id="'+objectId+'" class="blue_btn2">変更</div>'
		
		if(userclass !== "管理者"){
			$('.userlist_table').append('<tr id="'+objectId+'"><td>'+userName+'</td><td>'+sex+'</td><td>'+age+'</td><td>'+class_select+'</td><td>'+createDate+'</td></tr>');
			$("."+objectId).val(userclass)
			//会員カウント
			usercount[0]++;
			if(sex == "男性"){usercount[1]++}else if(sex == "女性"){usercount[2]++}else{usercount[3]++}
			
			//年齢別カウント
			var age_no = userage_data.indexOf(age);
				if(age_no > -1){
					userage_count[age_no][0]++;
					if(sex=="女性"){userage_count[age_no][2]++;}else if(sex=="男性"){userage_count[age_no][1]++;}else{userage_count[age_no][3]++};
				}else{
					not_age++
				}
			if(i ==results.length-1){
				$('.usercount_table').append('<tr><td>累計登録者数(男/女)</td><td>'+usercount[0]+'(男:'+usercount[1]+'/女:'+usercount[2]+'/未設定:'+usercount[3]+')</td></tr>');
				for(agefor = 0; agefor < 11;agefor++){
				$('.usercount_table').append('<tr><td>年齢別('+userage_data[agefor]+')</td><td>'+userage_count[agefor][0]+'(男:'+userage_count[agefor][1]+'/女:'+userage_count[agefor][2]+'/未登録:'+userage_count[agefor][3]+')</td></tr>');
				}
				$('.usercount_table').append('<tr><td>年齢未登録</td><td>'+not_age+'人</td></tr>');
			}
		}
		
		}
			//$("dl").click(contactpage);
		})
		.catch(function(err){
			alert(err);
			ons.notification.alert({title:"",message: 'NCMBからのパスコードの読み込みができませんでした！'});
		});
		$.mobile.changePage('#userlist_page');
}

function class_changebtn(obj){
	change_id = obj.id;
	//$(obj).prev().css({'background':'#007374'});
	change_data = $(obj).prev().val();
	//alert(change_id+"を"+change_data+"に変更")
		ncmb.User.limit(1000)
		.fetchAll()
		.then(function(results){
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				objectId = (object.get("objectId"));
				if(objectId == change_id){
					object.set('userclass', change_data).update()
					.then(function(results){
						ons.notification.alert({title:"クラス変更",message: results.userName+'さんを'+change_data+"に変更しました"});
					}).catch(function(err){
						ons.notification.alert({title:"エラー",message: 'クラス変更に失敗しました'});
					});
				}
			}
			
		}).catch(function(err){
			alert(err);
		});
}

//情報変更ページ
function opusion() {
	$.mobile.changePage('#opusion_page');
		
	
	
	
	//パスコード表示部分
	var appdata = ncmb.DataStore("appdata");
		appdata.equalTo('')
			.fetch()
		.then(function(results) {
			$('#id_time').html(results.time);
			$('#id_money').html(results.money);
		})
		.catch(function(err){ // エラー処理
			ons.notification.alert({title:"",message: 'NCMBからのパスコードの読み込みができませんでした！'});
		});
		
		
}

//時間と料金変更
function passcode_henkou(){
	//入力フォームから変数にセット
	var cpasscode = []
	 jikan = Number($("#cpasscode").val());
   	ryoukin = Number($("#cpasscode2").val());
			
	var appdata = ncmb.DataStore("appdata");
		appdata.equalTo('')
			.fetch()
		.then(function(results) {
			if(!jikan){jikan = results.time}
			if(!ryoukin){ryoukin = results.money}
				$('input').val("");
			ons.notification.alert({title:"時間と料金を変更しました",message: '時間'+jikan+'分　料金'+ryoukin+'円'});
			$('#id_time').html(jikan);
			$('#id_money').html(ryoukin);
			results.set('time', jikan).update();
			results.set('money', ryoukin).update();
		})
		.catch(function(err){ // エラー処理
			ons.notification.alert({title:"",message: 'NCMBからのパスコードの読み込みができませんでした！'});
		});
			  
}


//ログアウト処理
function onLogoutBtn(){
	ncmb.User.logout();
	ons.notification.alert({title:'',message:"正常にログアウトが完了しました。"});
	currentLoginUser = null;
	$.mobile.changePage('#LoginPage');
}

///// 初期読み込み
function onReady() {
   //onsenui読み込み
		ons.bootstrap();
			 	$(".load").show();
	
		$('#appver').html(appname);
		$('#kanri_menu').hide();
		$("#karenda").addClass("no_vew");
		$(".modoru").click(modoru_code);
		$("[id=ver]").html(appname);
		function modoru_code(){
			$("#karenda").addClass("no_vew");
		}
		
	//ログインログが残っていれば自動ログイン
	var currentUser = ncmb.User.getCurrentUser();
	if (currentUser) {
		var user_s_id = localStorage.getItem('user_s_id');
		var user_s_pass = localStorage.getItem('user_s_pass');
	ncmb.User.login(user_s_id, user_s_pass)
	.then(function(user) {
				menupage();
			 	$(".load").hide();
		})
		.catch(function(err){
		$.mobile.changePage('#LoginPage');
		$(".load").hide();
		});
	} else {
	//ons.notification.alert({title:"",message: 'このアプリはログインする必要があります。'});
		$.mobile.changePage('#LoginPage');
		$(".load").hide();
	}
	
	//高さ取得
	$(document).ready(function () {
  hsize = $(window).height();
  $("#menu_list").css("height", hsize + "px");
});
}

$(onReady); // on DOMContentLoaded



//効果音
		 var src = "nc133732.mp3";
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


