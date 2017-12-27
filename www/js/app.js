	var appKey	= "33bf11e5de9f63fd95bb25d6f697775b1c6c610e8415bfa7e14970f26a60d9d5";	//SinryoYoyaku appKey
	var clientKey = "2794d99186807224dfcd16e603399a1c946c2c280b0695db461d3a11585ccc90"; //SinryoYoyaku clientKey
	//var appKey	= "15d3db26f75d519ba9273ff34537d248d76ec93a80ce49124d22c176a4e6ef13";	//kitohon_test appKey
	//var clientKey = "737f03998a79931fd2206e7ec21ffd8469342884776b7afff9c35f20c4399e95"; //kitohon_test clientKey
	NCMB.initialize(appKey, clientKey);//プッシュ通知用アクセス
		var imgsrc = "https://mb.api.cloud.nifty.com/2013-09-01/applications/kLtbizLInZzZhemo/publicFiles/"; //test imgurl
		var projectno = "432306700091"; //プロジェクトkey
		var appname = "web(1.0.0)"; 
		var mailsave = "http://ideaxidea.net/phpmail/index.php?title=";
		var mode = "pc";//pc iPad
		var ncmb = new NCMB(appKey, clientKey);
		this.clickEnabled = true;
		var open_time = "09:30";
		var close_time ="20:00";
	sick_list=['(01)1型糖尿病','(02)2型糖尿病','(03)GH','(04)GH自費','(05)甲状腺1（クレチン）','(06)ターナー','(07)甲状腺2（バセドウ）','(08)下垂体（汎下垂体機能低下症）','(09)甲状腺3（甲状腺炎など）',
	'(10)心理(投薬あり)','(11)性腺（早発症など）','(12)先天性代謝異常','(13)副腎（21水酸化酸素欠損症など）','(14)夜尿症など','(15)肥満','(16)プラダーウィリー症候群','(17)知的障害','(18)低身長症','(19)急性期（風邪など）',
	'(20)心理(投薬なし)','(21)予防接種','(22)その他'];
	var bikou_list=['負荷試験','予防接種','文書作成','会計修正'];
	var sinri_list=['心理初診','知能検査','言語訓練','通常再診','特別な再診'];
	var checkup_title = ['classA','生化学','レントゲン','AIA(免疫)','外注','classB'];
	var checkup_list =[
	['心電図','検尿','CBC','CRP'],
	['【院内生化セット】','GOT','GPT','ALP','GLU','UA','TCHO','TG','CRE','ALB','HDL-C','HbA1c','AMYL','CPK','NH3','γGTP','Ca-IP','TBIL','Na-K-CI'],
	['左手根骨','頭蓋側面','胸部PA','腰椎側面','膝関節(正・側)','胸椎正面','その他'],
	['TES','ACTH','HGH','TSH','FT4','FT3'],
	['乳酸','サイログロブリン抗体','TPO抗体','サイロイドテストマイクロゾームテスト','TRAb','TSAb','ソマトメジンC',
	'LH','FSH','PRL','25vitD','PTH-I','シスタチンC','尿Cr','尿Ca','尿Pi','尿微量アルブミン','薬物血中濃度','インスリン',
	'Cペプチド','レニン活性','DHEA-S','Zn','エストラジオール','ADH','血中アミノ酸','サイログロブリン','17OH(オーエイチ)'],
	['スポットビジョン']
	];
	
var app_data = new Promise(function (resolve, reject) {
	var appdata = ncmb.DataStore("appdata");
		appdata.equalTo('').fetch()
		.then(function(results) {
			localStorage.setItem('app_time', results.time);
			localStorage.setItem('app_money', results.money);
		});
	});
