(function(){

  angular
    .module("turtleFacts")
    .controller("quizCtrl", QuizController);

    QuizController.$inject = ['quizMetrics', 'DataService'];

    function QuizController(quizMetrics, DataService){

      var vm = this;

      vm.quizMetrics = quizMetrics;
      vm.dataService = DataService;
      vm.questionAnswered = questionAnswered;
      vm.activeQuestion = 0;

      function questionAnswered(){
        
      }

    }

})();
