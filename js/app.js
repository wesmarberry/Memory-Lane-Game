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
		this.win = false // changes if player reaches the end square or if the board needs to be fozen
		this.arrowPresses = 0 //tracks how many squares the player has gotten to that are on the path
		this.gameBoard = gameBoard
		this.board = board // dirrerentiates the board player 1 is on and the board player 2 is on
		this.playerNum = playerNum // tracks the player number (1 or 2)
	}
	fall() {


		//if a player is in standard mode and falls one of the lives will be removed
		if (game.mode === 'standard') {
			// removes image from the dom representing a life
			$('#img' + game.lives).remove()
			// decreases the user's lives
			game.lives--
			//if the lives are zero display game over
			if (game.lives === 0) {
				this.win = true // freezes the board because user's cant move across the board if win is true
				$('#countdown').text('GAME OVER').css('color', 'red') // displays game over where the timer was
			}
		}

		// puts the character image back on the start square when a fall occurrs
		$(this.gameBoard + ' .start-platform').append($('<img/>').attr('src', this.image).css('height', '40px'))

		// changes all of the squares back to the original color
		$(this.board + ' .active').css('background-color', '#222222')

		// updates the start square
		this.squareOn = '0-' + game.startSquare[2]
		// resets the arrow presses
		this.arrowPresses = 0
	}
	move(key) {
		// arrow presses only work when win is false to prevent the user from altering the board in the case
		// of a win or loss
		if (this.win === false) {

			// sets the row that the player is on before moving
			let row = Number(game.getRowCol(this.squareOn)[0])
			console.log(row);
			// sets the column that the player is on before moving
			let column = Number(game.getRowCol(this.squareOn)[1])

			// removes player image from the start platform upon moving
			$(this.gameBoard + ' .start-platform img').remove()
			// removes the player image from the square that the player is on before moving
			$(this.board + ' .' + this.squareOn + ' img').remove()
			console.log(column);

			// triggers moving up one square if the up key is pressed
			if (key === 'ArrowUp') {
				// increases the row
				row += 1
				// updates the new square the player is on
				this.squareOn = row + '-' + column

				// conditional to determine if the player is on the path
				if (this.squareOn === game.activeSquares[this.arrowPresses]) {
					console.log('You are on the path');
					// updates the color of the square if it is on the path
					$(this.board + ' .' + this.squareOn).css('background-color', 'blue')
					// puts the image on the square if it is on the path
					$(this.board + ' .' + this.squareOn).append($('<img/>').attr('src', this.image).css('height', '40px'))
					this.arrowPresses++
				} else {
					// triggers fall method when the square that the player is trying to move to is not on the path
					console.log('you are not on the path. Restart');
					this.fall()
				}
			}
			// same logic as the up arrow except moving left
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
			// same logic as the up arrow except moving right
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
			// if the user is on the end square the round is over and trigger the winner methhod
			if (this.squareOn === game.endSquare) {
				// freezes the board
				this.win = true

				// "animation" for end of the game putting the character on the end platform
				setTimeout(() => {
					// takes the image off of the end square
					$(this.board + ' .' + this.squareOn + ' img').remove()
					// puts the image on the end platform and changed the end platform color to blue
					$(this.gameBoard + ' .end-platform').css('background-color', 'blue').append($('<img/>').attr('src', this.image).css('height', '40px'))
					setTimeout(() => {
						// triggers winner after the image is on the end platform
						// goes to the next level
						this.winner()	
					}, 500)
				}, 500)
				
			}
		}	
	}	
	winner(){
		if (game.numberPlayers === 1) {
			console.log('You win');
			// moves to the next level
			game.level += 1
			// adds one peek for the user on the next level
			game.peeks += 1
			// removes teh timer because it will be added again in the generate board method
			$('#timer h3').remove()
			// increases the board size for the next level
			game.boardSize += 2
			// removes previous level's board
			$('#game-board').children().remove()
			// clears the active squares
			game.activeSquares = []
			// clears the available squares array
			game.availableSquareArr = []
			// removes countdown
			$('#countdown').remove()
			// starts the next level
			game.generateBoard()
		} else {
			// freezes the 2 player game
			player1.win = true
			player2.win = true
			console.log('Player ' + this.playerNum + ' wins!');
			// displays the winner
			$('h4').text('Player ' + this.playerNum + ' wins!').appendTo($('#timer'))
		}
	}
}

