import React from 'react';
import data from './data.json';

let easyQuestions = data.slice(0, 15);
let mediumQuestions = data.slice(15, 27);
let hardQuestions = data.slice(27);

easyQuestions = easyQuestions.sort(() => 0.5-Math.random());
easyQuestions = easyQuestions.slice(0, 5);

mediumQuestions = mediumQuestions.sort(() => 0.5-Math.random());
mediumQuestions = mediumQuestions.slice(0, 3);

hardQuestions = hardQuestions.sort(() => 0.5-Math.random());
hardQuestions = hardQuestions.slice(0, 2);

let allQuestions = easyQuestions.concat(mediumQuestions).concat(hardQuestions);
allQuestions = allQuestions.sort(() => 0.5-Math.random());

let answersOptionIdArray = [];
allQuestions.forEach(question => {
  let options = question.options;
  let correctOption = options.filter(option => option.isCorrect===true);
  answersOptionIdArray.push(correctOption[0]);
});
console.log(answersOptionIdArray);

class App extends React.Component {
  state = {
    questions: allQuestions,
    answers: answersOptionIdArray,
    userAnswers: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
  };

  render() {
    return (
      <div>
        <ol>
        {
          this.state.questions.map((question, index) => this.renderListItem(question, index))
        }
        </ol>
        <button onClick={()=>{
          let total = 0;
          this.state.userAnswers.forEach((answerOption, index) => {
            let correctOption = answersOptionIdArray[index];
            if(correctOption.id===answerOption) total+=3;
            else total-=1;
          });
          alert('Your score = '+total);
        }}>SUBMIT</button>
      </div>
    );
  }

  renderListItem(question, index) {
    return (
      <li key={index}>
        <div>
          <h3>{ question.question+' ['+question.difficulty+']' }</h3>
          {
            question.options.map(option => {
              return (
                <div key={option.id}>
                  <input
                    type="radio"
                    name="option"
                    value={option.option}
                    onChange={e => {
                      let selectedOptionId = option.id;
                      let userAnswersArray = this.state.userAnswers;
                      userAnswersArray[index] = selectedOptionId;
                      this.setState({ userAnswersArray: userAnswersArray });
                    }}
                  />
                  { option.option }
                </div>
              );
            })
          }
        </div>
      </li>
    );
  }
};

export default App;