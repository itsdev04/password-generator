import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRefererence = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passwordRefererence.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-20 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center text-2xl font-bold mb-4">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          value={password}
          ref={passwordRefererence}
          className="outline-none w-full py-2 px-3 bg-white text-gray-700"
          placeholder="Password"
          readOnly
        />
        <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-0.5 shrink-0 transition-colors"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-wrap text-sm gap-x-4 gap-y-2">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer accent-blue-600"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="min-w-[70px]">Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
