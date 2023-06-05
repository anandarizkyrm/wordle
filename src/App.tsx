import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Alert from "./components/Alert/Alert";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import { isLetter } from "./helper/function.helper";
import arrayWords from "./data.json";

function App() {
    const [isWin, setIsWin] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const correctAnswer = useMemo(() => {
        return arrayWords[Math.floor(Math.random() * arrayWords.length)];
    }, []);

    const [trackKey, setTrackKey] = useState<{ key: string; status: string }[]>(
        []
    );
    const [boxes, setBoxes] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ]);

    const [currentRow, setCurrentRow] = useState(0);
    const [currentColumn, setCurrentCollumn] = useState(0);

    // this used to handle if the column is already answered
    // for example the index = 1 then the active column is 0 , 1 and so on
    const [activeResultRowAnswer, setActiveResultRowAnswer] = useState(-1);

    function handleClickKey(event: any) {
        const updatedBox = [...boxes];

        if (isGameOver) {
            return;
        }
        if (
            (event.key == "Enter" || event === "↵") &&
            currentRow == boxes[0].length &&
            currentColumn < boxes.length
        ) {
            const object = boxes[currentColumn].map((x, i) => ({
                key: x,
                status: x == correctAnswer[i] ? "correct" : "wrong",
            }));

            setTrackKey([...trackKey, ...object]);

            if (boxes[currentColumn].join("") == correctAnswer) {
                setIsGameOver(true);
                setIsWin(true);
            }
            setCurrentRow(0);
            setCurrentCollumn(currentColumn + 1);
            setActiveResultRowAnswer(currentColumn);
            if (boxes.length < currentColumn + 1) {
                setIsGameOver(true);
                setIsWin(false);
            }
        }

        if ((event.key == "Backspace" || event === "←") && currentRow > 0) {
            const x = currentRow - 1;
            updatedBox[currentColumn][x] = "";
            setBoxes(updatedBox);
            setCurrentRow(x);
        }

        if (currentRow > boxes[0].length - 1) {
            return;
        } else if (
            (event.keyCode >= 48 && event.keyCode <= 90) ||
            isLetter(event)
        ) {
            if (isLetter(event)) {
                updatedBox[currentColumn][currentRow] = event;
            } else {
                updatedBox[currentColumn][currentRow] = event.key;
            }
            setCurrentRow((prev) => prev + 1);
            setBoxes(updatedBox);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleClickKey);

        return () => {
            window.removeEventListener("keydown", handleClickKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boxes, currentColumn, currentRow, isGameOver, setIsGameOver, setIsWin]);

    return (
        <div className="container">
            <div className="game-container">
                <h1>Wordle</h1>
                {isGameOver || isWin ? (
                    <div
                        style={{ maxWidth: "300px" }}
                        className="Keyboard-module_row"
                    >
                        <button
                            onClick={() => window.location.reload()}
                            type="button"
                            className="Key-module_key"
                        >
                            PLAY AGAIN ?
                        </button>
                    </div>
                ) : null}
                <Board
                    boxes={boxes}
                    activeResultRowAnswer={activeResultRowAnswer}
                    correctAnswer={correctAnswer}
                />
                <Keyboard trackKey={trackKey} handleClickKey={handleClickKey} />
            </div>
            <Alert
                type={isWin ? "normal" : "danger"}
                message={isWin ? "You win!" : "You lose!"}
                isShow={isGameOver}
            />
        </div>
    );
}

export default App;
