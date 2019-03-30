document.addEventListener('DOMContentLoaded', function() {
  // cache DOMLookups
  const questionNode = document.querySelector('#question');
  const categoryNode = document.querySelector('#category');
  const answerNode = document.querySelector('#answer');
  const prevButton = document.querySelector('#prev--button');
  const nextButton = document.querySelector('#next--button');
  const randomButton = document.querySelector('#random--button');
  const answerButton = document.querySelector('#answer--button');

  let state = {
    id: undefined
  };

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

  /** Maintains Application State */
  function setState(newState) {
    state = { ...newState };
  }

  /** Gets Specific Card from backend API */
  async function getSpecificCard(nextId) {
    const apiResponse = await axios({
      method: 'get',
      url: `http://localhost:5000/cards/${nextId}`
    });
    const { card } = apiResponse.data;
    const { id } = card;
    setState({ id });
    updateQuestionToDom(card);
  }

  /** Action Handlers - Bound to Event Listeners */
  /** Previous Question */
  async function prevQuestion() {
    const nextId = state.id - 1;
    getSpecificCard(nextId);
  }

  /** Next Question */
  async function nextQuestion() {
    const nextId = state.id + 1;
    getSpecificCard(nextId);
  }

  /** Random Question */
  async function randomQuestion() {
    const apiResponse = await axios({
      method: 'get',
      url: 'http://localhost:5000/cards/random'
    });
    const { card } = apiResponse.data;
    const { id } = card;
    setState({ id });
    updateQuestionToDom(card);
  }

  /** Toggle Answer Button */
  function toggleAnswer() {
    // todo code to show/hide answer element
  }

  /** Event Handlers for Buttons */
  prevButton.addEventListener('click', prevQuestion);
  nextButton.addEventListener('click', nextQuestion);
  randomButton.addEventListener('click', randomQuestion);
  answerButton.addEventListener('click', toggleAnswer);

  // make api call and pull random question
  randomQuestion();
});
