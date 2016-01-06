var MasterMindApp = angular.module('MasterMindApp', []);
MasterMindApp.controller('MasterMindController', function($scope) {
  var game = new Mastermind();

  function updateScopeFromGame() {
    $scope.gameOver = game.gameOver;
    $scope.gameWon = game.gameWon;
    $scope.guesses = game.guesses;
  }

  $scope.takeGuess = function() {
    if(game.isValidGuess($scope.newGuess)) {
      game.takeGuess($scope.newGuess);
      updateScopeFromGame();
      $scope.newGuess = '';
    } else {
      $scope.showInputErrorMessage = true;
    }
  };

  $scope.newGame = function() {
    game.reset();
    updateScopeFromGame();
    $scope.newGuess = '';
    $scope.showInputErrorMessage = false;
    setTimeout(function () {
      $scope.$broadcast('newGameEvent');
    }, 50);
  };

  $scope.gameOverMessage = function() {
    return $scope.gameWon ? 'You won!' : 'You lost.';
  };

  $scope.$watch('newGuess', function(a, b) {
    $scope.newGuess = $scope.newGuess.toUpperCase();
    $scope.showInputErrorMessage = false;
  });
  $scope.newGame();

  // angular doesnt let you ng-repeat `n` times
  $scope.range = function(n) {
    return new Array(n);
  };
});

// stackoverflow told me to
MasterMindApp.directive('focusOn', function() {
  return function(scope, elem, attr) {
    scope.$on(attr.focusOn, function(e) {
      elem[0].focus();
    });
  };
});
