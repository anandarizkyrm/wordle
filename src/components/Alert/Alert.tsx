import React, { useEffect, useState } from "react";

type Props = {
    type: "danger" | "normal";
    message: string;
    // setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    isShow: boolean;
};

const Alert = ({ type, message, isShow }: Props) => {
    const [showAlert, setIsShowAlert] = useState(false);

    useEffect(() => {
        const alert = isShow;
        setIsShowAlert(alert);
        if (alert) {
            // Start a timer to gradually decrease the border height
            // const timer = setInterval(() => {
            //     setBorder((prevHeight) => prevHeight - 2);
            // }, 100); // Adjust the interval as needed

            // Once the desired time has passed, stop the timer and set loading to false
            const myTimeout = setTimeout(() => {
                setIsShowAlert(false);
            }, 3000); // Adjust the duration as needed

            return () => {
                clearTimeout(myTimeout);
            };
        }
    }, [isShow]);

    if (!showAlert) {
        return null;
    }

    if (type === "danger") {
        return (
            <div className="alert-container">
                <div className="alert">{message}</div>
                {/* <div
                    style={{
                        borderBottom: "4px solid white",
                        width: `${border}%`,
                        transition: "width 0.2s ease",
                    }}
                ></div> */}
            </div>
        );
    }

    return (
        <div className="alert-container">
            <div style={{ backgroundColor: "green" }} className="alert">
                {message}
            </div>
            {/* <div
                style={{
                    borderBottom: "4px solid white",
                    width: `${border}%`,
                    transition: "width 0.2s ease",
                }}
            ></div> */}
        </div>
    );
};

export default Alert;
