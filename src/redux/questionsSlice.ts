import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export interface Question {
  id: string;
  question: string;
  answer?: string;
}

interface QuestionsState {
  list: Question[];
}

const initialState: QuestionsState = {
  list: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<string>) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        question: action.payload,
      };
      state.list.push(newQuestion);
    },
    deleteQuestion(state, action: PayloadAction<string>) {
      const filteredArray = state.list.filter((q) => q.id !== action.payload);
      localStorage.setItem("questions", JSON.stringify(filteredArray));
      state.list = filteredArray;
    },
    deleteAll(state) {
      state.list = [];
      localStorage.setItem("questions", JSON.stringify([]));
    },
    setAnswer(
      state,
      action: PayloadAction<{ questionId: string; answerText: string }>
    ) {
      const { questionId, answerText } = action.payload;
      const question = state.list.find((q) => q.id === questionId);

      if (question) {
        question.answer = answerText;
      }
    },
  },
});

export const { addQuestion, deleteQuestion, deleteAll, setAnswer } =
  questionsSlice.actions;
export default questionsSlice.reducer;
