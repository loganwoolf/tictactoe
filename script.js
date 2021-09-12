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

	return {currentPlayer, switchPlayer}
})()



const gameBoard = (() => {
	// const marks = ['❌', '⭕️', null, null, '❌', null, '⭕️', '⭕️', null]
	const marks = Array(9).fill(null)
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



