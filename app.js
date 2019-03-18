document.addEventListener('DOMContentLoaded', function() {
  // cache DOMLookups
  const questionNode = document.querySelector('#question');
  const categoryNode = document.querySelector('#category');
  const answerNode = document.querySelector('#answer');

  const prevButton = document.querySelector('#prev--button');
  const nextButton = document.querySelector('#next--button');
  const randomButton = document.querySelector('#random--button');
  const answerButton = document.querySelector('#answer--button');

  /** Test Question Data */
  const TestQuestionsArray = [
    {
      id: 0,
      category: 'HTML Foundation',
      question: 'What is CSS?',
      answer:
        'A language used to modify the elements on a page with display attributes.'
    },
    {
      id: 1,
      category: 'HTML Foundation',
      question: 'What is HTML?',
      answer: 'A markup language for displaying information in the web browser.'
    },
    {
      id: 2,
      category: 'Framework',
      question: 'What is React?',
      answer:
        'A popular web frontend framework for building web applications created by Facebook.'
    }
  ];

  // preload first random Question
  let currIdx = Math.floor(Math.random() * TestQuestionsArray.length);
  let currentQuestion = TestQuestionsArray[currIdx];
  updateQuestionToDom(currentQuestion);

  /** Updates DOM with input question and answer */
  function updateQuestionToDom({ question, answer, category }) {
    questionNode.innerHTML = question;
    answerNode.innerHTML = answer;
    categoryNode.innerHTML = category;
  }

  // Event Handlers

  // prevItem
  prevButton.addEventListener('click', () => {
    currIdx = currIdx === 0 ? TestQuestionsArray.length - 1 : currIdx - 1;
    updateQuestionToDom(TestQuestionsArray[currIdx]);
  });

  // nextItem
  nextButton.addEventListener('click', () => {
    currIdx = currIdx === TestQuestionsArray.length - 1 ? 0 : currIdx + 1;
    updateQuestionToDom(TestQuestionsArray[currIdx]);
  });

  // randomItem
  randomButton.addEventListener('click', () => {
    currIdx = Math.floor(Math.random() * TestQuestionsArray.length);
    updateQuestionToDom(TestQuestionsArray[currIdx]);
  });

  // randomItem
  answerButton.addEventListener('click', () => {
    // show answer that was previously hidden
    console.log('show answer!');
  });
});
