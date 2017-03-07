//アナリティクスページ  
function siborikomi2() {
	    

	var id_year = $("#id_year").val();
	var id_month = $("#id_month").val();
		$('#toukei_h1').html(id_year+'年'+id_month+'月分');
		$('[id=toukei_day]').html(id_year+'年'+id_month+'月分');
        
        
	$('.load').show();
	var currentUser = ncmb.User.getCurrentUser();
	if (currentUser) {
	    objectId = currentUser.get("objectId");
	}
        $('[id=load_err]').html('');
	youbi_count0 = 0;
	youbi_count1 = 0;
	youbi_count2 = 0;
	youbi_count3 = 0;
	youbi_count4 = 0;
	youbi_count5 = 0;
	youbi_count6 = 0;
	youbi_count7 = 0;
	av_money0 = 0;
	av_money1 = 0;
	av_money2 = 0;
	av_money3 = 0;
	av_money4 = 0;
	av_money5 = 0;
	av_money6 = 0;
	av_money7 = 0;
	av_money_time0 = [0,0,0];
	av_money_time1 = [0,0,0];
	av_money_time2 = [0,0,0];
	av_money_time3 = [0,0,0];
	av_money_time4 = [0,0,0];
	av_money_time5 = [0,0,0];
	av_money_time6 = [0,0,0];
	jikan_data = 0;
	
	jikan_count0 = 0;
	jikan_count1 = 0;
	jikan_count2 = 0;
	jikan_count3 = 0;
	jikan_count4 = 0;
	jikan_count5 = 0;
	jikan_count6 = 0;
	jikan_count7 = 0;
	jikan_count8 = 0;
	jikan_count9 = 0;
	jikan_count10 = 0;
	jikan_count11 = 0;
	jikan_count12 = 0;
	jikan_count13 = 0;
	jikan_count14 = 0;
	jikan_count15 = 0;
	jikan_count16 = 0;
	jikan_count17 = 0;
	jikan_count18 = 0;
	jikan_count19 = 0;
	jikan_count20 = 0;
	jikan_count21 = 0;
	jikan_count22 = 0;
	jikan_count23 = 0;
	jikan_count24 = 0;
	avjikan_money1 = 0;
	avjikan_money2 = 0;
	avjikan_money3 = 0;
	avjikan_money4 = 0;
	avjikan_money5 = 0;
	avjikan_money6 = 0;
	avjikan_money7 = 0;
	avjikan_money8 = 0;
	avjikan_money9 = 0;
	avjikan_money10 = 0;
	avjikan_money11 = 0;
	avjikan_money12 = 0;
	avjikan_money13 = 0;
	avjikan_money14 = 0;
	avjikan_money15 = 0;
	avjikan_money16 = 0;
	avjikan_money17 = 0;
	avjikan_money18 = 0;
	avjikan_money19 = 0;
	avjikan_money20 = 0;
	avjikan_money21 = 0;
	avjikan_money22 = 0;
	avjikan_money23 = 0;
	avjikan_money24 = 0;
	avjikan_time1 = [0,0,0];
	avjikan_time2 = [0,0,0];
	avjikan_time3 = [0,0,0];
	avjikan_time4 = [0,0,0];
	avjikan_time5 = [0,0,0];
	avjikan_time6 = [0,0,0];
	avjikan_time7 = [0,0,0];
	avjikan_time8 = [0,0,0];
	avjikan_time9 = [0,0,0];
	avjikan_time10 = [0,0,0];
	avjikan_time11 = [0,0,0];
	avjikan_time12 = [0,0,0];
	avjikan_time13 = [0,0,0];
	avjikan_time14 = [0,0,0];
	avjikan_time15 = [0,0,0];
	avjikan_time16 = [0,0,0];
	avjikan_time17 = [0,0,0];
	avjikan_time18 = [0,0,0];
	avjikan_time19 = [0,0,0];
	avjikan_time20 = [0,0,0];
	avjikan_time21 = [0,0,0];
	avjikan_time22 = [0,0,0];
	avjikan_time23 = [0,0,0];
	avjikan_time24 = [0,0,0];
	
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
	day_7 = 0;
		$('#day_list').html('<tr><th>日付</th><th>合計利用者数(男:女)</th><th>合計利用金額</th><th>平均利用時間</th><th>平均利用金額</th></tr>');
		$('#true_list').html('<tr><th>利用者数(男:女)</th><th>合計利用金額</th><th>平均利用時間</th><th>平均利用金額</th></tr>');

	//お知らせリスト表示
	var Admission_Log = ncmb.DataStore("Admission_Log");
	Admission_Log.limit(1000)
		.order("createDate",true)
		.fetchAll()
		.then(function(results){
		var pushlist = results.length;
		//先にリセット
		kijicount = "";
		for (var i = 0; i < results.length; i++) {
		objectId = results[i].objectId;
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
	
	//月合計を取得
	if(id_year == jikan_year && id_month ==jikan_month){
		true_count++ ;
		if(sex == "男性"){true_sex[0]++}else if(sex == "女性"){true_sex[1]++};
		true_money = true_money+money;
		true_time[0] = true_time[0] + money_time_j;
		true_time[1] = true_time[1] + money_time_f;
		true_time[2] = true_time[2] + money_time_b;
		if(i == results.length-1){
			true_time[0] = Math.floor(true_time[0]/true_count);
			true_time[1] = Math.floor(true_time[1]/true_count);
			true_time[2] = Math.floor(true_time[2]/true_count);
			$('#true_list').append('<tr><td>'+true_count+'(男:'+true_sex[0]+'/女:'+true_sex[1]+')</td><td>'+true_money.toLocaleString()+'円</td><td>'+
			true_time[0]+'時間'+true_time[1]+'分'+true_time[2]+'秒</td><td>'+Math.floor(true_money/true_count).toLocaleString()+'円</td></tr>');
		}
	}
	
	//日別集計
	if(day_data_now[0] == ymd[0] &&  day_data_now[1]+1 == ymd[1] && day_data_now[2] == ymd[2] && id_year == jikan_year && id_month ==jikan_month){
		//同日の集計データを計算
		day_count++ ;
		if(sex == "男性"){day_sex[0]++}else if(sex == "女性"){day_sex[1]++};
		day_time[0] = day_time[0] + money_time_j;
		day_time[1] = day_time[1] + money_time_f;
		day_time[2] = day_time[2] + money_time_b;
		day_money = day_money+money;
		if(day_money_h == 0){
			//alert(money+"この日のさいしょので"+day_data_now[2]);
			day_money_h = money;
			//alert(day_data_now[2]+'日の平均利用額は初期なので'+day_money_h);
			day_time_h = [money_time_j,money_time_f,money_time_b];
		}else{
			//alert(money+"全データと同じ日なので加算"+day_data_now[2]);
			day_money_h = Math.floor(day_money/day_count);
			//alert(day_data_now[2]+'日の平均利用額は'+day_money_h);
			day_time_h[0] = Math.floor(day_time[0]/day_count);
			day_time_h[1] = Math.floor(day_time[1]/day_count);
			day_time_h[2] = Math.floor(day_time[2]/day_count);
		}
		if(i == results.length-1){
		day_data[day_7] = day_count;
		day_data_money[day_7] = day_money_h/1000;
		$('#day_list').append('<tr><td>'+m.year()+'年'+m.month()+1+'月'+m.date()+'日</td><td>'+day_count+
		'(男:'+day_sex[0]+'/女:'+day_sex[1]+')</td><td>'+day_money.toLocaleString()+'円</td><td>'+day_time_h[0]+'時間'+day_time_h[1]+'分'+day_time_h[2]+'秒</td><td>'+day_money_h.toLocaleString()+'円</td></tr>');
		}
	}else if(id_year == jikan_year && id_month ==jikan_month){
		//alert(money+"新しい日"+day_data_now[2]+'ID '+objectId);
		//出力とリセット
		day_data[day_7] = day_count;
		day_data_money[day_7] = day_money_h/1000;
		day_7++;
		$('#day_list').append('<tr><td>'+m.year()+'年'+m.month()+1+'月'+m.date()+'日</td><td>'+day_count+
		'(男:'+day_sex[0]+'/女:'+day_sex[1]+')</td><td>'+day_money.toLocaleString()+'円</td><td>'+day_time_h[0]+'時間'+day_time_h[1]+'分'+day_time_h[2]+'秒</td><td>'+day_money_h.toLocaleString()+'円</td></tr>');
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
			//alert(money+"このデータの前日データが無いので日付スキップ 出力日付"+day_data_now[2]+'　データ日付'+ymd[2]+'　ID '+objectId);
			$('#day_list').append('<tr><td>'+m.year()+'年'+m.month()+1+'月'+m.date()+'日</td><td>0(NoData)</td><td>0円</td><td>0時間0分0秒</td><td>0円</td></tr>');
			m.subtract('days', 1).format();
			day_data_now =[m.year(),m.month(),m.date()];
			day_7++;
			//alert("データ無し");
		}
	}
	
	
	
	
	
	
	//曜日別集計
	//alert(money);
	if(youbi_data == "月曜日" && id_year == jikan_year && id_month ==jikan_month){
		youbi_count0++;
		if(av_money0 == 0){
			av_money0= money;
			av_money_time0 = [money_time_j,money_time_f,money_time_b];
		}else{
			av_money0= (money+av_money0)/2;
			av_money_time0[0] = (av_money_time0[0]+money_time_j)/2;
			av_money_time0[1] = (av_money_time0[1]+money_time_f)/2;
			av_money_time0[2] = (av_money_time0[2]+money_time_b)/2;
		}
	}else if(youbi_data == "火曜日" && id_year == jikan_year && id_month ==jikan_month){
		youbi_count1++;
		if(av_money1 == 0){
			av_money1= money;
			av_money_time1 = [money_time_j,money_time_f,money_time_b];
		}else{
			av_money1= (money+av_money1)/2;
			av_money_time1[0] = (av_money_time1[0]+money_time_j)/2;
			av_money_time1[1] = (av_money_time1[1]+money_time_f)/2;
			av_money_time1[2] = (av_money_time1[2]+money_time_b)/2;
		}
	}else if(youbi_data == "水曜日" && id_year == jikan_year && id_month ==jikan_month){
		youbi_count2++;
		if(av_money2 == 0){
			av_money2= money;
			av_money_time2 = [money_time_j,money_time_f,money_time_b];
		}else{
			av_money2= (money+av_money2)/2;
			av_money_time2[0] = (av_money_time2[0]+money_time_j)/2;
			av_money_time2[1] = (av_money_time2[1]+money_time_f)/2;
			av_money_time2[2] = (av_money_time2[2]+money_time_b)/2;
		}
	}else if(youbi_data == "木曜日" && id_year == jikan_year && id_month ==jikan_month){
		youbi_count3++;
		if(av_money3 == 0){
			av_money3= money;
			av_money_time3 = [money_time_j,money_time_f,money_time_b];
		}else{
			av_money3= (money+av_money3)/2;
			av_money_time3[0] = (av_money_time3[0]+money_time_j)/2;
			av_money_time3[1] = (av_money_time3[1]+money_time_f)/2;
			av_money_time3[2] = (av_money_time3[2]+money_time_b)/2;
		}
	}else if(youbi_data == "金曜日" && id_year == jikan_year && id_month ==jikan_month){
		youbi_count4++;
		if(av_money4 == 0){
			av_money4= money;
			av_money_time4 = [money_time_j,money_time_f,money_time_b];
		}else{
			av_money4= (money+av_money4)/2;
			av_money_time4[0] = (av_money_time4[0]+money_time_j)/2;
			av_money_time4[1] = (av_money_time4[1]+money_time_f)/2;
			av_money_time4[2] = (av_money_time4[2]+money_time_b)/2;
		}
	}else if(youbi_data == "土曜日" && id_year == jikan_year && id_month ==jikan_month){
		youbi_count5++;
		if(av_money5 == 0){
			av_money5= money;
			av_money_time5 = [money_time_j,money_time_f,money_time_b];
		}else{
			av_money5= (money+av_money5)/2;
			av_money_time5[0] = (av_money_time5[0]+money_time_j)/2;
			av_money_time5[1] = (av_money_time5[1]+money_time_f)/2;
			av_money_time5[2] = (av_money_time5[2]+money_time_b)/2;
		}
	}else if(youbi_data == "日曜日" && id_year == jikan_year && id_month ==jikan_month){
		youbi_count6++;
		if(av_money6 == 0){
			av_money6= money;
			av_money_time6 = [money_time_j,money_time_f,money_time_b];
		}else{
			av_money6= (money+av_money6)/2;
			av_money_time6[0] = (av_money_time6[0]+money_time_j)/2;
			av_money_time6[1] = (av_money_time6[1]+money_time_f)/2;
			av_money_time6[2] = (av_money_time6[2]+money_time_b)/2;
		}
	}
	time_b = money_time[2];
	time_f = money_time[1];
	time_j = money_time[0];
	
					//alert(avjikan_time18[1]+"+"+money_time_f+"÷２＝"+(avjikan_time18[1]+money_time_f)/2);
			if(jikan_data == 1 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count1++;
				if(avjikan_money1 == 0){
					avjikan_money1 = money;
					avjikan_time1 = [money_time_j,money_time_f,money_time_b];
				}else{
					avjikan_money1 = (money+avjikan_money1)/2;
					avjikan_time1[0] = (avjikan_time1[0]+money_time_j)/2;
					avjikan_time1[1] = (avjikan_time1[1]+money_time_f)/2;
					avjikan_time1[2] = (avjikan_time1[2]+money_time_b)/2;
				}
			}else if(jikan_data == 2 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count2++;
				if(avjikan_money2 == 0){
					avjikan_money2 = money;
					avjikan_time2 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money2 = (money+avjikan_money2)/2;
					avjikan_time2[0] = (avjikan_time2[0]+money_time_j)/2;
					avjikan_time2[1] = (avjikan_time2[1]+money_time_f)/2;
					avjikan_time2[2] = (avjikan_time2[2]+money_time_b)/2;
				}
			}else if(jikan_data == 3 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count3++;
				if(avjikan_money3 == 0){
					avjikan_money3 = money;
					avjikan_time3 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money3 = (money+avjikan_money3)/2;
					avjikan_time3[0] = (avjikan_time3[0]+money_time_j)/2;
					avjikan_time3[1] = (avjikan_time3[1]+money_time_f)/2;
					avjikan_time3[2] = (avjikan_time3[2]+money_time_b)/2;
				}
			}else if(jikan_data == 4 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count4++;
				if(avjikan_money4 == 0){
					avjikan_money4 = money;
					avjikan_time4 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money4 = (money+avjikan_money4)/2;
					avjikan_time4[0] = (avjikan_time4[0]+money_time_j)/2;
					avjikan_time4[1] = (avjikan_time4[1]+money_time_f)/2;
					avjikan_time4[2] = (avjikan_time4[2]+money_time_b)/2;
				}
			}else if(jikan_data == 5 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count5++;
				if(avjikan_money5 == 0){
					avjikan_money5 = money;
					avjikan_time5 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money5 = (money+avjikan_money5)/2;
					avjikan_time5[0] = (avjikan_time5[0]+money_time_j)/2;
					avjikan_time5[1] = (avjikan_time5[1]+money_time_f)/2;
					avjikan_time5[2] = (avjikan_time5[2]+money_time_b)/2;
				}
			}else if(jikan_data == 6 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count6++;
				if(avjikan_money6 == 0){
					avjikan_money6 = money;
					avjikan_time6 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money6 = (money+avjikan_money6)/2;
					avjikan_time6[0] = (avjikan_time6[0]+money_time_j)/2;
					avjikan_time6[1] = (avjikan_time6[1]+money_time_f)/2;
					avjikan_time6[2] = (avjikan_time6[2]+money_time_b)/2;
				}
			}else if(jikan_data == 7 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count7++;
				if(avjikan_money7 == 0){
					avjikan_money7 = money;
					avjikan_time7 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money7 = (money+avjikan_money7)/2;
					avjikan_time7[0] = (avjikan_time7[0]+money_time_j)/2;
					avjikan_time7[1] = (avjikan_time7[1]+money_time_f)/2;
					avjikan_time7[2] = (avjikan_time7[2]+money_time_b)/2;
				}
			}else if(jikan_data == 8 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count8++;
				if(avjikan_money8 == 0){
					avjikan_money8 = money;
					avjikan_time8 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money8 = (money+avjikan_money8)/2;
					avjikan_time8[0] = (avjikan_time8[0]+money_time_j)/2;
					avjikan_time8[1] = (avjikan_time8[1]+money_time_f)/2;
					avjikan_time8[2] = (avjikan_time8[2]+money_time_b)/2;
				}
			}else if(jikan_data == 9 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count9++;
				if(avjikan_money9 == 0){
					avjikan_money9 = money;
					avjikan_time9 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money9 = (money+avjikan_money9)/2;
					avjikan_time9[0] = (avjikan_time9[0]+money_time_j)/2;
					avjikan_time9[1] = (avjikan_time9[1]+money_time_f)/2;
					avjikan_time9[2] = (avjikan_time9[2]+money_time_b)/2;
				}
			}else if(jikan_data == 10 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count10++;
				if(avjikan_money10 == 0){
					avjikan_money10 = money;
					avjikan_time10 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money10 = (money+avjikan_money10)/2;
					avjikan_time10[0] = (avjikan_time10[0]+money_time_j)/2;
					avjikan_time10[1] = (avjikan_time10[1]+money_time_f)/2;
					avjikan_time10[2] = (avjikan_time10[2]+money_time_b)/2;
				}
			}else if(jikan_data == 11 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count11++;
				if(avjikan_money11 == 0){
					avjikan_money11 = money;
					avjikan_time11 = [money_time_j,money_time_f,money_time_b];
				}else{
					avjikan_money11 = (money+avjikan_money11)/2;
					avjikan_time11[0] = (avjikan_time11[0]+money_time_j)/2;
					avjikan_time11[1] = (avjikan_time11[1]+money_time_f)/2;
					avjikan_time11[2] = (avjikan_time11[2]+money_time_b)/2;
				}
			}else if(jikan_data == 12 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count12++;
				if(avjikan_money12 == 0){
					avjikan_money11 = money;
					avjikan_time11 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money11 = (money+avjikan_money11)/2;
					avjikan_time11[0] = (avjikan_time11[0]+money_time_j)/2;
					avjikan_time11[1] = (avjikan_time11[1]+money_time_f)/2;
					avjikan_time11[2] = (avjikan_time11[2]+money_time_b)/2;
				}
			}else if(jikan_data == 13 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count13++;
				if(avjikan_money13 == 0){
					avjikan_money13 = money;
					avjikan_time13 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money13 = (money+avjikan_money13)/2;
					avjikan_time13[0] = (avjikan_time13[0]+money_time_j)/2;
					avjikan_time13[1] = (avjikan_time13[1]+money_time_f)/2;
					avjikan_time13[2] = (avjikan_time13[2]+money_time_b)/2;
				}
			}else if(jikan_data == 14 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count14++;
				if(avjikan_money14 == 0){
					avjikan_money14 = money;
					avjikan_time14 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money14 = (money+avjikan_money14)/2;
					avjikan_time14[0] = (avjikan_time14[0]+money_time_j)/2;
					avjikan_time14[1] = (avjikan_time14[1]+money_time_f)/2;
					avjikan_time14[2] = (avjikan_time14[2]+money_time_b)/2;
				}
			}else if(jikan_data == 15 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count15++;
				if(avjikan_money15 == 0){
					avjikan_money15 = money;
					avjikan_time15 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money15 = (money+avjikan_money15)/2;
					avjikan_time15[0] = (avjikan_time15[0]+money_time_j)/2;
					avjikan_time15[1] = (avjikan_time15[1]+money_time_f)/2;
					avjikan_time15[2] = (avjikan_time15[2]+money_time_b)/2;
				}
			}else if(jikan_data == 16 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count16++;
				if(avjikan_money16 == 0){
					avjikan_money16 = money;
					avjikan_time16 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money16 = (money+avjikan_money16)/2;
					avjikan_time16[0] = (avjikan_time16[0]+money_time_j)/2;
					avjikan_time16[1] = (avjikan_time16[1]+money_time_f)/2;
					avjikan_time16[2] = (avjikan_time16[2]+money_time_b)/2;
				}
			}else if(jikan_data == 17 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count17++;
				if(avjikan_money17 == 0){
					avjikan_money17 = money;
					avjikan_time17 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money17 = (money+avjikan_money17)/2;
					avjikan_time17[0] = (avjikan_time17[0]+money_time_j)/2;
					avjikan_time17[1] = (avjikan_time17[1]+money_time_f)/2;
					avjikan_time17[2] = (avjikan_time17[2]+money_time_b)/2;
				}
			}else if(jikan_data == 18 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count18++;
				if(avjikan_money18 == 0){
					avjikan_money18 = money;
					avjikan_time18 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money18 = (money+avjikan_money18)/2;
					avjikan_time18[0] = (avjikan_time18[0]+money_time_j)/2;
					avjikan_time18[1] = (avjikan_time18[1]+money_time_f)/2;
					avjikan_time18[2] = (avjikan_time18[2]+money_time_b)/2;
				}
			}else if(jikan_data == 19 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count19++;
				if(avjikan_money19 == 0){
					avjikan_money19 = money;
					avjikan_time19 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money19 = (money+avjikan_money19)/2;
					avjikan_time19[0] = (avjikan_time19[0]+money_time_j)/2;
					avjikan_time19[1] = (avjikan_time19[1]+money_time_f)/2;
					avjikan_time19[2] = (avjikan_time19[2]+money_time_b)/2;
				}
			}else if(jikan_data == 20 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count20++;
				if(avjikan_money20 == 0){
					avjikan_money20 = money;
					avjikan_time20 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money20 = (money+avjikan_money20)/2;
					avjikan_time20[0] = (avjikan_time20[0]+money_time_j)/2;
					avjikan_time20[1] = (avjikan_time20[1]+money_time_f)/2;
					avjikan_time20[2] = (avjikan_time20[2]+money_time_b)/2;
				}
			}else if(jikan_data == 21 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count21++;
				if(avjikan_money21 == 0){
					avjikan_money21 = money;
					avjikan_time21 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money21 = (money+avjikan_money21)/2;
					avjikan_time21[0] = (avjikan_time21[0]+money_time_j)/2;
					avjikan_time21[1] = (avjikan_time21[1]+money_time_f)/2;
					avjikan_time21[2] = (avjikan_time21[2]+money_time_b)/2;
				}
			}else if(jikan_data == 22 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count22++;
				if(avjikan_money22 == 0){
					avjikan_money22 = money;
					avjikan_time22 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money22 = (money+avjikan_money22)/2;
					avjikan_time22[0] = (avjikan_time22[0]+money_time_j)/2;
					avjikan_time22[1] = (avjikan_time22[1]+money_time_f)/2;
					avjikan_time22[2] = (avjikan_time22[2]+money_time_b)/2;
				}
			}else if(jikan_data == 23 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count23++;
				if(avjikan_money23 == 0){
					avjikan_money23 = money;
					avjikan_time23 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money23 = (money+avjikan_money23)/2;
					avjikan_time23[0] = (avjikan_time23[0]+money_time_j)/2;
					avjikan_time23[1] = (avjikan_time23[1]+money_time_f)/2;
					avjikan_time23[2] = (avjikan_time23[2]+money_time_b)/2;
				}
			}else if(jikan_data == 24 && id_year == jikan_year && id_month ==jikan_month){
				jikan_count24++;
				if(avjikan_money24 == 0){
					avjikan_money24 = money;
					avjikan_time24 = [money_time_j,money_time_f,money_time_b];
				}else{		
					avjikan_money24 = (money+avjikan_money24)/2;
					avjikan_time24[0] = (avjikan_time24[0]+money_time_j)/2;
					avjikan_time24[1] = (avjikan_time24[1]+money_time_f)/2;
					avjikan_time24[2] = (avjikan_time24[2]+money_time_b)/2;
				}
			}

		if(sex == "男性" && id_year == jikan_year && id_month ==jikan_month){
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
		}else if(sex == "女性" && id_year == jikan_year && id_month ==jikan_month){
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
			
    }
    oshiraseDeleteLink();
	//自分のクラスに記事がない場合
	         $(".load").hide();
	         
	        $('#youbi_count0').html(youbi_count0);
	        $('#youbi_count1').html(youbi_count1);
	        $('#youbi_count2').html(youbi_count2);
	        $('#youbi_count3').html(youbi_count3);
	        $('#youbi_count4').html(youbi_count4);
	        $('#youbi_count5').html(youbi_count5);
	        $('#youbi_count6').html(youbi_count6);
	        $('#av_money0').html(Math.round(av_money0)+"円");
	        $('#av_money1').html(Math.round(av_money1)+"円");
	        $('#av_money2').html(Math.round(av_money2)+"円");
	        $('#av_money3').html(Math.round(av_money3)+"円");
	        $('#av_money4').html(Math.round(av_money4)+"円");
	        $('#av_money5').html(Math.round(av_money5)+"円");
	        $('#av_money6').html(Math.round(av_money6)+"円");
	        $('#av_time0').html(Math.round(av_money_time0[0])+"時間"+Math.round(av_money_time0[1])+"分"+Math.round(av_money_time0[2])+"秒");
	        $('#av_time1').html(Math.round(av_money_time1[0])+"時間"+Math.round(av_money_time1[1])+"分"+Math.round(av_money_time1[2])+"秒");
	        $('#av_time2').html(Math.round(av_money_time2[0])+"時間"+Math.round(av_money_time2[1])+"分"+Math.round(av_money_time2[2])+"秒");
	        $('#av_time3').html(Math.round(av_money_time3[0])+"時間"+Math.round(av_money_time3[1])+"分"+Math.round(av_money_time3[2])+"秒");
	        $('#av_time4').html(Math.round(av_money_time4[0])+"時間"+Math.round(av_money_time4[1])+"分"+Math.round(av_money_time4[2])+"秒");
	        $('#av_time5').html(Math.round(av_money_time5[0])+"時間"+Math.round(av_money_time5[1])+"分"+Math.round(av_money_time5[2])+"秒");
	        $('#av_time6').html(Math.round(av_money_time6[0])+"時間"+Math.round(av_money_time6[1])+"分"+Math.round(av_money_time6[2])+"秒");
	        
	        //グラフ用曜日別
	        av_money_time_g0 = Math.round((av_money_time0[0]*60) + av_money_time0[1]);
	        av_money_time_g1 = Math.round((av_money_time1[0]*60) + av_money_time1[1]);
	        av_money_time_g2 = Math.round((av_money_time2[0]*60) + av_money_time2[1]);
	        av_money_time_g3 = Math.round((av_money_time3[0]*60) + av_money_time3[1]);
	        av_money_time_g4 = Math.round((av_money_time4[0]*60) + av_money_time4[1]);
	        av_money_time_g5 = Math.round((av_money_time5[0]*60) + av_money_time5[1]);
	        av_money_time_g6 = Math.round((av_money_time6[0]*60) + av_money_time6[1]);
	        
			$('#jikan_count1').html(jikan_count1);
			$('#jikan_count2').html(jikan_count2);
			$('#jikan_count3').html(jikan_count3);
			$('#jikan_count4').html(jikan_count4);
			$('#jikan_count5').html(jikan_count5);
			$('#jikan_count6').html(jikan_count6);
			$('#jikan_count7').html(jikan_count7);
			$('#jikan_count8').html(jikan_count8);
			$('#jikan_count9').html(jikan_count9);
			$('#jikan_count10').html(jikan_count10);
			$('#jikan_count11').html(jikan_count11);
			$('#jikan_count12').html(jikan_count12);
			$('#jikan_count13').html(jikan_count13);
			$('#jikan_count14').html(jikan_count14);
			$('#jikan_count15').html(jikan_count15);
			$('#jikan_count16').html(jikan_count16);
			$('#jikan_count17').html(jikan_count17);
			$('#jikan_count18').html(jikan_count18);
			$('#jikan_count19').html(jikan_count19);
			$('#jikan_count20').html(jikan_count20);
			$('#jikan_count21').html(jikan_count21);
			$('#jikan_count22').html(jikan_count22);
			$('#jikan_count23').html(jikan_count23);
			$('#jikan_count24').html(jikan_count24);
			$('#avjikan_money1').html(Math.round(avjikan_money1)+"円");
			$('#avjikan_money2').html(Math.round(avjikan_money2)+"円");
			$('#avjikan_money3').html(Math.round(avjikan_money3)+"円");
			$('#avjikan_money4').html(Math.round(avjikan_money4)+"円");
			$('#avjikan_money5').html(Math.round(avjikan_money5)+"円");
			$('#avjikan_money6').html(Math.round(avjikan_money6)+"円");
			$('#avjikan_money7').html(Math.round(avjikan_money7)+"円");
			$('#avjikan_money8').html(Math.round(avjikan_money8)+"円");
			$('#avjikan_money9').html(Math.round(avjikan_money9)+"円");
			$('#avjikan_money10').html(Math.round(avjikan_money10)+"円");
			$('#avjikan_money11').html(Math.round(avjikan_money11)+"円");
			$('#avjikan_money12').html(Math.round(avjikan_money12)+"円");
			$('#avjikan_money13').html(Math.round(avjikan_money13)+"円");
			$('#avjikan_money14').html(Math.round(avjikan_money14)+"円");
			$('#avjikan_money15').html(Math.round(avjikan_money15)+"円");
			$('#avjikan_money16').html(Math.round(avjikan_money16)+"円");
			$('#avjikan_money17').html(Math.round(avjikan_money17)+"円");
			$('#avjikan_money18').html(Math.round(avjikan_money18)+"円");
			$('#avjikan_money19').html(Math.round(avjikan_money19)+"円");
			$('#avjikan_money20').html(Math.round(avjikan_money20)+"円");
			$('#avjikan_money21').html(Math.round(avjikan_money21)+"円");
			$('#avjikan_money22').html(Math.round(avjikan_money22)+"円");
			$('#avjikan_money23').html(Math.round(avjikan_money23)+"円");
			$('#avjikan_money24').html(Math.round(avjikan_money24)+"円");
			$('#avjikan_time1').html(Math.round(avjikan_time1[0])+"時間"+Math.round(avjikan_time1[1])+"分"+Math.round(avjikan_time1[2])+"秒");
			$('#avjikan_time2').html(Math.round(avjikan_time2[0])+"時間"+Math.round(avjikan_time2[1])+"分"+Math.round(avjikan_time2[2])+"秒");
			$('#avjikan_time3').html(Math.round(avjikan_time3[0])+"時間"+Math.round(avjikan_time3[1])+"分"+Math.round(avjikan_time3[2])+"秒");
			$('#avjikan_time4').html(Math.round(avjikan_time4[0])+"時間"+Math.round(avjikan_time4[1])+"分"+Math.round(avjikan_time4[2])+"秒");
			$('#avjikan_time5').html(Math.round(avjikan_time5[0])+"時間"+Math.round(avjikan_time5[1])+"分"+Math.round(avjikan_time5[2])+"秒");
			$('#avjikan_time6').html(Math.round(avjikan_time6[0])+"時間"+Math.round(avjikan_time6[1])+"分"+Math.round(avjikan_time6[2])+"秒");
			$('#avjikan_time7').html(Math.round(avjikan_time7[0])+"時間"+Math.round(avjikan_time7[1])+"分"+Math.round(avjikan_time7[2])+"秒");
			$('#avjikan_time8').html(Math.round(avjikan_time8[0])+"時間"+Math.round(avjikan_time8[1])+"分"+Math.round(avjikan_time8[2])+"秒");
			$('#avjikan_time9').html(Math.round(avjikan_time9[0])+"時間"+Math.round(avjikan_time9[1])+"分"+Math.round(avjikan_time9[2])+"秒");
			$('#avjikan_time10').html(Math.round(avjikan_time10[0])+"時間"+Math.round(avjikan_time10[1])+"分"+Math.round(avjikan_time10[2])+"秒");
			$('#avjikan_time11').html(Math.round(avjikan_time11[0])+"時間"+Math.round(avjikan_time11[1])+"分"+Math.round(avjikan_time11[2])+"秒");
			$('#avjikan_time12').html(Math.round(avjikan_time12[0])+"時間"+Math.round(avjikan_time12[1])+"分"+Math.round(avjikan_time12[2])+"秒");
			$('#avjikan_time13').html(Math.round(avjikan_time13[0])+"時間"+Math.round(avjikan_time13[1])+"分"+Math.round(avjikan_time13[2])+"秒");
			$('#avjikan_time14').html(Math.round(avjikan_time14[0])+"時間"+Math.round(avjikan_time14[1])+"分"+Math.round(avjikan_time14[2])+"秒");
			$('#avjikan_time15').html(Math.round(avjikan_time15[0])+"時間"+Math.round(avjikan_time15[1])+"分"+Math.round(avjikan_time15[2])+"秒");
			$('#avjikan_time16').html(Math.round(avjikan_time16[0])+"時間"+Math.round(avjikan_time16[1])+"分"+Math.round(avjikan_time16[2])+"秒");
			$('#avjikan_time17').html(Math.round(avjikan_time17[0])+"時間"+Math.round(avjikan_time17[1])+"分"+Math.round(avjikan_time17[2])+"秒");
			$('#avjikan_time18').html(Math.round(avjikan_time18[0])+"時間"+Math.round(avjikan_time18[1])+"分"+Math.round(avjikan_time18[2])+"秒");
			$('#avjikan_time19').html(Math.round(avjikan_time19[0])+"時間"+Math.round(avjikan_time19[1])+"分"+Math.round(avjikan_time19[2])+"秒");
			$('#avjikan_time20').html(Math.round(avjikan_time20[0])+"時間"+Math.round(avjikan_time20[1])+"分"+Math.round(avjikan_time20[2])+"秒");
			$('#avjikan_time21').html(Math.round(avjikan_time21[0])+"時間"+Math.round(avjikan_time21[1])+"分"+Math.round(avjikan_time21[2])+"秒");
			$('#avjikan_time22').html(Math.round(avjikan_time22[0])+"時間"+Math.round(avjikan_time22[1])+"分"+Math.round(avjikan_time22[2])+"秒");
			$('#avjikan_time23').html(Math.round(avjikan_time23[0])+"時間"+Math.round(avjikan_time23[1])+"分"+Math.round(avjikan_time23[2])+"秒");
			$('#avjikan_time24').html(Math.round(avjikan_time24[0])+"時間"+Math.round(avjikan_time24[1])+"分"+Math.round(avjikan_time24[2])+"秒");
			
			//グラフ用時間別
			ct_avjikan_money1= Math.round(avjikan_money1/1000);
			ct_avjikan_money2= Math.round(avjikan_money2/1000);
			ct_avjikan_money3= Math.round(avjikan_money3/1000);
			ct_avjikan_money4= Math.round(avjikan_money4/1000);
			ct_avjikan_money5= Math.round(avjikan_money5/1000);
			ct_avjikan_money6= Math.round(avjikan_money6/1000);
			ct_avjikan_money7= Math.round(avjikan_money7/1000);
			ct_avjikan_money8= Math.round(avjikan_money8/1000);
			ct_avjikan_money9= Math.round(avjikan_money9/1000);
			ct_avjikan_money10= Math.round(avjikan_money10/1000);
			ct_avjikan_money11= Math.round(avjikan_money11/1000);
			ct_avjikan_money12= Math.round(avjikan_money12/1000);
			ct_avjikan_money13= Math.round(avjikan_money13/1000);
			ct_avjikan_money14= Math.round(avjikan_money14/1000);
			ct_avjikan_money15= Math.round(avjikan_money15/1000);
			ct_avjikan_money16= Math.round(avjikan_money16/1000);
			ct_avjikan_money17= Math.round(avjikan_money17/1000);
			ct_avjikan_money18= Math.round(avjikan_money18/1000);
			ct_avjikan_money19= Math.round(avjikan_money19/1000);
			ct_avjikan_money20= Math.round(avjikan_money20/1000);
			ct_avjikan_money21= Math.round(avjikan_money21/1000);
			ct_avjikan_money22= Math.round(avjikan_money22/1000);
			ct_avjikan_money23= Math.round(avjikan_money23/1000);
			ct_avjikan_money24= Math.round(avjikan_money24/1000);
			
		ct_avmtime_f1 = Math.round((avjikan_time1[0]*60) + avjikan_time1[1]);
		ct_avmtime_f2 = Math.round((avjikan_time2[0]*60) + avjikan_time2[1]);
		ct_avmtime_f3 = Math.round((avjikan_time3[0]*60) + avjikan_time3[1]);
		ct_avmtime_f4 = Math.round((avjikan_time4[0]*60) + avjikan_time4[1]);
		ct_avmtime_f5 = Math.round((avjikan_time5[0]*60) + avjikan_time5[1]);
		ct_avmtime_f6 = Math.round((avjikan_time6[0]*60) + avjikan_time6[1]);
		ct_avmtime_f7 = Math.round((avjikan_time7[0]*60) + avjikan_time7[1]);
		ct_avmtime_f8 = Math.round((avjikan_time8[0]*60) + avjikan_time8[1]);
		ct_avmtime_f9 = Math.round((avjikan_time9[0]*60) + avjikan_time9[1]);
		ct_avmtime_f10 = Math.round((avjikan_time10[0]*60) + avjikan_time10[1]);
		ct_avmtime_f11 = Math.round((avjikan_time11[0]*60) + avjikan_time11[1]);
		ct_avmtime_f12 = Math.round((avjikan_time12[0]*60) + avjikan_time12[1]);
		ct_avmtime_f13 = Math.round((avjikan_time13[0]*60) + avjikan_time13[1]);
		ct_avmtime_f14 = Math.round((avjikan_time14[0]*60) + avjikan_time14[1]);
		ct_avmtime_f15 = Math.round((avjikan_time15[0]*60) + avjikan_time15[1]);
		ct_avmtime_f16 = Math.round((avjikan_time16[0]*60) + avjikan_time16[1]);
		ct_avmtime_f17 = Math.round((avjikan_time17[0]*60) + avjikan_time17[1]);
		ct_avmtime_f18 = Math.round((avjikan_time18[0]*60) + avjikan_time18[1]);
		ct_avmtime_f19 = Math.round((avjikan_time19[0]*60) + avjikan_time19[1]);
		ct_avmtime_f20 = Math.round((avjikan_time20[0]*60) + avjikan_time20[1]);
		ct_avmtime_f21 = Math.round((avjikan_time21[0]*60) + avjikan_time21[1]);
		ct_avmtime_f22 = Math.round((avjikan_time22[0]*60) + avjikan_time22[1]);
		ct_avmtime_f23 = Math.round((avjikan_time23[0]*60) + avjikan_time23[1]);
		ct_avmtime_f24 = Math.round((avjikan_time24[0]*60) + avjikan_time24[1]);


		
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
                    responsive: true,
                    title: {
                        display: true,
                        text: ''
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    }
                }
            });
		
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
                    responsive: true,
                    title: {
                        display: true,
                        text: ''
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    }
                }
            });
			
	//曜日別
	youbi_Chart.destroy();
	
        var chartData = {
            labels: ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"],
            datasets: [{
                type: 'line',
                label: '平均利用時間(分)',
                borderColor: window.chartColors.blue,
                borderWidth: 2,
                fill: false,
                data: [av_money_time_g0,av_money_time_g1,av_money_time_g2,av_money_time_g3,av_money_time_g4,av_money_time_g5,av_money_time_g6]
            }, {
                type: 'bar',
                label: '利用者数(人)',
                backgroundColor: window.chartColors.red,
                data: [youbi_count0,youbi_count1,youbi_count2,youbi_count3,youbi_count4,youbi_count5,youbi_count6],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: '平均利用金額(千円)',
                backgroundColor: window.chartColors.green,
                data: [av_money0/1000,av_money1/1000,av_money2/1000,av_money3/1000,av_money4/1000,av_money5/1000,av_money6/1000]
            }]

        };
	
            var ctx = document.getElementById("canvas").getContext("2d");
            youbi_Chart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: ''
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    }
                }
            });
            
            
	time_Chart.destroy();
	
	    
        var time_chartData = {
            labels: ["１時", "２時", "３時", "４時", "５時", "６時", "７時", "８時", "９時", "１０時", "１１時", "１２時", "１３時", "１４時", "１５時", "１６時", "１８時", "１９時", "２０時", "２１時", "２２時", "２３時", "２４時"],
            datasets: [{
                type: 'line',
                label: '平均利用時間(分)',
                borderColor: window.chartColors.blue,
                borderWidth: 2,
                fill: false,
                data: [ct_avmtime_f1,ct_avmtime_f2,ct_avmtime_f3,ct_avmtime_f4,ct_avmtime_f5,ct_avmtime_f6,ct_avmtime_f7,ct_avmtime_f8,ct_avmtime_f9,ct_avmtime_f10,ct_avmtime_f11,ct_avmtime_f12,ct_avmtime_f13,ct_avmtime_f14,ct_avmtime_f15,ct_avmtime_f16,ct_avmtime_f17,ct_avmtime_f18,ct_avmtime_f19,ct_avmtime_f20,ct_avmtime_f21,ct_avmtime_f22,ct_avmtime_f23,ct_avmtime_f24]
            }, {
                type: 'bar',
                label: '利用者数(人)',
                backgroundColor: window.chartColors.red,
                data: [jikan_count1,jikan_count2,jikan_count3,jikan_count4,jikan_count5,jikan_count6,jikan_count7,jikan_count8,jikan_count9,jikan_count10,jikan_count11,jikan_count12,jikan_count13,jikan_count14,jikan_count15,jikan_count16,jikan_count17,jikan_count18,jikan_count19,jikan_count20,jikan_count21,jikan_count22,jikan_count23,jikan_count24],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: '平均利用金額(千円)',
                backgroundColor: window.chartColors.green,
                data: [ct_avjikan_money1,ct_avjikan_money1,ct_avjikan_money3,ct_avjikan_money4,ct_avjikan_money5,ct_avjikan_money6,ct_avjikan_money7,ct_avjikan_money8,ct_avjikan_money9,ct_avjikan_money10,ct_avjikan_money11,ct_avjikan_money12,ct_avjikan_money13,ct_avjikan_money14,ct_avjikan_money15,ct_avjikan_money16,ct_avjikan_money17,ct_avjikan_money18,ct_avjikan_money19,ct_avjikan_money20,ct_avjikan_money21,ct_avjikan_money22,ct_avjikan_money23,ct_avjikan_money24]
            }]

        };
	
            var time_ctx = document.getElementById("time_canvas").getContext("2d");
            time_Chart = new Chart(time_ctx, {
                type: 'bar',
                data: time_chartData,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: ''
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    }
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
	    $.mobile.changePage('#analytics');
}