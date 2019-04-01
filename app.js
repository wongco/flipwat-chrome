document.addEventListener('DOMContentLoaded', function() {
  // cache DOMLookups
  const questionNode = document.querySelector('#question');
  const categoryNode = document.querySelector('#category');
  const loadingNode = document.querySelector('#loading--notice');
  const answerNode = document.querySelector('#answer');
  const prevButton = document.querySelector('#prev--button');
  const nextButton = document.querySelector('#next--button');
  const randomButton = document.querySelector('#random--button');
  const answerButton = document.querySelector('#answer--button');
  const BASE_URL = 'https://flipwat-wongco-api.herokuapp.com';
  // const BASE_URL = 'http://localhost:5000'; - use this server for local api testing

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
    toggleLoading();
    const nextId = state.id - 1;
    const cardData = await getSpecificCardData(nextId);
    updateCard(cardData);
    toggleLoading();
  }

  /** Next Question */
  async function nextQuestion() {
    toggleLoading();
    const nextId = state.id + 1;
    const cardData = await getSpecificCardData(nextId);
    updateCard(cardData);
    toggleLoading();
  }

  /** Random Question */
  async function randomQuestion() {
    toggleLoading();
    const cardData = await getRandomCardData();
    updateCard(cardData);
    toggleLoading();
  }

  /** Gets Specific Card from backend API */
  async function getSpecificCardData(nextId) {
    const apiResponse = await axios({
      method: 'get',
      url: `${BASE_URL}/cards/${nextId}`
    });
    return apiResponse.data.card;
  }

  /** Random Question */
  async function getRandomCardData() {
    const apiResponse = await axios({
      method: 'get',
      url: `${BASE_URL}/cards/random`
    });
    return apiResponse.data.card;
  }

  /** takes card data and updates state and dom */
  function updateCard(cardData) {
    const { id, question, answer, category } = cardData;
    setState({ id });
    updateQuestionToDom({ question, answer, category });
  }

  /** Toggle Answer Button */
  function toggleAnswer() {
    answerNode.classList.toggle('hide');
    answerButton.classList.toggle('answer-on');
    setState({
      showAnswer: !state.showAnswer
    });
    answerButton.innerHTML = `Answers ${state.showAnswer ? 'Off' : 'On'}`;
  }

  /** Toggle Loading Indicator */
  function toggleLoading() {
    loadingNode.classList.toggle('hide');
  }

  /** Updates DOM with input question and answer */
  function updateQuestionToDom({ question, answer, category }) {
    questionNode.innerHTML = question;
    answerNode.innerHTML = answer;
    categoryNode.innerHTML = category;
  }

  /** Register Event Handlers for Buttons */
  prevButton.addEventListener('click', prevQuestion);
  nextButton.addEventListener('click', nextQuestion);
  randomButton.addEventListener('click', randomQuestion);
  answerButton.addEventListener('click', toggleAnswer);

  // make api call and pull random question to start
  randomQuestion();
});
