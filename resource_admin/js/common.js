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

	//Layer Popup
	hasDataAttr("[data-layer-popup]", function($ele){
		$ele.each(function(){
			$(this).bind({
				"click" : function(e){
					e.preventDefault();

					var $this = $(this), data = $(this).data("layer-popup");
					var href = e.currentTarget.href;
					var name = data.name;
					var width = data.width;
					var height = data.height;
					var left = ($(window).width() - width) /2 + 'px';
					var top = ($(window).height() - height) /2 + 'px';

					var settings = resizePop(width, height, left, top);
					var tw = settings.tmpWidth;
					var th = settings.tmpHeight;
					var tl = settings.tmpLeft;
					var tt = settings.tmpTop;

					//$("body").css("overflow", "hidden");
					$("body").addClass("ovf_hdn");

					//BlockUI ifrmae
					$.blockUI({
						message : $('<iframe src="'+href+'" width="100%" height="100%" style="border:0"></iframe>'),
						draggable: true,
						css:{
							padding:0,
							margin:0,
							width:tw,
							height:th,
							top: tt,
							left: tl,
							textAlign:'left',
							color:'#000',
							border:'0',
							backgroundColor:'#fff',
							cursor:'default',
							overflow:'hidden'
						},
						// styles for the overlay
						overlayCSS:{
							backgroundColor: '#000',
							opacity:0.5,
							cursor:'auto'
						},
						fadeIn:200,
						fadeOut:100,
						onUnblock: function(){
							//$("body").css({"overflow":"visible", "overflow-y":"scroll"});
							$("body").removeClass("ovf_hdn");
						},
						onOverlayClick: $.unblockUI
					});
				}
			});
		});
	});

	//팝업창 닫기
	hasDataAttr("[data-pop-close]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("pop-close");

			$this.on({
				"click" : function(e){
					e.preventDefault();

					if(val == "popup"){
						parent.$.unblockUI();
						$("body", window.parent.document).removeClass("ovf_hdn");
					}
				}
			});
		});
	});
	hasDataAttr("[data-pop-close]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), data = $(this).data("pop-close");

			$this.on({
				"click" : function(e){
					e.preventDefault();

					var txt = data.txt;
					var val = data.val;

					if(txt == null || txt == ""){
						txt = "팝업을 닫으시겠습니까?";
					}
					if(val == "popup"){
						if(confirm(txt)){
							parent.$.unblockUI();
							$("body", window.parent.document).removeClass("ovf_hdn");
						}
					}
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
//Layer Popup Resizing
var resizePop = function(width, height, left, top){
	ww = $(window).width();
	hh  = $(window).height();
	var tmpWidth, tmpHeight, tmpLeft, tmpTop;
	var dW = width, dH = height, dL = left, dT = top;

	//Desktop
	if(ww >= 1024){
		tmpWidth = dW;
		tmpHeight = dH;
		tmpLeft = (ww - dW) / 2;
		tmpTop = (hh - dH) / 2;
	}
	//Tablet
	if(ww < 1024){
		if(ww <= width){
			tmpWidth = width;
			tmpLeft = (ww - width) / 2;
		}
		if(ww > width){
			tmpWidth = "90%";
			tmpLeft = "5%";
		}
		if(hh <= height){
			tmpHeight = height;
			tmpTop = (hh - height) / 2;
		}
		if(hh > height){
			tmpHeight = "90%";
			tmpTop = "5%";
		}
	}
	//Mobile 
	if(ww < 768){
		tmpWidth = "100%";
		tmpLeft = "0";
		tmpHeight = "100%";
		tmpTop = "0";
	}

	$("div.blockPage").css({"width" : tmpWidth, "height" : tmpHeight, "top" : tmpTop, "left" : tmpLeft, "-webkit-overflow-scrolling":"touch"});

	$(window).on('resize',function(){
		ww = $(window).width();
		hh  = $(window).height();

		//Desktop
		if(ww >= 1024){
			tmpWidth = dW;
			tmpHeight = dH;
			tmpLeft = (ww - dW) / 2;
			tmpTop = (hh - dH) / 2;
		}
		//Tablet
		if(ww < 1024){
			if(ww > width){
				tmpWidth = width;
				tmpLeft = (ww - width) / 2;
			}
			if(ww <= width){
				tmpWidth = "90%";
				tmpLeft = "5%";
			}
			if(hh > height){
				tmpHeight = height;
				tmpTop = (hh - height) / 2;
			}
			if(hh <= height){
				tmpHeight = "90%";
				tmpTop = "5%";
			}
		}
		//Mobile 
		if(ww < 768){
			tmpWidth = "100%";
			tmpLeft = "0";
			tmpHeight = "100%";
			tmpTop = "0";
		}

		$("div.blockPage").css({"width" : tmpWidth, "height" : tmpHeight, "top" : tmpTop, "left" : tmpLeft, "-webkit-overflow-scrolling":"touch"});
	});

	return {tmpWidth:tmpWidth, tmpHeight:tmpHeight, tmpLeft:tmpLeft, tmpTop:tmpTop};
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