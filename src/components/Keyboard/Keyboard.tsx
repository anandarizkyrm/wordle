const keyboardKey = {
    first_row: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    second_row: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    third_row: ["↵", "z", "x", "c", "v", "b", "n", "m", "←"],
};

const Keyboard = ({
    handleClickKey,
    trackKey,
}: {
    handleClickKey: (event: any) => void;
    trackKey: { key: string; status: string }[];
}) => {
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
            <div className="Keyboard-module_row">
                {keyboardKey.first_row.map((row) => (
                    <button
                        key={row}
                        type="button"
                        onClick={() => handleClickKey(row)}
                        data-key={row}
                        style={keyboarBackgroundHandler(row)}
                        className="Key-module_key"
                    >
                        {row}
                    </button>
                ))}
            </div>
            <div className="Keyboard-module_row">
                {keyboardKey.second_row.map((row) => (
                    <button
                        type="button"
                        key={row}
                        style={keyboarBackgroundHandler(row)}
                        data-key={row}
                        onClick={() => handleClickKey(row)}
                        className="Key-module_key"
                    >
                        {row}
                    </button>
                ))}
            </div>
            <div className="Keyboard-module_row">
                {keyboardKey.third_row.map((row) => (
                    <button
                        type="button"
                        key={row}
                        style={keyboarBackgroundHandler(row)}
                        onClick={() => handleClickKey(row)}
                        data-key={row}
                        className="Key-module_key"
                    >
                        {row}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;
