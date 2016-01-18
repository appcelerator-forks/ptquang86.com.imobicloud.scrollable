var args = arguments[0] || {},
	lastPaging,
	useCustom,
	classes,
	scroller,
	paging,
	G;

init();
function init() {
	var exclude = ['id', 'children'];
	$.container.applyProperties(_.omit(args, exclude));
}

/*
 params = { 
 	useCustom: false,
 	classes: 'photos', 
 	views: views 
 }
 * */
exports.load = function(_G, params) {
	useCustom = params.useCustom;
	classes = params.classes;
	G = _G;
	
	scroller && reset();
	
	loadScroller(params);
	
	if (OS_ANDROID || useCustom) {
		loadPaging();
	}
	scroller.addEventListener('scrollend', scrollerScrollend);
};

exports.unload = function() {
	reset();
	G = null;
};

function reset() {
	scroller.removeEventListener('scrollend', scrollerScrollend);
  	scroller.setViews([]);
  	$.container.removeAllChildren();
  	scroller = null;
  	paging = null;
}

function loadScroller(params) {
  	scroller = G.UI.create('ScrollableView', { classes: classes + '-scroller' });
	
	var views = args.children || params.views;
	for(var i=0,j=views.length; i<j; i++){
		scroller.addView(views[i]);
	};
	
	$.container.add(scroller);
	
	args.children = null; 
}

function loadPaging() {
	var container = G.UI.create('View', { classes: classes + '-paging' });
		paging = G.UI.create('View', { classes: classes + '-paging-inner' });
	
	  	for (var i=0, ii = scroller.views.length; i < ii; i++) {
	  		var dot = G.UI.create('View', { classes: classes + '-paging-dot ' + classes + (i ? '-paging-dot-off' : '-paging-dot-on') });
	  		i == 0 && (dot.left = 0);
	  		paging.add(dot);
	  	}
  	
  		container.add(paging);
  	$.container.add(container);
  	
  	lastPaging = 0;
}

function scrollerScrollend(e) {
	var currentPage = e.currentPage;
	if (currentPage == lastPaging) { return; }
	
	if (OS_ANDROID || useCustom) {
		var dots = paging.children;
		dots[lastPaging ].applyProperties( G.createStyle({ classes: classes + '-paging-dot-off' }) );
		dots[currentPage].applyProperties( G.createStyle({ classes: classes + '-paging-dot-on'  }) );
		lastPaging = currentPage;
	}
	
	$.trigger('scrollend', e);
}