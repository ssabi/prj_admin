$(document).ready(function(){
	//글자수 체크
	chklength();
	if(browser() == "Firefox"){
		keyUpTrigger();
	}
	//첨부파일
	chkfile();
	//대상찾기 버튼 높이값 조정
	reisizeHeight();
	//등록폼 제목 Decoration...
	setTitleDeco();
	//기간설정 초기 설정
	setDate("#lnb_date01", "#lnb_date02");
	setDate("#post_start", "#post_end");
	setDate("#opt_start", "#opt_end");
	setDate("#opt_start01");

	/* IE */
	if(browser() == "IE"){
		$(".btn span").bind({
			"mousedown" : function(){
				$(this).closest(".btn").addClass("active");
			},
			"mouseup" : function(){
				$(this).closest(".btn").removeClass("active");
			}
		});
	}

	//Design Selectbox
	$(".w99").selectOrDie({customClass: 'w99',size: 10});
	$(".w70").selectOrDie({customClass: 'w70',size: 10});
	$(".w104").selectOrDie({customClass: 'w104',size: 10});
	$(".w121").selectOrDie({customClass: 'w121',size: 10});
	$(".w140").selectOrDie({customClass: 'w140',size: 10});
	$(".w340").selectOrDie({customClass: 'w340',size: 10});
	$(".w170").selectOrDie({customClass: 'w170',size: 10});
	//$(".w260").selectOrDie({customClass: 'w260',size: 10});
	//$(".w260").selectOrDie({customClass: $(".w260").attr("class"),size: 10});
	$(".w260").each(function(){
		$(this).selectOrDie({customClass: $(this).attr("class"),size: 10});
	})
	$(".w100p").selectOrDie({customClass: 'w100p',size: 10});
	$(".sch_sel").selectOrDie({customClass: 'sch_sel',size: 10});

	//Treeview
	$(".treeview>ul>li span").bind({
		"click" : function(e){
			//e.preventDefault();
			var $this = $(this);
			if($(this).next("ul").length > 0){
				$(this).next("ul").slideToggle("fast");
				$(this).toggleClass("open");
			}
		}
	});

	//Multiview
	$(".multiview ul>li span").bind({
		"click" : function(e){
			//e.preventDefault();
			if($(this).next("ul").length > 0){
				$(this).next("ul").slideToggle("fast");
				$(this).toggleClass("open");
			}
		}
	});

	//LNB 기간 - 직접 입력
	hasDataAttr("[data-lnb-period]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("lnb-period");
			$this.bind({
				"click" : function(){
					var dataObj = val.target;
					var dataDisplay = val.display;

					dataDisplay == "show" ? $(dataObj).slideDown('fast') : $(dataObj).slideUp('fast');
				}
			});
		});
	});

	//게시대상
	hasDataAttr("[data-target-toggle]", function($ele){
		$ele.each(function(){
			var $this = $(this), data = $(this).data("target-toggle");
			$this.bind({
				"click" : function(){
					var dataEle = data.ele;
					var dataDispaly = data.display;
					var checked = data.check;
					/*
						show : target show
						hide : target hide
						all_show : target all show
						all_hide : target all hide
					*/
					var dataEle02 = data.ele02;
					if(!checked){
						dataDispaly == "show" ? $(dataEle).show() : $(dataEle).hide();
						if(dataEle02 !="" && dataEle02 != null){
							dataDispaly == "show" ? $(dataEle02).hide() : $(dataEle02).show();
						}
						if(dataDispaly != "" && dataDispaly != null){
							if(dataDispaly == "all_hide"){
								$(dataEle).hide();
								$(dataEle02).hide();
							}
						}
					}else{
						if($this.prop("checked")){
							$(dataEle).show();
						}else{
							 $(dataEle).hide();
						}
					}
					reisizeHeight();
				}
			});
		});
	});

	//Check All
	var form = function(){
		var setLabel = function(clz){
			if($(clz + ' input').length){
				$(clz).each(function(){
					$(this).removeClass('on');
					$(this).removeClass('on_disabled');
					$(this).removeClass('disabled');
				});
				$(clz + ' input:checked').each(function(){
					$(this).parent('label').addClass('on');
				});
				$(clz + ' input:disabled').each(function(){
					if ($(this).prop('checked')){
						$(this).parent('label').addClass('on_disabled');
					}else{
						$(this).parent('label').addClass('disabled');
					}
				});
			}
		}

		setLabel('.label_check');
		setLabel('.label_radio');
		$('.label_check').click(function(e){
			setLabel('.label_check');
			e.stopPropagation();
		});
		$('.label_radio').click(function(e){
			setLabel('.label_radio');
			e.stopPropagation();
		});
		hasDataAttr('[data-check-all]',function($ctx){
			$ctx.each(function(){
				//var $input = $(this).find('input'), checkGroup = $(this).data('check-all');
				var $input = $(this).siblings('input'), checkGroup = $(this).data('check-all');

				$input.on('click',function(){
					var val = $input.prop('checked'), bool;
					if(val){
						//bool = false;
						bool = true;
					}else{
						//bool = true;
						bool = false;
					}
					$('[data-check-group="' + checkGroup + '"]').each(function(){
						//$(this).find('input').prop('checked',bool);
						$(this).siblings('input').prop('checked',bool);
					});
					setLabel('.label_check');
					setLabel('.label_radio');
				});
			});
		});

		hasDataAttr('[data-check-group]',function($ctx){
			$ctx.each(function(){
				//var $input = $(this).find('input'), checkAll = $(this).data('check-group');
				var $input = $(this).siblings('input'), checkAll = $(this).data('check-group');
				$input.on('click',function(){
					//$('[data-check-all="' + checkAll + '"]').find('input').prop('checked',false);
					var len = $('[data-check-group="' + checkAll + '"]').length;
					var chkLen = $('[data-check-group="' + checkAll + '"]').siblings('input:checked').length;

					if(len == chkLen){
						$('[data-check-all="' + checkAll + '"]').siblings('input').prop('checked',true);
					}else{
						$('[data-check-all="' + checkAll + '"]').siblings('input').prop('checked',false);
					}
					
					setLabel('.label_check');
					setLabel('.label_radio');
				});
			});
		});
	}
	form();
	//end Check All

	//기간 설정 오늘, 1주일, 1개월
	var target = ".tbl_opt .period .btn";
	$(target).bind({
		"click" : function(e){
			e.preventDefault();

			var start = "#opt_start";
			var end = "#opt_end";
			var val = $(this).attr("data-period");

			$(target).removeClass("on");
			$(this).toggleClass("on");
			switch (val){
			case "today" :		//오늘
				$(start).datepicker('setDate', new Date());
				$(end).datepicker('setDate', new Date());
			break;
			case "week" :			//일주일
				$(start).datepicker('setDate', setDateCal(7));
				$(end).datepicker('setDate', new Date());
			break;
			case "month" :		//1개월
				$(start).datepicker('setDate', setDateCal(30));
				$(end).datepicker('setDate', new Date());
			break;
			case "month3" :	//3개월
				$(start).datepicker('setDate', setDateCal(90));
				$(end).datepicker('setDate', new Date());
			break;
			case "month6" :	//6개월
				$(start).datepicker('setDate', setDateCal(180));
				$(end).datepicker('setDate', new Date());
			break;
			case "month12" :	//12개월
				$(start).datepicker('setDate', setDateCal(360));
				$(end).datepicker('setDate', new Date());
			break;
			}
		}
	});

	//대상찾기 삭제 이벤트
	$(".target_tag .del").live({
		"click" : function(e){
			e.preventDefault();

			$(this).closest(".target_tag").remove();
			reisizeHeight();
		}
	});

	//Banner Slider
	hasDataAttr("[data-banner]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("banner"); 
			var itemShow = val.show;
			var itemScroll = val.scroll;
			$(this).slick({
				autoplay: true,
				dots: true,
				infinite: true,
				slidesToShow: itemShow,
				slidesToScroll: itemShow,
				arrows: false
			});
		});
	});

	//Notice interface
	$(".notibox>ul>li").each(function(idx){
		$(this).bind({
			"mouseenter" : function(){
				var idx = $(this).index();
				idx = idx + 1;
				var width = $(this).width() * idx;
				var leftPos = width - 140;
				//$(this).find(".noti_layer").stop().slideDown("fast");
				$(this).find(".noti_layer").show();
				$(this).find(".point").css({"left" : leftPos+"px"});
			},
			"mouseleave" : function(){
				//$(this).find(".noti_layer").stop().slideUp("fast");
				$(this).find(".noti_layer").hide();
			}
		});
	});

	//배너관리 리스트 순서 변경
	hasDataAttr("[data-tbl-sort]", function($ele){
		var $this = $ele, data = $ele.data("tbl-sort");
		var up = data.up, down = data.down;
		$(up).each(function(idx){
			$(this).live({
				"click" : function(e){
					e.preventDefault();
					var $tr = $(this).closest("tr");
					$tr.prev().before($tr);

					//Number Sorting
					numbering($this);
					//Controller Sorting
					controll($this);
				}
			});
		});
		$(down).each(function(idx){
			$(this).live({
				"click" : function(e){
					e.preventDefault();
					var $tr = $(this).closest("tr");
					$tr.next().after($tr);

					//Number Sorting
					numbering($this);
					//Controller Sorting
					controll($this);
				}
			});
		});
	});

	//검색 옵션 초기화
	$(".resetBtn").click(function(e){
		e.preventDefault();

		resetOptions(".reset_area");
	});
});
//END Document Ready

