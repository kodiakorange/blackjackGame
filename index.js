let playerSum = 0;
let dealerSum = 0;
let currentPot = 0;
let bankroll = 200;
let cardsArray = [];
let currentBet;

const dealerSumDisplay = document.querySelector("#dealerHand");
const resultDisplay = document.querySelector("#mainDisplay");
const cardsDisplay = document.querySelector("#playerHand");
const bankrollDisplay = document.getElementById("bankrollDisplay");
const currentPotDisplay = document.getElementById("currentPot");

function buildCardArray() {
	for (let i = 1; i <= 52; i++) {
		let value;
		if (i % 13 === 10) {
			value = 11; // Ace
		} else if (i % 13 >= 11 || i % 13 === 0) {
			value = 10; // Face cards (Jack, Queen, King)
		} else {
			value = (i % 13) + 1;
		}
		let card = {
			name: "card" + i,
			imgSrc: "./resources/playingCards/card" + i + ".svg",
			value: value,
		};
		cardsArray.push(card);
	}
}

function checkScore() {
	if (dealerSum > 0) {
		if (playerSum === 21 && dealerSum != 21) {
			resultDisplay.textContent = "Blackjack! You Win!";
			bankroll += currentPot;
			bankrollDisplay.textContent = "$ " + bankroll + " in hand";
			currentPot = 0;
			currentPotDisplay.textContent = "$" + currentPot + " in the pot";
			playerSum <= 21 && dealerSum > 21;
		} else if (playerSum > 21 && dealerSum <= 21) {
			resultDisplay.textContent = "You fool! You've busted and now you lose! Haha";
			currentPot = 0;
			currentPotDisplay.textContent = "$" + currentPot + " in the pot";
		} else if (playerSum > dealerSum && dealerSum < 21) {
			resultDisplay.textContent = "waiting for dealer..";
		} else if (
			(playerSum <= 21 && dealerSum > 21) ||
			(playerSum > dealerSum && dealerSum >= 17 && playerSum <= 21)
		) {
			resultDisplay.textContent = "You beat the dealer! You win!";
			bankroll += currentPot;
			bankrollDisplay.textContent = "$ " + bankroll + " in hand";
			currentPot = 0;
			currentPotDisplay.textContent = "$" + currentPot + " in the pot";
		} else if ((playerSum > 21 && dealerSum > 21) || (dealerSum == 21 && playerSum == 21)) {
			resultDisplay.textContent = "It's a push.";
			bankroll += 0.5 * currentPot;
			bankrollDisplay.textContent = "$ " + bankroll + " in hand";
			currentPot = 0;
			currentPotDisplay.textContent = "$" + currentPot + " in the pot";
		} else if (playerSum <= dealerSum && dealerSum <= 21) {
			resultDisplay.textContent = "Hit to draw another..";
		}
	}
}

function clearCards() {
	playerSum = 0;
	dealerSum = 0;
	let extraCards = document.querySelectorAll(".newCard");
	extraCards.forEach(function (card) {
		card.remove();
	});
}
function dealHand() {
	clearCards();
	resultDisplay.textContent = "New Hand!";
	dealerSumDisplay.textContent = "The dealer's hand will appear here";
	currentPot = 0;

	if (bankroll > 0) {
		dealerSum = 0;
		bankroll -= 10;
		currentPot += 20;
		updateCounts();
		newPlayerCard();
		checkScore();
	} else {
		pocketWatch();
	}
}

function newPlayerCard() {
	let newCard = cardsArray[Math.floor(Math.random() * cardsArray.length)];
	let newCardImg = document.createElement("img");
	newCardImg.src = newCard.imgSrc;
	newCardImg.alt = "new card";
	newCardImg.className = "newCard";
	playerSum = playerSum + newCard.value;
	document.getElementById("playerCardContainer").appendChild(newCardImg);
	cardsDisplay.textContent = "Your total is " + playerSum;
	checkScore();
}

function newDealerCard() {
	let newDealerCard = cardsArray[Math.floor(Math.random() * cardsArray.length)];
	let newDealerCardImg = document.createElement("img");
	newDealerCardImg.src = newDealerCard.imgSrc;
	newDealerCardImg.alt = "new dealer card";
	newDealerCardImg.className = "newCard";
	dealerSum = dealerSum + newDealerCard.value;
	document.getElementById("dealerCardContainer").appendChild(newDealerCardImg);
	dealerSumDisplay.textContent = "Dealer total is " + dealerSum;
	checkScore();
}

function pocketWatch() {
	if (bankroll <= 0) {
		resultDisplay.innerHTML = "You're broke!";
	}
}
function betTen() {
	if (bankroll > 0) {
		bankroll -= 10;
		currentPot += 20;
		updateCounts();
	} else {
		pocketWatch();
	}
}

function updateCounts() {
	currentPotDisplay.textContent = "$" + currentPot + " in the pot";
	bankrollDisplay.textContent = "$ " + bankroll + " in hand";
}

function reset() {
	location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
	buildCardArray();
	document.querySelector("#dealButton").addEventListener("click", dealHand);
	document.querySelector("#hitButton").addEventListener("click", newPlayerCard);
	document.querySelector("#betButton").addEventListener("click", betTen);
	document.querySelector("#resetButton").addEventListener("click", reset);
	document.querySelector("#dealerDrawButton").addEventListener("click", newDealerCard);
});
