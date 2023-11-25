import Button from "./components/button/button"
import Input from "./components/input/input"
import './App.css'
import { setValue } from './redux/inputSlice';
import { addQuestion, removeQuestion } from './redux/questionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useState } from "react";
function App() {

  const dispatch = useDispatch();
  const questionInput = useSelector((state: RootState) => state.input.value);
  const questions = useSelector((state: RootState) => state.questions.list);
  const [newQuestion, setQuestion] = useState('');
  const handleQuestionChange = (newValue: string) => {
    setQuestion(newValue);
  };
  // State for creating a new answer
  const [newAnswer, setAnswer] = useState('');
  const handleAnswerChange = (newValue: string) => {
    setAnswer(newValue);
  };
  const handleAddQuestion = () => {
    const trimmedValue = typeof questionInput === 'string' ? questionInput.trim() : questionInput; //Clearing white space from string
    if (trimmedValue !== '') {
      dispatch(addQuestion(trimmedValue));
      dispatch(setValue(''));
      setQuestion('');
      setAnswer('');
    }
  };
  const handleRemoveQuestionAndAnswer = (questionId: string) => {
    dispatch(removeQuestion(questionId));
  };
  return (
    <>
      <h1>The awesome Q/A tool</h1>
      <h2> Created Question</h2>
      <div>
        <h3>Questions:</h3>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              {question.text}
              <button onClick={() => handleRemoveQuestionAndAnswer(question.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Button children="Sort questions" color="blue" onClick={() => console.log('clicked')} />
      <Button children="Removed questions" color="red" onClick={() => console.log('clicked')} />
      <h2> Create a new question</h2>
      <Input
        type="text"
        label="Question"
        value={newQuestion}
        placeholder=""
        onChange={handleQuestionChange}
        disabled={false}
      ></Input>
      <Input
        type="text"
        label="Answer"
        value={newAnswer}
        placeholder=""
        onChange={handleAnswerChange}
        disabled={false}
      ></Input>
      <Button children="Create question" color="green" onClick={handleAddQuestion} />

    </>
  )
}

export default App