//jqGrid resize width
function resizeJqGridWidth(grid_id, div_id, width){
	$(window).bind('resize', function(){
		// 그리드의 width 초기화
		$('#' + grid_id).setGridWidth(width, true);
		// 그리드의 width를 div 에 맞춰서 적용
		$('#' + grid_id).setGridWidth($('.' + div_id).width() , true);
	}).trigger('resize');
}

//HasData
var hasDataAttr = function(ctx, func){
	if($(ctx).length){
		var $ctx = $(ctx);
		if(func !== undefined){
			func($ctx);
		}else{
			console.log('callback function is not defined.');
		}
	}
}

var sortList = function(){
	//배너관리 리스트 순서 변경
	hasDataAttr("[data-tbl-sort]", function($ele){
		var $this = $ele, data = $ele.data("tbl-sort");
		var up = data.up, down = data.down;
		$(up).each(function(idx){
			$(this).live({
				"click" : function(e){
					e.preventDefault();
					var $tr = $(this).closest("tr");
					$tr.prev().before($tr);

					//Number Sorting
					numbering($this);
					//Controller Sorting
					controll($this);
				}
			});
		});
		$(down).each(function(idx){
			$(this).live({
				"click" : function(e){
					e.preventDefault();
					var $tr = $(this).closest("tr");
					$tr.next().after($tr);

					//Number Sorting
					numbering($this);
					//Controller Sorting
					controll($this);
				}
			});
		});
	});
}
//대상찾기 리스트 처리
var reisizeHeight = function(){
	hasDataAttr("[data-target-box]", function($ele){
		$ele.each(function(){
			var $this = $(this), val = $this.data("target-box");
			var height = $this.outerHeight();
			$('[data-target-box-button='+val+']').css({"height":(height-2),"line-height":(height-2)+"px"});
		});
	});
}
//글자수 체크
var chklength = function(){
	hasDataAttr("[data-chk-length]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("lnb-period");
			$this.live({
				"keyup" : function(e){
					var textarea = $(this).find("textarea, input[type=text]");
					var textareaVal = $(this).find("textarea, input[type=text]").val();
					var textareaLen = textareaVal.length;
					var byteNum = 0, len = 0;

					var txt = $(this).find(".byte span");
					var maxLen = eval($(this).find(".count").text());

					for(var i = 0; i < textareaLen; i++){
						c = textareaVal.charAt(i);
						if(escape(c).length > 4){
							byteNum += 2;
						}else{
							byteNum++;
						}

						if(byteNum <= maxLen){
							len = i + 1;
						}
					}

					txt.html(byteNum);
					if(byteNum > maxLen){
						var substrTxt = textareaVal.substr(0, len);
						//alert(maxLen + "자를 초과 입력 할 수 없습니다.");
						textarea.val(substrTxt);
						txt.html(maxLen);
						return false;
					}
				}
			}).trigger("keyup");
		});
	});
}
var keyUpTrigger = function(){
	$('[data-chk-length]').find("input, textarea").each(function(idx){
		var $this = $(this);
		$this[0].checkKeyEvt = undefined;
		$this[0].existValue = undefined;
	});

	$('[data-chk-length]').find("input, textarea").on('focus blur', function(e){
			var $this = $(this);
			var watcher = function(){
				if($this[0].existValue != $this.val()){
				$this.trigger('keyup');
			}
			$this[0].existValue = $this.val();
			if($this[0].checkKeyEvt) clearInterval($this[0].checkKeyEvt);
			$this[0].checkKeyEvt = setInterval(watcher, 100);
		};
		if(e.type == 'focus'){
			if(!$this[0].checkKeyEvt) watcher();
		}else if(e.type == 'blur'){
			if($this[0].checkKeyEvt){
				clearInterval($this[0].checkKeyEvt);
				$this[0].checkKeyEvt = undefined;
			}
		}
	});
};
//첨부파일
var chkfile = function(){
	hasDataAttr("[data-file-box]", function($ele){
		$ele.each(function(){
			var $this = $(this);
			var data = $this.data("file-box");
			var $btn =$this.find("label"); 
			var $file = $this.find("input[type=file]");
			var $txt = $this.find("input[type=text]");
			var $txt02 = $this.find(data);
			$file.bind({
				"change" : function(e){
					var val = $file.val();
					if(data =="" || data == null){
						$txt.val(e.target.files[0].name);
					}else{
						$txt02.removeClass("filename").addClass("filename");
						$txt02.text(e.target.files[0].name);
					}
				}
			})
		});
	});
}

