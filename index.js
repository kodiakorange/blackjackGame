let playerSum;
let dealerSum = 0;
let currentPot = 0;
let bankroll = 200;
let cardsArray = [];

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
			resultDisplay.textContent =
				"You fool! You've busted and now you lose! Haha";
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
		} else if (
			(playerSum > 21 && dealerSum > 21) ||
			(dealerSum == 21 && playerSum == 21)
		) {
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
	let oldCards = document.getElementsByClassName("cardImg");
	for (let i = 0; i < oldCards.length; i++) {
		oldCards[i].src = "";
	}
	let extraCards = document.getElementsByClassName("newCard");
	for (let i = 0; i < extraCards.length; i++) {
		extraCards[i].remove();
	}
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

		let firstCard =
			cardsArray[Math.floor(Math.random() * cardsArray.length)];
		let secondCard =
			cardsArray[Math.floor(Math.random() * cardsArray.length)];
		playerSum = firstCard.value + secondCard.value;

		document.querySelector("#playerHand").textContent =
			"Your total is " + playerSum;
		let firstCardImg = document.querySelector("#cardImg1");
		let secondCardImg = document.querySelector("#cardImg2");
		firstCardImg.src = firstCard.imgSrc;
		secondCardImg.src = secondCard.imgSrc;
		checkScore();
	} else {
		pocketWatch();
	}
}

function dealerDraw() {
	if (dealerSum === 0) {
		let firstDealerCard =
			cardsArray[Math.floor(Math.random() * cardsArray.length)];
		let secondDealerCard =
			cardsArray[Math.floor(Math.random() * cardsArray.length)];
		dealerSum = firstDealerCard.value + secondDealerCard.value;

		dealerSumDisplay.textContent = "Dealer total is " + dealerSum;
		let firstDealerCardImg = document.querySelector("#dealerCardImg1");
		let secondDealerCardImg = document.querySelector("#dealerCardImg2");
		firstDealerCardImg.src = firstDealerCard.imgSrc;
		secondDealerCardImg.src = secondDealerCard.imgSrc;
	} else if (dealerSum < 21) {
		let newDealerCard =
			cardsArray[Math.floor(Math.random() * cardsArray.length)];
		dealerSum = dealerSum + newDealerCard.value;
		dealerSumDisplay.textContent = "Dealer's total is " + dealerSum;
	}
	checkScore();
}

function drawCard() {
	if (playerSum < 21 && dealerSum != 0) {
		let newCard = cardsArray[Math.floor(Math.random() * cardsArray.length)];
		playerSum = playerSum + newCard.value;
		let newCardImg = document.createElement("img");
		newCardImg.src = newCard.imgSrc;
		newCardImg.alt = "new card";
		newCardImg.className = "newCard";
		document.getElementById("playerCardContainer").appendChild(newCardImg);
		cardsDisplay.textContent = "Your new total is " + playerSum;
	}
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
	document.querySelector("#hitButton").addEventListener("click", drawCard);
	document.querySelector("#betButton").addEventListener("click", betTen);
	document.querySelector("#resetButton").addEventListener("click", reset);
	document.querySelector("#stayButton").addEventListener("click", dealerDraw);
});
