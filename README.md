# ScrollableView
====

ScrollableView wrapper for iOS and Android

xml

	<Widget id="scrollable" src="com.imobicloud.scrollable" class="photos-scrollable"/>

app.tss

	".photos-scrollable": { height: 336.5 }
	    // ".photos-scroller": {}
		".photos-scroller[platform=ios]": { showPagingControl: true, pagingControlColor: 'transparent', pagingControlHeight: 103, overlayEnabled: true }
			".photo": { width: 375, height: 336.5 }
		".photos-paging[platform=android]": { height: 103, bottom: 0, touchEnabled: false }
			".photos-paging-inner[platform=android]": { width: Ti.UI.SIZE, height: 5, layout: 'horizontal', touchEnabled: false }
				".photos-paging-dot[platform=android]": { width: 5, height: 5, left: 4.5, borderRadius: 2.5, backgroundColor: '#fff', touchEnabled: false }
				".photos-paging-dot-on[platform=android]": { opacity: 0.97 }
				".photos-paging-dot-off[platform=android]": { opacity: 0.45 }

js 

    var views = [];
	for (var i=0; i < 3; i++) {
	  	views.push( $.UI.create('ImageView', { classes: 'photo', image: '/demo/location/details/bg.jpg' }) );
	};
	$.scrollable.load($, { 
		useCustom: false, // use custom paging for iOS
		classes: 'photos', 
		views: views 
	});

	$.scrollable.unload();