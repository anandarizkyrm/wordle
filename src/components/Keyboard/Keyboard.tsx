/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { handleClickKey } from "../../redux/slice/wordle";
import { RootState } from "../../redux/store";

const keyboardKey = {
    first_row: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    second_row: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    third_row: ["↵", "z", "x", "c", "v", "b", "n", "m", "←"],
};

const Keyboard = () => {
    const trackKey = useSelector((state: RootState) => state.wordle.trackKey);

    const dispatch = useDispatch();

    function keyboarBackgroundHandler(letter: string) {
        return {
            backgroundColor: `${
                trackKey.some(
                    (x) =>
                        Object.values(x).includes(letter) &&
                        Object.values(x).includes("correct")
                )
                    ? "green"
                    : trackKey.some(
                          (x) =>
                              Object.values(x).includes(letter) &&
                              Object.values(x).includes("incorrect-place")
                      )
                    ? "yellow"
                    : trackKey.some(
                          (x) =>
                              Object.values(x).includes(letter) &&
                              Object.values(x).includes("wrong")
                      )
                    ? "gray"
                    : "none"
            }`,
        };
    }

    return (
        <div
            className="Keyboard-module_keyboard"
            role="group"
            aria-label="Keyboard"
        >
            {Object.values(keyboardKey).map((key, idx) => (
                <div key={idx} className="Keyboard-module_row">
                    {key.map((row) => (
                        <button
                            key={row}
                            type="button"
                            onClick={() => dispatch(handleClickKey(row as any))}
                            data-key={row}
                            style={keyboarBackgroundHandler(row)}
                            className="Key-module_key"
                        >
                            {row}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
