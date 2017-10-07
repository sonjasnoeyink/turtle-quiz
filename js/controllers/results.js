(function(){

    angular
        .module("turtleFacts")
        .controller("resultsCtrl", ResultsController);

    ResultsController.$inject = ['quizMetrics', 'DataService'];

    function ResultsController(quizMetrics, DataService){
        var vm = this;

        vm.quizMetrics = quizMetrics;
        vm.dataService = DataService;
        vm.getAnswerClass = getAnswerClass;
        vm.activeQuestion = 0;

        function getAnswerClass(index){
          if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
            return "bg-success"
          } else if(index === DataService.quizQuestions[vm.activeQuestion.selected]){
            return "bg-danger"
          }
        }

    }

})();
