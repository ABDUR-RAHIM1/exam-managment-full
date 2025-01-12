"use client"
import React, { useState } from "react";

const mathSymbols = [
    "²", "³", "√", "π", "+", "-", "*", "/", "(", ")", "∑", "∫", "≠", "=",
];

const MathInputField = () => {
    const [formData, setFormData] = useState({})
    const [inputValue, setInputValue] = useState("");

    // Handle virtual keyboard symbol click
    const handleSymbolClick = (symbol) => {
        setInputValue((prev) => prev + symbol);
    };

    return (
        <div style={{ padding: "20px" }}>
            <input type="text" name="text" className=" input" />
            <h3>Math & Text Input Field</h3>
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                rows="4"
                cols="50"
                placeholder="Type text or use symbols..."
            />
            <div style={{ marginTop: "10px" }}>
                {mathSymbols.map((symbol, index) => (
                    <button
                        key={index}
                        onClick={() => handleSymbolClick(symbol)}
                        style={{
                            padding: "10px",
                            margin: "5px",
                            fontSize: "18px",
                            cursor: "pointer",
                        }}
                    >
                        {symbol}
                    </button>
                ))}
            </div>
            <p style={{ marginTop: "20px" }}>Current Input: {inputValue}</p>
        </div>
    );
};

export default MathInputField;