//기간 설정
var disabled_start, disabled_end;
var dateFormat = "yy.mm.dd", closeText = "닫기",
dayNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
dayNamesMin = ['월', '화', '수', '목', '금', '토', '일'],
monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
monthNamesShort = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
function setDate(startDate, endDate, day){
	/*
	startDate : input 의 class 또는 id(string)
	endDate : input 의 class 또는 id(string)
	day : 
	*/
	//Datepicker
	var from = $(startDate).datepicker({
		showOn: 'both',
		buttonImage : '/resource_admin/images/common/ico_cal.png',
		buttonImageOnly : true,
		buttonText: '날짜 선택',
		//changeMonth: true,
		//changeYear: true,
		//showButtonPanel: true,
		closeText: closeText,
		dateFormat: dateFormat,
		dayNames: dayNames,
		dayNamesMin: dayNamesMin,
		monthNames: monthNames,
		monthNamesShort: monthNamesShort,
		showOtherMonths: true,
		selectOtherMonths: true,
		showMonthAfterYear: true
	}).on('change', function(){
		to.datepicker("option", "minDate", getDate(this));
	}),
	to = $(endDate).datepicker({
		showOn: 'both',
		buttonImage : '/resource_admin/images/common/ico_cal.png',
		buttonImageOnly : true,
		buttonText: '날짜 선택',
		//changeMonth: true,
		//changeYear: true,
		//showButtonPanel: true,
		closeText: closeText,
		dateFormat: dateFormat,
		dayNames: dayNames,
		dayNamesMin: dayNamesMin,
		monthNames: monthNames,
		monthNamesShort: monthNamesShort,
		showOtherMonths: true,
		selectOtherMonths: true,
		showMonthAfterYear: true
	}).on('change', function(){
		from.datepicker("option", "maxDate", getDate(this));
	});

	if($(startDate).val() == ''){
		from.datepicker('setDate', new Date());
	}else{
		from.datepicker('setDate', new Date($(startDate).val()));
	}
	if($(endDate).val() == ''){
		to.datepicker('setDate', new Date());
	}else{
		to.datepicker('setDate', new Date($(endDate).val()));
	}

	if(day > 0){
		from.datepicker('setDate', setDateCal(day));
	}

	function getDate(element){
		var date;
		try{
			date = $.datepicker.parseDate(dateFormat, element.value);
		}catch(error){
			date = null;
		}
		return date;
	}

	if($(startDate).val() == ''){
		from.datepicker('setDate', new Date());
	}else{
		from.datepicker('setDate', new Date($(startDate).val()));
	}
	if($(endDate).val() == ''){
		to.datepicker('setDate', new Date());
	}else{
		to.datepicker('setDate', new Date($(endDate).val()));
	}
}
//날짜 계산
function setDateCal(d, s){
	/*
	d : day(int)
	s : seperate
	*/
	var from_year, from_month, from_day;
	if(s == null || s == ""){
		s = ".";
	}
	var date = new Date();
	var from = new Date(Date.parse(date) - (d * 1000 * 60 * 60 * 24));

	from_year = from.getFullYear();
	if(from.getMonth() < 9){
		from_month = '0' + (from.getMonth()+1);
	}else{
		from_month = from.getMonth()+1;
	}
	if(from.getDate() < 9){
		from_day = '0'+from.getDate();
	}else{
		from_day = from.getDate();
	}
	return from_year + s + from_month + s + from_day;
}
//Detect Browser
var browser = function() {
	// Return cached result if avalible, else get result then cache it.
	if (browser.prototype._cachedResult)
		return browser.prototype._cachedResult;

	// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	// Chrome 1+
	var isChrome = !!window.chrome && !isOpera;
	// At least IE6
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	return browser.prototype._cachedResult =
		isOpera ? 'Opera' :
		isFirefox ? 'Firefox' :
		isSafari ? 'Safari' :
		isChrome ? 'Chrome' :
		isIE ? 'IE' :
		isEdge ? 'Edge' :
		"Don't know";
};
//Detect Browser Version
function getInternetExplorerVersion(){
	var rv = -1; // Return value assumes failure.
	if(navigator.appName == 'Microsoft Internet Explorer'){
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if(re.exec(ua) != null) rv = parseFloat(RegExp.$1);
	}
	return rv;
}
//Window Open Popup
function openpop(url, name, width, height, scroll){
	if(browser() == "Opera"){
		width = width + 2;
	}

	var cw = screen.width;		//화면 넓이
	var ch = screen.height;		//화면 높이

	var popX = (cw - width)/2;
	var popY = (ch - height)/2;

	if(scroll == "yes" || scroll == 1){
		scroll = "yes";
		width = width + 17;
	}else{
		scroll = "no";
	}
	window.open(url, name, "toolbar=no, menubar=no, location=no, status=no, resizable=no, width="+width+", height="+height+", top="+popY+", left="+popX+", scrollbars="+scroll);
}
//등록폼 제목 Decoration
function setTitleDeco(){
	//텍스트 볼드 Set
	hasDataAttr("[data-text-bold]", function($ele){
		$ele.each(function(){
			var $this = $(this), data = $(this).data("text-bold");
			$this.bind({
				"click" : function(e){
					e.preventDefault();

					$this.toggleClass("on");
					$this.hasClass("on") ? $("input[name=text_bold]").val("true") : $("input[name=text_bold]").val("");
					$this.hasClass("on") ? $("[data-text-deco="+data+"]").css({"font-weight":"bold"}) : $("[data-text-deco="+data+"]").css({"font-weight":"normal"});
				}
			});
		});
	});
	//텍스트 컬러 Set
	hasDataAttr("[data-text-color]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), $thisChild = $(this).find(">span"), data = $(this).data("text-color");
			$($this, $thisChild).spectrum({
				allowEmpty:true,
				showInitial: true,
				showPalette: true,
				showSelectionPalette: true,
				palette: [
					["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", /*"rgb(153, 153, 153)","rgb(183, 183, 183)",*/
					"rgb(204, 204, 204)", "rgb(217, 217, 217)", /*"rgb(239, 239, 239)", "rgb(243, 243, 243)",*/ "rgb(255, 255, 255)"],
					["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
					"rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
					["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
					"rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
					"rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
					"rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
					"rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
					"rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
					"rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
					"rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
					/*"rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
					"rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",*/
					"rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
					"rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
				],
				change: function(color){
					if(color !=null && color !=""){
						//console.log("color = "+color);
						var val = color.toHexString();	// #ff0000
						var hex = color.toHex();				// ff0000
						$(".txt_color span").css({"border-bottom-color":val});
						$("#color_value").val(hex);
						$("[data-text-deco="+data+"]").css({"color":val});
					}
				}
			});
		});
	});
}
// Reset Numbering
var numbering = function(target){
	var $this = $(target), num = $this.find(".num"), tr = $this.find("tbody tr"), len = tr.length;

	var numArr = [];
	var numSortArr = [];
	for(var i=0; i < len; i++){
		numArr.push(num.eq(i).text());
	}
	//console.log(numArr);
	numSortArr = numArr.sort(function(a, b){return a-b});	//역순 정렬 : b-a,  정순 정렬 : a-b;
	//console.log(numSortArr);
	$.each(tr, function(idx){
		num.eq(idx).text(numSortArr[idx]);
	});
}
//Reset Controll Button
var controll = function(target){
	var $this = $(target), tr = $this.find("tbody tr").not(".exclude"), len = tr.length, className = "disabled";

	tr.find(".up, .down").removeClass(className);
	tr.find("first").removeClass("first");
	tr.eq(0).find(".up").addClass(className);
	tr.eq(0).find(".orderby").addClass("first");
	
	tr.eq(len-1).find(".down").addClass(className);
}
//검색 옵션 초기화
var resetOptions = function(ele){
	var $this = $(ele);
	var chkbox = $this.find("input[type=checkbox]");
	var radio = $this.find("input[type=radio]");
	var input = $this.find("input[type=text]");
	var periodBtn = $this.find(".period .btn");
	var select = $this.find("select");
	var desingSelect = $this.find(".w70, .w99, .w104, .w140, .w121, .w170, .w260, .w100p, .sch_sel");

	chkbox.prop("checked", false);				//체크박스 초기화
	radio.prop("checked", false);					//라디오버튼 초기화
	input.val("");												//Input 텍스트 초기화
	periodBtn.removeClass("on");				//기간 선택 버튼(오늘, 1주일, 1개월, 3개월 ...) 비활성화
	for(var i=0; i < select.length; i++){		//셀렉트박스 초기화
		select.eq(i).find("option:eq(0)").attr("selected", "selected").trigger('change');
	}
	for(var i=0; i < desingSelect.length; i++){	//디자인 셀렉트박스 초기화
		//desingSelect.eq(i).selectOrDie("destroy").selectOrDie({customClass: desingSelect.eq(i).attr("class"), size: 10});
		desingSelect.eq(i).selectOrDie("update");
	}
}

