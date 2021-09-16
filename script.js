"use strict"



const playerFactory = (name, mark) => {

	const markBoard = (event) => {
		let square = event.target.dataset.squareId
		if (gameBoard.marks[square] === null) {
			gameBoard.marks[square] = mark
			displayController.updateGameBoard()
			displayController.board.removeEventListener('click', game.currentPlayer.markBoard)
			game.switchPlayer()
			displayController.board.addEventListener('click', game.currentPlayer.markBoard)
		}
	}

	return {name, mark, markBoard}
}


const game = (() => {
	const playerOne = playerFactory('Player 1', '❌')
	const playerTwo = playerFactory('Player 2', '⭕️')
	const players = [playerOne, playerTwo]
	let currentPlayer = players[0]

	const switchPlayer = () => {
		if (game.currentPlayer === players[0]) {
			game.currentPlayer = players[1]
		} else {
			game.currentPlayer = players[0]
		}
		return
	}

	const checkForWinCondition = () => {
		// reduce current player's positions to an array of whichever positions
		// he is occupying. Check if all of the positions in the windConditions
		// array are included in the current positions array
		const winConditions = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]
		]

		const currentPositions = gameBoard.marks
		.map((mark, i) => {
			if (mark === game.currentPlayer.mark) {
				return i
			}
		})
		.filter(x => typeof x === 'number')
		console.log(currentPositions);
		
		const success = winConditions.filter(condition =>
				currentPositions.includes(condition[0] && condition[1] && condition[2])
		)
		console.log(success);
	}

	return {currentPlayer, switchPlayer, checkForWinCondition}
})()



const gameBoard = (() => {
	const marks = ['❌', '⭕️', '❌', null, null, '❌', '⭕️', '⭕️', '❌']
	// const marks = Array(9).fill(null)
	return {
		marks,
		
	}
})()



const displayController = (() => {
	const jsTarget = document.querySelector('.js-target')
	const board = document.createElement('div')

	board.classList.add('board')
	jsTarget.appendChild(board)
	board.addEventListener('click', game.currentPlayer.markBoard)

	gameBoard.marks.forEach( (element, index) => {
		const square = document.createElement('div')
		square.classList.add('square')
		square.setAttribute('data-square-id', index)
		board.appendChild(square)
		
		const mark = document.createElement('p')
		mark.classList.add('mark')
		mark.textContent = element
		square.appendChild(mark)
	})

	const updateGameBoard = () => {
		document.querySelectorAll('.square').forEach( item => {
			if (gameBoard.marks[item.dataset.squareId]) {
				item.children[0].textContent = gameBoard.marks[item.dataset.squareId]
			}
			
		})
	}

	return {
		board,
		updateGameBoard,

	}

})()



