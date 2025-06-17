"use client";

import React, { useRef, useState, useEffect } from "react";

const FloatingBoxJS = () => {
  const boxRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 300, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;

    console.log = function (...args) {
      const message = args
        .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
        .join(" ");
      const type = /Fast Refresh.*done/.test(message)
        ? "success"
        : /Fast Refresh.*rebuilding/.test(message)
        ? "info"
        : "log";

      setLogs((prev) => [...prev, { message, type }]);
      originalLog.apply(console, args);
    };

    console.error = function (...args) {
      const message = args
        .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
        .join(" ");
      setLogs((prev) => [...prev, { message, type: "error" }]);
      originalError.apply(console, args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  const onMouseDown = (e) => {
    if (e.target.dataset.resize) {
      setIsResizing(true);
      return;
    }

    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    setIsDragging(true);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - offset.current.x;
        const newY = e.clientY - offset.current.y;
        setPosition({ x: newX, y: newY });
      } else if (isResizing) {
        const rect = boxRef.current.getBoundingClientRect();
        const newWidth = Math.max(200, e.clientX - rect.left);
        const newHeight = Math.max(100, e.clientY - rect.top);
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, isResizing]);

  const logColors = {
    error: "#ef4444",
    success: "#22c55e",
    info: "#3b82f6",
    log: "#ebfb0f",
  };

  const getColor = (type) => logColors[type] || logColors["log"];

  return (
    <div
      ref={boxRef}
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        overflow: "hidden",
        backgroundColor: "#1e293b",
        color: "#f8fafc",
        padding: "12px",
        borderRadius: "8px",
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: 1000,
        fontSize: "12px",
        fontFamily: "monospace",
        boxSizing: "border-box",
        resize: "none",
      }}
    >
      <strong style={{ display: "block", marginBottom: "8px" }}>
        Console Output:
      </strong>
      <div style={{ overflowY: "auto", maxHeight: size.height - 40 }}>
        {logs.slice(-10).map((log, idx) => (
          <div key={idx} style={{ color: getColor(log.type) }}>
            {log.message}
          </div>
        ))}
      </div>
      <div
        data-resize
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "16px",
          height: "16px",
          backgroundColor: "#334155",
          cursor: "nwse-resize",
        }}
      />
    </div>
  );
};

export default FloatingBoxJS;
