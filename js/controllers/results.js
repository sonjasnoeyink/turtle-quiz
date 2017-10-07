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
        vm.setActiveQuestion = setActiveQuestion;
        vm.reset = reset;
        vm.calculatePerc = calculatePerc;
        vm.activeQuestion = 0;

        function calculatePerc(){
          return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
        }

        function setActiveQuestion(index){
          vm.activeQuestion = index;
        }

        function getAnswerClass(index){
          if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
            return "bg-success";
          } else if(index === DataService.quizQuestions[vm.activeQuestion].selected){
              return "bg-danger";
            }
        }



          function markQuiz(){
                quizObj.correctAnswers = DataService.correctAnswers;
                for(var i = 0; i < DataService.quizQuestions.length; i++){
                    if(DataService.quizQuestions[i].selected === DataService.correctAnswers[i]){
                        DataService.quizQuestions[i].correct = true;
                        quizObj.numCorrect++;
                    }else{
                        DataService.quizQuestions[i].correct = false;
                    }
                }
            }

            function reset(){
              quizMetrics.changeState("results", false);
              quizMetrics.numCorrect = 0;

              }


    }

})();
