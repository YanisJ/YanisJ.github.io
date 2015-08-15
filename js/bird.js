;(function($){


// @STAGE
// =========================================================================
	
	function Stage(obj){

		this.elm = obj;

		this.ground = $("<div></div>");
		this.ground.addClass('ground');

		this.elm.append(this.ground);

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







// @BIRD
// =========================================================================

	function Bird(){
		
		this.elm = this.init();
		this.speed = 0;
		this.birdTop = parseInt(this.elm.css('top'));

	}

	
	Bird.prototype.init = function(){

		var bird = $("<div class='bird'></div>");
		bird.addClass('fly');
		
		return bird;

	}


	Bird.prototype.animation = function(){

		this.speed =  0.5 + this.speed;

		var bird = this.elm;

		if(isNaN(this.birdTop)){
			this.birdTop = parseInt(bird.css('top'));
		}
		
		var distance = this.birdTop+this.speed;
		


		if(this.speed < 0){
			if(bird.hasClass('down')){
				bird.removeClass('down');
			}

			bird.addClass('up');
		}
		else{
			if(bird.hasClass('up')){
				bird.removeClass('up');
			}

			bird.addClass('down');
		}

		

		if(distance >= 418){
			distance = 418;
		}

		if(distance <= 0){
			distance = 0;
		}

		this.birdTop = distance;
		bird.css('top', this.birdTop);

	}

	
	Bird.prototype.dead = function(){


		var self = this,
			bird = this.elm,
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

	

	



// @PIPE
// =========================================================================
	
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
		pipe.data('hot', hOfPipeTop);

		$(document).trigger('pipe_create', pipe);
		return pipe;
	};


	Pip.prototype.animation = function(){

		if(this.pipes.length == 0){
			this.pipes.push(this.addPip());
			return false;
		}
		else{
			for(var i in this.pipes){
				var pipe = this.pipes[i],
					pos = parseInt(pipe.css('left'));
				
				pipe.css('left', pos-3);
				

			}
		}

		
		
		var firstPipe = this.pipes[0],
			lastPipe  = this.pipes[this.pipes.length - 1];

		
		
		if(parseInt(firstPipe.css('left'))<=(-68)){
			firstPipe.remove();
			this.pipes.splice(0,1);
		}

		

		if(parseInt(lastPipe.css('left'))==205){       
			this.pipes.push(this.addPip());
		}

	};

	
	Pip.prototype.clearPipes = function(){

		for (var i in this.pipes){
			this.pipes[i].remove();
		}

		this.pipes = [];

	}

	





// @SCORE
// =========================================================================	

	function Score(){

		this.elm = this.init();

		this.eN1 = this.elm.find('#number1');
		this.eN2 = this.elm.find('#number2');

		// this.reset();
	}


	Score.prototype._reset = function(){

		this.num = -1;
		this.showScore();

	}
	

	Score.prototype.init = function(){

		var elm = $('<div><div class="number" id="number2"></div><div class="number" id="number1"></div></div>');
		elm.addClass('score');

		return elm;

	}

	
	Score.prototype.showScore = function(){

		this.num += 1;

		if(this.num<10){

			this.eN1.css('background-position', -(this.num*45));
			this.eN2.css('background-image', 'none');
			
		}else{
			
			var n1 = parseInt(String(this.num)[1]);
				n2 = parseInt(String(this.num)[0]);
				
			
			if(this.eN2.css('background-image') == 'none'){

				this.eN2.css('background-image', this.eN1.css('background-image'));

			}

			this.eN1.css('background-position', -(n1*45));
			this.eN2.css('background-position', -(n2*45));

		}

	}

// Score End





// @SCOREBOARD
// =========================================================================

	function ScoreBoard(){

		this.init();

	}


	ScoreBoard.prototype.init = function(){

		this.elm = $('<div></div>').addClass('scoreboard');
		this.score = $('<div><div class="number" id="number2"></div><div class="number" id="number1"></div></div>').addClass('result recent');
		this.record = $('<div><div class="number" id="number2"></div><div class="number" id="number1"></div></div>').addClass('result record');

		this.elm.append(this.score)
				.append(this.record);

	}

	
	ScoreBoard.prototype.setScore = function(score){

		if(!localStorage.record) localStorage.record = 0;

		if(localStorage.record < score) localStorage.record = score;

		this.showScore(this.score, score);

		this.showScore(this.record, localStorage.record);

	}

	
	ScoreBoard.prototype.showScore = function(tar, score){
		var eN1 = tar.find('#number1'),
			eN2 = tar.find('#number2');

		if(score<10){

			eN1.css('background-position', -(score*22.5));
			eN2.css('background-image', 'none');
			
		}else{
			
			var n1 = parseInt(String(score)[1]);
				n2 = parseInt(String(score)[0]);
				
			
			if(eN2.css('background-image') == 'none'){

				eN2.css('background-image', eN1.css('background-image'));

			}

			eN1.css('background-position', -(n1*22.5));
			eN2.css('background-position', -(n2*22.5));

		}

	}


	


	


// @GAME
// =========================================================================

	function Game(obj){

		this.stage      = new Stage(obj);
		this.isReady    = false;
		

		this.startTime  = new Date().getTime();
		this.pipe       = new Pip();
		this.bird       = new Bird();
		this.score      = new Score();
		this.scoreboard = new ScoreBoard();
		

		this.stage.elm.append(this.bird.elm);
		this.stage.elm.append(this.score.elm);
		this.stage.elm.append(this.scoreboard.elm);


		this.initElm();
		this.initEvent();

	}

	
	Game.prototype.initElm = function(){

		var logo     = this.addElm('logo'),
			tap      = this.addElm('tap'),
			ready    = this.addElm('ready'),
			gameover = this.addElm('gameover'),
			ok       = this.addElm('ok'),
			start    = this.addElm('start');
			
		// this.ok = this.addElm('ok');
		// this.oStart = this.addElm('start');

		
		this.elms = {
			'logo': logo,
			'bird': this.bird.elm, 
			'score': this.score.elm,
			'scoreboard': this.scoreboard.elm,
			'ready': ready,
			'tap': tap,
			'gameover': gameover,
			'ok': ok,
			'start': start
		};
	}


	Game.prototype.initEvent = function(){
		
		var self = this;

		this.stage.elm.on('mousedown', function(event) {

			if(self.isReady == true){
				
				self.isReady = false;
				self.begin();
			
			}
		
			self.bird.speed = -8;

		});

		
		$(document).on('pipe_create', function(e,pipe) {
			
			self.stage.elm.append(pipe);
			
		});

		
		this.elms['ok'].click(function(event) {
			
			self.getReady();

		});

		this.elms['start'].click(function(){
			
			self.getReady();
		})
	}

	
	Game.prototype.run = function(){
		
		var nowTime = new Date().getTime();

		if(nowTime - this.startTime > 1000/60){

			this.pipe.animation();

			this.bird.animation();

			this.stage.animation();

			this.hit();

			this.startTime = nowTime;
		}
	}

	
	Game.prototype.hit = function(){

		var	tp = this.pipe.pipes[0],
			tL = parseInt(tp.css('left')),
			tb = this.bird.birdTop;


		if(tb >= 418){
			this.gameover();
		}


		if(Math.abs(tL-87) <= 54){
			
			var hb = tp.data('hot');
			
			if(tb <= hb || tb >= hb+90){
				this.gameover();
			}

		}

		// =============== score ===============
		if(tL == 130){
			
			this.score.showScore();
			
		}

	}

	
	Game.prototype.addElm = function(name){

		var elm = $("<div></div>").addClass(name);

		this.stage.elm.append(elm);

		return elm;

	}


	Game.prototype.showElm = function(){
		
		for(var i in this.elms){
			this.elms[i].hide();
		}

		for(var i in arguments){
			this.elms[arguments[i]].show();
		}

	}


	Game.prototype.cover = function(){

		this.showElm('logo', 'bird', 'start');
		this.bird.elm.addClass('cover_style').removeClass('fly');

	}

	
	Game.prototype.getReady = function(){
		
		this.isReady = true;
		this.end = false;

		// 删去.down 添加.fly
		this.bird.elm.removeClass('down').removeClass('cover_style').addClass('fly');

		// 这里需要给bird一个位置，下次才会正确出现
		this.bird.birdTop = 250;
		this.bird.elm.css('top', this.bird.birdTop);

		this.showElm('tap','ready','bird');

		this.pipe.clearPipes();
		this.score._reset();
		
		this.score.num = 0;

	}

	
	Game.prototype.begin = function(){

		var self = this;

		this.showElm('bird', 'score');

		var run = function ( timestamp ) {
            if ( !self.startTime ) self.startTime = timestamp;
            
            if ( !self.end ) {

                self.pipe.animation();
                self.bird.animation();
                self.stage.animation();

                self.hit();

                self.startTime = timestamp;

                self.ani = window.requestAnimationFrame(run);
            }
        };

        window.requestAnimationFrame(run);
	}
	
	
	Game.prototype.gameover = function(){
		
		this.end = true;
		window.cancelAnimationFrame(this.ani);
		this.bird.dead();
		this.showElm('bird', 'gameover', 'scoreboard', 'ok');
		this.scoreboard.setScore(this.score.num);

	}


// Game End


	window.Game = Game;

	
})(jQuery);