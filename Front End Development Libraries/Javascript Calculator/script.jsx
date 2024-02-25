const isOperator = /[x/+-]/;
const endsWithOperator = /[x+-/]$/;
const endsWithNegativeSign = /\d[x/+-]{1}-$/;
const isNotDigitOrDot = /([^.0-9]0|^0)$/;
function MyApp() {
	const [currentVal, setCurrentVal] = React.useState("0");
	const [prevVal, setPrevVal] = React.useState("0");
	const [formula, setFormula] = React.useState("");
	const [evaluated, setEvaluated] = React.useState(false);

	function initialize() {
		setCurrentVal("0");
		setPrevVal("0");
		setFormula("");
		setEvaluated(false);
	}

	function handleNumbers(e) {
		const curr = currentVal;
		const frm = formula;
		const val = e.target.value;
		const checkEval = evaluated;

		if (currentVal != "Digit Limit Met") {
			setEvaluated(false);
			if (curr.length > 21) {
				maxDigitWarning();
			} else if (checkEval) {
				setCurrentVal(val);
				setFormula("0" !== val ? val : "");
			} else {
				setCurrentVal("0" === curr || isOperator.test(curr) ? val : curr + val);
				setFormula(
					"0" === curr && "0" === val
						? "" === frm
							? val
							: frm
						: isNotDigitOrDot.test(frm)
						? frm.slice(0, -1) + val
						: frm + val
				);
			}
		}
	}

	function handleDecimal(e) {
		const curr = currentVal;
		const frm = formula;
		const val = e.target.value;
		const checkEval = evaluated;

		if (true === checkEval) {
			setCurrentVal("0.");
			setFormula("0.");
			setEvaluated(false);
		} else if (!curr.includes(".") && !curr.includes("Limit")) {
			setEvaluated(false);
			if (curr.length > 21) {
				maxDigitWarning();
			} else if (endsWithOperator.test(frm) || ("0" === curr && "" === frm)) {
				setCurrentVal("0.");
				setFormula(frm + "0.");
			} else {
				setCurrentVal(frm.match(/(-?\d+\.?\d*)$/)[0] + ".");
				setFormula(frm + ".");
			}
		}
	}

	function handleOperators(e) {
		const curr = currentVal;
		const pre = prevVal;
		const frm = formula;
		const val = e.target.value;
		const checkEval = evaluated;

		if (currentVal != "Digit Limit Met") {
			setCurrentVal(val);
			setEvaluated(false);
			if (checkEval) {
				setFormula(pre + val);
			} else {
				if (endsWithOperator.test(frm)) {
					if (endsWithNegativeSign.test(frm)) {
						"-" !== val && setFormula(pre + val);
					} else {
						setFormula(
							(endsWithNegativeSign.test(frm + val) ? frm : pre) + val
						);
					}
				} else {
					setPrevVal(frm);
					setFormula(frm + val);
				}
			}
		}
	}

	function handleEvaluate(e) {
		if (currentVal != "Digit Limit Met") {
			let expression = formula;
			for (; endsWithOperator.test(expression); ) {
				expression = expression.slice(0, -1);
			}
			expression = expression
				.replace(/x/g, "*")
				.replace(/-/g, "-")
				.replace("--", "-");
			let answer = Math.round(1e12 * eval(expression)) / 1e12;
			setCurrentVal(answer.toString());
			setFormula(
				expression
					.replace(/\*/g, "⋅")
					.replace(/-/g, "-")
					.replace(/(x|\/|\+)-/, "$1-")
					.replace(/^-/, "-") +
					"=" +
					answer
			);
			setPrevVal(answer);
			setEvaluated(true);
		}
	}

	function maxDigitWarning() {
		const curr = currentVal;
		setPrevVal(curr);
		setCurrentVal("Digit Limit Met");

		setTimeout(() => {
			setCurrentVal(prevVal);
		}, 1000);
	}

	return (
		<div className="calculator">
			<div className="formulaScreen">{formula}</div>
			<div className="outputScreen" id="display">
				{currentVal}
			</div>
			<Keypad
				initialize={initialize}
				handleNumbers={handleNumbers}
				handleDecimal={handleDecimal}
				handleOperators={handleOperators}
				handleEvaluate={handleEvaluate}
			/>
		</div>
	);
}

function Keypad({
	initialize,
	handleNumbers,
	handleDecimal,
	handleOperators,
	handleEvaluate,
}) {
	return (
		<div className="keypad">
			<button
				className="button span-2-col red"
				id="clear"
				value="AC"
				onClick={initialize}>
				AC
			</button>
			<button
				className="button gray"
				id="divide"
				value="/"
				onClick={handleOperators}>
				/
			</button>
			<button
				className="button gray"
				id="multiply"
				value="x"
				onClick={handleOperators}>
				x
			</button>
			<button className="button" id="seven" value="7" onClick={handleNumbers}>
				7
			</button>
			<button className="button" id="eight" value="8" onClick={handleNumbers}>
				8
			</button>
			<button className="button" id="nine" value="9" onClick={handleNumbers}>
				9
			</button>
			<button
				className="button gray"
				id="subtract"
				value="-"
				onClick={handleOperators}>
				-
			</button>
			<button className="button" id="four" value="4" onClick={handleNumbers}>
				4
			</button>
			<button className="button" id="five" value="5" onClick={handleNumbers}>
				5
			</button>
			<button className="button" id="six" value="6" onClick={handleNumbers}>
				6
			</button>
			<button
				className="button gray"
				id="add"
				value="+"
				onClick={handleOperators}>
				+
			</button>
			<button className="button" id="one" value="1" onClick={handleNumbers}>
				1
			</button>
			<button className="button" id="two" value="2" onClick={handleNumbers}>
				2
			</button>
			<button className="button" id="three" value="3" onClick={handleNumbers}>
				3
			</button>
			<button
				id="equals"
				value="="
				className="button span-2-row blue"
				onClick={handleEvaluate}>
				=
			</button>
			<button
				className="button span-2-col"
				id="zero"
				value="0"
				onClick={handleNumbers}>
				0
			</button>
			<button className="button" id="decimal" value="." onClick={handleDecimal}>
				.
			</button>
		</div>
	);
}

const container = document.getElementById("root");
ReactDOM.render(<MyApp />, container);
