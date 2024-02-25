const playIcon = <i className="fa-solid fa-play fa-3x fa-fw"></i>;
const pauseIcon = <i className="fa-solid fa-pause fa-3x fa-fw"></i>;
const refreshIcon = <i className="fa-solid fa-arrows-rotate fa-3x fa-fw"></i>;
const upArrowIcon = <i className="fa-solid fa-arrow-up fa-2x fa-fw"></i>;
const downArrowIcon = <i className="fa-solid fa-arrow-down fa-2x fa-fw"></i>;

const TIMER_STATE = {
	stopped: "stopped",
	running: "running",
};
const TIMER_LABEL = {
	session: "Session",
	break: "Break",
};

let timerFx = null;
let setTimeFx = null;

function MyApp() {
	const [breakLength, setBreakLength] = React.useState(5);
	const [sessionLength, setSessionLength] = React.useState(25);
	const [timer, setTimer] = React.useState(1500);
	const [playPauseIcon, setPlayPauseIcon] = React.useState(playIcon);
	const [timerState, setTimerState] = React.useState(TIMER_STATE.stopped);
	const [timerLabel, setTimerLabel] = React.useState(TIMER_LABEL.session);

	const beepAudio = React.useRef(null);

	React.useEffect(() => {
		if (timerLabel == TIMER_LABEL.break) {
			setTimer(breakLength * 60);
		}
	}, [breakLength]);

	React.useEffect(() => {
		if (timerLabel == TIMER_LABEL.session) {
			setTimer(sessionLength * 60);
		}
	}, [sessionLength]);

	function buzzer(e) {
		beepAudio.current.currentTime = 0;
		beepAudio.current.play();
		setTimeout(() => {
			beepAudio.current.currentTime = 0;
			beepAudio.current.pause();
		}, 5000);
	}

	function reset() {
		setTimerState(TIMER_STATE.stopped);
		setPlayPauseIcon(playIcon);
		setBreakLength(5);
		setSessionLength(25);
		setTimer(1500);
		setTimerLabel(TIMER_LABEL.session);
		stopCountDown();

		beepAudio.current.currentTime = 0;
		beepAudio.current.pause();
	}
	function handleBreakLength(i) {
		if (timerState != TIMER_STATE.running) {
			setBreakLength((brk) => {
				return (brk == 1 && i == -1) || (brk == 60 && i == +1) ? brk : brk + i;
			});
		}
	}

	function handleSessionLength(i) {
		if (timerState != TIMER_STATE.running) {
			setSessionLength((sess) => {
				return (sess == 1 && i == -1) || (sess == 60 && i == +1)
					? sess
					: sess + i;
				// return sess + i;
			});
		}
	}

	React.useEffect(() => {
		if (timer === 0) {
			clearInterval(timerFx);
			buzzer();

			console.log("WE dONE");
			if (timerLabel == TIMER_LABEL.session) {
				setTimerLabel(TIMER_LABEL.break);
				setTimer(breakLength * 60);

				startCountDown(breakLength * 60);
			} else if (timerLabel == TIMER_LABEL.break) {
				setTimerLabel(TIMER_LABEL.session);
				setTimer(sessionLength * 60);

				startCountDown(sessionLength * 60);
			}
		}
	}, [timer]);

	function startCountDown(tim) {
		// console.log(tim, timer, breakLength, sessionLength);
		clearInterval(timerFx);
		// clearTimeout(setTimeFx);

		timerFx = setInterval(() => {
			setTimer((t) => {
				return t - 1;
			});
		}, 1000);
		// setTimeFx = setTimeout(function () {
		// 	if (timer === 0) {
		// 		clearInterval(timerFx);

		// 		console.log("WE dONE");
		// 		if (timerLabel == TIMER_LABEL.session) {
		// 			setTimerLabel(TIMER_LABEL.break);
		// 			setTimer(breakLength * 60);

		// 			startCountDown(breakLength * 60);
		// 		} else if (timerLabel == TIMER_LABEL.break) {
		// 			setTimerLabel(TIMER_LABEL.session);
		// 			setTimer(sessionLength * 60);

		// 			startCountDown(sessionLength * 60);
		// 		}
		// 	}
		// }, tim * 1000);
	}
	function stopCountDown() {
		clearInterval(timerFx);
		// clearTimeout(setTimeFx);
	}
	function clockify() {
		if (timer < 0) return "00:00";
		let minute = Math.floor(timer / 60);
		let second = timer - 60 * minute;
		second = second < 10 ? "0" + second : second;
		minute = minute < 10 ? "0" + minute : minute;
		return minute + ":" + second;
	}

	function handlePlayPause(e) {
		if (timerState == TIMER_STATE.stopped) {
			setTimerState(TIMER_STATE.running);
			setPlayPauseIcon(pauseIcon);
			startCountDown(timer);
		} else if (timerState == TIMER_STATE.running) {
			setTimerState(TIMER_STATE.stopped);
			setPlayPauseIcon(playIcon);
			stopCountDown();
		}
	}

	return (
		<div className="clock">
			<div className="main-title">25 + 5 Clock</div>
			<Break breakLength={breakLength} handleBreakLength={handleBreakLength} />
			<Session
				sessionLength={sessionLength}
				handleSessionLength={handleSessionLength}
			/>
			<Timer timeLeft={clockify()} timerLabel={timerLabel} />
			<Controls
				handlePlayPause={handlePlayPause}
				reset={reset}
				playPauseIcon={playPauseIcon}
			/>
			<audio
				ref={beepAudio}
				id="beep"
				preload="auto"
				src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
		</div>
	);
}

function Break({ breakLength, handleBreakLength }) {
	return (
		<div className="length-controller">
			<div id="break-label">Break Length</div>
			<button
				className="btn-level"
				id="break-decrement"
				onClick={() => {
					handleBreakLength(-1);
				}}>
				{downArrowIcon}
			</button>
			<div className="btn-level w-64" id="break-length">
				{breakLength}
			</div>
			<button
				className="btn-level"
				id="break-increment"
				onClick={() => {
					handleBreakLength(+1);
				}}>
				{upArrowIcon}
			</button>
		</div>
	);
}

function Session({ sessionLength, handleSessionLength }) {
	return (
		<div className="length-controller">
			<div id="session-label">Session Length</div>
			<button
				className="btn-level"
				id="session-decrement"
				value="-1"
				onClick={() => {
					handleSessionLength(-1);
				}}>
				{downArrowIcon}
			</button>
			<div className="btn-level w-64" id="session-length">
				{sessionLength}
			</div>
			<button
				className="btn-level"
				id="session-increment"
				value="+1"
				onClick={() => {
					handleSessionLength(+1);
				}}>
				{upArrowIcon}
			</button>
		</div>
	);
}

function Timer({ timeLeft, timerLabel }) {
	return (
		<div className="timer">
			<div id="timer-label">{timerLabel}</div>
			<div id="time-left">{timeLeft}</div>
		</div>
	);
}

function Controls({ handlePlayPause, reset, playPauseIcon }) {
	return (
		<div className="timer-control">
			<button id="start_stop" onClick={handlePlayPause}>
				{playPauseIcon}
			</button>
			<button id="reset" onClick={reset}>
				{refreshIcon}
			</button>
		</div>
	);
}
const container = document.getElementById("root");
ReactDOM.render(<MyApp />, container);
