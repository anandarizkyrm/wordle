import "./App.css";
import Alert from "./components/Alert/Alert";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
    const isGameOver = useSelector(
        (state: RootState) => state.wordle.isGameOver
    );

    const isWin = useSelector((state: RootState) => state.wordle.isWin);

    const isNotInWordList = useSelector(
        (state: RootState) => state.wordle.isNotInWordList
    );

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
                <Board />
                <Keyboard />
            </div>
            <Alert
                type={isWin ? "normal" : "danger"}
                message={
                    isWin
                        ? "You win!"
                        : isNotInWordList
                        ? "Not in Word list"
                        : "You lose!"
                }
                isShow={isGameOver || isNotInWordList}
            />
        </div>
    );
}

export default App;
