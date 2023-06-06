import { createSlice } from "@reduxjs/toolkit";
import { isLetter } from "../../helper/function.helper";
import wordList from "../../data.json";
export type GithubInitialState = {
    isWin: boolean;
    isGameOver: boolean;
    currentRow: number;
    currentColumn: number;
    trackKey: { key: string; status: string }[];
    // this is the board boxes
    boxes: string[][];
    correctAnswer: string;

    // to handle which row is already passed, for example if this value = 0 then show the answer/color  of  each boxes 0
    // the -1 means that no row is passed
    activeResultRowAnswer: number;
    isNotInWordList: boolean;
};

const initialState: GithubInitialState = {
    isWin: false,
    isGameOver: false,
    currentColumn: 0,
    currentRow: 0,
    trackKey: [],
    boxes: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ],
    correctAnswer: wordList[Math.floor(Math.random() * wordList.length)],
    activeResultRowAnswer: -1,
    isNotInWordList: false,
};

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        handleClickKey(state, action: any) {
            state.isNotInWordList = false;
            const updatedBox = [...state.boxes];
            if (state.isGameOver) {
                return;
            }
            if (
                (action.payload === "Enter" || action.payload === "↵") &&
                state.currentRow == state.boxes[0].length &&
                state.currentColumn < state.boxes.length
            ) {
                if (
                    !wordList.includes(
                        state.boxes[state.currentColumn].join("")
                    )
                ) {
                    state.isNotInWordList = true;
                    return;
                }

                const object = state.boxes[state.currentColumn].map((x, i) => ({
                    key: x,
                    status:
                        x == state.correctAnswer[i]
                            ? "correct"
                            : state.correctAnswer.includes(x)
                            ? "incorrect-place"
                            : "wrong",
                }));

                state.trackKey = [...state.trackKey, ...object];

                if (
                    state.boxes[state.currentColumn].join("") ==
                    state.correctAnswer
                ) {
                    state.isGameOver = true;
                    state.isWin = true;
                }
                state.currentRow = 0;
                state.activeResultRowAnswer = state.currentColumn;
                state.currentColumn = state.currentColumn + 1;
                if (state.boxes.length < state.currentColumn + 1) {
                    state.isGameOver = true;
                    state.isWin = false;
                }
            }

            if (
                (action.payload === "Backspace" || action.payload === "←") &&
                state.currentRow > 0
            ) {
                const x = state.currentRow - 1;
                updatedBox[state.currentColumn][x] = "";
                state.boxes = updatedBox;
                state.currentRow = x;
            }

            if (state.currentRow > state.boxes[0].length - 1) {
                return;
            } else if (isLetter(action.payload)) {
                if (isLetter(action.payload)) {
                    updatedBox[state.currentColumn][state.currentRow] =
                        action.payload;
                } else {
                    updatedBox[state.currentColumn][state.currentRow] =
                        action.payload.key;
                }
                state.currentRow = state.currentRow + 1;
                state.boxes = updatedBox;
            }
        },
    },
});

export const { handleClickKey } = configSlice.actions;

export default configSlice.reducer;
