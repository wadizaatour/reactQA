import QuestionList from './components/questionList/QuestionList'
import './App.css'
import { setAllQuestionList } from './redux/questionsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Tooltip from './components/tooltip/Tooltip'
import Form from './components/form/Form'
import { getQuestionsList, getTotalQuestions } from './redux/selectors'

function App() {
  const dispatch = useDispatch()
  const questionsState = useSelector(getQuestionsList)
  const totalQuestions = useSelector(getTotalQuestions)
  useEffect(() => {
    dispatch(setAllQuestionList())
  }, [dispatch])

  return (
    <>
      <header>
        <h1>The awesome Q/A tool</h1>
      </header>
      <main>
        <aside>
          Here you can find {totalQuestions}. Feel free to create your own
          question
        </aside>
        <section className="section-list">
          <Tooltip text="This is a tooltip">
            <h2 aria-describedby="created-question"> Created Question</h2>
          </Tooltip>
          <QuestionList list={questionsState} />
        </section>
        <section className="section-form">
          <Tooltip text="This is a tooltip">
            <h2 aria-describedby="create-new-question">
              Create a new question
            </h2>
          </Tooltip>
          <Form  type="add" />
        </section>
      </main>
      <footer> </footer>
    </>
  )
}

export default App
