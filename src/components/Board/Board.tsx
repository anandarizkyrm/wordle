import React, { useEffect, useState } from "react";

type Props = {
    correctAnswer?: string;
    boxes: string[][];
    activeResultRowAnswer: number;
};

const Board = ({
    correctAnswer = "hello",
    boxes,
    activeResultRowAnswer,
}: Props) => {
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
