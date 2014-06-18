(function($){
	var list = $('.portfolio-items'),
		// Vsight = $('.site').width(),
		showVisibleItems = function(){
			list.children('.item').each(function(el, i){
				var $this = $(this),
					Left = $this.offset().left,
					isFall =$this.hasClass('falldown');
				if(!isFall){
					if(Left <= 1043-100&&Left >= 396-200){
					$this.addClass('falldown');
					};
				}
				else{
					if(Left>1043-100||Left<230){
					$this.removeClass('falldown');
					};
				}
			});
		
		};
	showVisibleItems();

	list.scroll(function(){
		showVisibleItems();
	});

	list.on('mousemove','img',function(e){
		var $this = $(this),
			view = $this.parent('.view'),
			posX = e.pageX,
			posY = e.pageY,
			originX = view.offset().left,
			originY = view.offset().top,
			
			imgWidth = $this.width(),
			imgHeight = $this.height(),
			viewWidth = view.width(),
			viewHeight = view.height(),
			ratioW = (imgWidth - viewWidth) / imgWidth,
			ratioH = (imgHeight - viewHeight) / imgHeight;

		$this.css({
			'left': - (posX - originX) * ratioW,
			'top': - (posY - originY) * ratioH,
		});
	});

	list.on('mouseleave','img',function(){
		$(this).css({
			'left': 0,
			'top': 0,
		})
	});

	list.mousewheel(function(event, delta){
		this.scrollLeft -= (delta * 60);
		event.preventDefault();
	});
})(jQuery);  //这种写法避免了与其他库类冲突