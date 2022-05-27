import React, { useState, useEffect, useRef } from "react";
import "./bisection.css";
import { Callbisection } from "./test-table";

const Bisection = () => {
  const [isLoaded, setIsLoaded] = useState([]);

  const [result, setresult] = useState("");
  
  
  const equationInputRef = useRef();
  const xlInputRef = useRef();
  const xrInputRef = useRef();

  const sendRequest = async () => {
    const response = await fetch("http://localhost:5000/api/get-bisection", {
      headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvZ29AaG90bWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzEyMyIsImlhdCI6MTY1MzY1MDc5MywiZXhwIjoxNjg1MTg2NzkzfQ.5tw9Z_D0XooZox5p2-IW0tMO1RZzyDumvVJl3lv2I0Y`,
      },
  }
);
    const responseData = await response.json();
    setIsLoaded(responseData);
  };
  useEffect(() => {
    sendRequest();
  }, []);

  const saveItem = (event) => {
    event.preventDefault();
    const enteredEquation = equationInputRef.current.value;
    const enteredXl = xlInputRef.current.value;
    const enteredXr = xrInputRef.current.value;
    let xlfloat = parseFloat(enteredXl);
    let xrfloat = parseFloat(enteredXr);
    setresult(Callbisection(enteredEquation, xlfloat, xrfloat));
  };
  return (
    <div className="h1pj">
      <h1>คำนวณ_Bisection</h1>
      <div className="inputarea">
        <form onSubmit={saveItem}>
          <div>
            <label>input EQ</label>
          </div>

          <select ref={equationInputRef}>
            {isLoaded.map((equ, index) => {
              return (
                <option
                  key={index}
                  value={equ.equation}
                  label={equ.equation}
                ></option>
              );
            })}
          </select>

          <div>
            <label>input XL</label>
          </div>

          <select ref={xlInputRef}>
            {isLoaded.map((equXl, index) => {
              return (
                <option key={index} value={equXl.xl} label={equXl.xl}></option>
              );
            })}
          </select>

          <div>
            <label>input XR</label>
          </div>

          <select ref={xrInputRef}>
            {isLoaded.map((equXr, index) => {
              return (
                <option key={index} value={equXr.xr} label={equXr.xr}></option>
              );
            })}
          </select>

          <div>
            <input type="submit" className="btn-submit" value="Submit" />
          </div>
        </form>
      </div>
      <div>{result[0]}</div>
      <div>{result[1]}</div>
    </div>
  );
};

export default Bisection;