var setWatermak = function(text){
	var html = "";
	var opt1 = ' width="920" height="500" ';
	var opt2 = ' width="750" height="500" ';
	var pos1 = ' y="100" x="0" ';
	var pos2 = ' y="350" x="0" ';
	if(text == null || text == ""){
		var opt1 = ' width="900" height="600" ';
		text = "SK Telecom";
	}

	var date = new Date();

	if(getInternetExplorerVersion() != -1 && getInternetExplorerVersion() < 10){
		//console.log("IE 9 이하...");
	}else{
		html = "";
		html += '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="left:0px;top:0px;right:0px;bottom:0px;position:fixed;z-index:9999;fill-opacity:0.16;pointer-events:none">';
		html += '<defs>';
		//사번
		html += '<pattern id="textstripe" patternUnits="userSpaceOnUse" '+opt1+' patternTransform="rotate(-20)">';
		html += '<text '+pos1+' font-size="120" style="color:#000;font-family:\'맑은 고딕\', \'나눔 고딕\', Dotum, \'droid sans fallback\', \'AppleGothic\', sans-serif">'+text+'</text>';
		html += '</pattern>';
		//날짜
		html += '<pattern id="textstripe2" patternUnits="userSpaceOnUse" '+opt2+' patternTransform="rotate(-20)">';
		html += '<text '+pos2+' font-size="120" style="color:#000;font-family:\'맑은 고딕\', \'나눔 고딕\', Dotum, \'droid sans fallback\', \'AppleGothic\', sans-serif">'+getFormatDate(date)+'</text>';
		html += '</pattern>';
		html += '</defs>';
		html += '<rect width="100%" height="100%" fill="url(#textstripe)" />';
		html += '<rect width="100%" height="100%" fill="url(#textstripe2)" />';
		html += '</svg>';
	}
	var $body = $("body");
	$body.append(html);
}
function getFormatDate(date){
	var year = date.getFullYear();
	var month = (1 + date.getMonth());
	month = month >= 10 ? month : '0' + month;
	var day = date.getDate();
	day = day >= 10 ? day : '0' + day;

	return  year + '-' + month + '-' + day;
}

