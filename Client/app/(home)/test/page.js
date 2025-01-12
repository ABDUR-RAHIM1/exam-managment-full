"use client"
import React, { useState } from 'react'

export default function TestComponent() {

    const [inputValue, setInputValue] = useState("")

    const handleChange = (e) => {
        const value = e.target.value;

        const formattedValue = value
            // সাবস্ক্রিপ্টের জন্য `_` রূপান্তর
            .replace(/_(\d+)/g, (_, match) =>
                match
                    .split("")
                    .map((num) => String.fromCharCode(8320 + parseInt(num, 10))) // সাবস্ক্রিপ্ট (U+2080)
                    .join("")
            )
            // সুপারস্ক্রিপ্টের জন্য `^` রূপান্তর
            .replace(/\^(\d+)/g, (_, match) =>
                match
                    .split("")
                    .map((num) => {
                        const superscriptMap = {
                            0: "⁰",
                            1: "¹",
                            2: "²",
                            3: "³",
                            4: "⁴",
                            5: "⁵",
                            6: "⁶",
                            7: "⁷",
                            8: "⁸",
                            9: "⁹",
                        };
                        return superscriptMap[num] || num;
                    })
                    .join("")
            )
            // রুটের জন্য `root(x)` কে `√x` এ রূপান্তর 
            .replace(/r(\d+)/g, (_, match) => `√${match}`);
    setInputValue(formattedValue);
};



console.log(inputValue)

return (
    <div className='p-20'>

        <input onChange={handleChange} value={inputValue} type="text" name='text' placeholder='Tezt' className='input' />

    </div>
)
}
