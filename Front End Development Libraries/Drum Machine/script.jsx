const initialKeys = [
	{
		keyCode: 81,
		keyTrigger: "Q",
		id: "Heater-1",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
	},
	{
		keyCode: 87,
		keyTrigger: "W",
		id: "Heater-2",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
	},
	{
		keyCode: 69,
		keyTrigger: "E",
		id: "Heater-3",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
	},
	{
		keyCode: 65,
		keyTrigger: "A",
		id: "Heater-4",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
	},
	{
		keyCode: 83,
		keyTrigger: "S",
		id: "Clap",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
	},
	{
		keyCode: 68,
		keyTrigger: "D",
		id: "Open-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
	},
	{
		keyCode: 90,
		keyTrigger: "Z",
		id: "Kick-n'-Hat",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
	},
	{
		keyCode: 88,
		keyTrigger: "X",
		id: "Kick",
		url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
	},
	{
		keyCode: 67,
		keyTrigger: "C",
		id: "Closed-HH",
		url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
	},
];

const mapToKeys = {};
initialKeys.map((obj) => {
	mapToKeys[obj.keyCode] = { id: obj.id, keyTrigger: obj.keyTrigger };
});
function MyApp() {
	const [padKeys, setPadKeys] = React.useState(initialKeys);
	const [power, setPower] = React.useState(true);
	const [display, setDisplay] = React.useState(String.fromCharCode(160));
	const [sliderVal, setSliderVal] = React.useState(0.43);

	React.useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [power, sliderVal]);

	const handleKeyPress = (e) => {
		if (mapToKeys[e.keyCode]) {
			playSound(mapToKeys[e.keyCode]);
		}
	};

	const playSound = (e) => {
		if (power) {
			const audioTrack = document.getElementById(e.keyTrigger);
			audioTrack.currentTime = 0;
			audioTrack.volume = sliderVal;
			audioTrack.play();
			setDisplay(e.id);
		}
	};

	const powerControl = (e) => {
		setPower((pow) => {
			return !pow;
		});
		setDisplay((dis) => {
			return String.fromCharCode(160);
		});

		setPadKeys((keys) => {
			return keys.map((k, index) => {
				if (e) {
					return {
						...k,
						url: "#",
					};
				} else {
					return initialKeys[index];
				}
			});
		});
	};

	const adjustVolume = (e) => {
		power &&
			(setDisplay("Volume: " + Math.round(100 * e.target.value)),
			setSliderVal(e.target.value),
			setTimeout(() => setDisplay(String.fromCharCode(160)), 100));
	};

	return (
		<div id="drum-machine">
			<Drumpad padKeys={padKeys} playSound={playSound} />
			<Controls
				display={display}
				power={power}
				powerControl={powerControl}
				sliderVal={sliderVal}
				adjustVolume={adjustVolume}
			/>
		</div>
	);
}

function Drumpad({ padKeys, playSound }) {
	return (
		<div className="pad-bank">
			{padKeys.map((padKey) => {
				return (
					<button
						className="drum-pad"
						id={padKey.id}
						key={padKey.id}
						onClick={() => {
							playSound(padKey);
						}}>
						<audio
							className="clip"
							src={padKey.url}
							id={padKey.keyTrigger}></audio>
						{padKey.keyTrigger}
					</button>
				);
			})}
		</div>
	);
}

function Controls({ display, power, powerControl, sliderVal, adjustVolume }) {
	return (
		<div className="controls-container">
			<div>
				<div id="display">{display}</div>
				<div className="volume-slider">
					<input
						max="1"
						min="0"
						step="0.01"
						type="range"
						value={sliderVal}
						onChange={adjustVolume}
					/>
				</div>
			</div>
			<div className="control">
				<p>Power</p>
				<div
					className="select"
					onClick={() => {
						powerControl(power);
					}}>
					<div
						className="inner"
						style={power ? { float: "right" } : { float: "left" }}></div>
				</div>
			</div>
		</div>
	);
}

const container = document.getElementById("root");
ReactDOM.render(<MyApp />, container);
