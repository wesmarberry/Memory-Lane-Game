//inially hides the form for the 2 player game that selects the grid size
$('#grid-size').hide()
//initially hides the game container
$('#game-container').hide()
$('#one-player-modes').hide()

class Player {
	constructor(name, squareOn, board, playerNum, gameBoard) {
		this.name = name 
		this.onPath = true // player property that is update if the player is on the active path
		this.squareOn = squareOn // player property that tracks the class of the square the player is on
		this.image = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12111689-e376-408b-9063-547f262f3eac/d8bhjyj-cb4e50bf-9128-4d70-ad02-7e08e4b70d7f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyMTExNjg5LWUzNzYtNDA4Yi05MDYzLTU0N2YyNjJmM2VhY1wvZDhiaGp5ai1jYjRlNTBiZi05MTI4LTRkNzAtYWQwMi03ZTA4ZTRiNzBkN2YucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fniOFIOeZsBIYZfe3mXRMsTJE1HZLQjCzzVDq2TDwAY' //player image
		this.win = false // changes if player reaches the end square
		this.arrowPresses = 0 //tracks how many squares the player has gotten to that are on the path
		this.gameBoard = gameBoard
		this.board = board // dirrerentiates the board player 1 is on and the board player 2 is on
		this.playerNum = playerNum // tracks the player number (1 or 2)
		this.lives = 10
	}
	fall() {
		
		$(this.gameBoard + ' .start-platform').append($('<img/>').attr('src', this.image).css('height', '40px'))
		$(this.board + ' .active').css('background-color', '#222222')
		this.squareOn = '0-' + game.startSquare[2]
		this.arrowPresses = 0
	}
	move(key) {
		if (this.win === false) {
			let row = Number(game.getRowCol(this.squareOn)[0])
			console.log(row);
			let column = Number(game.getRowCol(this.squareOn)[1])
			$(this.gameBoard + ' .start-platform img').remove()
			$(this.board + ' .' + this.squareOn + ' img').remove()
			console.log(column);
			if (key === 'ArrowUp') {
				row += 1
				this.squareOn = row + '-' + column
				if (this.squareOn === game.activeSquares[this.arrowPresses]) {
					console.log('You are on the path');
					$(this.board + ' .' + this.squareOn).css('background-color', 'blue')
					$(this.board + ' .' + this.squareOn).append($('<img/>').attr('src', this.image).css('height', '40px'))
					this.arrowPresses++
				} else {
					console.log('you are not on the path. Restart');
					this.fall()
				}
			}
			if (key === 'ArrowLeft') {
				column += 1
				this.squareOn = row + '-' + column
				if (this.squareOn === game.activeSquares[this.arrowPresses]) {
					console.log('You are on the path');
					$(this.board + ' .' + this.squareOn).css('background-color', 'blue')
					$(this.board + ' .' + this.squareOn).append($('<img/>').attr('src', 'https://vignette.wikia.nocookie.net/goanimate-v2/images/5/59/Crash_Bandicoot_-_Koopa_Kart_Wii.png/revision/latest?cb=20180603034204').css('height', '40px'))
					this.arrowPresses++
				} else {
					console.log('you are not on the path. Restart');
					this.fall()
				}
			}
			if (key === 'ArrowRight') {
				column -= 1
				this.squareOn = row + '-' + column
				if (this.squareOn === game.activeSquares[this.arrowPresses]) {
					console.log('You are on the path');
					$(this.board + ' .' + this.squareOn).css('background-color', 'blue')
					$(this.board + ' .' + this.squareOn).append($('<img/>').attr('src', this.image).css('height', '40px'))
					this.arrowPresses++
				} else {
					console.log('you are not on the path. Restart');
					this.fall()

				}
			}
			if (this.squareOn === game.endSquare) {
				// $(this.board + ' .' + game.endSquare).css('background-color', 'blue').append($('<img/>').attr('src', this.image).css('height', '40px'))
				// $('.' + this.squareOn + ' img').remove()
				this.win = true
				setTimeout(() => {
					$(this.board + ' .' + this.squareOn + ' img').remove()
					$(this.gameBoard + ' .end-platform').css('background-color', 'blue').append($('<img/>').attr('src', this.image).css('height', '40px'))
					setTimeout(() => {
					this.winner()	
					}, 500)
				}, 500)
				
			}
		}	
	}	
	winner(){
		if (game.numberPlayers === 1) {
			console.log('You win');
			game.level += 1
			$('#timer h3').remove()
			game.boardSize += 2
			$('#game-board').children().remove()
			game.activeSquares = []
			game.availableSquareArr = []
			$('#countdown').remove()
			game.generateBoard()
		} else {
			player1.win = true
			player2.win = true
			console.log('Player ' + this.playerNum + ' wins!');
			$('h4').text('Player ' + this.playerNum + ' wins!').appendTo($('#timer'))
		}
	}
}

