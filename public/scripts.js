let cards = [
    '2@', '2#', '2^', '2*', '3@', '3#', '3^', '3*',
    '4@', '4#', '4^', '4*', '5@', '5#', '5^', '5*',
    '6@', '6#', '6^', '6*', '7@', '7#', '7^', '7*',
    '8@', '8#', '8^', '8*', '9@', '9#', '9^', '9*',
    '10@', '10#', '10^', '10*', 'J@', 'J#', 'J^', 'J*',
    'Q@', 'Q#', 'Q^', 'Q*', 'K@', 'K#', 'K^', 'K*',
    'A@', 'A#', 'A^', 'A*'
];

let playerHands = [];

function shuffleAndDistribute() {
    const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);
    
    if (numPlayers < 2 || numPlayers > 10) {
        alert('Please select a number of players between 2 and 4.');
        return;
    }
    
    sortRandom();
    
    playerHands = Array.from({ length: numPlayers }, () => []);
    
    for (let i = 0; i < cards.length; i++) {
        const playerIndex = i % numPlayers;
        playerHands[playerIndex].push(cards[i]);
    }
    
    let resultHTML = '<h3>Player Hands:</h3>';
    playerHands.forEach((hand, index) => {
        resultHTML += `<h4>Player ${index + 1}:</h4><table><tr>`;
        hand.forEach((card, i) => {
            resultHTML += `<td>${card}</td>`;
            if ((i + 1) % 5 === 0) resultHTML += '</tr><tr>';
        });
        resultHTML += '</tr></table>';
    });
    
    document.getElementById('result-text').innerHTML = resultHTML;
}

function showAllCards() {
    const resultElement = document.getElementById('result-text');
    let resultHTML = '<h3>All Cards:</h3><table><tr>';
    
    cards.forEach((card, index) => {
        resultHTML += `<td>${card}</td>`;
        if ((index + 1) % 10 === 0) resultHTML += '</tr><tr>';
    });

    resultHTML += '</tr></table>';
    resultElement.innerHTML = resultHTML;
}

function sortRandom() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]; 
    }
	
    showAllCards(); 
}

function showWinner() {
    if (playerHands.length === 0) {
        alert('Please distribute the cards first.');
        return;
    }

    highestScore = 0;

    const symbolValues = {
		'!': 1,
        '@': 2,
        '#': 3,
		'$': 4,
		'%': 5,
        '^': 6,
		'&': 7,
        '*': 8,
		'(': 9
    };

    let resultHTML = '<h3>Player Hands:</h3>';
    playerHands.forEach((hand, index) => {
        resultHTML += `<h4>Player ${index + 1}:</h4><table><tr>`;
        hand.forEach((card, i) => {
            resultHTML += `<td>${card}</td>`;
            if ((i + 1) % 5 === 0) resultHTML += '</tr><tr>';
        });
        resultHTML += '</tr></table>';
    });

    let playerScores = playerHands.map((hand, index) => {
        let scoreMap = {};
        hand.forEach(card => {
            let alphanumeric = card.slice(0, -1);
            scoreMap[alphanumeric] = (scoreMap[alphanumeric] || 0) + 1;
        });

        let maxAlphanumeric = Object.keys(scoreMap).reduce((a, b) => scoreMap[a] > scoreMap[b] ? a : b, '');
        let maxScore = scoreMap[maxAlphanumeric] || 0;

        if (maxScore > highestScore) {
            highestScore = maxScore;
        }

        return {
            playerIndex: index,
            score: maxScore,
            maxAlphanumeric: maxAlphanumeric,
            highestCard: hand.find(card => card.startsWith(maxAlphanumeric)) || '',
            symbolValue: symbolValues[hand.find(card => card.startsWith(maxAlphanumeric)).slice(-1)] || 0,
            reason: ''
        };
    });

    playerScores.forEach(player => {
        if (player.score === highestScore) {
            player.score += player.symbolValue;
            player.reason = `Player ${player.playerIndex + 1} has the highest count of '${player.maxAlphanumeric}' cards (${player.score - player.symbolValue} cards) plus symbol values (${player.symbolValue}). Total: ${player.score}.`;
        } else {
            player.reason = `Player ${player.playerIndex + 1} did not score the highest points.`;
        }
    });

    let winnerIndex = playerScores.findIndex(player => player.score === Math.max(...playerScores.map(p => p.score)));
    let winnerMessage = winnerIndex >= 0 ? `Player ${winnerIndex + 1} is the winner!` : "No winner found.";

    resultHTML += '<h3>Results:</h3>';
    playerScores.forEach(player => {
        resultHTML += `<h4>Player ${player.playerIndex + 1}:</h4>`;
        resultHTML += `<p>Score: ${player.score}</p>`;
        resultHTML += `<p>Reason: ${player.reason}</p>`;
    });

    resultHTML += `<h3>${winnerMessage}</h3>`;
    document.getElementById('result-text').innerHTML = resultHTML;
}