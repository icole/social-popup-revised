(function($) {
	
	$.fn.socialPopUP = function(options) {
		var defaults = { days_no_click : "10" };
		var options = $.extend(defaults, options);
		companyname = defaults.company;
		tw_aff = defaults.tw_aff;
		fb_aff = defaults.fb_aff;
		pt_aff = defaults.pt_aff;
		go_aff  = defaults.go_aff;
		getPopHTML = function() {
			var spClose = '';
			if (defaults.closeable == true) {
				spClose = '<a href="#" onClick="spuFlush('+defaults.days_no_click+');" id="spu-close">Close<a/>';
			}
			var markup = '';
			markup = markup + '<div id="spu-bg"></div><div id="spu-main"><div id="spu-title">' + spClose + '' + defaults.title + '</div><div id="spu-msg-cont"><div id="spu-msg">' + defaults.message + '</div>';
			if (defaults.img_url != "" && defaults.img_link != "") {
				markup = markup + '<div id="spu-img"><a href="' + defaults.img_link + '" onClick="img_onClick()" TARGET="_blank"><img src="' + defaults.img_url + '"></a></div>';
			}
			if (defaults.tw_enabled == true) {
			 	markup = markup + '<div class="spu-button first"><a href="https://twitter.com/' + defaults.twitter_user + '" class="twitter-follow-button" data-show-count="false" data-size="large">Follow Me</a></div>';
			}
			if (defaults.pt_enabled == true) {
				markup = markup + '<div class="spu-button"><a href="http://pinterest.com/' + defaults.pt_user + '" onClick="pt_onClick()" TARGET="_blank"><img src="http://passets-cdn.pinterest.com/images/pinterest-button.png" width="78" height="26" alt="Follow Me on Pinterest" /></a></div>'
			}
			if (defaults.fb_enabled == true) {
				markup = markup + '<div class="spu-button"><div id="fb-root"></div><fb:like href="' + defaults.fb_url + '" send="false"  show_faces="false" data-layout="button_count"></fb:like></div>';
			}
			if (defaults.go_enabled == true) {
				markup = markup + '<div class="spu-button"><div class="g-plusone" data-callback="googleCB" data-action="share" data-annotation="bubble" data-height="24" data-href="' + defaults.go_url + '"></div></div>';
			}
			var sCredits = '';
			if (defaults.credits) sCredits = '<span style="font-size:10px;float: right;margin-top: -6px;">By <a href="http://www.masquewordpress.com">MasqueWordpress.com</a></span>';
			markup = markup + '<div class="step-clear"></div></div><div id="spu-bottom">' + sCredits + '</div></div>';
			return markup;
		}
		var markup = getPopHTML();
		$('body').append(markup);
		var cook = readCookie(companyname);
		var waitCook = readCookie('spuwait');
		if (cook != 'true' && waitCook != 'true') {
			var windowWidth = document.documentElement.clientWidth;
			var windowHeight = document.documentElement.clientHeight;
			var popupHeight = $("#spu-main").height();
			var popupWidth = $("#spu-main").width();
			$("#spu-main").css({
				"top": 150,
				"left": windowWidth / 2 - popupWidth / 2
			});
			$("#spu-bg").css({
				"height": windowHeight
			});
			$("#spu-bg").css({
				"opacity": defaults.opacity
			});
			$("#spu-bg").fadeIn("slow");
			$("#spu-main").fadeIn("slow");
			$("#page").css({
				"color": "transparent",
   				"text-shadow": "0 0 10px black"
			})
		}
		if (defaults.advancedClose == true) {
			$(document).keyup(function(e) {
				if (e.keyCode == 27) {
					spuFlush(defaults.days_no_click);
				}
			});
			$('body').click(function() {
				spuFlush(defaults.days_no_click);
			});
			$('#spu-main').click(function(event) {
				event.stopPropagation();
			});
		}
		return true;
	};
})(jQuery);
jQuery(document).ready(function(){
FB.Event.subscribe('edge.create', function(href) {
	spuFlush(fb_aff);
});
twttr.ready(function(twttr) {
	twttr.events.bind('tweet', twitterCB);
	twttr.events.bind('follow', twitterCB);
});
});

function img_onClick() {
	spuFlush();
}

function pt_onClick() {
	spuFlush(pt_aff);
}

function twitterCB(intent_event) {
	spuFlush(tw_aff);
}

function googleCB() {
	spuFlush(go_aff);
}

function spuFlush( affurl ) {
	createCookie(companyname, 'true');
	
	jQuery("#spu-bg").fadeOut("slow");
	jQuery("#spu-main").fadeOut("slow");
	jQuery("#page").css('color', '');
	jQuery("#page").css('text-shadow', '');
	if (affurl != '') {
		frame = "<iframe width='1' height='1' frameborder='0' src='" + affurl + "'></iframe>"
		jQuery('body').append(frame);
	}
}

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}