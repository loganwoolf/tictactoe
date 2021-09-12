"use strict"



const playerFactory = (name, mark) => {

	const markBoard = (event) => {
		let square = event.target.dataset.squareId
		if (!gameBoard.marks[square]) {
			gameBoard.marks[square] = mark
		}
		//change player here
		displayController.updateGameBoard()

	}

	return {name, mark, markBoard}
}

const playerOne = playerFactory('Player 1', '❌')
const playerTwo = playerFactory('Player 2', '⭕️')
const players = [playerOne, playerTwo]
const currentPlayer = players[0]



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
	board.addEventListener('click', currentPlayer.markBoard)

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
		updateGameBoard,

	}

})()



