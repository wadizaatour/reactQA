import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
    id: string;
    text: string;
    answer?: string;
}

interface QuestionsState {
    list: Question[];
}

const initialState: QuestionsState = {
    list: [],
};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion: (state, action: PayloadAction<string>) => {
            const newQuestion: Question = {
                id: Date.now().toString(),
                text: action.payload,
            };
            state.list.push(newQuestion);
        },
        removeQuestion: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((q) => q.id !== action.payload);
        },
        setAnswer: (state, action: PayloadAction<{ questionId: string; answerText: string }>) => {
            const { questionId, answerText } = action.payload;
            const question = state.list.find((q) => q.id === questionId);

            if (question) {
                question.answer = answerText;
            }
        },
    },
});

export const { addQuestion, removeQuestion, setAnswer } = questionsSlice.actions;
export default questionsSlice.reducer;