function menu_push(opsion){
	$('[id=global-nav]').html('<ul></ul>');
	$('[id=global-nav] ul').append('<li onclick="calender_page(0,0)"><a href="#">予約状況確認</a></li>');
	$('[id=global-nav] ul').append('<li onclick="new_patient_page()"><a href="#">新規患者登録</a></li>');
	$('[id=global-nav] ul').append('<li onclick="reservation_page()"><a href="#">予約登録</a></li>');
	$('[id=global-nav] ul').append('<li onclick="the_day_page()"><a href="#">前日確認項目</a></li>');
	$('[id=global-nav] ul').append('<li onclick="patient_list_page()"><a href="#">患者一覧</a></li>');
	if(course=="管理者"){
		$('[id=global-nav] ul').append('<li onclick="master_list()"><a href="#">管理者一覧</a></li>');
	}
	$('[id=global-nav] ul').append('<li onclick="onLogoutBtn()"><a href="#">ログアウト</a></li>');
	
	$('#global-nav li').removeClass("current");
	$('#global-nav li').eq(opsion).addClass("current");
}
function list_true(){
	//$('td #class_change').html("hoge");
	//$('.blue_btn2').html("").hide();
	$(".userlist_table #class_change").each(function () {
		user_class = $(this).val();
		$(this).parent("td").text(user_class);
	});
}
window.onload = function(){

	var day_ctx = document.getElementById("day_canvas").getContext("2d");
	day_Chart = new Chart(day_ctx, {type: 'bar',
		options: {
			showTooltips: false,
			legend: {
				display: false
			}
		}
	});
	
	var ctx = document.getElementById("canvas").getContext("2d");
	youbi_Chart = new Chart(ctx, {type: 'bar',
		options: {
			responsive: true,title: {display: false,text: ''},
			tooltips: { mode: 'index',intersect: false},
			tooltipEvents: [],
			showTooltips: false,
			tooltipCornerRadius:0,
			tooltipCaretSize:0,
			tooltipXPadding:30,
			tooltipFillColor:'#fff'
		}
	});
	
	var ctx2 = document.getElementById("time_canvas").getContext("2d");
	time_Chart = new Chart(ctx2, {type: 'bar'});

	var ctx3 = document.getElementById("dj_canvas").getContext("2d");
	dj_Chart = new Chart(ctx3, {type: 'pie'});

	var ctx4 = document.getElementById("age_canvas").getContext("2d");
	age_Chart = new Chart(ctx4, {type: 'pie'});
};
function onLoginBtn(){
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
	
	localStorage.setItem('user_s_id', username);
	localStorage.setItem('user_s_pass', password);
	
	// ユーザー名とパスワードでログイン
	//location.reload();
	ncmb.User.login(username, password)
	.then(function(user_data) {
		if(user_data.course == "管理者" ||user_data.course == "スタッフ"){
			currentLoginUser = ncmb.User.getCurrentUser();
			var currentUser = ncmb.User.getCurrentUser();
				course=user_data.course;
				menupage(999);
				$(".load").hide();
			ons.notification.alert({title:'',message:"ログインしました。"});
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
		ncmb.User.where({userName: "大下"})
	.fetch()
	.then(function(user2) {
		alert(user2.objectId);
	});
		ncmb.User.where().fetchAll()
		.then(function(results){
			for(i=0;i<results.length;i++){
				alert(results[i].userName);
			}
			alert(results.name)
			if(results.userName==undefined){
				alert2('エラー','このユーザー名は見つかりません');
			}else{
				alert2('エラー','パスワードが違うようです');
			}
			var check1 = "このユーザー名は見つかりません";
			var check2 = "エラーです"+error;
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
				ons.notification.alert({title:"",message: 'NCMBからの読み込みができませんでした！'});
		});
			 
			 
			 
			//alert("ログイン失敗！次のエラー発生: " + error);
		//ons.notification.alert({title:"エラー",message: 'ログイン失敗！再度ログインしてください。'+error});
		ncmb.User.logout();
		currentLoginUser = null;
		$.mobile.changePage('#LoginPage');
		});
}//ログイン処理
function menupage(course){
	$.mobile.changePage('#TopPage');
	menu_push(course);
	$('.container').html('<div class="statusToday"><div class="statusTodayInner"></div></div>');
	$('.statusTodayInner')
		.append('<h2>本日の予約状況</h2>')
		.append('<ul class="reservation_list"></ul>');
	$('.statusTodayInner .reservation_list')
		.append('<li>午前の予約・・・<span class="gozen"></span>件</li>')
		.append('<li>午後の予約・・・<span class="gogo"></span>件</li>');
	$('.container').append('<ul class="mainMenu"></ul>');
	$('.container .mainMenu')
		.append('<li onclick="calender_page(0,0)"><a href="#"><span class="ion-ios-calendar-outline"></span><br>予約状況確認</a></li>')
		.append('<li onclick="new_patient_page()"><a href="#"><span class="ion-ios-plus-outline"></span><br>新規患者登録</a></li>')
		.append('<li onclick="reservation_page()"><a href="#"><span class="ion-person-add"></span><br>予約登録</a></li>')
		.append('<li onclick="the_day_page()"><a href="#"><span class="ion-ios-medkit-outline"></span><br>前日確認項目</a></li>')
		.append('<li onclick="patient_list_page()"><a href="#"><span class="ion-ios-people-outline"></span><br>患者一覧</a></li>');
	
		
		gozen=0;gogo=0;
		ncmb.DataStore("Reservation").order("reservation",false).limit(1000).fetchAll()
		.then(function(reservation_ob) {
		for(i=0;i<reservation_ob.length;i++){
			r_data=reservation_ob[i];
			res_time = moment(r_data.reservation).format('HH:mm');
			res_day = moment(r_data.reservation).format('MM月DD日');
			
			if(res_day == moment().format('MM月DD日')){
				if(moment(r_data.reservation) <= moment('12:00','HH:mm')){
					gozen=gozen+1;
				}else{
					gogo=gogo+1;
				}
			}
			if(i>=reservation_ob.length-1){
				$('.gozen').html(gozen);
				$('.gogo').html(gogo);
			}
		}
		});
}//トップページ
function new_patient_page(opsion){
	$.mobile.changePage('#TopPage');
	menu_push(1);
	$('.container').html('');
	$('.container')
		.append('<h2 class="title01">新規患者登録</h2>')
		.append('<form class="form">')
		.append('<div class="form-group"><label class="label1">お名前</label><div class="formInput">'+
				'<input type="text" name="name" placeholder="お名前" required><span class="err_message">お名前は必須です</span></div></div>')
		.append('<div class="form-group"><label class="label1">ふりがな</label><div class="formInput">'+
				'<input type="text" name="furigana" placeholder="ふりがな" required><span class="err_message">ふりがなは必須です</span></div></div>')
		.append('<div class="form-group"><label class="label1">電話番号</label><div class="formInput">'+
				'<input type="tel" name="tel" pattern="[\u30A1-\u30F6]*" placeholder="電話番号" required><span class="err_message">電話番号は必須です</span></div></div>')
		.append('<div class="form-group"><label class="label1">生年月日</label>'+
			'<div class="selectWrap"><select name="bday-year" autocomplete="bday-year" class="new_yer"></div><option selected="">----</option></select><label>年</label>'+
			'<select name="bday-month" autocomplete="bday-month" class="new_mot"><option selected="" value="1">1</option></select><label>月</label>'+
			'<select name="bday-day" autocomplete="bday-day" class="new_day"><option selected="" value="1">1</option></select><label>日</label>'+
			'<span class="err_message">生年月日の値が不正です</span></div></div>')
		.append('<div class="form-group"><div class="btnWrap"><button type="reset" class="resetBtn" onclick="from_reset()">リセット</button>'+
				'<button type="submit" class="btn" onclick="add_patient()">登録する</button></div></div>')
		.append('</form> ');
		$('.container .err_message').hide();
		now_yer = moment().format('YYYY');
		for(i=now_yer; i>1949; i--){
			$('.container .new_yer').append('<option value="'+i+'">'+i+'</option>');
		}
		for(i=2; i<13; i++){
			$('.container .new_mot').append('<option value="'+i+'">'+i+'</option>');
		}
		for(i=2; i<32; i++){
			$('.container .new_day').append('<option value="'+i+'">'+i+'</option>');
		}
		$('.container .new_mot').change(function(){
			var c_mot = $(this).val();
			new_mot_day = moment('2017-'+c_mot+'-01').daysInMonth(); // 30
			$('.container .new_day').html('<option selected="" value="1">1</option>');
			for(i=2; i<(new_mot_day+1); i++){
				$('.container .new_day').append('<option value="'+i+'">'+i+'</option>');
			}
			//alert(new_mot_day)
		});
		//alert(now_yer-1);
		
}//新規患者登録
function from_reset(){
	new_patient_page();
}
function add_patient(){
	add_name = $('[name="name"]').val();
	add_furigana = $('[name="furigana"]').val();
	add_tel = $('[name="tel"]').val();
	add_yer = $('[name="bday-year"]').val();
	add_mot = $('[name="bday-month"]').val();
	add_day = $('[name="bday-day"]').val();
	
	$('.container .err_message').hide();
	if(add_name==""){$('.container .err_message').eq(0).show();return;}
	if(add_furigana==""){$('.container .err_message').eq(1).show();return;}
	if(add_tel==""){$('.container .err_message').eq(2).show();return;}
	if(add_yer=="----"){$('.container .err_message').eq(3).show();return;}
	//alert2('エラー',err_add_name);
	
	
	var UserData = ncmb.DataStore("UserData");
	ncmb.DataStore("UserData").equalTo('name',add_name).limit(1000).fetch()
	.then(function(user_data) {
		if(user_data.name==undefined){
			var user_data = new UserData();
			user_data.set("name", add_name)
			.set("furigana", add_furigana)
			.set("tel", add_tel)
			.set("id", "----")
			.set("birthday", moment(add_yer+'-'+add_mot+'-'+add_day).format())
			.save()
			.then(function(user_deta){
				ons.notification.confirm({
					title: add_name+'さんの登録が完了しました',
					message: "そのまま予約登録を開始しますか？",
					buttonLabels: ['いいえ', 'はい'],
					animation: 'default',
					cancelable: true,
					callback: function(index) {
					if(index == 1) {
						reservation_page(user_deta.objectId);
					}
				}});
			}).catch(function(err){ // エラー処理
				alert(err);
			});
		}else{
			alert2("重複エラー",add_name+"さんはすでに登録されています。");
		}
	});
	
}
function reservation_page(opsion){
	$.mobile.changePage('#TopPage');
	menu_push(2);
	$('.container').html('');
	$('.container')
		.append('<h2 class="title01">新規予約登録</h2>')
		.append('<div id="kanja_tab" class="cf">'+
				'<div onclick="reservation_page()" class="sarch_tab1"><h3 class="check1">最近登録された患者から予約</h3></div>'+
				'<div onclick="sarch_tab(2)" class="sarch_tab2"><h3 class="check0">患者を検索して予約</h3></div>'+
				'</div>')
		.append('<div class="tab_put">')
		.append('</div>')
		.append('<div class="resultbox"></div><div id="put_btn"></div><div class="form_box"></div>');
		
		ncmb.DataStore("UserData").order('createDate',true).limit(1000).fetchAll()
		.then(function(user_ob) {
			$('.resultbox').html('<h3>予約作成する患者を選択してください</h3><table class="sarch_list"><tr><th></th><th>患者名</th><th>電話番号</th></tr></table>');
			for(i=0; i<3;i++){
				user_data=user_ob[i];
				serchtag="'"+user_data.name+"'";
				$('.resultbox table').append('<tr id="'+user_data.name+'"><td><btn class="user_select_btn" onclick="reservation_user_search('+serchtag+')">予約作成</btn></td>'+
				'<td><span class="name">'+user_data.name+'('+user_data.furigana+')</span></td><td> '+user_data.tel+'</td></tr>');
			}
		});
		
		
	//onclick="reservation_user_search('+serchtag+')"
	if(opsion != undefined){
		ncmb.DataStore("UserData").equalTo('objectId',opsion).limit(1000).fetch()
		.then(function(user_data) {
			$('[name=name]').val(user_data.name);
			reservation_user_search(user_data.name);
		});
	};
	
}//予約登録
function reservation_put_btn(name){
	$('.resultbox li').removeClass('check');
	$('.'+name).addClass('check');
	serchtag="'"+name+"'";
	$('#put_btn').html('<button type="submit" class="btn" onclick="reservation_user_search('+serchtag+')">'+name+'さんの予約を作成する</button>');
}
function new_check(id){
	$('.new_check .check').removeClass('check');
	$('.new_check h4').eq(id).addClass('check');
}
function sinri_check(id){
	$('.sinri_check .check').removeClass('check');
	$('.sinri_check h4').eq(id).addClass('check');
	$('[id^=sinri_box]').hide();
	$('#sinri_box'+id).show();
}
function sarch_tab(id){
	$('.form_box').html("");
	if(id==2){
		$('.sarch_tab1 h3').css('background-image','url(img/check_0.png)');
		$('.sarch_tab2 h3').css('background-image','url(img/check_1.png)');
		$('.resultbox').html("");
		$('.tab_put').html("");
		$('#put_btn').html('');
		$('.tab_put')
			.append('<form class="form">')
			.append('<div class="form-group"><div class="formInput2"><h3>予約する患者のお名前で検索してください。</h3>')
			.append('<label class="label1">お名前</label><input id="in_name" type="search" name="name" placeholder="お名前">');
			
		ncmb.DataStore("UserData").order('createDate',true).limit(1000).fetchAll()
		.then(function(user_ob) {
			$('.resultbox').html('<h3>予約作成する患者を選択してください</h3><table class="sarch_list"><tr class="th_line"><th></th><th>患者名</th><th>電話番号</th></tr></table>');
			for(i=0; i<user_ob.length;i++){
				user_data=user_ob[i];
				serchtag="'"+user_data.name+"'";
				$('.resultbox table').append('<tr id="'+user_data.name+'"><td><btn class="user_select_btn" onclick="reservation_user_search('+serchtag+')">予約作成</btn></td>'+
				'<td class="name">'+user_data.name+'('+user_data.furigana+')</td><td> '+user_data.tel+'</td></tr>');
			}
			$('.resultbox table').append('<tr class="no_deta_line"><td colspan="3">検索結果はありません</td></tr>');
			$('.resultbox').hide();
		});
			
		//ユーザ名検索システム
		$('#in_name').on('keyup', function(){Search($(this).val());});
		function Search(keyword) {
			var regExp = new RegExp(keyword);
			$('.resultbox table').find('tr').hide().each(function(){
				var tr = $(this);
				$(this).find('.name').each(function(){
					if ($(this).text().match(regExp)) {
						tr.show();
						$('.th_line').show();
						$('.resultbox').show();
					}else{
					}
				});
			});
		}
	}
}

function search_btn(){
	name=$('[name=name]').val();
	reservation_user_search(name);
}//新規予約検索タブ切り替え
function reservation_user_search(name){
	ons.notification.confirm({
		title: "確認",
		message:name+'さんの予約を作成しますか？', 
		buttonLabels: ['キャンセル', '作成する'],
		animation: 'default',
		cancelable: true,
		callback: function(index) {
		if(index == 1) {
	$('#put_btn').html('');
	$('.form_box').html("");
	$('.container .form_box')
		.append('<div class="form-group"><h3>予約日時指定</h3>'+
			'<div class="selectWrap"><select name="bday-year" autocomplete="bday-year" class="new_yer"></div><option selected="">----</option></select><label>年</label>'+
			'<select name="bday-month" autocomplete="bday-month" class="new_mot"><option selected="" value="1">1</option></select><label>月</label>'+
			'<select name="bday-day" autocomplete="bday-day" class="new_day"><option selected="" value="1">1</option></select><label>日</label>'+
			'<select name="bday-HH" autocomplete="bday-HH" class="new_HH"></select><label>時</label>'+
			'<select name="bday-mm" autocomplete="bday-mm" class="new_mm"><option selected="" value="0">0</option></select><label>分</label>'+
			'</div></div>')
		.append('<div class="form-group"><h3>予約分類</h3>'+
				'<div class="cf reCat"><div class="new_check"><h4 onclick="new_check(0)" class="check">初診</h4><h4 onclick="new_check(1)">再診</h4></div></div>'+
				'<label class="label1"><h3>備考</h3></label><textarea class="b_text_area" name="bikou"></textarea>')
		.append('</div><div class="form-group"><div class="btnWrap"></div></div></form></div>');
		//$('.tab_put').html('<input type="submit" name="submit" value="再検索" onclick="sarch_tab(2)"></div>');
		$('.tab_put').html('');
		for (i=0; i<sick_list.length;i++){
			$('.container .sick_list').append('<option value="'+sick_list[i]+'">'+sick_list[i]+'</option>');
		}
		for (i=0; i<sinri_list.length;i++){
			$('.container .sinri_list').append('<option value="'+sinri_list[i]+'">'+sinri_list[i]+'</option>');
		}
	if(name != ""){
		ncmb.DataStore("UserData").equalTo('name',name).limit(1000).fetch()
		.then(function(user_data) {
			if(user_data.name != undefined){
				$('.resultbox').html('<h3>'+name+'さんの予約データを作成します</h3><table class="new_Entry"><tr><th>患者名</th><th>電話番号</th><th>カルテNo.</th></tr></table>');
				$('.resultbox table').append('<tr><td>'+user_data.name+'('+user_data.furigana+')</td><td>'+user_data.tel+'</td><td>'+user_data.id+'</td></td>');
				$('.container .btnWrap').html('<button type="submit" class="btn" onclick="add_reservation('+"'"+user_data.name+"'"+')">予約内容確認</button>');
			}else{
				$('.resultbox').html('');
				alert2('エラー','このお名前のユーザー情報が見つかりませんでした');
			}
		});
	}else{
		$('.resultbox').html('');
		alert2('エラー',"入力情報がありません");
	}
	time_select_set(0);
	now_yer = moment().add(1, 'years').format('YYYY');
	for(i=now_yer; i>(now_yer-2); i--){
		$('.container .new_yer').append('<option value="'+i+'">'+i+'</option>');
	}
	$('.container .new_yer').val(moment().format("YYYY"));
		
	open_HH=moment(open_time,"HH:mm").format("HH");
	close_HH=moment(close_time,"HH:mm").format("HH");
		for(i=open_HH; i<=close_HH; i++){
			i2= ("0" + i).slice(-2);
			$('.container .new_HH').append('<option value="'+i2+'">'+i+'</option>');
		}
		for(i=15; i<60; i=i+15){
			i2= ("0" + i).slice(-2);
			$('.container .new_mm').append('<option value="'+i2+'">'+i+'</option>');
		}
	$('.container .new_yer').change(function(){
		var c_yer = $(this).val();
		if(c_yer == moment().format("YYYY")){
			time_select_set(0);
		}else{
			time_select_set(1);
		}
	});
	$('.container .new_mot').change(function(){
		var c_mot = $(this).val();
		new_mot_day = moment(c_mot,"MM").daysInMonth(); // 設月からの日付を取得
		$('.container .new_day').html('<option selected="" value="1">1</option>');
		for(i=2; i<(new_mot_day+1); i++){
			i2= ("0" + i).slice(-2);
			$('.container .new_day').append('<option value="'+i2+'">'+i+'</option>');
		}
		//alert(new_mot_day)
	});
		}
	}});
}
function time_select_set(option){
	if(option==0){
		now_m=moment().format("MM");
		$('.container .new_mot').html("");
		for(i=now_m; i<=12; i++){
			i2= ("0" + i).slice(-2);
			$('.container .new_mot').append('<option value="'+i2+'">'+i+'</option>');
		}
		now_d=moment().format("DD");
		new_mot_day = moment(now_m,"MM").daysInMonth(); // 設月からの日付を取得
		$('.container .new_day').html("");
		for(i=now_d; i<=new_mot_day; i++){
			i2= ("0" + i).slice(-2);
			$('.container .new_day').append('<option value="'+i2+'">'+i+'</option>');
		}
			$('.container .new_mot').val(moment().format("MM"));
			$('.container .new_day').val(moment().format("DD"));
	}else{
		$('.container .new_mot').html('');
		for(i=1; i<=12; i++){
			i2= ("0" + i).slice(-2);
			$('.container .new_mot').append('<option value="'+i2+'">'+i+'</option>');
		}
		new_mot_day = moment(01,"MM").daysInMonth(); // 設月からの日付を取得
		$('.container .new_day').html('');
		for(i=1; i<=(new_mot_day); i++){
			now_ddd=moment(i,"DD").format("ddd");
			if(now_ddd !='月' && now_ddd !='火'){	};
				i2= ("0" + i).slice(-2);
				$('.container .new_day').append('<option value="'+i2+'">'+i+'</option>');
		}
	}
}
function add_reservation(name){
	ncmb.DataStore("UserData").equalTo('name',name).limit(1000).fetch()
	.then(function(user_data) {
		add_yer = $('[name="bday-year"]').val();
		add_mot = $('[name="bday-month"]').val();
		add_day = $('[name="bday-day"]').val();
		add_HH = $('[name="bday-HH"]').val();
		add_MM = $('[name="bday-mm"]').val();
		check_deta= $('.new_check .check').text();
		karte= user_data.id;
		bikou = $('[name="bikou"]').val();
		bikou = bikou.replace(/(\n|\r)/g, "<br>");
	
	$(".check_windo").show();
	$(".check_windo").html(
		'<table class="check_windo_table">'+
		'<tr><th>登録患者名</th><th>'+user_data.name+'('+user_data.furigana+')</th></tr>'+
		'<tr><th>登録日時</th><td>'+add_yer+'年'+add_mot+'月'+add_day+'日 '+add_HH+'時'+add_MM+'分</td></tr>'+
		'<tr><th>予約分類</th><td>'+check_deta+'</td></tr>'+
		'<tr><th>備考</th><td class="bikou_check">'+bikou+'</td></tr>'+
		'<tr><td colspan="2"><h3>以上の内容でよろしいですか？</h3>'+
		'<button type="reset" class="resetBtn" onclick="add_reservation_can()">キャンセル</button>'+
		'<button type="submit" class="btn" onclick="add_reservation_push('+"'"+name+"'"+')">予約確定する</button></td><tr></table>');

			//alert(add_yer+'-'+add_mot+'-'+add_day+'T'+add_HH+':'+add_MM+':00+09:00');
			//alert(moment(add_yer+'-'+add_mot+'-'+add_day+'T'+add_HH+':'+add_MM+':00+09:00').format());
		});
}//新規予約登録PUT
function add_reservation_can(){
	$(".check_windo").html('');
	$(".check_windo").hide();
}//予約確認のキャンセル
function add_reservation_push(name){
	ncmb.DataStore("UserData").equalTo('name',name).limit(1000).fetch()
	.then(function(user_data) {
		var Reservation = ncmb.DataStore("Reservation");
		var reservation = new Reservation();
		reservation.set("name", user_data.name)
			.set("furigana", user_data.furigana)
			.set(user_data.id)
			.set("reservation", moment(add_yer+'-'+add_mot+'-'+add_day+'T'+add_HH+':'+add_MM).format())
			.set("new_check", check_deta)
			.set("karte", karte)
			.set("bikou", bikou)
			.set("status", "予約中")
			.set("sick_name", "----")
			.set("sinri_check", "----")
			.set("sinri_list0", "----")
			.set("sinri_list1", "----")
			.set("dorag", [])
			.set("reservation_opsion",[[0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0],[0],[0,0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]])
			.save()
			.then(function(oshirase){
				alert2('登録が完了しました',add_yer+"年"+add_mot+"月"+add_day+"日");
				$(".check_windo").html('');
				$(".check_windo").hide();
			});
	});
}//予約のデータベース登録処理
function the_day_page(){
	menu_push(3);
	$('.container').html('');
	
	$('.container')
		.append('<form class="form">')
		.append('<h2 class="title01">前日確認項目</h2>')
		.append(
			'<h3>予約日時指定</h3><div class="selectWrap"><select name="bday-year" autocomplete="bday-year" class="search_yer"></div><option selected="">----</option></select><label>年</label>'+
			'<select name="bday-month" autocomplete="bday-month" class="search_mot"><option selected="" value="1">1</option></select><label>月</label>'+
			'<select name="bday-day" autocomplete="bday-day" class="search_day"><option selected="" value="1">1</option></select><label>日</label>'+
			'<input type="submit" name="submit" value="検索" onclick="time_search_btn()"></div>');
			
		
		ncmb.DataStore("Reservation").order("reservation",true).limit(1000).fetchAll()
		.then(function(reservation_ob) {
		for(t=0;t<=1;t++){
			$('.container')
				.append('<div class="resultbox" id="'+t+'"><h3>'+moment().add(t, 'days').format('YYYY年MM月DD日')+'の予約リスト</h3>'+
				'<table class="reservation_table">'+
				'<tr class="title">'+
				'<th class="the_day_th01"></th><th>患者名</th><th class="the_day_th02">予約日時</th><th class="the_day_th03">設定内容</th>'+
				'<th class="the_day_th04">検査依頼チェックリスト</th><th class="the_day_th05">備考</th><th>印刷</th></tr></table></div>');
				one_day=moment().add(t, 'days').format('YYYY年MM月DD日');
				touroku_c=0;
				for(i=0;i<reservation_ob.length;i++){
					push_data=reservation_ob[i];
					if(one_day==moment(push_data.reservation).format('YYYY年MM月DD日')){
						reservation_time=moment(push_data.reservation).format("YYYY年MM月DD日 HH:mm");
						id="'"+push_data.objectId+"'";
						if(push_data.sinri_check=="心理診療"){
							bunrui_deta=push_data.sinri_check+'('+push_data.sinri_list0+')';
						}else if(push_data.sinri_check=="心理以外"){
							bunrui_deta=push_data.sinri_check+'('+push_data.sinri_list1+')';
						}else {
							bunrui_deta="----";
						}
						list_data="";
						for (var ct=0; ct<checkup_title.length;ct++){
								if(ct !=4 &&ct !=0){
									//list_data=list_data+('<h4>'+checkup_title[ct]+'</h4>');
								}else{
									//list_data=list_data+('<h4></h4>');
								}
							for (var list=0; list<checkup_list[ct].length;list++){
								if(push_data.reservation_opsion[ct][list]==1){
									list_data=list_data+"・"+checkup_list[ct][list];
								}
							}
						}
						sick_number = $.inArray(push_data.sick_name, sick_list)+1;
						if(sick_number < 1){sick_number="---"}
						else{sick_number= "("+("0" + sick_number).slice(-2)+")";}
						$('.resultbox table').eq(t).append('<tr class="reservation_list">'+
						'<td><btn class="user_select_btn" onclick="reservation_edit('+id+')">編集する</btn></td>'+
						'<td>'+push_data.name+'<br><span>('+push_data.furigana+')</span></td><td>'+reservation_time+'</td>'+
						'<td><div>カルテNo.：<span>'+push_data.karte+'</span></div>'+
						'<div>ステータス：<span>'+push_data.status+'</span></div>'+
						'<div>'+push_data.new_check+'</div>'+
						'<div>分類：<span>'+bunrui_deta+'</span></div>'+
						'<div>診療メニュー：<span>'+sick_number+'</span></div>'+'</td>'+
						'<td>'+list_data+'</td>'+
						'<td>'+push_data.bikou+'</td>'+
						'<td><button type="submit" class="btn" onclick="reservation_edit_print_0('+"'"+push_data.objectId+"'"+')">検査依頼</button>'+
						'<button type="submit" class="btn" onclick="reservation_edit_print_1('+"'"+push_data.objectId+"'"+')">使用薬</button></td>'+
						'</tr>');
						touroku_c++;
					}
					if(touroku_c==0 && i>=reservation_ob.length-1){
						$('.resultbox table').eq(t).append('<tr class="reservation_list"><td colspan="7">登録はありません</td></tr>');
					}
				}
		}
			$('.container').append('<div class="edit_area"></div>');
			$('.container').append('</form>');
		});
		
	//フォームに時間リストをセット
	now_yer = moment().add(1, 'years').format('YYYY');
	for(i=now_yer; i>(now_yer-3); i--){
		$('.container .search_yer').append('<option value="'+i+'">'+i+'</option>');
	}
	for(i=2; i<13; i++){
		i2= ("0" + i).slice(-2);
		$('.container .search_mot').append('<option value="'+i2+'">'+i+'</option>');
	}
	for(i=2; i<32; i++){
		i2= ("0" + i).slice(-2);
		$('.container .search_day').append('<option value="'+i2+'">'+i+'</option>');
	}
	//時間フォームに現在日付を設定
	$('.container .search_yer').val(moment().format("YYYY"));
	$('.container .search_mot').val(moment().format("MM"));
	$('.container .search_day').val(moment().format("DD"));
	
	//月が変わった際に日付のリスト取得し直す
	$('.container .new_mot').change(function(){
		var c_mot = $(this).val();
		search_mot_day = moment('2017-'+c_mot+'-01').daysInMonth(); // 30
		$('.container .search_day').html('<option selected="" value="1">1</option>');
		for(i=2; i<(search_mot_day+1); i++){
			$('.container .search_day').append('<option value="'+i+'">'+i+'</option>');
		}
	});
	
}//前日予約確認ページ
function time_search_btn(){
	var y = $('.container .search_yer').val();
	var m = $('.container .search_mot').val();
	var d = $('.container .search_day').val();
	$('.resultbox'+'#1').hide();
	ncmb.DataStore("Reservation").order("reservation",true).limit(1000).fetchAll()
	.then(function(reservation_ob) {
		touroku_c=0;
		$('.resultbox h3').html(y+'年'+m+'月'+d+'日の予約リスト');
		$('.resultbox table').html(
				'<tr class="title">'+
				'<th class="the_day_th01"></th><th>患者名</th><th class="the_day_th02">予約日時</th><th class="the_day_th03">設定内容</th>'+
				'<th class="the_day_th04">検査依頼チェックリスト</th><th class="the_day_th05">備考</th><th>印刷</th></tr>');
		one_day=moment(y+'年'+m+'月'+d+'日','YYYY年MM月DD日').format('YYYY年MM月DD日');
		for(i=0;i<reservation_ob.length;i++){
			push_data=reservation_ob[i];
				if(one_day==moment(push_data.reservation).format('YYYY年MM月DD日')){
					reservation_time=moment(push_data.reservation).format("YYYY年MM月DD日 HH:mm");
					id="'"+push_data.objectId+"'";
					if(push_data.sinri_check=="心理診療"){
						bunrui_deta=push_data.sinri_check+'('+push_data.sinri_list0+')';
					}else if(push_data.sinri_check=="心理以外"){
						bunrui_deta=push_data.sinri_check+'('+push_data.sinri_list1+')';
					}else {
						bunrui_deta="----";
					}
					list_data="";
					for (var ct=0; ct<checkup_title.length;ct++){
							if(ct !=4 &&ct !=0){
								//list_data=list_data+('<h4>'+checkup_title[ct]+'</h4>');
							}else{
								//list_data=list_data+('<h4></h4>');
							}
						for (var list=0; list<checkup_list[ct].length;list++){
							if(push_data.reservation_opsion[ct][list]==1){
								list_data=list_data+"・"+checkup_list[ct][list];
							}
						}
					}
					$('.resultbox table').append('<tr class="reservation_list">'+
					'<td><btn class="user_select_btn" onclick="reservation_edit('+id+')">編集する</btn></td>'+
					'<td>'+push_data.name+'<br>('+push_data.furigana+')</td><td>'+reservation_time+'</td>'+
					'<td><div>カルテNo.：<span>'+push_data.karte+'</span></div>'+
					'<div>ステータス：<span>'+push_data.status+'</span></div>'+
					'<div>'+push_data.new_check+'</div>'+
					'<div>分類：<span>'+bunrui_deta+'</span></div>'+
					'<div>診療メニュー：<span>'+push_data.sick_name+'</span></div>'+'</td>'+
					'<td>'+list_data+'</td>'+
					'<td>'+push_data.bikou+'</td>'+
					'<td><button type="submit" class="btn" onclick="reservation_edit_print_0('+"'"+push_data.objectId+"'"+')">検査依頼</button>'+
					'<button type="submit" class="btn" onclick="reservation_edit_print_1('+"'"+push_data.objectId+"'"+')">使用薬</button></td>'+
					'</tr>');
					touroku_c++;
				}
				if(touroku_c==0 && i>=reservation_ob.length-1){
					$('.resultbox table').append('<tr class="reservation_list"><td colspan="7">登録はありません</td></tr>');
				}
		}
	});
}//前日予約確認指定日付検索
function reservation_edit(objectId){
		ncmb.DataStore("Reservation").equalTo('objectId',objectId).limit(1000).fetch()
		.then(function(deta_ob) {
	ons.notification.confirm({
		title: '確認',
		message: deta_ob.name+"さんの"+moment(deta_ob.reservation).format("YYYY年MM月DD日 HH:mm")+"を編集しますか？",
		buttonLabels: ['キャンセル', '確認'],
		animation: 'default',
		cancelable: true,
		callback: function(index) {
		if(index == 1) {
		$('.resultbox h3').html(deta_ob.name+'さんの'+moment(deta_ob.reservation).format("YYYY年MM月DD日 HH:mm")+'の予約内容を編集します。');
		$('.resultbox table').html('');
	$('.resultbox'+'#1').hide();
	$('.edit_area')
		.html('<form class="form"><div class="form-group">')
		.append('<div class="form-group"><h3>予約日時指定</h3>'+
			'<div class="selectWrap"><select name="bday-year" autocomplete="bday-year" class="new_yer"></div><option selected="">----</option></select><label>年</label>'+
			'<select name="bday-month" autocomplete="bday-month" class="new_mot"><option selected="" value="1">1</option></select><label>月</label>'+
			'<select name="bday-day" autocomplete="bday-day" class="new_day"><option selected="" value="1">1</option></select><label>日</label>'+
			'<select name="bday-HH" autocomplete="bday-HH" class="new_HH"></select><label>時</label>'+
			'<select name="bday-mm" autocomplete="bday-mm" class="new_mm"><option selected="" value="00">0</option></select><label>分</label>'+
			'</div></div>')
		.append('<label class="label1"><h3>カルテナンバー</h3></label>'+
				'<input name="karte" autocomplete="illness" class="karte" type="text"></input>')
		.append('<div class="form-group"><h3>予約分類</h3>'+
				'<div class="cf"><div class="new_check"><h4 onclick="new_check(0)" class="check">初診</h4><h4 onclick="new_check(1)">再診</h4></div></div>'+
				'<div class="cf"><div class="sinri_check"><h4 onclick="sinri_check(0)" class="check">心理診療</h4><h4 onclick="sinri_check(1)">心理以外</h4></div></div>')
		.append('<div id="sinri_box0"><label class="label1">心理診療分類</label><select name="sinri_list0" autocomplete="illness" class="sinri_list"><option selected="">----</option></select></div>')
		.append('<div id="sinri_box1" style="display:none"> <label class="label1">心理以外分類</label><input type="number" name="sinri_list1" placeholder="疾患分類番号" required></div>')
		.append('<label class="label1"> 診療予約病名</label>'+
			'<select name="illnessName" autocomplete="illness" class="sick_list"><option selected="">----</option></select></div>')
		.append('<div class="form-group"><h3>検査依頼チェックリスト</h3><div class="reservation_opsion_area"></div></div>')
		//.append('<button type="submit" class="btn" onclick="reservation_edit_print_0('+"'"+deta_ob.objectId+"'"+')">検査依頼をプリントアウト</button>')
		.append('<div id="dorag_box"><label class="label1"><h3>使用薬登録</h3></label>'+
				'<input name="dorag_input" autocomplete="illness" class="dorag_input" type="text"></input>'+
				'<input name="dorag_input" autocomplete="illness" class="dorag_input" type="text"></input>'+
				'<input name="dorag_input" autocomplete="illness" class="dorag_input" type="text"></input>'+
				'</div>')
		.append('<div onclick="dorag_plus()" class="b_btn">使用薬入力枠の追加</div>')
		.append('<label class="label1"><h3>備考</h3></label><textarea class="b_text_area" name="bikou"></textarea>')
		.append('<div class="form-group"><div class="btnWrap">'+
		'<button type="submit" class="btn" onclick="reservation_edit_cheng('+"'"+objectId+"'"+')">登録内容の編集を完了する</button></div></div>')
		.append('<div class="form-group"><div class="btnWrap">'+
		'<button type="submit" class="btn_red " onclick="reservation_delete('+"'"+objectId+"'"+')">この予約情報を削除する</button></div></div>')
		.append('</form></div>');
		
	$('.edit_area').append('');
	now_yer = moment().add(1, 'years').format('YYYY');
	for(i=now_yer; i>(now_yer-3); i--){
		$('.container .new_yer').append('<option value="'+i+'">'+i+'</option>');
	}
	for(i=2; i<=12; i++){
		i2= ("0" + i).slice(-2);
		$('.container .new_mot').append('<option value="'+i2+'">'+i+'</option>');
	}
	for(i=2; i<=31; i++){
		now_ddd=moment(i,"DD").format("ddd");
		if(now_ddd !='月' && now_ddd !='火'){	};
			i2= ("0" + i).slice(-2);
			$('.container .new_day').append('<option value="'+i2+'">'+i+'</option>');
	}
	
	for (i=0; i<sinri_list.length;i++){
		$('.container .sinri_list').append('<option value="'+sinri_list[i]+'">'+sinri_list[i]+'</option>');
	}
		
	open_HH=moment(open_time,"HH:mm").format("HH");
	close_HH=moment(close_time,"HH:mm").format("HH");
		for(i=open_HH; i<=close_HH; i++){
			i2= ("0" + i).slice(-2);
			$('.container .new_HH').append('<option value="'+i2+'">'+i+'</option>');
		}
		for(i=15; i<60; i=i+15){
			i2= ("0" + i).slice(-2);
			$('.container .new_mm').append('<option value="'+i2+'">'+i+'</option>');
		}
	$('.container .new_mot').change(function(){
		var c_mot = $(this).val();
		new_mot_day = moment(c_mot,"MM").daysInMonth(); // 設月からの日付を取得
		$('.container .new_day').html('<option selected="" value="1">1</option>');
		for(i=2; i<(new_mot_day+1); i++){
			i2= ("0" + i).slice(-2);
			$('.container .new_day').append('<option value="'+i2+'">'+i+'</option>');
		}
		//alert(new_mot_day)
	});
	
	
	for (var title=0; title<checkup_title.length;title++){
			if(checkup_title[title] !='classB' &&title !=0){
				$('.reservation_opsion_area').append('<h4>'+checkup_title[title]+'</h4><ul id="type'+title+'" class="cf">');
			}else{
				$('.reservation_opsion_area').append('<h4></h4><ul id="type'+title+'" class="cf">');
			}
		for (var list=0; list<checkup_list[title].length;list++){
			$('.reservation_opsion_area #type'+title).append('<li>'+checkup_list[title][list]+'</li>');
		}
		$('.reservation_opsion_area').append('</ul>');
	}
	$('.reservation_opsion_area li').on('click', function(){
	    $(this).toggleClass('check');
		if($(this).text()=='【院内生化セット】'){
			t_li=$(this);
			if($(this).attr('class')=='check'){
				for(set=0;set<=9;set++){
					t_li=t_li.next('li');
					t_li.addClass('check');
				}
			}else{
				for(set=0;set<=9;set++){
					t_li=t_li.next('li');
					t_li.removeClass('check');
				}
			}
		}
	});
	for(i=0; i<sick_list.length;i++){
		$('.container .sick_list').append('<option value="'+sick_list[i]+'">'+sick_list[i]+'</option>');
	}
	
	if(deta_ob.new_check =="初診"){
		new_check(0);
	}else if(deta_ob.new_check=="再診"){
		new_check(1);
	}
	if(deta_ob.sinri_check =="心理診療"){
		sinri_check(0,deta_ob.sinri_list0);
		$('[name="sinri_list0"]').val(deta_ob.sinri_list0);
	}else if(deta_ob.sinri_check=="心理以外"){
		sinri_check(1,deta_ob.sinri_list1);
		$('[name="sinri_list1"]').val(deta_ob.sinri_list1);
	}
	$('[name="illnessName"').val(deta_ob.sick_name);
	if(deta_ob.dorag){
	for(i=0;i<=(deta_ob.dorag.length-1);i++){
		if(i<=2){
			$('#dorag_box input').eq(i).val(deta_ob.dorag[i]);
		}else{
			$('#dorag_box').append('<input name="dorag_input" autocomplete="illness" class="dorag_input" type="text"></input>');
			$('#dorag_box input').eq(i).val(deta_ob.dorag[i]);
		}
	}
	}
	for(i=0;i<=6;i++){
		for(l=0;l<=(deta_ob.reservation_opsion[i].length-1);l++){
			if(deta_ob.reservation_opsion[i][l]==1){
				$('.reservation_opsion_area ul:eq('+i+') li:eq('+l+')').addClass('check');
			}
		}
	}
	if(deta_ob.karte!="----"){
		$('[name="karte"]').val(deta_ob.karte);
	}
	
	//フォームに検索結果の予約情報情報を反映
		bikou = deta_ob.bikou.replace(/<br>|<BR>/g, "\r");
			$('[name=bikou]').html(bikou);
			$('[name=name]').val(deta_ob.name);
			$('.container .new_yer').val(moment(deta_ob.reservation).format("YYYY"));
			$('.container .new_mot').val(moment(deta_ob.reservation).format("MM"));
			$('.container .new_day').val(moment(deta_ob.reservation).format("DD"));
			$('.container .new_HH').val(moment(deta_ob.reservation).format("HH"));
			$('.container .new_mm').val(moment(deta_ob.reservation).format("mm"));
			//reservation_user_search(user_data.id,user_data.name);
		}
	}});//編集するかの確認コンヒューむ
		});//予約データ読み込み
}//名前選択で編集フォーム表示
function reservation_edit_print_0(R_id){
	ncmb.DataStore("Reservation").equalTo('objectId',R_id).limit(1000).fetch()
	.then(function(R_Data) {
	ncmb.DataStore("UserData").equalTo('name',R_Data.name).limit(1000).fetch()
	.then(function(UserData) {
	id=UserData.karte;
	if(!id){id="";}
	$(".print_windo").show();
	$(".print_windo").css('z-index','2');
	$(".print_windo").html('<table class="print_windo_table">'+
		'<tr><th colspan="2">ID:'+id+'</th>'+
		'<th colspan="2" id="namaeire">氏名:<br>'+R_Data.name+'<br>('+UserData.furigana+')</th>'+
		'<th colspan="2">生年月日:<br>'+moment(UserData.birthday).format("YYYY年MM月DD日")+'</th></tr>'+
		'<tr class="print_windo_tr"><td>チェック</td><td>検査項目</td><td>確認</td><td>チェック</td><td>検査項目</td><td>確認</td></tr>'+
		'<tr class="list_put_table"><td colspan="3"><table><tr></tr></table></td><td colspan="3"><table><tr></tr></table></td></tr></table>');
		
		var put_c=0;
		var reservation_opsion=[[],[],[],[],[],[],[]];
		for(i=0;i<=6;i++){
			if(i !=4 &&i !=0){
				if(i<=3){
					$('.list_put_table table:eq(0) tr').eq(-1).after('<tr>><td colspan="6"><h2>'+checkup_title[i]+'</h2></td></tr>');
				}else{
					$('.list_put_table table:eq(1) tr').eq(-1).after('<tr>><td colspan="6"><h2>'+checkup_title[i]+'</h2></td></tr>');
				}
			}
			for(l=0;l<=(checkup_list[i].length-1);l++){
				classdeta= R_Data.reservation_opsion[i][l];
				if(classdeta==1){
					reservation_opsion[i].push(1);
					if(i<=3){
						$('.list_put_table table:eq(0) tr').eq(-1).after('<tr><td>✔️️</td><td>'+checkup_list[i][l]+'</td><td></td></tr>');
					}else{
						$('.list_put_table table:eq(1) tr').eq(-1).after('<tr><td>✔️</td><td>'+checkup_list[i][l]+'</td><td></td></tr>');
					}
					//$('.print_windo_table tr:eq(-2) td:eq(4)').html(checkup_list[i][l]);
				}else{
					if(i<=3){
						$('.list_put_table table:eq(0) tr').eq(-1).after('<tr><td></td><td>'+checkup_list[i][l]+'</td><td></td></tr>');
					}else{
						$('.list_put_table table:eq(1) tr').eq(-1).after('<tr><td></td><td>'+checkup_list[i][l]+'</td><td></td></tr>');
					}
					reservation_opsion[i].push(0);
				}
			}
		};
	
			$('#top-head').addClass('print_off');
			$('.print_put_btn').addClass('print_off');
			//alert($('#namaeire').length);
			window.print();
			//window.print()の実行後、作成した「#print」と、非表示用のclass「print_off」を削除
			$('.print_off').removeClass('print_off');
			$(".print_windo").hide();
			the_day_page();
	});
	});
}
function reservation_edit_print_1(R_id){
	ncmb.DataStore("Reservation").equalTo('objectId',R_id).limit(1000).fetch()
	.then(function(R_Data) {
	ncmb.DataStore("UserData").equalTo('name',R_Data.name).limit(1000).fetch()
	.then(function(UserData) {
	id=R_Data.karte;
	if(!id){id="";}
	$(".print_windo").show();
	$(".print_windo").html('<table class="print_windo_table2">'+
		'<tr class="print_th_line"><th class="print_th01">ID:'+id+' '+UserData.name+' 様</th>'+
		'<th class="print_th02"></th><th class="print_th03"></th><th class="print_th04"></th>'+
		'<th class="print_th05"></th><th class="print_th05"></th><th class="print_th07"></th></tr></table>');
		for (i=0;i<R_Data.dorag.length;i++){
			$(".print_windo table").append('<tr class="dorag_line"><td>'+R_Data.dorag[i]+'</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
			$(".print_windo table").append('<tr class="bikou_line"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
		}
	
			$('#top-head').addClass('print_off');
			$('.print_put_btn').addClass('print_off');
			//alert($('#namaeire').length);
			window.print();
			//window.print()の実行後、作成した「#print」と、非表示用のclass「print_off」を削除
			$('.print_off').removeClass('print_off');
			$(".print_windo").hide();
			the_day_page();
	});
	});
}
function reservation_edit_print_can(){
	$(".print_windo").html('');
	$(".print_windo").hide();
}//予約確認のキャンセル
function dorag_plus(){
		$('#dorag_box').append('<input name="dorag_input" autocomplete="illness" class="dorag_input" type="text"></input>');
}//薬入力枠追加処理
function reservation_delete(objectId){
	ncmb.DataStore("Reservation").equalTo('objectId',objectId).limit(1000).fetch()
	.then(function(Reservation_data) {
		ons.notification.confirm({
			title: "確認",
			message:name+'さんの予約('+moment(Reservation_data.reservation).format("YYYY年MM月DD日 HH:mm")+')を本当に削除してもよろしいですか？', 
			buttonLabels: ['キャンセル', '削除する'],
			animation: 'default',
			cancelable: true,
			callback: function(index) {
			if(index == 1) {
				Reservation_data.delete().then(function(Reservation_data) {
					alert2('削除完了','予約データが削除されました');
					the_day_page();
				});
			}}
		});
	});
}
function reservation_edit_cheng(objectId){
	ncmb.DataStore("Reservation").equalTo('objectId',objectId).limit(1000).fetch()
	.then(function(Reservation_data) {
	ons.notification.confirm({
		title: '確認',
		message: Reservation_data.name+"さんの予約データを更新しますか？",
		buttonLabels: ['キャンセル', '更新'],
		animation: 'default',
		cancelable: true,
		callback: function(index) {
		if(index == 1) {
		add_yer = $('[class="new_yer"]').val();
		add_mot = $('[class="new_mot"]').val();
		add_day = $('[class="new_day"]').val();
		add_HH = $('[class="new_HH"]').val();
		add_MM = $('[class="new_mm"]').val();
		c_illnessName = $('[name="illnessName"').val();	
		c_sinri_list0 = $('[name="sinri_list0"]').val();		
		c_sinri_list1 = $('[name="sinri_list1"]').val();	
		karte = $('[name="karte"]').val();
		c_check_deta= $('.new_check .check').text();
		c_sinri_check=$('.sinri_check .check').text();
		c_bikou = $('[name="bikou"]').val();
		c_bikou = c_bikou.replace(/(\n|\r)/g, "<br>");
		dorag_key=0;
		i=0;
		var dorag_push=[];
		while( dorag_key<= 1){
			dorag = $('#dorag_box input').eq(i).val();
			if(dorag != "" && dorag){
				dorag_push.push(dorag);
			}else{
				dorag_key++;
			}
			i++;
		}
		var reservation_opsion=[[],[],[],[],[],[],[]];
		for(i=0;i<checkup_title.length;i++){
			for(l=0;l<=(checkup_list[i].length-1);l++){
				classdeta= $('.reservation_opsion_area ul:eq('+i+') li:eq('+l+')').attr('class');
				if(classdeta=='check'){
					reservation_opsion[i].push(1);
				}else{
					reservation_opsion[i].push(0);
				}
			}
		};
		Reservation_data
			.set("reservation", moment(add_yer+'-'+add_mot+'-'+add_day+'T'+add_HH+':'+add_MM).format())
			.set("new_check", c_check_deta)
			.set("sinri_check", c_sinri_check)
			.set("sinri_list0", c_sinri_list0)
			.set("sinri_list1", c_sinri_list1)
			.set("sick_name", c_illnessName)
			.set("dorag", dorag_push)
			.set("karte", karte)
			.set("reservation_opsion", reservation_opsion)
			.set("bikou", c_bikou)
			.update().then(function(Reservation_data) {
				alert2("予約データ","更新しました");
				the_day_page();
			});
		}}});//確認コンフォーム
	});//データ読み込み
}
function calender_page2(opsion,opsion_c){
	opsion_c=opsion_c-moment().format("DD");
	calender_page(0,opsion_c);
}
function calender_page(opsion,opsion_c){
//opsion=2//強制
	//opsion=表示種別
	menu_push(0);
	$.mobile.changePage('#TopPage');
	$('.container').html('');
	$('.container')
		.append('<div id="calender_menu" class="cf"><div class="calender_title cf">予約カレンダー<div class="c_day"></div></div><div id="min_calender"></div><div class="calender_tab"></div>')
		.append('<div id="table_area">')
		.append('<div id="info_box"></div><div id="table_base"></div>')
		.append('</div><div id="bottom_info"></div>');
	//ここだけ先に振分処理
	if(opsion != 0){
		$('#info_box').hide();
	}else{
		ncmb.DataStore("Info").limit(1000).fetchAll()
		.then(function(Info_ob) {
			$('#info_box').html('<div class="info_title">Information</div>');
			for(i=0;i<=Info_ob.length;i++){
				info_deta=Info_ob[i];
				if(info_deta.status =="表示"){
					$('#info_box').append('<div class="info_deta cf"><span class="time">'+moment(info_deta.createDate).format("YYYY年MM月DD日")+'</span>'+
					'<span class="message">'+info_deta.message+'</span><div class="delete" onclick="info_delete('+"'"+info_deta.objectId+"'"+')">削除</div></div>');
				}
			}
		});
	}
	$('.calender_tab').html('<ul><li onclick="calender_page(0,0)">日</li><li onclick="calender_page(1,0)">週</li>'+
							'<li onclick="calender_page(2,0)">月</li><li onclick="calender_page(3,0)">４ヶ月</li></ul>');
							
	//テーブルの種類によって振分
	if(opsion==0){
		now_day=moment("00:00:00","HH:mm:ss").add(opsion_c, 'days');
		$('.c_day').html('<div class="c_c_btn" onclick="calender_page(0,'+(opsion_c-1)+')"><i class="fa fa-chevron-left" aria-hidden="true"></i></div><div>'+now_day.format(' YYYY年MM月DD日 ')+'</div>'+
		'<div class="c_c_btn" onclick="calender_page(0,'+(opsion_c+1)+')"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>');
		$('#table_base').html('<table class="day_table">'+
			'<tr class="th_line"><th rowspan="3" class="day_th_01">時間</th><th rowspan="3" class="day_th_02">名前</th><th rowspan="3" class="day_th_03">カルテNo.</th>'+
			'<th rowspan="3" class="day_th_04">ステータス</th><th colspan="5" class="day_th_05">診療内容</th></tr>'+
			'<tr><th rowspan="2" class="day_th_06">カテゴリー</th><th rowspan="2" class="day_th_07">診療メニュー</th><th colspan="2" class="day_th_08">分類</th><th rowspan="2" class="day_th_09">備考</th></tr>'+
			'<tr><th class="day_th_10">心理以外</th><th class="day_th_11">心理診療</th></tr>'+
			'<tr class="not_deta_line"><td colspan="9"><div>本日の予約はまだありません</div></td></tr>'+
			'</table>');
		$('#min_calender').html('<ul><li class="Wed">水</li><li class="Thu">木</li><li class="Fri">金</li><li class="Sat">土</li><li class="Sun">日</li></ul>');
		
		//$('#min_calender ul').append('<li onclick="calender_page(0,'+i+'>'+i+'</li>');
			now_syu=moment().add(opsion_c,'days');//追加日付分を計算 
			now_syu=now_syu.startOf('month');//今月のスタート時間に書き換え
			now_syu=moment(now_syu).startOf('week');//今月のスタートから、日曜日まで戻る
			now_syu=moment(now_syu).add(1, 'days');//一日進んで月曜日
			var i=0;loop=0;
			while(i<1){
				if(loop>41){
					i=1;	//ループ終了時
				}else{
				//alert(moment(now_syu).diff(now_day, 'days')+"  "+now_syu.format("DD"));
				//alert("処理中の日"+now_syu.format("MM/DD")+"  現在日"+moment("00:00:00","HH:mm:ss").format("MM/DD")+"  差日"+moment(now_syu).diff(now_day, 'days'))
					if(now_syu.format("ddd") != '月' && now_syu.format("ddd") != '火' && now_syu.format("MM/DD") == now_day.format("MM/DD") ){
						$('#min_calender ul').append('<li class="now_day" data="'+now_syu.format("MM月DD日")+'">'+
						'<div onclick="calender_page(0,'+moment(now_syu).diff(moment("00:00:00","HH:mm:ss"), 'days')+')">'+now_syu.format('DD')+'</div>'+'</li>');
					}else if(now_syu.format("ddd") != '月' && now_syu.format("ddd") != '火' && now_syu.format("MM月") == moment().add(opsion_c,'days').format("MM月")){
						$('#min_calender ul').append('<li data="'+now_syu.format("MM月DD日")+'">'+
						'<div onclick="calender_page(0,'+moment(now_syu).diff(moment("00:00:00","HH:mm:ss"), 'days')+')">'+now_syu.format('DD')+'</div>'+'</li>');
					}else if(now_syu.format("ddd") != '月' && now_syu.format("ddd") != '火'){
						$('#min_calender ul').append('<li><div>/</div></li>');
					}
				}
				loop++;
				now_syu.add(1, 'days');
			}
	}else if(opsion == 1){
		//alert(moment().day())
		$('#info_box').html('<div class="info_title">Information</div>');
		now_syu=moment().add((opsion_c*7), 'days').subtract((moment().day()-1), 'days');//今週の月曜日の日付を取得する
		$('.c_day').html('<div class="c_c_btn" onclick="calender_page(1,'+(opsion_c-1)+')">'+
		'<i class="fa fa-chevron-left" aria-hidden="true"></i></div><div>'+now_syu.add(2, 'days').format('YYYY年MM月DD日')+
		'〜'+now_syu.add(4, 'days').format('MM月DD日')+'</div><div class="c_c_btn" onclick="calender_page(1,'+(opsion_c+1)+')">'+
		'<i class="fa fa-chevron-right" aria-hidden="true"></i></div>');
		$('#table_base').html('<table class="weekly_table"><tr>'+
			'<th class="w_th_time">時間</th></table>');
			now_syu.add(-6, 'days');
			for(var i=0; i<7;i++){
				if(now_syu.format("ddd") !='月' && now_syu.format("ddd") !='火'){
					$('#table_base table tr').append('<th class="w_th0'+i+'">'+moment(now_syu).format("MM月DD日(ddd)")+'</th>');
				}
					now_syu.add(1, 'days');
			}
	}else if(opsion == 2){
		now_syu=moment().add((opsion_c),'months').subtract((moment().day()-1), 'days');//今週の月曜日の日付を取得する
		$('.c_day').html('<div class="c_c_btn" onclick="calender_page(2,'+(opsion_c-1)+')()"><i class="fa fa-chevron-left" aria-hidden="true"></i></div><div>'+now_syu.format('YYYY年MM月')+
		'</div><div class="c_c_btn" onclick="calender_page(2,'+(opsion_c+1)+')"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>');
		$('#table_base').html('<div class="calender_mot mot_title"><h2>'+now_syu.format("MM月")+'</h2></div><ul id="mot_tablel" class="cf"></ul>');
	}else if(opsion == 3){
		now_syu=moment().add((opsion_c),'months').subtract((moment().day()-1), 'days');//今週の月曜日の日付を取得する
		$('.c_day').html('<div class="c_c_btn" onclick="calender_page(3,'+(opsion_c-1)+')()"><i class="fa fa-chevron-left" aria-hidden="true"></i></div><div>'+
		now_syu.format('YYYY年MM月')+'〜'+now_syu.add(3,'months').format('MM月')+'</div><div class="c_c_btn" onclick="calender_page(3,'+(opsion_c+1)+')"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>');
		now_syu.add(-3,'months');
		$('#table_base').html(
			'<ul id="mot_tablel_0" class="cf"><div class="calender_mot"><h2>'+now_syu.format("MM月")+'</h2></div></ul>'+
			'<ul id="mot_tablel_1" class="cf"><div class="calender_mot"><h2>'+now_syu.add((1),'months').format("MM月")+'</h2></div></ul>'+
			'<ul id="mot_tablel_2" class="cf"><div class="calender_mot"><h2>'+now_syu.add((1),'months').format("MM月")+'</h2></div></ul>'+
			'<ul id="mot_tablel_3" class="cf"><div class="calender_mot"><h2>'+now_syu.add((1),'months').format("MM月")+'</h2></div></ul>'
			);
		now_syu.add(-3,'months');
	}
	
	
	
	ncmb.DataStore("Reservation").order("reservation",false).limit(1000).fetchAll()
	.then(function(reservation_ob) {
		//渋滞チェック用
		over_time=[];time_list=[];
		
		//日別表示ここから
		for(i=0;i<reservation_ob.length;i++){
			r_data=reservation_ob[i];
			if(opsion==0){
				res_time = moment(r_data.reservation).format('HH:mm');
				objectId=r_data.objectId;
				status=r_data.status;
				kategori=r_data.sinri_check;
				menu=r_data.sick_name;
				ex1=r_data.sinri_list0;
				ex2=r_data.sinri_list1;
				check_deta=r_data.new_check;
				name=r_data.name;
				id=r_data.karte;
				bikou=r_data.bikou;
				
				sick_number = $.inArray(menu, sick_list)+1;
				if(sick_number < 1){sick_number="---"}
				else{
					sick_number= "("+("0" + sick_number).slice(-2)+")";
				}
				s_list=['予約中','受付済み','会計済み','変更'];
				s_select=0;
				for (s=0;s<s_list.length;s++){
					if(status == s_list[s]){s_select=s;};
				}
				if(moment(r_data.reservation).format('MMDD')==now_day.format('MMDD')){
				
				$('.not_deta_line').hide();
				$('#table_base table ')
					.append('<tr class="put_line"><td class="dey_td_01">'+res_time+'</td><td class="dey_td_02">'+name+'【'+check_deta+'】</td><td class="dey_td_03">'+id+'</td>'+
					'<td class="dey_td_04"><select name="select_status" id="'+objectId+'"><option value="予約中">予約中</option><option value="受付済み">受付済み</option>'+
					'<option value="診療中">診療中</option><option value="会計済み">会計済み</option><option value="キャンセル">キャンセル</option>'+
					'</td><td class="dey_td_05">'+kategori+'</td><td class="dey_td_06">'+sick_number+'</td><td class="dey_td_07">'+ex2+'</td><td class="dey_td_08">'+ex1+'</td><td class="dey_td_09">'+bikou+'</td></tr>');
				
				$('[name=select_status]'+'#'+objectId).val(status);
				if(i == (reservation_ob.length-1)){
					$('#table_base .res_time').each(function(){
				        if($(this).text().indexOf('10:15') != -1){
				            //$(this).css('background-color','#4d3');
				        }else {
				            //$(this).css('background-color','#aef');
				        }
	    			});
					//alert("読み込み終了")
					
				}
				}
				if(moment(r_data.reservation).format('MMDD')==moment().format('MMDD')){
					if(r_data.status == "診療中"){
						//	$('#info_box').append('<div class="info_deta cf"><span class="time">'+moment().format("YYYY年MM月DD日")+'</span>'+
						//	'<span class="message">'+r_data.name+'さんは診療から３０分以上の時間がすぎています。</span><span class="data">'+
						//	moment(r_data.reservation).format("YYYY年DD日 HH:mm")+'の予約</span></div>');
						
					}else if(r_data.status == "受付済み"){
						if(moment(r_data.updateDate)<=moment().add(1,'minutes')){
							$('#info_box').append('<div class="info_deta cf"><span class="time">'+moment().format("YYYY年MM月DD日")+'</span>'+
							'<span class="message">'+r_data.name+'さんは受付から1分以上の時間がすぎています。</span><span class="data">'+
							moment(r_data.updateDate).format("HH:mm")+'に受付</span></div>');
						}else{
							//alert("すぎてない"+moment(r_data.reservation).format())
						}
					}else if(r_data.status == "予約中"){
						if(moment(r_data.reservation)<=moment()){
						//	$('#info_box').append('<div class="info_deta cf"><span class="time">'+moment().format("YYYY年MM月DD日")+'</span>'+
						//	'<span class="message">'+r_data.name+'さんの予約時刻がすぎています。</span><span class="data">'+
						//	moment(r_data.reservation).format("YYYY年DD日 HH:mm")+'の予約</span></div>');
						}else{
							//alert("すぎてない"+moment(r_data.reservation).format())
						}
					}
				}
			//日別表示ここまで
			}
		}//予約読み込みループ
				  $('[name=select_status]').change(function() {
				  		sele_val=$(this).val();
						ncmb.DataStore("Reservation").equalTo('objectId',this.id).limit(1000).fetch()
						.then(function(Reservation_data) {
							alert2('変更',moment().format("HH:mm")+Reservation_data.name+'さんのステータスが'+sele_val+'になりました');
							Reservation_data.set('status',sele_val).update();
							calender_page(0,opsion_c);
						});
				  	 //alert(this.id);
					});
		
		//週別表示
		if(opsion==1){
			//週間カレンダーは1.openとclozeから時間のリスト作成,2.データループで時間リストを参考にして時間別データに２種類カウント入れ込みしていく,3.出力
			
			now_syu.add(-7, 'days');
			//開始時刻と終了時刻を取得して時間差分周回させる
			open_time_syu=moment(open_time,"HH:mm");
			syu_data=[];time_list=[];
			
			//時間リスト作成
			var i = 0; var time_longer=0;
			while(i < 1){
				//alert(open_time.format("HH時mm分"));
				if(open_time_syu.format("HH:mm")==close_time){i=1}
				push_data=[open_time_syu.format("HH:mm"),0,0];
				time_list.push(push_data);
				$('#table_base table').append(
					'<tr><td>'+open_time_syu.format("HH:mm")+'</td>'+
					'<td><div>心理診療…<span class="sinri">0</span></div><div>心理以外…<span class="singai">0</span></div></td>'+
					'<td><div>心理診療…<span class="sinri">0</span></div><div>心理以外…<span class="singai">0</span></div></td>'+
					'<td><div>心理診療…<span class="sinri">0</span></div><div>心理以外…<span class="singai">0</span></div></td>'+
					'<td><div>心理診療…<span class="sinri">0</span></div><div>心理以外…<span class="singai">0</span></div></td>'+
					'<td><div>心理診療…<span class="sinri">0</span></div><div>心理以外…<span class="singai">0</span></div></td>'+
					'</tr>');
				open_time_syu.add(15,'minutes');
				time_longer++;
			}
			
			//週データ作成 [日付,心理,心理外] x7
			for(ss=0;ss<7;ss++){
					if(now_syu.format("ddd") !='月' && now_syu.format("ddd") !='火'){
						syu_data.push([now_syu.format("MM月DD日"),time_list]);
					}
				now_syu.add(1, 'days');
			}
			for(i=0;i<reservation_ob.length;i++){
				r_data=reservation_ob[i];
				res_time = moment(r_data.reservation).format('HH:mm');
				res_day = moment(r_data.reservation).format('MM月DD日');
				kategori=r_data.sinri_check;
				
				for(d=0;d<syu_data.length;d++){
					if(syu_data[d][0] == res_day){
					for(s=0;s<time_list.length;s++){
							if(res_time == time_list[s][0]){
								if(kategori=="心理診療"){
									syu_data[d][1][s][1]++;
									//alert(syu_data[d][1][s][1])
									//alert(syu_data[d][0]+'('+d+'番め)'+time_list[s]+'時('+s+'番め)'+kategori)
									tr_c=s+1;td_c=d+1;
									moto=$('#table_base table tr:eq('+tr_c+') td:eq('+td_c+') .sinri').text();
									moto=Number(moto)+1;
									$('#table_base table tr:eq('+tr_c+') td:eq('+td_c+') .sinri').html(moto);
									//alert(moto)
								}else if(kategori=="心理以外"){
									syu_data[d][1][s][2]++;
									//alert(syu_data[d][1][s][2])
									//alert(syu_data[d][0]+'('+d+'番め)'+time_list[s]+'時('+s+'番め)'+kategori)
									tr_c=s+1;td_c=d+1;
									moto=$('#table_base table tr:eq('+tr_c+') td:eq('+td_c+') .singai').text();
									moto=Number(moto)+1;
									$('#table_base table tr:eq('+tr_c+') td:eq('+td_c+') .singai').html(moto);
								}
							}
						}
					}
				}
				//データラスト
				if(i == (reservation_ob.length-1)){
					//休診時間リスト
					kyusin_list=[[2,1],[3,1],//水・木9:30~9:45
								[2,2],[3,2],//水・木9:45~10:00
								[4,13],[4,14],[4,15],[4,16],[4,17],[4,18],[4,19],[4,20],[4,21],[4,22],
								[4,23],[4,24],[4,25],[4,26],[4,27],[4,28],[4,29],[4,30],[4,31],
								[4,32],[4,33],[4,34],[4,35],[4,36],[4,37],[4,38],[4,39],[4,40],
								[4,41],[4,42],[4,43],//金曜日の午後
								[1,13],[1,14],[1,15],[1,16],[1,17],[1,18],[1,19],[1,20],//日曜日の午後
								[5,13],[5,14],[5,15],[5,16],[5,17],[5,18],[5,19],[5,20],//土曜日の午後
								[1,37],[1,38],[1,39],[1,40],[1,41],[1,42],[1,43],//日曜日の終
								[5,37],[5,38],[5,39],[5,40],[5,41],[5,42],[5,43],//土曜日の終
								[2,17],[2,18],[2,19],[2,20],[2,21],[2,22],[2,23],[2,24],[2,25],[2,26],[2,27],[2,28],//水曜日の午後
								[3,17],[3,18],[3,19],[3,20],[3,21],[3,22],[3,23],[3,24],[3,25],[3,26],[3,27],[3,28],//木曜日の午後
								[2,43],//水曜日の終
								[3,43],//木曜日の終
								];
					for (t=0;t<=kyusin_list.length;t++){
						$('#table_base table tr:eq('+kyusin_list[t][1]+') td:eq('+kyusin_list[t][0]+')').html("");
						$('#table_base table tr:eq('+kyusin_list[t][1]+') td:eq('+kyusin_list[t][0]+')').addClass("kyusin");
					}
					$('[id=dede]').each(function(){
						if($(this).attr('data')==4865){
							$(this).hide();
						}
					});
					$('#table_base td div').each(function(){
				        if($(this).text().endsWith('…0')){
				            $(this).css('color','#000');
				        }else {
				            //$(this).css('color','#aef');
				        }
	    			});
					//alert("読み込み終了")
					
				}
			}
			//週別表示ここまで
		}
		
		//月別表示
		if(opsion==2){
			now_syu=moment('01日','DD日').add(opsion_c,'months');//計算中の月の１日を取得する
			now_syu=moment(now_syu).subtract(((moment('01日','DD日').add(opsion_c,'months').day())-1), 'days');//１日から曜日を合わせる
			var i=0;var sinri_c=0;var sinri_n=0;loop=0;
			while(i<1){
					
				//ループ終了時
				if(loop>41){
					i=1;
					$('#table_base ul li div').each(function(){
				        if($(this).text().endsWith('…0')){
				            $(this).css('color','#000');
				        }else {
				            //$(this).css('color','#aef');
				        }
					});
				}else{
						if(now_syu.format("ddd") != '月' && now_syu.format("ddd") != '火' && now_syu.format("MM月") == moment().add(opsion_c,'months').format("MM月")){
							$('#table_base ul').append('<li deta='+now_syu.format("MM月DD日")+'>'+
							'<div class="day_title">'+now_syu.format('MM月DD日(ddd)')+'</div>'+
							'<div class="months_day_box">心理診療…<span class="sinri0">0</span><br>'+
							'心理以外…<span class="singai0">0</span></div>'+
							'<div class="months_day_box">心理診療…<span class="sinri1">0</span><br>'+
							'心理以外…<span class="singai1">0</span></div></li>');
						}else if(now_syu.format("ddd") != '月' && now_syu.format("ddd") != '火'){
							$('#table_base ul').append('<li class="mot_aut" deta='+now_syu.format("MM月DD日")+'>'+
							'<div class="day_title">'+now_syu.format('MM月DD日(ddd)')+'</div>'+
							'<div class="months_day_box">心理診療…<span class="sinri0">0</span><br>'+
							'心理以外…<span class="singai0">0</span></div>'+
							'<div class="months_day_box">心理診療…<span class="sinri1">0</span><br>'+
							'心理以外…<span class="singai1">0</span></div></li>');
						}
				}
				loop++;
				now_syu.add(1, 'days');
			}
			for(d=0;d<reservation_ob.length;d++){
				r_data=reservation_ob[d];
				res_time = moment(r_data.reservation).format('HH:mm');
				res_day = moment(r_data.reservation).format('MM月DD日');
				res_day_s = moment(r_data.reservation).format('YYYY年MM月');
				kategori=r_data.sinri_check;
				if(kategori=="心理診療"){kategori='sinri'}else if(kategori=="心理以外"){kategori="singai"}
				if(res_time <=moment('12:00','HH:mm').format('HH:mm')){kategori=kategori+"0"}else{kategori=kategori+"1"}
				
				if(res_day_s =moment().format('YYYY年MM月')){
	    			
					$('#table_base ul li span').each(function(){
						//alert($(this).attr('deta'))
				        if($(this).parent().parent().attr('deta')==res_day){
				            $(this).parent().css('color','#000');
				            if($(this).attr('class')==kategori){
				            	moto=$(this).html();
								moto=Number(moto)+1;
				            	$(this).html(moto);
				            }
				        }else {
				            //$(this).css('color','red');
				        }
	    			});
				}
			}
			
			//週別表示ここまで
		}
		//４ヶ月別表示
		if(opsion==3){
			for(yonwaku=0;yonwaku<4;yonwaku++){
			now_syu=moment('01日','DD日').add((opsion_c+yonwaku),'months');//月の日曜日の日付を取得する
			now_syu=moment(now_syu).subtract(((moment('01日','DD日').add(opsion_c,'months').day())-1), 'days');//１日から曜日を合わせる
			var i=0;var sinri_c=0;var sinri_n=0;loop=0;
			while(i<1){
					
					//ループ終了時
					if(loop>41){
						i=1;
						$('#table_base #mot_tablel_'+yonwaku+' li div').each(function(){
						if($(this).text().endsWith('…0')){
								$(this).css('color','#000');
							}else {
								//$(this).css('color','#aef');
						}
						});
					}else{
							if(now_syu.format("ddd") != '月' && now_syu.format("ddd") != '火' && now_syu.format("MM月") == moment().add((opsion_c+yonwaku),'months').format("MM月")){
								$('#table_base #mot_tablel_'+yonwaku).append('<li deta='+now_syu.format("MM月DD日")+'>'+
								'<div class="day_title">'+now_syu.format('MM月DD日(ddd)')+'</div>'+
								'<div class="months_day_box">心理診療…<span class="sinri0">0</span><br>'+
								'心理以外…<span class="singai0">0</span></div>'+
								'<div class="months_day_box">心理診療…<span class="sinri1">0</span><br>'+
								'心理以外…<span class="singai1">0</span></div></li>');
							}else if(now_syu.format("ddd") != '月' && now_syu.format("ddd") != '火'){
								$('#table_base #mot_tablel_'+yonwaku).append('<li class="mot_aut" deta='+now_syu.format("MM月DD日")+'>'+
								'<div class="day_title">'+now_syu.format('MM月DD日(ddd)')+'</div>'+
								'<div class="months_day_box">心理診療…<span class="sinri0">0</span><br>'+
								'心理以外…<span class="singai0">0</span></div>'+
								'<div class="months_day_box">心理診療…<span class="sinri1">0</span><br>'+
								'心理以外…<span class="singai1">0</span></div></li>');
							}
					}
					loop++;
					now_syu.add(1, 'days');
			}
			for(d=0;d<reservation_ob.length;d++){
				r_data=reservation_ob[d];
				res_time = moment(r_data.reservation).format('HH:mm');
				res_day = moment(r_data.reservation).format('MM月DD日');
				res_day_s = moment(r_data.reservation).format('YYYY年MM月');
				kategori=r_data.sinri_check;
				if(kategori=="心理診療"){kategori='sinri'}else if(kategori=="心理以外"){kategori="singai"}
				if(res_time <=moment('12:00','HH:mm').format('HH:mm')){kategori=kategori+"0"}else{kategori=kategori+"1"}
				
				if(res_day_s =moment().format('YYYY年MM月')){
					$('#table_base #mot_tablel_'+yonwaku+' li span').each(function(){
						//alert($(this).attr('deta'))
				        if($(this).parent().parent().attr('deta')==res_day){
				            $(this).parent().css('color','#000');
				            if($(this).attr('class')==kategori){
				            	moto=$(this).html();
								moto=Number(moto)+1;
				            	$(this).html(moto);
				            }
				        }else {
				            //$(this).css('color','red');
				        }
	    			});
				}
			}
			
			//４ヶ月別表示ここまで
			now_syu.add(-1,'months')
		}
		}
	});
		
}//カレンダー
function patient_list_page(){
	$.mobile.changePage('#TopPage');
	menu_push(4);
	$('.container').html('');
	$('.container')
		.append('<h2 class="title01">登録患者一覧</h2>')
		.append('<div class="tab_put">')
		.append('</div>')
		.append('<div class="resultbox"></div>');
		for (i=0; i<sick_list.length;i++){
			$('.container .sick_list').append('<option value="'+sick_list[i]+'">'+sick_list[i]+'</option>');
		}
		for (i=0; i<sinri_list.length;i++){
			$('.container .sinri_list').append('<option value="'+sinri_list[i]+'">'+sinri_list[i]+'</option>');
		}
		ncmb.DataStore("UserData").order('createDate',true).limit(1000).fetchAll()
		.then(function(user_ob) {
			$('.resultbox').html('')
			.append('<form class="form">')
			.append('<div class="form-group"><div class="formInput2"><h3>予約する患者のカルテNo.またはお名前で検索してください。</h3>')
			.append('<label class="label1">カルテNo.</label> <input id="in_id" type="search" name="id" placeholder="カルテNo.">')
			.append('<label class="label1">お名前</label><input id="in_name" type="search" name="search_name" placeholder="お名前">')
			.append('<input type="submit" name="submit" value="検索" onclick="search_btn()"></div>')
			.append('<h3>登録患者一覧(登録順)</h3><table id="patient_list"><tr class="show"><th>カルテNo.</th><th>患者名</th><th>生年月日</th><th>電話番号</th>'+
			'<th>来院履歴</th><th>患者情報編集</th></tr></table><div id="rireki_box"></div><div id="edit_box"></div>');
			for(i=0; i<user_ob.length;i++){
				user_data=user_ob[i];
				serchtag="'"+user_data.id+"'"+','+"'"+user_data.name+"'";
			$('.resultbox table').append('<tr><td class="id">'+user_data.id+'</td><td class="search_name">'+user_data.name+'('+user_data.furigana+')</td>'+
				'<td>'+moment(user_data.birthday).format("YYYY年MM月DD日")+'</td><td>'+user_data.tel+'</td>'+
				'<td><div class="rireki_btn" onclick="rireki_push('+"'"+user_data.name+"'"+')">履歴</div></td><td><div class="edit_btn" onclick="user_edit('+"'"+user_data.objectId+"'"+')">編集</div></td></td>');
			}
			
			//ユーザ名検索システム
			$('#in_name').on('keyup', function(){Search($(this).val());});
			function Search(keyword) {
				var regExp = new RegExp(keyword);
				$('.resultbox table').find('tr').hide().each(function(){
					var tr = $(this);
					$(this).find('.search_name').each(function(){
						if ($(this).text().match(regExp)) {
							tr.show();
							$('.show').show();
						}
					});
				});
			}
			//ユーザ番号検索システム
			$('#in_id').on('keyup', function(){Search2($(this).val());});
			function Search2(keyword) {
				var regExp = new RegExp(keyword);
				$('.resultbox table').find('tr').hide().each(function(){
					var tr = $(this);
					$(this).find('.id').each(function(){
						if ($(this).text().match(regExp)) {
							tr.show();
							$('.show').show();
						}
					});
			    });
			}//〜〜〜検索システム〜〜〜
		});
}
function rireki_push(id){
	ncmb.DataStore("Reservation").order("reservation",false).equalTo('name',id).limit(1000).fetchAll()
	.then(function(reservation_ob) {
		//alert(reservation_ob.length+"件")
		if(reservation_ob.length!=0){
			$('#rireki_box').html('<div class="rireki_title_line"><span class="rireki_name">患者名：'+reservation_ob[reservation_ob.length-1].name+
			'('+reservation_ob[reservation_ob.length-1].furigana+')</span>カルテNo.：<span class="rireki_karte">'+reservation_ob[reservation_ob.length-1].karte+'</span>'+
			'の来院履歴</div>'+
			'<table class="rireki_table"></table>');
			$('#rireki_box table')
				.append('<tr class="rireki_th_line"><th class="lireki_th01">来院日</th><th class="lireki_th02">カテゴリー</th>'+
				'<th class="lireki_th03">診療メニュー</th><thlireki_th04">備考</th></tr>');
		}else{
			$('#rireki_box').html('')
		}
		for(i=0;i<reservation_ob.length;i++){
			r_deta=reservation_ob[i];
			$('#rireki_box table').append(
				'<tr class="rireki_td_line">'+
				'<td class="rireki_td01">'+moment(r_deta.reservation).format('YYYY年MM月DD日')+'</td>'+
				'<td class="rireki_td02">'+r_deta.sick_name+'</td>'+
				'<td class="rireki_td03">'+r_deta.sinri_check+'</td>'+
				'<td class="rireki_td04">'+r_deta.bikou+'</td>'+
				'</tr>');
		}
	});
}
function user_edit(objectId){
	$('#edit_box').html('');
	$('#edit_box')
		.append('<h2 class="title02"></h2>')
		.append('<form class="form">')
		.append('<div class="form-group">')
		.append('<label class="label1">お名前</label><div class="formInput"><input type="text" name="name" placeholder="お名前" required></div>')
		.append('<label class="label1">ふりがな</label><div class="formInput"><input type="text" name="furigana" placeholder="ふりがな" required></div>')
		.append('<label class="label1">電話番号</label><div class="formInput"><input type="tel" name="tel" pattern="[\u30A1-\u30F6]*" placeholder="電話番号" required></div>')
		.append('<label class="label1">カルテ番号</label><div class="formInput"><input type="text" name="karte" placeholder="カルテ番号" required></div>')
		.append('<label class="label1">生年月日</label>'+
			'<div class="selectWrap"><select name="bday-year" autocomplete="bday-year" class="new_yer"></div><option selected="">----</option></select><label>年</label>'+
			'<select name="bday-month" autocomplete="bday-month" class="new_mot"><option selected="" value="1">1</option></select><label>月</label>'+
			'<select name="bday-day" autocomplete="bday-day" class="new_day"><option selected="" value="1">1</option></select><label>日</label>'+
			'</div></div>')
		.append('<div class="form-group"><div class="btnWrap"><button type="reset" class="resetBtn" onclick="user_edeit_can()">キャンセル</button>'+
				'<button type="submit" class="btn" onclick="user_edeit_cheng('+"'"+objectId+"'"+')">変更する</button></div></div>')
		.append('<div class="form-group"><div class="btnWrap">'+
		'<button type="submit" class="btn_red " onclick="user_edeit_delete('+"'"+objectId+"'"+')">この患者情報を削除する</button></div></div>')
		.append('</form> ')
		.append('')
		.append('');
		now_yer = moment().format('YYYY');
		for(i=now_yer; i>1949; i--){
			$('#edit_box .new_yer').append('<option value="'+i+'">'+i+'</option>');
		}
		for(i=2; i<13; i++){
			i2= ("0" + i).slice(-2);
			$('#edit_box .new_mot').append('<option value="'+i2+'">'+i+'</option>');
		}
		for(i=2; i<32; i++){
			i2= ("0" + i).slice(-2);
			$('#edit_box .new_day').append('<option value="'+i2+'">'+i+'</option>');
		}
		$('#edit_box .new_mot').change(function(){
			var c_mot = $(this).val();
			new_mot_day = moment('2017-'+c_mot+'-01').daysInMonth(); // 30
			$('#edit_box .new_day').html('<option selected="" value="1">1</option>');
			for(i=2; i<(new_mot_day+1); i++){
				$('#edit_box .new_day').append('<option value="'+i+'">'+i+'</option>');
			}
			//alert(new_mot_day)
		});
	ncmb.DataStore("UserData").equalTo('objectId',objectId).limit(1000).fetch()
	.then(function(UserData_ob) {
		//フォームに検索結果の情報を反映
		$('.title02').html(UserData_ob.name+"さんの患者情報変更");
		$('[name="name"]').val(UserData_ob.name)
		$('[name="furigana"]').val(UserData_ob.furigana)
		$('[name="tel"]').val(UserData_ob.tel)
		$('[name="karte"]').val(UserData_ob.id)
		$('#edit_box .new_yer').val(moment(UserData_ob.birthday).format("YYYY"));
		$('#edit_box .new_mot').val(moment(UserData_ob.birthday).format("MM"));
		$('#edit_box .new_day').val(moment(UserData_ob.birthday).format("DD"));
	});
}
function user_edeit_cheng(objectId){
	add_name = $('[name="name"]').val()
	add_furigana=$('[name="furigana"]').val()
	add_tel=$('[name="tel"]').val()
	add_id=$('[name="karte"]').val()
	add_yer=$('#edit_box .new_yer').val();
	add_mot=$('#edit_box .new_mot').val();
	add_day=$('#edit_box .new_day').val();
	ncmb.DataStore("UserData").equalTo('objectId',objectId).limit(1000).fetch()
	.then(function(UserData_ob) {
		ons.notification.confirm({
			title: '確認',message: UserData_ob.name+"さんの情報を変更しますか？",
			buttonLabels: ['キャンセル', '決定'],animation: 'default',cancelable: true,
			callback: function(index) {if(index == 1) {
				UserData_ob
					.set("name", add_name)
					.set("furigana", add_furigana)
					.set("tel", add_tel)
					.set("id", add_id)
					.set("birthday", moment(add_yer+'-'+add_mot+'-'+add_day).format())
					.update().then(function(UserData_ob) {
						alert2('変更完了','患者データが更新されました');
						patient_list_page()
					});;
			}}
		});
	});
}
function user_edeit_can(){
	$('#edit_box').html('');
}
function user_edeit_delete(objectId){
	ncmb.DataStore("UserData").equalTo('objectId',objectId).limit(1000).fetch()
	.then(function(UserData_ob) {
		ons.notification.confirm({
			title: "確認",
			message:UserData_ob.name+'さんのデータを完全に削除してもよろしいですか？', 
			buttonLabels: ['キャンセル', '削除する'],
			animation: 'default',
			cancelable: true,
			callback: function(index) {
			if(index == 1) {
				UserData_ob.delete().then(function(UserData_ob) {
					alert2('削除完了','患者データが削除されました');
					patient_list_page()
				});
			}}
		});
	});
}
function master_list(){
	$.mobile.changePage('#TopPage');
	menu_push(5);
	$('.container').html('');
	$('.container')
		.append('<h2 class="title01">管理者一覧</h2>')
		.append('<div class="tab_put"></div>')
		.append('<div class="resultbox"></div>')
		.append('<h2 class="title01">インフォメーション管理</h2>')
		.append('<div id="info_menu"></div>')
		.append('<div id="info_resultbox"></div>');
		
		ncmb.User.order('createDate',true).limit(1000).fetchAll()
		.then(function(user_ob) {
			$('.resultbox').html('')
			.append('<form class="form">')
			.append('<div class="form-group"><div class="formInput2">')
			.append('<table id="master_list"><tr class="show"><th>権限</th><th>管理者名</th><th>パスワード</th><th>アカウント作成日</th>'+
			'<th>削除</th></tr></table><button type="submit" class="btn" onclick="add_master()">管理者の追加</button><div id="rireki_box"></div><div id="add_box"></div>');
			for(i=0; i<user_ob.length;i++){
				user_data=user_ob[i];
				serchtag="'"+user_data.course+"'"+','+"'"+user_data.userName+"'";
			$('.resultbox table').append('<tr><td class="id">'+user_data.course+'</td><td class="search_name">'+user_data.userName+'</td>'+
				'<td>'+user_data.pass+'</td><td>'+moment(user_data.createDate).format("YYYY年MM月DD日")+'</td>'+
				'<td><div class="dlete_btn" onclick="master_delete('+"'"+user_data.objectId+"'"+')">削除</div></td></td>');
			}
		});
		ncmb.DataStore("Info").limit(1000).fetchAll()
		.then(function(Info_ob) {
			$('#info_menu').html('')
			if(Info_ob.length>=1){
				$('#info_menu').append('<table><tr><th>メッセージ</th><th>表示/非表示</th><th>作成日</th><th>削除</th></tr></table>');
			}
			for(i=0;i<Info_ob.length;i++){
				info_deta=Info_ob[i];
				$('#info_menu table').append('<tr><td>'+info_deta.message+'</td><td>'+
				'<select name="status" id="'+info_deta.objectId+'"><option val="非表示">非表示</option><option selected="" val="表示">表示</option></select>'+
				'</td><td>'+moment(info_deta.createDate).format("YYYY年MM月DD日")+'</td>'+
				'<td><div class="dlete_btn" onclick="info_delete('+"'"+info_deta.objectId+"'"+')">削除</div></td></tr>')
				$('#info_menu #'+info_deta.objectId).val(info_deta.status)
			}
			$('#info_menu').append('<button type="submit" class="btn" onclick="add_info()">インフォメーションの追加</button>');
			$('#info_menu [name=status]').change(function() {
				sele_val=$(this).val();
				ncmb.DataStore("Info").equalTo('objectId',this.id).limit(1000).fetch()
				.then(function(info_data) {
					alert2('ステータス変更',sele_val+'にしました。 ');
					info_data.set('status',sele_val).update();
				});
			});
		});
		
}
function add_master(opsion){
	$('#add_box').html('');
	$('#add_box')
		.append('<h2 class="title01">新規管理者登録</h2>')
		.append('<form class="form">')
		.append('<div class="form-group"><label class="label1">お名前</label><div class="formInput"><input type="text" name="name" placeholder="お名前" required></div></div>')
		.append('<div class="form-group"><label class="label1">パスワード</label><div class="formInput"><input type="text" name="pass" placeholder="password" required></div></div>')
		.append('<div class="form-group"><label class="label1">権限</label>'+
				'<select name="mastre_class" autocomplete="mastre_class" class="mastre_class"><option val="管理者">管理者</option><option selected="" val="スタッフ">スタッフ</option></select></div>')
		.append('<div class="form-group"><div class="btnWrap"><button type="reset" class="resetBtn" onclick="add_master()">リセット</button>'+
				'<button type="submit" class="btn" onclick="add_mester_push()">登録する</button></div></div>')
		.append('</form> ');
}//新規患者登録
function add_info(){
	$('#info_resultbox').html('');
	$('#info_resultbox')
		.append('<h2 class="title01">新規インフォメーション</h2>')
		.append('<form class="form">')
		.append('<div class="form-group"><label class="label1">メッセージ</label><div class="formInput"><input type="text" name="message" placeholder="メッセージ" required></div></div>')
		.append('<div class="form-group"><label class="label1">すぐに表示するかどうか</label>'+
				'<select name="status" autocomplete="mastre_class" class="mastre_class"></div><option val="非表示">非表示</option><option selected="" val="表示">表示</option></select>')
		.append('<div class="form-group"><div class="btnWrap"><button type="reset" class="resetBtn" onclick="add_master()">リセット</button>'+
				'<button type="submit" class="btn" onclick="add_info_push()">登録する</button></div></div>')
		.append('</form> ');
}//新規インフォ登録
function add_mester_push(){
	username = $('[name="name"]').val();
	pass = $('[name="pass"]').val();
	course = $('[name="mastre_class"]').val();
	
	var acl = new ncmb.Acl();
	acl.setPublicReadAccess(true); //全員への読み込み権限を許可
	acl.setPublicWriteAccess(true); //全員への書き込み権限を許可
	var user = new ncmb.User();
	user.set("userName", username)
		.set("password", pass)
		.set("pass", pass)
		.set("course", course)
		.set("acl",acl); // aclを設定
	// 任意フィールドに値を追加 
	user.signUpByAccount()
		.then(function(user) {
			alert2('登録完了',username+"さんの登録が完了しました。");
		}).catch(function(err){ // エラー処理
			alert(err);
		});
}
function add_info_push(){
	message = $('[name="message"]').val();
	status = $('[name="status"]').val();
	
	var Info = ncmb.DataStore("Info");
	var info = new Info();
	info.set("message", message)
		.set("status", status)
		.save()
		.then(function(oshirase){
			alert2('登録完了',"インフォメーションの登録が完了しました。");
			master_list();
		});
}
function master_delete(objectId){
	ncmb.User.equalTo('objectId',objectId).limit(1000).fetch()
	.then(function(UserData_ob) {
		ons.notification.confirm({
			title: "確認",
			message:UserData_ob.userName+'さんのデータを完全に削除してもよろしいですか？', 
			buttonLabels: ['キャンセル', '削除する'],
			animation: 'default',
			cancelable: true,
			callback: function(index) {
			if(index == 1) {
				UserData_ob.delete().then(function(UserData_ob) {
					alert2('削除完了','患者データが削除されました');
					master_list();
				});
			}}
		});
	});
}
function info_delete(objectId){
	ncmb.DataStore("Info").equalTo('objectId',objectId).limit(1000).fetch()
	.then(function(info_deta) {
		ons.notification.confirm({
			title: "確認",
			message:moment(info_deta.createDate).format("YYYY年MM月DD日")+'のインフォメーションデータを削除してもよろしいですか？', 
			buttonLabels: ['キャンセル', '削除する'],
			animation: 'default',
			cancelable: true,
			callback: function(index) {
			if(index == 1) {
				info_deta.delete().then(function(info_deta) {
					alert2('削除完了','インフォメーションデータが削除されました');
					master_list();
				});
			}}
		});
	});
}

































































function onLogoutBtn(){
	ons.notification.confirm({
		title: "ログアウト",
		message:'本当にログアウトしてもよろしいですか？', 
		buttonLabels: ['キャンセル', 'ログアウト'],
		animation: 'default',
		cancelable: true,
		callback: function(index) {
		if(index == 1) {
			ncmb.User.logout();
			ons.notification.alert({title:'',message:"正常にログアウトが完了しました。"});
			currentLoginUser = null;
			$.mobile.changePage('#LoginPage');
		}}
	});
}//ログアウト処理
function onReady() {
	//スタイル切り替え
	if(mode== 'pc'){
	   var style = '<link rel="stylesheet" href="css/style_pc.css">';
	    $('head link:last').after(style);
	};
	
		ons.bootstrap();
		$(".load").show();
		if(mode == "iPad"){$(".dl_btn").hide();}
	
		$('#appver').html(appname);
		$("[id=ver]").html(appname);

	//ログインログが残っていれば自動ログイン
	var currentUser = ncmb.User.getCurrentUser();
	if (currentUser) {
		var user_s_id = localStorage.getItem('user_s_id');
		var user_s_pass = localStorage.getItem('user_s_pass');
		course = currentUser.course;
		ncmb.User.login(user_s_id, user_s_pass)
		.then(function(user) {
			menupage(course);
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
	
	//高さと横取得
  hsize = $(window).height();
  wsize = $(window).width();
  $("#menu_list").css("height", hsize + "px");
  //$("[id=right_area]").css("width", "70%");
  $("[id=right_area]").css("min-height", hsize + "px");

}///// 初期読み込み
$(onReady); // on DOMContentLoaded
function alert2(title,message){
			ons.notification.alert({title:title,message:message});
}
function enter_login(){
  //EnterキーならSubmit
  if(window.event.keyCode==13)onLoginBtn();
}
            var $header = $('#top-head');
            // Nav Fixed
            $(window).scroll(function() {
                 if ($(window).scrollTop() > 350) {
                    $header.addClass('fixed');
                 } else {
                    $header.removeClass('fixed');
                }
            });
            // Nav Toggle Button
            $('#nav-toggle').click(function(){
                $header.toggleClass('open');
            });