////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                        //
//  개발 적용 시 현재 라인 아래로는 소스코드 제거                                                                   //
//                                                                                                                                                        //
////////////////////////////////////////////////////////////////////////////////
/**
 * 메인 화면안에 다이얼 로그 창을 생성후 그안에 사용자 프레임을 로드해 준다.
 * @type void
 * @param strUrl - 표시할 주소, strTitle - 메세지 창의 제목을 입력해준다.
 */
gf_DialogFrame = function(sUrl, sWidth, sHeight, sTitle, sModal, sResize, sOverflow, sData, sCallback, sButtonOpt){
	var pBody;
	var dialog;
	var vDate = new Date();
	var vdName = "";
	var dvFrame;
	var iframe;
	var dOpt = new Object();
	var glv_Arg;       ///gv_gArg 변수 대체

	vdName = sUrl;

	if(!gf_isNull(parent)){
		pBody = parent.$("body");
		glv_Arg = parent.gv_gArg;
	}else{
		pBody = $("body");
		glv_Arg = gv_gArg;
	}

	var tW, tH;
	/*
	if(mobilecheck()){
		tW = $(window).outerWidth(true);
		tH = $(window).outerHeight(true);
	}else{
		tW = sWidth;
		tH = sHeight;
	}
	*/
	tW = sWidth;
	tH = sHeight - 67;
	if(tH >= $(parent.window.document).outerHeight()){
		tH = $(parent.window.document).outerHeight() - 100;
	}

	if(gf_isNull(sResize)) sResize = false;
	if(gf_isNull(sModal)) sModal = true;
	if(gf_isNull(sOverflow)){
		sOverflow = "no";
	}else{
		sOverflow = "yes";
	}
	dvFrame = $("<div class='divFrame_" + vdName + "' ></div>").css('zIndex', 999).css('overflow', 'hidden');
	dvFrame.css('width', tW).css('height', tH );

	iframe = $('<iframe frameborder="0" marginwidth="0" marginheight="0" scrolling="' + sOverflow + '"></iframe>');

	dOpt.autoOpen = false;
	dOpt.modal = sModal;
	dOpt.resizable= sResize;
	dOpt.width = "auto";
	dOpt.height = "auto";
	dOpt.title = sTitle;
	dOpt.show = {effect : "fade", duration : 200};
	dOpt.close = function(){
		//parent.gv_gArg.pop();
	};
	dOpt.buttons = sButtonOpt;

	dialog = dvFrame.append(iframe).appendTo(pBody).dialog(dOpt);

	iframe.attr({
		width: +tW,
		height: +tH,
		src: sUrl
	});

	dialog.dialog({
		position: {my: "center", at: "center", of: parent.window}
	});
	dialog.parent('.ui-dialog').css('zIndex', 999);
	dialog.parent('.ui-dialog').css('overflow', 'hidden');
	dialog.dialog("open");
	//Dialog 닫기 시 해당 ele Remove..
	dialog.dialog({
		close : function(event, ui){
			$(this).dialog("destroy").remove();
		}
	});
	dialog.parent('.ui-dialog').dblclick(function(e){
	if(dialog.parent('.ui-dialog').height() > 67)
		dialog.parent('.ui-dialog').height(67);
	else
		dialog.parent('.ui-dialog').height(dvFrame.height() + 40);
	});

	dialog.parent('.ui-dialog').resize(function(e){
		iframe.attr({width : dvFrame.css('width'), height : dvFrame.css('height') });
	});

	/*
	if(mobilecheck()){
		dialog.dialog({
			width : $(window).outerWidth(true),
			//height: $(window).outerHeight(true),
			postion:{ my:"left top", at:"left top"}
		});
	}
	*/

	if(gf_isNull(sTitle))  dialog.parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

	//glv_Arg.PopID = dialog;
};

