
class Player {
	constructor() {
		this.name = ''
		this.onPath = true
		this.squareOn = ''
		this.image = ''
		this.win = false
	}
	fall() {

	}
	win() {

	}
	move() {

	}
}


const game = {
	numberPlayers: 0,
	activeSquares: [],
	boardSize: 9,
	divSize: 50,
	boardContainerSize: (this.boardSize * this.divSize),
	letters: [],
	generateBoard(num){
		$('#game-board').append($('<div/>').attr('id', 'end-platform').css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid black'))
		$('#game-board').append($('<div/>').attr('id', 'main-grid').css('height', this.boardSize * this.divSize + (this.boardSize * 2) + 'px').css('width', this.boardSize * this.divSize + (this.boardSize *2) + 'px'))
		$('#game-board').append($('<div/>').attr('id', 'start-platform').css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid black'))
		for (let i = 0; i < this.boardSize; i++) {
			const row = i
			for (let j = 0; j < this.boardSize; j++) {
				const column = j
				$('#main-grid').prepend($('<div/>').attr('id', row + '-' + column).css('height', this.divSize + 'px').css('width', this.divSize + 'px').css('border', '1px solid black'))
			}
		}
	},
	randomPath(){

	},
	showPath(){

	},
	restart(){

	}
}

console.log(game.boardContainerSize);
