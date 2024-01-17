let playerSum;
let dealerSum = 0;
let currentPot = 0;
let bankroll = 100;
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
		} else if (i % 13 >= 11) {
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
	if (dealerSum != 0) {
		if (playerSum === 21 && dealerSum != 21) {
			resultDisplay.textContent = "Blackjack! You Win!";
			bankroll += currentPot;
			bankrollDisplay.textContent = "$ " + bankroll + " in hand";
			currentPot = 0;
			currentPotDisplay.textContent = "$" + currentPot + " in the pot";
		} else if (playerSum > 21 && dealerSum <= 21) {
			resultDisplay.textContent =
				"You fool! You've busted and now you lose! Haha";
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
		} else {
			resultDisplay.textContent = "You beat the dealer! You win!";
			bankroll += currentPot;
			bankrollDisplay.textContent = "$ " + bankroll + " in hand";
			currentPot = 0;
			currentPotDisplay.textContent = "$" + currentPot + " in the pot";
		}
		pocketWatch();
	}
}

function dealHand() {
	dealerSumDisplay.textContent = "The dealer's hand will appear here";
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
	} else if (dealerSum < 17 || playerSum > dealerSum) {
		let newDealerCard =
			cardsArray[Math.floor(Math.random() * cardsArray.length)];
		dealerSum += newDealerCard.value;
		dealerSumDisplay.textContent = "Dealer's total is " + dealerSum;
		checkScore();
	}
}

function drawCard() {
	let newCard = Math.floor(10 * Math.random() + 2);
	playerSum = playerSum + newCard;
	cardsDisplay.textContent =
		"You drew a " + newCard + ". Your new total is " + playerSum;
	checkScore();
}

function pocketWatch() {
	if (bankroll <= 0) {
		resultDisplay.textContent = "You're broke!";
	}
}
function betMoney() {
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
	document.querySelector("#betButton").addEventListener("click", betMoney);
	document.querySelector("#resetButton").addEventListener("click", reset);
	document
		.querySelector("#readyButton")
		.addEventListener("click", dealerDraw);
}); //[array of 52 cards] random number between 0-51 math.floor selects a card, each card has a value property assigned (0-11), set up a div to display each card by selecting indexof[cardsArray] and displaying the image file.