// event listener for mmovement

$(document).on('keydown', (e) => {
	console.log(e.key);
  if(['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) {
    player2.move(e.key)
  }
  if(['a', 'w', 'd'].includes(e.key)) {
  	if (e.key === 'a') {
  		e.key = 'ArrowLeft'
  	} else if (e.key === 'w') {
  		e.key = 'ArrowUp'
  	} else if (e.key === 'd') {
  		e.key = 'ArrowRight'
  	}
    player1.move(e.key)
  }


})


$('#number-players').on('submit', (e) => {
	e.preventDefault()
	let radioValue = $("input[name='players']:checked").val();
	console.log(radioValue);

	if (radioValue === 'onePlayer') {
		game.numberPlayers = 1
		$('#one-player-modes').show()
		$('#number-players').remove()
		$('#grid-size').remove()
		$('h1').remove()
		$('#instructions').remove()

	} else {
		game.numberPlayers = 2
		$('#number-players').remove()
		$('#grid-size').show()
		$('h1').remove()
		$('#instructions').remove()
	}
	
})

$('#grid-size').on('submit', (e) => {
	e.preventDefault()
	let radioValue = $("input[name='gridsize']:checked").val();
	console.log(radioValue);

	if (radioValue === '5') {
		game.boardSize = 5
	} else if (radioValue === '7') {
		game.boardSize = 7
	} else if (radioValue === '9') {
		game.boardSize = 9
	} else if (radioValue === '11') {
		game.boardSize = 11
	} else if (radioValue === '13') {
		game.boardSize = 13
	}
	$('#grid-size').hide()
	game.generateBoard()
	game.divSize = 40
	
})

$('#one-player-modes').on('submit', (e) => {
	e.preventDefault()
	let radioValue = $("input[name='modes']:checked").val();
	console.log(radioValue);
	if (radioValue === 'standard') {
		game.mode = 'standard'
		console.log('Standard mode');
		game.generateBoard()
	} else if (radioValue === 'freestyle') {
		game.mode = 'freestyle'
		game.generateBoard()

	}
})

const game = {
	numberPlayers: 0,
	squares: [],
	activeSquares: [],
	offLimitsSquares: [],
	mode: '',
	boardSize: 3,
	level: 1,
	divSize: 50,
	boardContainerSize: (this.boardSize * this.divSize),
	availableSquareArr: [],
	startSquare: '',
	endSquare: '',
	prevSquare: '',
	currentSquare: '',
	pathTimer: '',
	timeOut: '',
	fadeTime: 3000,
	generateBoard(){
		player1 = null
		player2 = null
		


		if (this.level > 3) {
			this.divSize = 40
		} else if (this.level > 5) {
			this.divSize = 30
		}

		if (this.mode === 'standard' && this.level === 1) {
			console.log('running game mode');
			$('<div/>').attr('id', 'lives').prependTo($('body'))
			$('<h3/>').text('Lives: ').css('margin-right', '30px').appendTo($('#lives'))
			for (let i = 0; i < 10; i++) {
				$('<img/>').attr('src', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12111689-e376-408b-9063-547f262f3eac/d8bhjyj-cb4e50bf-9128-4d70-ad02-7e08e4b70d7f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyMTExNjg5LWUzNzYtNDA4Yi05MDYzLTU0N2YyNjJmM2VhY1wvZDhiaGp5ai1jYjRlNTBiZi05MTI4LTRkNzAtYWQwMi03ZTA4ZTRiNzBkN2YucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fniOFIOeZsBIYZfe3mXRMsTJE1HZLQjCzzVDq2TDwAY').css('height', '30px').appendTo($('#lives'))
			}
		}

		$('#form-container').remove()
		$('#game-container').show()
		$('<h3/>').text('Level: ' + this.level).appendTo($('#timer'))
		$('#game-board').append($('<div/>').attr('class', 'end-platform').css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid white').css('margin-left', this.setMarginForPlatform()))
		$('#game-board').append($('<div/>').attr('id', 'main-grid').css('height', this.boardSize * this.divSize + (this.boardSize * 2) + 'px').css('width', this.boardSize * this.divSize + (this.boardSize *2) + 'px'))
		$('#game-board').append($('<div/>').attr('class', 'start-platform').css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid white').css('margin-left', this.setMarginForPlatform()).css('background-color', 'blue'))
		$('<img/>').attr('src', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12111689-e376-408b-9063-547f262f3eac/d8bhjyj-cb4e50bf-9128-4d70-ad02-7e08e4b70d7f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyMTExNjg5LWUzNzYtNDA4Yi05MDYzLTU0N2YyNjJmM2VhY1wvZDhiaGp5ai1jYjRlNTBiZi05MTI4LTRkNzAtYWQwMi03ZTA4ZTRiNzBkN2YucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fniOFIOeZsBIYZfe3mXRMsTJE1HZLQjCzzVDq2TDwAY').appendTo($('.start-platform'))
		$('<p/>').html('Up : w<br>Left : a<br>Right : d').css('color', 'white').appendTo($('#game-board'))
		$('#game-board').hide()
		$('#game-board').fadeIn(this.fadeTime, () => {
			
		})
		for (let i = 1; i <= this.boardSize; i++) {
			const row = i
			for (let j = 1; j <= this.boardSize; j++) {
				const column = j
				$('#main-grid').prepend($('<div/>').attr('class', row + '-' + column).css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid white'))
			}
		}

		if (this.numberPlayers === 2) {
			console.log('cloning');
			$('#game-board2').append($('<div/>').attr('class', 'end-platform').css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid white').css('margin-left', this.setMarginForPlatform()))
			$('#main-grid').clone().appendTo($('#game-board2')).attr('id', 'main-grid2')
			$('#game-board2').append($('<div/>').attr('class', 'start-platform').css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid white').css('margin-left', this.setMarginForPlatform()).css('background-color', 'blue'))
			$('<img/>').attr('src', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12111689-e376-408b-9063-547f262f3eac/d8bhjyj-cb4e50bf-9128-4d70-ad02-7e08e4b70d7f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyMTExNjg5LWUzNzYtNDA4Yi05MDYzLTU0N2YyNjJmM2VhY1wvZDhiaGp5ai1jYjRlNTBiZi05MTI4LTRkNzAtYWQwMi03ZTA4ZTRiNzBkN2YucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fniOFIOeZsBIYZfe3mXRMsTJE1HZLQjCzzVDq2TDwAY').appendTo($('#game-board2 .start-platform'))
			$('#game-board2').css('margin-left', '100px')
			$('<p/>').html('Up : Up Arrow<br>Left : Left Arrow<br>Right : Right Arrow').css('color', 'white').appendTo($('#game-board2'))
			$('#game-board2').hide()
			$('#game-board2').fadeIn(this.fadeTime, () => {

			})
		}

		$('<h4/>').attr('id', 'countdown').text('10').appendTo($('#timer'))

		setTimeout(() => {
			this.randomPath()
			let a = 0;
			let i = 10;
			let z = 0;
			this.pathTimer = setInterval(() => {
				this.showPath(a)
				if (a < this.activeSquares.length) {
					a++
				} else if (i > 0 && (z % 2 === 0) && z !== 0) {
					i--
					console.log(i);
					$('#countdown').text(i)
					// setTimeout(() => {
					// 	this.startGame()
					// }, 10000)
				} else if (i===0) {
					this.startGame()
					$('#countdown').text('Start!')
					clearInterval(this.pathTimer)
				}
				console.log('interval is going');
				z++
		}, 500)
		}, this.fadeTime)


		
	},
	setMarginForPlatform(){
		const margin = (Math.floor((this.boardSize / 2)) * (this.divSize + 2)) + 'px'
		return margin
	},
	setStartSquare(){
		const row = 1
		const column = Math.ceil(this.boardSize / 2)
		const startSquareId = row + '-' + column
		this.startSquare = startSquareId
		console.log(startSquareId);
		this.endSquare = this.boardSize + '-' + column
	},
	availableSquares(squareId){
		const row = Number(this.getRowCol(squareId)[0])
		const column = Number(this.getRowCol(squareId)[1])
		let square1;
		let square2;
		let square3;
		if (row === 1 && column === 1) {
			square1 = (row + 1) + '-' + column 
			this.availableSquareArr.push(square1)
		} else if (row === this.boardSize && column ===1) {
			square2 = row + '-' + (column + 1)
			this.availableSquareArr.push(square2)
		} else if (row === this.boardSize && column === this.boardSize) {
			square1 = row + '-' + (column - 1)
			this.availableSquareArr.push(square1)
		} else if (row === 1 && column === this.boardSize) {
			square1 = (row + 1) + '-' + column
			this.availableSquareArr.push(square1)
		} else if (row === this.boardSize && column < this.getRowCol(this.endSquare)[1]) {
			square1 = row + '-' + (column + 1)
			this.availableSquareArr.push(square1)
		} else if (row === this.boardSize && column > this.getRowCol(this.endSquare)[1]) {
			square1 = row + '-' + (column - 1)
			this.availableSquareArr.push(square1)
		} else if (column === 1) {
			square1 = (row + 1) + '-' + column
			square2 = row + '-' + (column + 1)
			this.availableSquareArr.push(square1)
			this.availableSquareArr.push(square2)
		} else if (column === this.boardSize) {
			square1 = (row + 1) + '-' + column
			square2 = row + '-' + (column - 1)
			this.availableSquareArr.push(square1)
			this.availableSquareArr.push(square2)
		} else {
			square1 = (row + 1) + '-' + column
			square2 = row + '-' + (column - 1)
			square3 = row + '-' + (column + 1)
			this.availableSquareArr.push(square1)
			this.availableSquareArr.push(square2)
			this.availableSquareArr.push(square3)
		}
		// console.log(this.availableSquareArr);
	},
	randomPath(){
		this.setStartSquare()
		this.currentSquare = this.startSquare
		this.activeSquares.push(this.currentSquare)
		console.log(this.currentSquare);
		console.log(this.endSquare);
 		while (this.currentSquare !== this.endSquare) {
	 			this.availableSquares(this.currentSquare)
	 			// console.log(this.availableSquareArr);
	 			let rand = Math.floor(Math.random() * this.availableSquareArr.length)

	 			if (this.activeSquares.includes(this.availableSquareArr[rand]) === false) {
		 			this.activeSquares.push(this.availableSquareArr[rand])
		 			this.currentSquare = this.availableSquareArr[rand]
		 			this.availableSquareArr = []
		 			console.log('looping');
	 			} else {
	 				this.currentSquare = this.currentSquare
	 				console.log('else looping');
	 			}
 		}
 		// this.activeSquares.shift(this.startSquare)
 		console.log('Final active squares ' + this.activeSquares);
	},
	showPath(a){

			$('.' + this.activeSquares[a]).addClass('active')
			// $('#' + this.activeSquares[i]).attr('class', 'active')
	},
	startGame(){
		console.log('started the game');
		$('.active').css('background-color', '#222222')
		console.log(this.startSquare);
		let row = this.getRowCol(this.startSquare)[0]
		let col = this.getRowCol(this.startSquare)[1]
		player1 = new Player('Wes', '0-' + col, '#main-grid', 1, '#game-board')
		player2 = new Player('player2', '0-' + col, '#main-grid2', 2, '#game-board2')
	},
	getRowCol(str){
		let row;
		let col;
		let arr = []
		arr = str.split('-')
		return arr
	},
}


