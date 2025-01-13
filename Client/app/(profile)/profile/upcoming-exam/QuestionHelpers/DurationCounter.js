"use client"
import { useEffect, useState } from 'react';

export default function useDurationCounter(initialDuration) {
    const [durationCount, setDurationCount] = useState(initialDuration);

    useEffect(() => {
        if (durationCount > 0) {
            const interval = setInterval(() => {
                setDurationCount((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval
        }
    }, [durationCount]);

    useEffect(() => {
        setDurationCount(initialDuration); // Update duration if initialDuration changes
    }, [initialDuration]);

    return durationCount;
}
