var MemoryGame = function(cards) {
  this.pickedCards = [];
  this.guessedCards = [];
  this.movesCount = 0;
  this.guessedPairsCount = 0;
};

MemoryGame.prototype.shuffleCards = function(cardsArr) {
  for (var i = cardsArr.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * i);
    cardsArr.swap(i, randomIndex);
  }
  return cardsArr;
};

Array.prototype.swap = function(firstIndex, secondIndex) {
  var firstValue = this[firstIndex];
  this[firstIndex] = this[secondIndex];
  this[secondIndex] = firstValue;
};

MemoryGame.prototype.isMoveFinished = function() {
  return this.pickedCards.length === 2;
};

MemoryGame.prototype.selectCard = function(cardId) {
  if (this.isMoveFinished()) {
    this.pickedCards = [cardId];
  } else {
    if (this.pickedCards.length === 1) {
      this.movesCount++;
    }
    this.pickedCards.push(cardId);
    if (this.isPair(this.pickedCards[0], this.pickedCards[1])) {
      this.guessedCards.push(cardId);
      this.guessedPairsCount++;
    }
  }
};

MemoryGame.prototype.isPair = function(
  firstCard = this.pickedCards[0],
  secondCard = this.pickedCards[1]
) {
  if (this.pickedCards.length !== 2) return false;
  return firstCard === secondCard;
};

MemoryGame.prototype.isWon = function() {
  return this.guessedPairsCount * 2 === this.cards.length && this.cards.length !== 0;
};
