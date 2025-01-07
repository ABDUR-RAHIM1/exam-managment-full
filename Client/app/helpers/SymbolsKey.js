"use client"
import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const mathSymbols = [
    "²", "³", "√", "∛", "∜", "+", "-", "*", "/", "=", "<", ">", "<=", ">=", "≠", "≈", "±",
    "∑", "∏", "∞", "∫", "∂", "Δ", "∇", "∠", "⊥", "∥",
    "π", "e", "i", "|x|", "∪", "∩", "⊂", "⊃", "⊆", "⊇", "∅", "∀", "∃", "∈", "∉",
    "∋", "∝", "∴", "∵", "⇒", "⇔", "↔", "∧", "∨", "⊕", "⊗", "⊙", "mod", "lim",
    "sin", "cos", "tan", "cot", "sec", "csc", "sin⁻¹", "cos⁻¹", "tan⁻¹", "log", "ln",
    "exp", "θ", "α", "β", "γ", "φ", "ω", "κ", "λ", "μ", "σ", "τ", "χ", "ψ", "ℏ",
    "dx", "dy", "dz", "dy/dx", "f(x)", "g(x)", "h(x)", "x²", "x³", "y²", "y³",

];


const scienceSymbols = [
    "Δ", "α", "β", "γ", "λ", "μ", "θ", "ω", "σ", "τ",
    "Φ", "Ψ", "Ω", "ρ", "η", "κ", "ℏ", "∇", "°C", "°F",
    "°", "mol", "g", "kg", "m/s", "N", "J", "W", "Hz",
    "Pa", "V", "A", "Ω", "C", "eV", "μm", "nm", "L", "m³",
    "atm", "pH", "Na", "H₂O", "CO₂", "O₂", "CH₄", "H⁺", "OH⁻",
    "Fe", "Cu", "Zn", "Pb", "Hg", "Ag", "Au", "Cl", "K", "Ca",
    "sin θ", "cos θ", "tan θ", "cot θ", "sec θ", "csc θ", "f(x)", "t", "T",
    "v", "u", "s", "a", "g", "P", "Q", "E", "I", "k", "F", "q"
];



export const SymbolsKey = (props) => {
    const { setHide, setNewQuestion } = props
    const [inputValue, setInputValue] = useState("");

    // Handle virtual keyboard symbol click
    const handleSymbolClick = (symbol) => {
        setInputValue((prev) => prev + symbol);
        setNewQuestion(inputValue)
    };

    return (
        <div className="w-[320px] h-[300px] overflow-hidden shadow-lg rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 fixed top-[50%] right-3 transform -translate-y-1/2 border border-blue-300">
            {/* Header */}
            <div className="px-4 py-3 bg-blue-200 rounded-t-lg flex items-center justify-between">
                <h3 className="text-xl font-semibold text-center text-blue-700">Symbols</h3>
                <MdClose onClick={() => setHide(false)} className=" text-3xl text-red-500 cursor-pointer" />
            </div>

            {/* Scrollable Content */}
            <div className="px-4 py-4 overflow-y-auto max-h-[250px]">
                {/* Math Symbols */}
                <div className="grid grid-cols-6 gap-2">
                    {mathSymbols.map((symbol, index) => (
                        <button
                            key={index}
                            onClick={() => handleSymbolClick(symbol)}
                            className="px-2 py-1 bg-white text-blue-700 rounded-lg shadow-md hover:bg-blue-200 font-semibold text-sm"
                        >
                            {symbol}
                        </button>
                    ))}
                </div>

                {/* Divider for Science Symbols */}
                <p className="col-span-full font-bold mt-4 text-center text-blue-700 underline">
                    Science Symbols
                </p>

                {/* Science Symbols */}
                <div className="grid grid-cols-6 gap-2">
                    {scienceSymbols.map((symbol, index) => (
                        <button
                            key={index}
                            onClick={() => handleSymbolClick(symbol)}
                            className="px-2 py-1 bg-white text-blue-700 rounded-lg shadow-md hover:bg-blue-200 font-semibold text-sm"
                        >
                            {symbol}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


