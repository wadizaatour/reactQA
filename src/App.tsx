import QuestionList from './components/questionList/QuestionList'
import './App.css'
import { setAllQuestionList } from './redux/questionsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import AddForm from './components/form/AddForm'
import { getQuestionsList, getTotalQuestions } from './redux/selectors'

function App() {
  const dispatch = useDispatch()
  const questionsList = useSelector(getQuestionsList)
  const totalQuestions = useSelector(getTotalQuestions)

  useEffect(() => {
    dispatch(setAllQuestionList())
  }, [dispatch])

  return (
    <>
      <header className="header">
        <h1>The awesome Q/A tool</h1>
      </header>
      <main className="main">
        <aside className="aside">
          Here you can find {totalQuestions}. Feel free to create your own
          question
        </aside>
        <section className="section-list">
          <QuestionList list={questionsList} />
        </section>
        <section className="section-form">
          <AddForm />
        </section>
      </main>
      <footer>Developed by: Wadi Zaatour</footer>
    </>
  )
}

export default App
