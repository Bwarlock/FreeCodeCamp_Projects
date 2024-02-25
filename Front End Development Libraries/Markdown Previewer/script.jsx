marked.setOptions({
	breaks: !0,
});

const defaultEditor =
	"# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n";

function MyApp() {
	const [editorContent, setEditorContent] = React.useState(defaultEditor);
	const [previewContent, setPreviewContent] = React.useState(
		DOMPurify.sanitize(marked.parse(defaultEditor))
	);

	React.useEffect(() => {
		setPreviewContent(DOMPurify.sanitize(marked.parse(editorContent)));
	}, [editorContent]);
	return (
		<>
			<Editor
				editorContent={editorContent}
				setEditorContent={setEditorContent}
			/>
			<Previewer previewContent={previewContent} />
		</>
	);
}

function Editor({ editorContent, setEditorContent }) {
	return (
		<div className="editorWrap">
			<div className="toolbar">
				<i className="fa-solid fa-file-pen"></i>

				<span className="toolbarTitle">EDITOR</span>
				<button>
					<i className="fa-solid fa-maximize"></i>
				</button>
			</div>
			<textarea
				id="editor"
				value={editorContent}
				onChange={(e) => {
					setEditorContent(e.target.value);
				}}></textarea>
		</div>
	);
}

function Previewer({ previewContent }) {
	return (
		<div className="previewWrap">
			<div className="toolbar">
				<i className="fa-solid fa-file"></i>
				<span className="toolbarTitle">PREVIEW</span>
				<button>
					<i className="fa-solid fa-maximize"></i>
				</button>
			</div>
			<div
				id="preview"
				dangerouslySetInnerHTML={{ __html: previewContent }}></div>
		</div>
	);
}

const container = document.getElementById("root");
ReactDOM.render(<MyApp />, container);