/*******************************************************************************
 * Function Name  : gf_confirm
 * Description   : 메세지 확인창  예/아니오를 선택 할수 있다. 
 * Parameter    : title  - 제목,html - 내용,callback - 예 일경우 처리 함수, 
 *        onlyOk - 버튼이 하나만 필요한 경우 true, rvOK - 버튼 표시명, rvNO - 버튼 표시명
 * Return     : void
 * 사 용 법    : gf_confirm("선택팝업 창", "내용을 보고 예/아니오를 선택하세요. ",  사용자 콜백함수 명, false, "예", "아니오")  이렇게 사용하세요.
 *******************************************************************************/
var gf_confirm = function(title,html,callback, onlyOk, rvOK, rvNO){
	var lv_dOpt = new Object();

	if(gf_isNull(onlyOk)) onlyOk = false;
	if(gf_isNull(rvOK)) rvOK = "예";
	if(gf_isNull(rvNO)) rvNO = "아니오";
 
	lv_dOpt.title = title;
	lv_dOpt.dialogClass = "mg-message-dialog";
	lv_dOpt.resizable = false;
	lv_dOpt.autoOpen = false;
	lv_dOpt.width = "auto";
	lv_dOpt.position = "center";
	lv_dOpt.minHeight = 0;
	lv_dOpt.modal = true; 

	if (callback) {
		lv_dOpt.buttons = [{ text: "OK", click: function() { $( this ).dialog( "destroy" ); }}];  
	}else{
		if(onlyOk){
			lv_dOpt.buttons = [{
				text : rvOK,
				click : function() {
					$( this ).dialog( "destroy" );
					callback(true);
					return false;
				}
			}];
		}else{
			lv_dOpt.buttons = {
				OK : {
					text : rvOK,
					click : function() {
					$( this ).dialog( "destroy" );
					callback(true);
					return false;
				}
			},
			NOK : {
				text : rvNO,
					click : function() {
						$( this ).dialog( "destroy" );
						callback(false);
						return false;
					}
				}
			};
		};
	};

	if (callback) {
		var a_dialog = $("<div></div>").dialog(lv_dOpt);
	} else {
		var a_dialog = $("<div></div>").dialog(lv_dOpt);
	}

	a_dialog.dialog("open").html(html).parent().removeClass("ui-corner-all").children(".ui-dialog-titlebar").removeClass("ui-corner-all");
	$(".ui-dialog").css({left:($(window).width() / 2) - (a_dialog.width() /2) + "px", top: ($(window).height() / 2) - a_dialog.height() + "px"});
	a_dialog.find('button').focus();
};

function gf_isNull(val){
	var bool;
	if(val == "" || val == "undefined" || val == null){
		bool = true;
	}else{
		bool = false;
	}
	return bool;
}

var closeDialog = function(ele){
	if(parent.$("body").find(target).length > 0){
		//parent.$("body").find(target).closest(".ui-dialog").dialog("close");
		parent.$("body").find(target).dialog("close");
	}
}