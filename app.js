document.addEventListener('DOMContentLoaded', function() {
  // cache DOMLookups
  const questionNode = document.querySelector('#question');
  const categoryNode = document.querySelector('#category');
  const answerNode = document.querySelector('#answer');
  const prevButton = document.querySelector('#prev--button');
  const nextButton = document.querySelector('#next--button');
  const randomButton = document.querySelector('#random--button');
  const answerButton = document.querySelector('#answer--button');
  const BASE_URL = 'http://localhost:5000';

  let state = {
    id: undefined,
    showAnswer: false
  };

  /** Maintains Application State */
  function setState(newState) {
    state = { ...state, ...newState };
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

  /** Gets Specific Card from backend API */
  async function getSpecificCard(nextId) {
    const apiResponse = await axios({
      method: 'get',
      url: `${BASE_URL}/cards/${nextId}`
    });
    const { card } = apiResponse.data;
    const { id } = card;
    setState({ id });
    updateQuestionToDom(card);
  }

  /** Random Question */
  async function randomQuestion() {
    const apiResponse = await axios({
      method: 'get',
      url: `${BASE_URL}/cards/random`
    });
    const { card } = apiResponse.data;
    const { id } = card;
    setState({ id });
    updateQuestionToDom(card);
  }

  /** Toggle Answer Button */
  function toggleAnswer() {
    answerNode.classList.toggle('hide');
    answerButton.classList.toggle('answer-on');
    setState({
      showAnswer: !state.showAnswer
    });
    if (state.showAnswer) {
      answerButton.innerHTML = 'Answers Off';
      // answerButton.classList.remove('answer-on');
    } else {
      answerButton.innerHTML = 'Answers On';
      // answerButton.classList.add('answer-on');
    }
  }

  /** Updates DOM with input question and answer */
  function updateQuestionToDom({ question, answer, category }) {
    questionNode.innerHTML = question;
    answerNode.innerHTML = answer;
    categoryNode.innerHTML = category;
  }

  /** Event Handlers for Buttons */
  prevButton.addEventListener('click', prevQuestion);
  nextButton.addEventListener('click', nextQuestion);
  randomButton.addEventListener('click', randomQuestion);
  answerButton.addEventListener('click', toggleAnswer);

  // make api call and pull random question
  randomQuestion();
});
