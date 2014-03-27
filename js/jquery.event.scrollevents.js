// jquery.event.scrollevents
// 
// 0.4
// 
// 'scrolltop' and 'scrollbottom' events fire when the user has reached the top
// or bottom scroll limit.

(function(jQuery, undefined){
	
	function scrollhandler(e) {
		var elem = e.data,
		    scrollTop, scrollHeight;
		
		if (this === window) {
			scrollTop = (document.documentElement.scrollTop || document.body.scrollTop);
			scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			scrollLeft = (document.documentElement.scrollLeft || document.body.scrollLeft);
			scrollWidth = document.documentElement.scrollWidth - document.documentElement.scrollWidth;
		}
		else {
			scrollTop = this.scrollTop;
			scrollHeight = this.scrollHeight - this.clientHeight;
			scrollLeft = this.scrollLeft;
			scrollWidth = this.scrollWidth - this.clientWidth;
		}
		
		if (scrollTop <= 0) {
			e.type = "scrolltop";
		}
		else if (scrollTop >= scrollHeight) {
			e.type = "scrollbottom";
		}
		else if (scrollLeft <= 0) {
			e.type = "scrollleft";
		}
		else if (scrollLeft >= scrollWidth) {
			e.type = "scrollright";
		}
		else {
			return;
		}
		
		// let jQuery handle the triggering
		jQuery.event.handle.apply(this, arguments);
	}
	
	function setup(data, namespaces, eventHandle) {
		var elem = jQuery(this),
		    events = elem.data('events');
		
		// Don't bind the scroll handler if it is already bound by the
		// other scroll event.
		if ((events.scrolltop ? 1 : 0) +
		    (events.scrollbottom ? 1 : 0) > 1) { return; }
		
		elem.bind('scroll', elem, scrollhandler);
	}
	
	function teardown(namespace) {
		var elem = jQuery(this),
		    events = elem.data('events');
		
		// Don't unbind the scroll handler if we still need it for the
		// other scroll event.
		if ((events.scrolltop ? 1 : 0) +
		    (events.scrollbottom ? 1 : 0) > 1) { return; }
		
		jQuery(this).unbind('scroll', scrollhandler);
	}
		
	jQuery.event.special.scrolltop =
	jQuery.event.special.scrollbottom = {
		setup: setup,
		teardown: teardown
	};
	
})(jQuery);
