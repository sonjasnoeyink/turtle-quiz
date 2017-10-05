/*
 * Immediately Invoked Function Expression (IIFE) to avoid creating global
 * variables and keep code safe
 */
(function(){

    /*
     * Call the angular module called turtleFacts that was created in js/app.js
     * then attach the controller quizCtrl to it.
     *
     * The quiz controller is added as a named function instead of an anon func
     * to keep the code clean and readable.
     */
    angular
        .module("turtleFacts")
        .controller("quizCtrl", QuizController);

    /*
     * Angular dependency injection to avoid issues when uglifying the code
     * Passing the dependencies as strings avoids them being changed when
     * uglified.
     */
    QuizController.$inject = ['quizMetrics', 'DataService'];

    /*
     * function defintion of the quiz controller with quizMetrics as args.
     *
     * quizMetrics is a service we created that
     * is defined in js/factory/quiz.js
     */
    function QuizController(quizMetrics, DataService){

        var vm = this;

        vm.quizMetrics = quizMetrics;
        vm.dataService = DataService;
        vm.questionAnswered = questionAnswered;
        vm.setActiveQuestion = setActiveQuestion;
        vm.selectAnswer = selectAnswer;
        vm.activeQuestion = 0;

        var numQuestionsAnswered = 0;

        /*
         * setActiveQuestion takes one optional argument.
         *
         * If no argument is passed it will set the active question in the quiz
         * to the next question that has yet to be answered. This allows the
         * user to skip questions and come back to them later, even by clicking
         * the "continue" button. It will still take them to the unanswered
         * question.
         *
         * If an argument is passed into the function then it will simply set
         * the activeQuestion to the number that was passed in as an argument
         */
        function setActiveQuestion(index){

            var breakOut = false;

            /*
             * quizLength is set to 1 less than the length of the quiz as it
             * is always referenced against the variable activeQuestion
             * which is 0 index. Therefore the length needs to be one less.
             */
            var quizLength = DataService.quizQuestions.length - 1;

            /*
             * This while loop will loop continuously until an unanswered
             * question is found. Going back to the first question if the
             * last question is reached witout finding an unanswered question
             */
            while(!breakOut){
                // check if last question is reach, if not increment. If it
                // has go back to start.
                vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

                // if current active question has not been selected, break
                // out the while loop
                if(DataService.quizQuestions[vm.activeQuestion].selected === null){
                    breakOut = true;
                }
            }

        }

        function questionAnswered(){
            // set quizLength variable to keep code clean
            var quizLength = DataService.quizQuestions.length;

            if(DataService.quizQuestions[vm.activeQuestion].selected !== null){
                numQuestionsAnswered++;
                if(numQuestionsAnswered >= quizLength){
                    // Finalise quiz
                }
            }
            vm.setActiveQuestion();
        }

        function selectAnswer(index){
          DataService.quizQuestions[vm.activeQuestion].selected = index;
        }


    }

})();
