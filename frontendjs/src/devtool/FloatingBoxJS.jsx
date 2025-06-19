"use client";

import React, { useRef, useState, useEffect } from "react";

const FloatingBoxJS = () => {
  const boxRef = useRef(null);
  const [position, setPosition] = useState({ x: 1000, y: 200 });
  const [size, setSize] = useState({ width: 300, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [filter, setFilter] = useState("all");
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
    all: "#00fff2",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <strong>Console Output:</strong>
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => setLogs([])}
          >
            ⊘
          </button>
        </span>
        {/* <div style={{ display: "flex", gap: "8px", fontSize: "11px" }}>
          {["log", "info", "success", "error"].map((type) => {
            const count = logs.filter((log) => log.type === type).length;
            return (
              <span key={type} style={{ color: getColor(type) }}>
                {type.toUpperCase()}: {count}
              </span>
            );
          })}
        </div> */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            fontSize: "11px",
            flexWrap: "wrap",
          }}
        >
          {["all", "log", "info", "success", "error"].map((type) => {
            const count =
              type === "all"
                ? logs.length
                : logs.filter((log) => log.type === type).length;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  color: getColor(type),
                  fontWeight: filter === type ? "bold" : "normal",
                  background: "transparent",
                  border: "1px solid transparent",
                  cursor: "pointer",
                }}
              >
                {type.toUpperCase()}: {count}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ overflowY: "auto", maxHeight: size.height - 40 }}>
        {[...logs]
          .filter((log) => filter === "all" || log.type === filter)
          .reverse()
          .map((log, idx) => (
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
          backgroundColor: "#ffffff",
          cursor: "nwse-resize",
        }}
      />
    </div>
  );
};
export default FloatingBoxJS;
