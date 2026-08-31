"use client";
import { useEffect, useState } from "react";

export default function CurrentDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setDate(formatted);
  }, []);

  return <div className="font-bold">{date || "..."}</div>;
}
