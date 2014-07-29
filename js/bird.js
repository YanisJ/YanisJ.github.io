;(function($){


			
	function Stage(obj){

		this.stage = obj;

		this.ground = $("<div></div>");
		this.ground.addClass('ground');

		this.stage.append(this.ground);

		this.l = parseInt(this.ground.css('left'));
	}

	Stage.prototype.animation = function(){
		if(this.l <= -72){
			this.l = 0;
		}
		else{
			this.l = this.l - 3;
			this.ground.css('left', this.l);
		}
	}

	Stage.prototype.gameOver = function(){
		
	}




	// Class Bird
	// 将鸟的相关代码移到这个类中

	function Bird(){
		
		this.bird = this.init();
		this.speed = 0;
		this.birdTop = parseInt(this.bird.css('top'));

	}

	Bird.prototype.init = function(){

		var bird = $("<div class='bird fly'></div>");
		
		return bird;

	}


	Bird.prototype.animation = function(){

		this.speed =  0.5 + this.speed;

		if(isNaN(this.birdTop)){
			this.birdTop = parseInt(this.bird.css('top'));
		}
		
		var distance = this.birdTop+this.speed;


		if(this.speed < 0){
			if(this.bird.hasClass('down')){
				this.bird.removeClass('down');
			}

			this.bird.addClass('up');
		}
		else{
			if(this.bird.hasClass('up')){
				this.bird.removeClass('up');
			}

			this.bird.addClass('down');
		}

		

		if(distance >= 418){
			distance = 418;
		}

		if(distance <= 0){
			distance = 0;
		}

		this.birdTop = distance;
		this.bird.css('top', this.birdTop);

	}

	Bird.prototype.dead = function(){


		var self = this,
			bird = this.bird,
			v = -8;

		bird.removeClass('fly').removeClass('up').removeClass('down').addClass('down');

		var interval = setInterval(function(){

			v = v + 1;
			self.birdTop = self.birdTop + v;

			if(self.birdTop >= 550){
				clearInterval(interval);
			}
			else{
				
				bird.css('top', self.birdTop);
			}
		}, 20);

	}

	

	// Bird end

	

	// Class Pip
	
	function Pip(){
		
		this.pipes = [];
		
	};

	
	Pip.prototype.addPip = function(){
		
		var hOfPipeTop = Math.random()*200 + 60,
			hOfPipeBottom = 448 - 120 - hOfPipeTop;
		
		// 生成div
		var pipe       = $("<div class='pipe'></div>"),
			pipeTop    = $("<div class='up'></div>"),
			pipeBottom = $("<div class='down'></div>");
		
		pipeTop.css('height', hOfPipeTop);
		pipeBottom.css('height', hOfPipeBottom);
		
		pipe.append(pipeTop);
		pipe.append(pipeBottom);
			
		pipe.css('left', 484);

		$(document).trigger('pipe_create', pipe);
		return pipe;
	};


	Pip.prototype.animation = function(){

		

		if(this.pipes.length == 0){
			this.pipes.push(this.addPip());
			return false;
		}
		else{
			for(i in this.pipes){
				var pipe = this.pipes[i],
					pos = parseInt($(pipe).css('left'));
				
				$(pipe).css('left', pos-3);

			}
		}

		
		
		var firstPipe = $(this.pipes[0]),
			lastPipe  = this.pipes[this.pipes.length - 1];

		
		
		if(parseInt(firstPipe.css('left'))<=(-68)){
			firstPipe.remove();
			this.pipes.splice(0,1);
		}

		if(parseInt(lastPipe.css('left'))==205){       
			this.pipes.push(this.addPip());
		}

		


	};

	

	// Pip end

	function Score(){

		this.num = 0;
		this.elm = this.init();

	}

	Score.prototype.init = function(){

		var elm = $('<div><div class="number" id="number2"></div><div class="number" id="number1"></div></div>');
			
		
		elm.addClass('score');
	

		return elm;

	}

	Score.prototype.showScore = function(){

		this.num += 1;

		if(this.num<10){
			
			var num = this.elm.find('#number1');

			num.css('background-position', -(this.num*45));
			
		}else{
			
			var n1 = parseInt(String(this.num)[1]);
				n2 = parseInt(String(this.num)[0]);
				num1 = this.elm.find('#number1');
				num2 = this.elm.find('#number2');
			
			if(num2.css('background-image') == 'none'){

				num2.css('background-image', num1.css('background-image'));

			}

			num1.css('background-position', -(n1*45));
			num2.css('background-position', -(n2*45));

		}

	}

	


	

	// GAME

	function Game(obj){

		this.stage = obj;
		

		this.s = new Stage(obj);
		

		this.startTime   = new Date().getTime();
		this.pipe        = new Pip();
		this.bird        = new Bird();
		this.score       = new Score();
		

		this.stage.append(this.bird.bird);
		this.stage.append(this.score.elm);


		this.initEvent();

	}

	Game.prototype.begin = function(){

		var self = this;
			

		this.interval = setInterval(function(){
			
			self.run();      // 这里用this会指向window 

		}, 1);

	}

	Game.prototype.run = function(){
		
		var nowTime = new Date().getTime();

		if(nowTime - this.startTime > 1000/60){

			this.pipe.animation();

			this.bird.animation();

			this.s.animation();

			this.hit();

			this.startTime = nowTime;
		}
	}

	
	Game.prototype.initEvent = function(){
		var self = this;

		this.stage.on('mousedown', function(event) {
		
			self.bird.speed = -8;

		});

		$(document).on('pipe_create', function(e,pipe) {
			
			self.stage.append(pipe);
			
		});
	}


	Game.prototype.hit = function(){

		var	tp = this.pipe.pipes[0],
			tL = parseInt(tp.css('left')),
			tb = this.bird.birdTop;



		if(tb >= 418){
			this.gameover();
		}


		if(Math.abs(tL-87) <= 54){
			
			var hb = parseInt(tp.find('.up').css('height'));
			
			if(tb <= hb || tb >= hb+90){
				this.gameover();
			}

		}

		// =============== score ===============
		if(tL == 130){
			
			this.score.showScore();
			
		}

	}

	Game.prototype.gameover = function(){
		
		
		clearInterval(this.interval);
		this.bird.dead();

	}


	window.Game = Game;

	
})(jQuery);