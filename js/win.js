(function(){
	//get the background-color for each tile and apply it 	
	$('.tile').each(function(){
		var $this = $(this),
			page = $this.data('page-name'),
			bgcolor = $this.css('background-color'),
			textColor = $this.css('color');

		//if the tile rotates, we'll use the colors of the front face
			if($this.hasClass('rotate3d')){
				frontface = $this.find('.front');
				bgcolor = frontface.css('background-color');
				textColor = frontface.css('color');
			}

			if($this.hasClass('fig-tile')){
				caption = $this.find('figcaption');
				bgcolor = caption.css('background-color');
				textColor = caption.css('color');
			}

		$this.on('click',function(){
			$('.'+page).css({'background-color': bgcolor, 'color': textColor})
                     .find('.close-button').css({'background-color': textColor, 'color': bgcolor});
		});
	});
	function showDashBoard(){
		for(var i=1; i<=3; i++){
			$('.col'+i).each(function(){
				$(this).addClass('fadeInForward-'+i).removeClass('fadeOutback')
			});
		}
	}
	function fadeDashBoard(){
		for(var i=1; i<=3; i++){
			$('.col'+i).addClass('fadeOutback').removeClass('fadeInForward-'+i);	
		}
	}

	//listen for when a tile is clicked
	$('.tile').each(function(){
		var $this = $(this),
			pageType = $this.data('page-type'),
			page = $this.data('page-name'),
			app = $this.data('app-name');

		$this.on('click',function(){
			// if(app){
			// 	$('.'+page+' .page-title').text(app);
			// }
			// else{
			// 	$('.'+page+' .page-title').text();
			// }
			if(pageType == "s-page"){
				fadeDashBoard();
				$('.'+page).addClass('slidePageInFromLeft').removeClass('slidePageBackLeft');

			}
			else{
				$('.'+page).addClass('openpage');
				fadeDashBoard();
			}
		});
	});

	//when a close button is clicked
	$('.r-close-button').click(function(){
		$(this).parent().addClass('slidePageLeft')
          .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                $(this).removeClass('slidePageLeft').removeClass('openpage');
			});
		showDashBoard();
	});

	$('.s-close-button').click(function(){
		$(this).parent().removeClass('slidePageInFromLeft').addClass('slidePageBackLeft');
		showDashBoard();
	});
})();