function Mastermind() {
  this.reset();
}

Mastermind.prototype.reset = function() {
  this.generateSecret();
  this.guesses = [];
  for (i = 0; i < 10; i++) {
    this.guesses.push({ redPegs: 0, whitePegs: 0, colors: '' });
  }
  this.gameOver = false;
  this.gameWon = false;
};

Mastermind.prototype.generateSecret = function() {
  this.secret = '';
  var possibilities = 'RBGYW';
  for (i = 0; i < 4; i++) {
    this.secret += possibilities[Math.floor(Math.random()*possibilities.length)];
  }
};

Mastermind.prototype.takeGuess = function(guess) {
  if(this.secret === guess) {
    this.gameOver = true;
    this.gameWon = true;
  }

  this.guesses.unshift({
    colors: guess,
    redPegs: this.countRedPegs(guess),
    whitePegs: this.countWhitePegs(guess),
  });
  this.guesses.pop();

  if(this.guesses[9].colors !== '' && !this.gameOver) {
    this.gameOver = true;
    this.gameWon = false;
  }
};

Mastermind.prototype.countRedPegs = function(guess) {
  var count = 0;
  for (var i = 0; i < 4; i++) {
    if(guess[i] === this.secret[i]) {
      count++;
    }
  }
  return count;
};

Mastermind.prototype.countWhitePegs = function(guess) {
  var secretCount = this.colorCount(this.secret);
  var guessCount = this.colorCount(guess);
  var count = 0;
  for(var color in secretCount) {
    count += Math.min(secretCount[color], guessCount[color]) || 0;
  }
  return count - this.countRedPegs(guess, this.secret);
};

Mastermind.prototype.colorCount = function(pattern) {
  var totals = {};
  for (var i = 0; i < pattern.length; i++) {
    totals[pattern[i]] = totals[pattern[i]] || 0;
    totals[pattern[i]]++;
  }
  return totals;
};

Mastermind.prototype.isValidGuess = function(guess) {
  return /^[RGBWY]{4}$/.test(guess);
};
