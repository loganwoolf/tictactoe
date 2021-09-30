"use strict"



const PlayerFactory = (name, mark, number) => {

	const markBoard = (event) => {
		let square = event.target.dataset.squareId
		if (gameBoard.marks[square] === null) {
			gameBoard.marks[square] = mark
			displayController.board.removeEventListener('click', game.currentPlayer.markBoard)
			displayController.updateGameBoard()
			game.checkForWinCondition()
		}
	}

	return {name, mark, number, markBoard}
}


const game = (() => {
	const playerOne = PlayerFactory('Player 1', '❌', 1)
	const playerTwo = PlayerFactory('Player 2', '⭕️', 2)
	const players = [playerOne, playerTwo]
	let currentPlayer = players[0]

	const switchPlayer = () => {
		displayController.removeHighlight()
		if (game.currentPlayer === players[0]) {
			game.currentPlayer = players[1]
		} else {
			game.currentPlayer = players[0]
		}
		displayController.highlightCurrentPlayer()
		return
	}


	const checkForWinCondition = () => {
		// convert current player's positions to an array of whichever positions
		// he is occupying. Check if all of the positions in any winConditions
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
		
		const success = winConditions.filter( condition => 
			condition.every( square => currentPositions.includes(square))
		)
		
		if (success.length === 1) {
			//when game is won
			displayController.showWinner()
			console.log(`${game.currentPlayer.name} WINS!`);

		} else {
			//when game is not over yet
			switchPlayer()
			displayController.board.addEventListener('click', game.currentPlayer.markBoard)
		}
		
	}

	return {players, currentPlayer, switchPlayer, checkForWinCondition}
})()



const gameBoard = (() => {
	// const marks = ['❌', '⭕️', '❌', null, null, '❌', '⭕️', '⭕️', '⭕️']
	const marks = Array(9).fill(null)
	return {
		marks,
		
	}
})()



const displayController = (() => {
	const jsTarget = document.querySelector('.js-target')
	
	const playersElement = document.createElement('div')
	playersElement.classList.add('players')
	game.players.forEach( (player, index) => {
		const playerElement = document.createElement('div')
		playerElement.classList.add('player')
		const nameElement = document.createElement('p')
		nameElement.classList.add(`player-${index + 1}`)
		nameElement.textContent = player.name
		playerElement.appendChild(nameElement)

		// const editButton = document.createElement('button')
		// editButton.classList.add(`edit-player-${index + 1}`)
		// editButton.textContent = '🖋'
		// playerElement.appendChild(editButton)
		
		playersElement.appendChild(playerElement)
	})

	jsTarget.appendChild(playersElement)

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

	const highlightCurrentPlayer = () => {
		const currentPlayerLabel = document.querySelector(`.player-${game.currentPlayer.number}`)
		currentPlayerLabel.classList.add('current')

		return
	}
	highlightCurrentPlayer() //runs once at load

	const removeHighlight = () => {
		const currentPlayerLabel = document.querySelector(`.player-${game.currentPlayer.number}`)
		currentPlayerLabel.classList.remove('current')

		return
	}

	const showWinner = () => {
		playersElement.style.flexDirection = 'column'

		const winnerLabel = document.createElement('p')
		winnerLabel.classList.add('winner')
		winnerLabel.textContent = `${game.currentPlayer.name} is victorious!`
		while (playersElement.hasChildNodes()) {
			playersElement.removeChild(playersElement.childNodes[0])
		}
		playersElement.appendChild(winnerLabel)

		const resetButton = document.createElement('button')
		resetButton.classList.add('reset')
		resetButton.textContent = 'Play Again'
		playersElement.appendChild(resetButton)



		return
	}

	return {
		board,
		updateGameBoard,
		highlightCurrentPlayer,
		removeHighlight,
		showWinner,
	}

})()



