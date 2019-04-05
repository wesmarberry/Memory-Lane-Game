
class Player {
	constructor(name, squareOn) {
		this.name = this.name
		this.onPath = true
		this.squareOn = this.squareOn
		this.image = ''
		this.win = false
	}
	fall() {

	}
	win() {

	}
	start(){

	}
	move(key) {
		let row = Number(this.squareOn[0])
		console.log(row);
		let column = Number(this.squareOn[2])
		console.log(column);
		if (key === 'ArrowUp') {
			column += 1
			this.squareOn = row + '-' + column
			$('#' + this.squareOn).css('background-color', 'blue')
		}
	}
}

// event listener for mmovement

$(document).on('keydown', (e) => {
	console.log(e.key);
  // you could filterout everything bbut arrow keys here
  if(['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) {
    player1.move(e.key)
  }
})


// class Square {
// 	constructor() {
// 		this.height = '50px'
// 		this.width = '50px'

// 	}
// }


const game = {
	numberPlayers: 0,
	squares: [],
	activeSquares: [],
	offLimitsSquares: [],
	boardSize: 11,
	divSize: 50,
	boardContainerSize: (this.boardSize * this.divSize),
	availableSquareArr: [],
	startSquare: '',
	endSquare: '',
	prevSquare: '',
	currentSquare: '',
	pathTimer: '',
	timeOut: '',
	generateBoard(){
		$('#game-board').append($('<div/>').attr('id', 'end-platform').css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid black'))
		$('#game-board').append($('<div/>').attr('id', 'main-grid').css('height', this.boardSize * this.divSize + (this.boardSize * 2) + 'px').css('width', this.boardSize * this.divSize + (this.boardSize *2) + 'px'))
		$('#game-board').append($('<div/>').attr('id', 'start-platform').css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid black'))
		for (let i = 1; i <= this.boardSize; i++) {
			const row = i
			for (let j = 1; j <= this.boardSize; j++) {
				const column = j
				$('#main-grid').prepend($('<div/>').attr('id', row + '-' + column).css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid black'))
			}
		}
		this.randomPath()

		let a = 0;
		this.pathTimer = setInterval(() => {
			this.showPath(a)
			if (a < this.activeSquares.length) {
				a++
			} else {
				clearInterval(this.pathTimer)
				setTimeout(() => {
					this.startGame()
				}, 5000)
			}
			console.log('interval is going');
			
		}, 100)
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
		const row = Number(squareId[0])
		const column = Number(squareId[2])
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
		} else if (row === this.boardSize && column < this.endSquare[2]) {
			square1 = row + '-' + (column + 1)
			this.availableSquareArr.push(square1)
		} else if (row === this.boardSize && column > this.endSquare[2]) {
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
		console.log(this.availableSquareArr);
	},
	randomPath(){
		this.setStartSquare()
		this.currentSquare = this.startSquare
		this.activeSquares.push(this.currentSquare)
		console.log(this.currentSquare);
		console.log(this.endSquare);
 		while (this.currentSquare !== this.endSquare) {
	 			this.availableSquares(this.currentSquare)
	 			console.log(this.availableSquareArr);
	 			let rand = Math.floor(Math.random() * this.availableSquareArr.length)

	 			if (this.activeSquares.includes(this.availableSquareArr[rand]) === false) {
		 			this.activeSquares.push(this.availableSquareArr[rand])
		 			this.currentSquare = this.availableSquareArr[rand]
		 			this.availableSquareArr = []
		 			// for (let i = 0; i < this.availableSquareArr.length; i++) {
	 				// 	this.offLimitsSquares.push(this.availableSquareArr[i])
		 			// }
		 			console.log(this.currentSquare);
		 			console.log(this.activeSquares);
	 			} else {
	 				this.currentSquare = this.currentSquare
	 			}
 		}
 		// this.activeSquares.shift(this.startSquare)
 		console.log('Final active squares ' + this.activeSquares);
	},
	showPath(a){

			$('#' + this.activeSquares[a]).attr('class', 'active')
			// $('#' + this.activeSquares[i]).attr('class', 'active')
	},
	startGame(){
		console.log('started the game');
		$('.active').css('background-color', 'white')
		console.log(this.startSquare);
		player1 = new Player('Wes', this.startSquare)
	},
	restart(){

	}
}

game.generateBoard()

