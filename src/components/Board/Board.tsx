/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleClickKey } from "../../redux/slice/wordle";
import { RootState } from "../../redux/store";

const Board = () => {
    const dispatch = useDispatch();
    const activeResultRowAnswer = useSelector(
        (state: RootState) => state.wordle.activeResultRowAnswer
    );
    const boxes = useSelector((state: RootState) => state.wordle.boxes);
    const correctAnswer = useSelector(
        (state: RootState) => state.wordle.correctAnswer
    );
    const isGameOver = useSelector(
        (state: RootState) => state.wordle.isGameOver
    );
    const currentColumn = useSelector(
        (state: RootState) => state.wordle.currentColumn
    );
    const currentRow = useSelector(
        (state: RootState) => state.wordle.currentRow
    );

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            dispatch(handleClickKey(event.key));
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boxes, currentColumn, currentRow, isGameOver]);
    return (
        <div style={{ width: "100%", maxWidth: "300px" }}>
            {boxes.map((item, i) => (
                <div key={i} className="boxes">
                    {item.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                backgroundColor: `${
                                    i <= activeResultRowAnswer
                                        ? item == correctAnswer[idx]
                                            ? "green"
                                            : correctAnswer.includes(item)
                                            ? "yellow"
                                            : "gray"
                                        : "transparent"
                                }`,
                            }}
                            className="box"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