// event listener for mmovement

$(document).on('keydown', (e) => {
	console.log(e.key);
  if(['ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) {
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

// event listener for the initial how many players form

$('#number-players').on('submit', (e) => {
	e.preventDefault()
	let radioValue = $("input[name='players']:checked").val();
	console.log(radioValue);

	if (radioValue === 'onePlayer') {
		game.numberPlayers = 1
		// shows the form for one player modes
		$('#one-player-modes').show()
		// removes the previous form
		$('#number-players').remove()
		// removes the form for the 2 player game
		$('#grid-size').remove()
		// removes the start screen text
		$('h1').remove()
		$('#instructions').remove()

	} else {
		game.numberPlayers = 2
		// removes previous form
		$('#number-players').remove()
		// shows the player 2 grid selection form
		$('#grid-size').show()
		// removes the start screen text
		$('h1').remove()
		$('#instructions').remove()
	}
	
})

// for submission for the size of the grid for the 2 player game

$('#grid-size').on('submit', (e) => {
	e.preventDefault()
	let radioValue = $("input[name='gridsize']:checked").val();
	console.log(radioValue);

	// determines the grid size selected
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
	// hides the form 
	$('#grid-size').hide()
	// starts the game
	game.generateBoard()
	game.divSize = 40
	
})

// event listener for the one player modes form

$('#one-player-modes').on('submit', (e) => {
	e.preventDefault()
	let radioValue = $("input[name='modes']:checked").val();
	console.log(radioValue);

	// determines standard or freestyle mode
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
	numberPlayers: 0, // number of players based on form submission
	activeSquares: [], // the active squares on the random path
	mode: '', // mode based on form selction for 1 player gaem
	peekActive: false, // tracker to determine if peek should be allowed.  It should only be allowed after the path is generated
	lives: 10, // lives tracker for players
	boardSize: 3, // initial board size for 1 player game
	level: 1, // initial level
	divSize: 50, // initial size of the squares
	boardContainerSize: (this.boardSize * this.divSize), // determines board size in px
	availableSquareArr: [], // tracker of scquare that are avaialbe to be next on the random path
	peeks: 3, // peek tracker
	startSquare: '', // storage of start square
	endSquare: '', // storage of end square
	currentSquare: '', // tracks current square on randomly generated path
	pathTimer: '', // time for coutndown and path generation
	fadeTime: 3000, // fade in time for game board
	generateBoard(){
		// clears both players so they can be re instantiated once the path is generated.  This prevents
		// the players from moving while the path is being generated because the event listeners won't work
		player1 = null
		player2 = null

		// prevents the player from running the peek function while the board is being genrerated
		this.peekActive = false

		// makes the board a manageable size by altering the size of each square
		if (this.level > 3) {
			this.divSize = 40
		} else if (this.level > 5) {
			this.divSize = 30
		}

		// if the user is in 1 player standard mode the lives are displayed
		if (this.mode === 'standard' && this.level === 1) {
			console.log('running game mode');
			$('<div/>').attr('id', 'lives').prependTo($('body'))
			$('<h3/>').text('Lives: ').css('margin-right', '30px').appendTo($('#lives'))
			for (let i = 1; i <= 10; i++) {
				$('<img/>').attr('src', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12111689-e376-408b-9063-547f262f3eac/d8bhjyj-cb4e50bf-9128-4d70-ad02-7e08e4b70d7f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyMTExNjg5LWUzNzYtNDA4Yi05MDYzLTU0N2YyNjJmM2VhY1wvZDhiaGp5ai1jYjRlNTBiZi05MTI4LTRkNzAtYWQwMi03ZTA4ZTRiNzBkN2YucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fniOFIOeZsBIYZfe3mXRMsTJE1HZLQjCzzVDq2TDwAY').attr('id', 'img' + i).css('height', '30px').appendTo($('#lives'))
			}
		}

		// removes all the forms
		$('#form-container').remove()
		// shows the hidden game container
		$('#game-container').show()
		// displays the current level on the page
		$('<h3/>').text('Level: ' + this.level).appendTo($('#timer'))
		// creates the end platform
		$('#game-board').append($('<div/>').attr('class', 'end-platform').css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid white').css('margin-left', this.setMarginForPlatform()))
		// creates the main grid
		$('#game-board').append($('<div/>').attr('id', 'main-grid').css('height', this.boardSize * this.divSize + (this.boardSize * 2) + 'px').css('width', this.boardSize * this.divSize + (this.boardSize *2) + 'px'))
		// creates start platform
		$('#game-board').append($('<div/>').attr('class', 'start-platform').css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid white').css('margin-left', this.setMarginForPlatform()).css('background-color', 'blue'))
		// puts inital character image on the start platform
		$('<img/>').attr('src', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12111689-e376-408b-9063-547f262f3eac/d8bhjyj-cb4e50bf-9128-4d70-ad02-7e08e4b70d7f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyMTExNjg5LWUzNzYtNDA4Yi05MDYzLTU0N2YyNjJmM2VhY1wvZDhiaGp5ai1jYjRlNTBiZi05MTI4LTRkNzAtYWQwMi03ZTA4ZTRiNzBkN2YucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fniOFIOeZsBIYZfe3mXRMsTJE1HZLQjCzzVDq2TDwAY').appendTo($('.start-platform'))
		// creates the bottom container for the controls and the peek button
		$('<div/>').attr('id', 'bottom-container').appendTo($('#game-board'))
		// displays the controls on the page
		$('<p/>').html('Up : w<br>Left : a<br>Right : d').css('color', 'white').appendTo($('#bottom-container'))
		// puts the peek button on the page if the one player game is being played
		if (this.numberPlayers === 1) {
			$('<button/>').attr('id', 'peek-button').text('Peek ' + this.peeks).appendTo($('#bottom-container'))
		}
		// hides the entire game board to be shown when it fades in
		$('#game-board').hide()
		$('#game-board').fadeIn(this.fadeTime, () => {
			
		})
		// generates all of the squares with unique classes
		for (let i = 1; i <= this.boardSize; i++) {
			const row = i
			for (let j = 1; j <= this.boardSize; j++) {
				const column = j
				$('#main-grid').prepend($('<div/>').attr('class', row + '-' + column).css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid white'))
			}
		}
		// event listener for peek button
		$('#peek-button').on('click', () => {
			console.log('peek button working');
			if (game.peeks > 0) {
				game.peek()
			}
		})

		// generates an identical game board for the two player game and fades in at the same rate
		if (this.numberPlayers === 2) {
			console.log('cloning');
			$('#timer h3').remove()
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

		// displays the timer on the page
		$('<h4/>').attr('id', 'countdown').text('10').appendTo($('#timer'))

		// the timer function starting when the board fades in 
		setTimeout(() => {
			// generates the random path
			this.randomPath()
			// tracking variable for displaying the active squares
			let a = 0;
			// tracking variable for the countdown 
			let i = 10;
			// tracking variable for each time the set interval is run because the squares have to be generated
			// at a different rate than the timer counts (1/2second and 1 second repectively)
			let z = 0;
			this.pathTimer = setInterval(() => {
				// shows the ath element in the active squares array and turns it red
				this.showPath(a)
				if (a < this.activeSquares.length) {
					// adds to a until all of the squares are red
					a++
				} else if (i > 0 && (z % 2 === 0) && z !== 0) { // starts the countdown after all of the active squares are shown
					i--
					console.log(i);
					$('#countdown').text(i)
				} else if (i===0) { // starts the game when the countdown is 0
					this.startGame()
					$('#countdown').text('Start!')
					clearInterval(this.pathTimer)
					// the user can now peek if they want to
					this.peekActive = true
				}
				console.log('interval is going');
				// adds to overall time tracker
				z++
		}, 500)
		}, this.fadeTime)


		
	},
	setMarginForPlatform(){
		// determines where the start and end paltforms should be relative to the edge of the board
		const margin = (Math.floor((this.boardSize / 2)) * (this.divSize + 2)) + 'px'
		return margin
	},
	setStartSquare(){
		// determines which square should be the start square based on the board size
		const row = 1
		const column = Math.ceil(this.boardSize / 2)
		const startSquareId = row + '-' + column
		this.startSquare = startSquareId
		console.log(startSquareId);
		this.endSquare = this.boardSize + '-' + column
	},
	availableSquares(squareId){
		// method puts the squares that are avaiable for the next square on the path into an array
		// will take a parameter that is the current square to randomly select from the avaiable square array


		const row = Number(this.getRowCol(squareId)[0])
		const column = Number(this.getRowCol(squareId)[1])
		let square1;
		let square2;
		let square3;
		// conditional the determines avaiable squares including edge cases
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
		// method that generates the random path

		// sets start square
		this.setStartSquare()
		// initializes the start of the path
		this.currentSquare = this.startSquare
		// puts the start square into the active array
		this.activeSquares.push(this.currentSquare)
		console.log(this.currentSquare);
		console.log(this.endSquare);

		// while loop to keep getting a random square from the avaiable squares until the current square
		// is the end square
 		while (this.currentSquare !== this.endSquare) {
			// determines the avaiable squares from the start square
 			this.availableSquares(this.currentSquare)
 			// random number based on the amount of avaiable squares
 			let rand = Math.floor(Math.random() * this.availableSquareArr.length)

 			// conditional to run if the randomly selected square is not already in the active squares array
 			// determining if the selected square is the previous one on the path
 			if (this.activeSquares.includes(this.availableSquareArr[rand]) === false) {
 				//pushes random square into active squares array
	 			this.activeSquares.push(this.availableSquareArr[rand])
	 			// resets the current square to the square that was added to the active sqaures array
	 			this.currentSquare = this.availableSquareArr[rand]
	 			// resets the avaiable square array
	 			this.availableSquareArr = []
	 			console.log('looping');
 			} else {
 				// runs the entire while loop again if the selected square was already active
 				this.currentSquare = this.currentSquare
 				console.log('else looping');
 			}
 		}
 		console.log('Final active squares ' + this.activeSquares);
	},
	showPath(a){
		// shows the active squares one by one in the generate board method
		$('.' + this.activeSquares[a]).addClass('active')
	},
	startGame(){
		console.log('started the game');
		// once the countdown timer is at 0 the active squares that were red are changed back to black
		$('.active').css('background-color', '#222222')
		console.log(this.startSquare);
		// give the row and column to start on for the players
		let row = this.getRowCol(this.startSquare)[0]
		let col = this.getRowCol(this.startSquare)[1]
		// instantiates both players
		player1 = new Player('Wes', '0-' + col, '#main-grid', 1, '#game-board')
		player2 = new Player('player2', '0-' + col, '#main-grid2', 2, '#game-board2')
	},
	getRowCol(str){
		// method returns an array to access each squares row and column properties
		let row;
		let col;
		let arr = []
		arr = str.split('-')
		return arr
	},
	peek(){
		// method to show the board for 1 second when the player click peek and has peeks avaiable

		console.log('running peek');

		if (this.peekActive === true) {
			for (let i = 0; i < this.activeSquares.length; i++) {
				if ($('.' + this.activeSquares[i]).css('background-color') === 'rgb(34, 34, 34)') {
					$('.' + this.activeSquares[i]).css('background-color', 'red')
				}
			}
			setTimeout(() => {
				for (let i = 0; i < this.activeSquares.length; i++) {
					console.log($('.' + this.activeSquares[i]).css('background-color'));
					if ($('.' + this.activeSquares[i]).css('background-color') === 'rgb(255, 0, 0)') {
						$('.' + this.activeSquares[i]).css('background-color', '#222222')
					}
				}
			}, 1000)
			this.peeks--
			$('#peek-button').text('Peek ' + this.peeks)

		}
	}
}


