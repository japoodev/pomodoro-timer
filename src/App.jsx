import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [sessionLength, setSessionLength] = React.useState(25);
  const [breakLength, setBreakLength] = React.useState(5);
  const [isBreak, setIsBreak] = React.useState(false);
  const [isRunning, setIsRunning] = React.useState(false);
  const [countdown, setCountdown] = React.useState(1500);

  const reset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setIsBreak(false);
    setIsRunning(false);
    setCountdown(1500);
    audio.pause();
  };

  const handleCountdown = () => {
    if (isRunning) {
      if (countdown === 0) {
        if (isBreak) {
          setIsBreak(false);
          setCountdown(sessionLength * 60);
        } else {
          audio.play();
          setIsBreak(true);
          setCountdown(breakLength * 60);
        }
      } else {
        setCountdown(countdown - 1);
      }
    }
  };

  const beep = "https://cdn.freesound.org/previews/80/80921_1022651-lq.mp3";
  const audio = document.getElementById("beep");

  React.useEffect(() => {
    if (isRunning) {
      const interval = setInterval(handleCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, countdown, isBreak, sessionLength, breakLength]);

  return (
    <div className="container">
      <div className="break">
        <h3 id="break-label">Break Length</h3>
        <p id="break-length">{breakLength}</p>
        <div className="buttons">
          <FontAwesomeIcon
            onClick={() => {
              if (breakLength < 60) {
                setBreakLength(breakLength + 1);
              }}
            }
            icon={faCircleUp}
            id="break-increment"
            className="btn"
          />
          <FontAwesomeIcon
            onClick={() => {
              if (breakLength > 1) {
                setBreakLength(breakLength - 1);
              }}
            }
            icon={faCircleDown}
            id="break-decrement"
            className="btn"
          />
        </div>
      </div>
      <div className="main" data-timer={countdown}>
        <h2 id="timer-label">{isBreak ? "Break" : "Session"}</h2>
        <h1 id="time-left" className="timer">
          {
            `${Math.floor(countdown / 60) < 10 ? "0" : ""}${Math.floor(
              countdown / 60
            )}:${countdown % 60 < 10 ? "0" : ""}${countdown % 60}`
            }
        </h1>
        <div className="buttons">
          <div id="start_stop" onClick={() => setIsRunning((prev) => !prev)}>
            {isRunning ? (
              <FontAwesomeIcon icon={faCirclePause} className="btn"/>
            ) : (
              <FontAwesomeIcon icon={faCirclePlay} className="btn"/>
            )}
          </div>
          <FontAwesomeIcon onClick={reset} icon={faRotate} id="reset" className="btn"/>
        </div>
        <audio id="beep" src={beep} />
      </div>
      <div className="session">
        <h3 id="session-label">Session Length</h3>
        <p id="session-length">{sessionLength}</p>
        <div className="buttons">
          <FontAwesomeIcon
            onClick={() => {
              if (sessionLength < 60) {
                setSessionLength(sessionLength + 1);
                setCountdown((sessionLength + 1) * 60);
              }}
            }
            icon={faCircleUp}
            id="session-increment"
            className="btn"
            />
          <FontAwesomeIcon
              onClick={() => {
                if (sessionLength > 1) {
                  setSessionLength(sessionLength - 1);
                  setCountdown((sessionLength - 1) * 60);
                }}
              }
            icon={faCircleDown}
            id="session-decrement"
            className="btn"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
