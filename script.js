"use strict"


const gameBoard = (() => {
	const marks = ['X', 'O', null, null, 'X', null, 'O', 'O', 'X']
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

	gameBoard.marks.forEach( (element, index) => {
		console.log(element);
		const square = document.createElement('div')
		square.classList.add('square')
		square.setAttribute('data-square-id', index)
		board.appendChild(square)
		
		if (element) {
			const mark = document.createElement('p')
			mark.classList.add('mark')
			mark.textContent = element
			square.appendChild(mark)
		}
	})

})()

const flowController = (() => {

})()

const playerFactory = (name, mark) => {
	//add functions here
	return {name, mark}
}

const playerOne = playerFactory('Player 1', 'X')
const playerTwo = playerFactory('Player 2', 'O')

