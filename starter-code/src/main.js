var cards = [
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" },
  { name: "aquaman", img: "aquaman.jpg" },
  { name: "batman", img: "batman.jpg" },
  { name: "captain america", img: "captain-america.jpg" },
  { name: "fantastic four", img: "fantastic-four.jpg" },
  { name: "flash", img: "flash.jpg" },
  { name: "green arrow", img: "green-arrow.jpg" },
  { name: "green lantern", img: "green-lantern.jpg" },
  { name: "ironman", img: "ironman.jpg" },
  { name: "spiderman", img: "spiderman.jpg" },
  { name: "superman", img: "superman.jpg" },
  { name: "the avengers", img: "the-avengers.jpg" },
  { name: "thor", img: "thor.jpg" }
];

$(document).ready(function() {
  // Create Memory Game
  var memoryGame = new MemoryGame(cards);
  var html = "";
  // Add cards to Game
  memoryGame.cards.forEach(function(pic, index) {
    html += '<div class= "card" data-name="card_' + pic.name + '">';
    html += '<div class="back"';
    html += '    name="' + pic.img + '">';
    html += "</div>";
    html += '<div class="front" ';
    html += 'style="background: url(img/' + pic.img + ') no-repeat">';
    html += "</div>";
    html += "</div>";
  });

  // Add all the div's to the HTML
  document.getElementById("memory_board").innerHTML = html;

  // -------- User Interface setup done! --------------
  // Bind the click event of each faced down card to a function
  $(".back").on("click", function() {
    var card = $(this).parent();
    memoryGame.selectCard(card.attr("data-name"));
    turnCard(card);
    updateScore();
    if (memoryGame.isMoveFinished() && !memoryGame.isPair()) {
      document.addEventListener("click", preventClicks, true);
      setTimeout(function() {
        document.removeEventListener("click", preventClicks, true);
        turnCardsBack();
      }, 1000);
    }
    if (memoryGame.isWon()) {
      onWin();
    }
  });

  function turnCard(jQueryCardElement) {
    jQueryCardElement.children().toggleClass("front back");
  }

  function updateScore() {
    $("#pairs_clicked").text(memoryGame.movesCount);
    $("#pairs_guessed").text(memoryGame.guessedPairsCount);
  }

  function preventClicks() {
    event.stopPropagation();
    event.preventDefault();
  }

  function onWin() {
    $("#text-won").text(memoryGame.movesCount);
    $("#overlay-win").fadeIn("slow");
    $("#new-game-btn").on("click", function() {
      memoryGame = new MemoryGame(cards);
      setupNewGame();
      $("#overlay-win").fadeOut("slow");
    });
  }

  function setupNewGame() {
    turnCardsBack();
    updateScore();
  }

  function turnFaceDown(jQueryCardElement) {
    jQueryCardElement
      .children()
      .first()
      .addClass("back")
      .removeClass("front");
    jQueryCardElement
      .children()
      .last()
      .addClass("front")
      .removeClass("back");
  }

  function turnCardsBack() {
    $("#memory_board")
      .children()
      .each(function() {
        if (!memoryGame.guessedCards.includes($(this).attr("data-name")) && $) {
          turnFaceDown($(this));
        }
      });
  }
});
