import { useState } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [documentation, setDocumentation] = useState("");

  const generateDocs = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/generate-docs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();
      setDocumentation(data.documentation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>
  <span className="emoji"><span>🤖 AI Powered</span></span>
  AI Documentation Generator
</h1>


      <p className="subtitle">
        Generate technical documentation from source code instantly
      </p>

      {/* ✅ BADGES ADDED CORRECTLY */}
      <div className="badges">
        <span>⚡ Fast</span>
        <span>🤖 AI Powered</span>
        <span>✅ Accurate</span>
        <span>🔒 Secure</span>
      </div>

      <div className="container">
        <div className="left-panel">
          <h2>Upload Source Code</h2>

          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onload = (event) => {
                setCode(event.target.result);
              };

              reader.readAsText(file);
            }}
          />

          <textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button onClick={generateDocs}>
            🚀 Generate Documentation
          </button>
        </div>

        <div className="right-panel">
          <h2>Generated Documentation</h2>
          <pre>{documentation}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;