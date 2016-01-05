function MasterMindController($scope) {
  init($scope);
  $scope.takeGuess = function() {
    $scope.newGuess = $scope.newGuess.toUpperCase();
    var validGuess = /^[RGBWY]{4}$/.test($scope.newGuess);
    if($scope.newGuess.length === 4 && validGuess) {
      if($scope.secret === $scope.newGuess) {
        console.log('you win');
      }
      $scope.guesses.unshift({
        redPegs:     countRedPegs($scope.newGuess, $scope.secret),
        whitePegs: countWhitePegs($scope.newGuess, $scope.secret),
        colors: $scope.newGuess
      });

      $scope.guesses.pop();
      if($scope.guesses[9].colors !== '') {
        console.log('you lost');
      }
      $scope.newGuess = '';
    }
  };
  $scope.newGame = function() {
    init($scope);
  };
  $scope.range = function(n) {
    return new Array(n);
  };
}

function init($scope) {
  var i = 0;
  $scope.guesses = [];
  for (i = 0; i < 10; i++) {
    $scope.guesses.push({ redPegs: 0, whitePegs: 0, colors: '' });
  }
  $scope.newGuess = '';
  $scope.secret = '';
  var possibilities = 'RBGYW';
  for (i = 0; i < 4; i++) {
    $scope.secret += possibilities[Math.floor(Math.random()*possibilities.length)];
  }
}

function countRedPegs(guess, secret) {
  var count = 0;
  for (var i = 0; i < 4; i++) {
    if(guess[i] === secret[i]) {
      count++;
    }
  }
  return count;
}
function countWhitePegs(guess, secret) {
  var secretCount = colorCount(secret);
  var guessCount = colorCount(guess);
  var count = 0;
  for(var color in secretCount) {
    count += Math.min(secretCount[color], guessCount[color]) || 0;
  }
  return count - countRedPegs(guess, secret);
}
function colorCount(pattern) {
  var totals = {};
  for (var i = 0; i < pattern.length; i++) {
    totals[pattern[i]] = totals[pattern[i]] || 0;
    totals[pattern[i]]++;
  }
  return totals;
}
