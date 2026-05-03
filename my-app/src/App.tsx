import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import { Editor } from '@monaco-editor/react';
import spinner from "./assets/spinner.svg";

function App() {
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("javascript");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);

  // User input and output
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");

  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize
  }

  function compile() {
    setLoading(true);
    if (userCode === "") {
      return
    }

    // Post request to compile endpoint
    axios.post(`http://localhost:8000/compile`, {
      code: userCode,
      language: userLang,
      input: userInput
    }).then((res) => {
      setUserOutput(res.data.stdout || res.data.stderr);
    }).then(() => {
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setUserOutput("Error: " + (err.response ? err.response.data.error : err.message));
      setLoading(false);
    });
  }

  function clearOutput() {
    setUserOutput("");
  }


  return (
    <div className="App">
      <Navbar
        userLang={userLang} setUserLang={setUserLang}
        userTheme={userTheme} setUserTheme={setUserTheme}
        fontSize={fontSize} setFontSize={setFontSize}
      />
      <div className="main">
        <div className="left-container">
          <Editor
            options={options}
            height="calc(60vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="javascript"
            defaultValue="// Start coding"
            onChange={(value) => { setUserCode(value as string) }}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
        </div>
        <div className="right-container">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea id="code-inp" onChange=
              {(e) => setUserInput(e.target.value)}>
            </textarea>
          </div>
          <h4>Output:</h4>
          {loading ? (
            <div className="spinner-box">
              <img src={spinner} alt="Loading..." />
            </div>
          ) : (
            <div className="output-box">
              <pre>{userOutput}</pre>
              <button onClick={() => { clearOutput() }}
                className="clear-btn">
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
