// "use client";

// import React, { useRef, useState, useEffect, MouseEvent } from "react";

// type LogType = "error" | "success" | "info" | "log";

// interface LogEntry {
//   message: string;
//   type: LogType;
// }

// const FloatingBox: React.FC = () => {
//   const boxRef = useRef<HTMLDivElement | null>(null);
//   const [position, setPosition] = useState<{ x: number; y: number }>({
//     x: 100,
//     y: 100,
//   });
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const offset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
//   const [logs, setLogs] = useState<LogEntry[]>([]);

//   useEffect(() => {
//     const originalLog = console.log;
//     const originalError = console.error;

//     console.log = (...args: any[]) => {
//       const message = args
//         .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
//         .join(" ");

//       const type: LogType =
//         /Fast Refresh.*done/.test(message)
//           ? "success"
//           : /Fast Refresh.*rebuilding/.test(message)
//           ? "info"
//           : "log";

//       setLogs((prev) => [...prev, { message, type }]);
//       originalLog.apply(console, args);
//     };

//     console.error = (...args: any[]) => {
//       const message = args
//         .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
//         .join(" ");
//       setLogs((prev) => [...prev, { message, type: "error" }]);
//       originalError.apply(console, args);
//     };

//     return () => {
//       console.log = originalLog;
//       console.error = originalError;
//     };
//   }, []);

//   const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
//     if (boxRef.current) {
//       const rect = boxRef.current.getBoundingClientRect();
//       offset.current = {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//       };
//     }
//     setIsDragging(true);
//   };

//   useEffect(() => {
//     const onMouseMove = (e: MouseEvent | MouseEventInit | any) => {
//       if (!isDragging) return;
//       const newX = e.clientX - offset.current.x;
//       const newY = e.clientY - offset.current.y;
//       setPosition({ x: newX, y: newY });
//     };

//     const onMouseUp = () => setIsDragging(false);

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp);

//     return () => {
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//     };
//   }, [isDragging]);

//   const logColors: Record<LogType, string> = {
//     error: "#ef4444",
//     success: "#22c55e",
//     info: "#3b82f6",
//     log: "#ebfb0f",
//   };

//   const getColor = (type: LogType): string =>
//     logColors[type] || logColors["log"];

//   return (
//     <div
//       ref={boxRef}
//       onMouseDown={onMouseDown}
//       style={{
//         position: "absolute",
//         left: position.x,
//         top: position.y,
//         width: "300px",
//         maxHeight: "300px",
//         overflowY: "auto",
//         backgroundColor: "#1e293b",
//         color: "#f8fafc",
//         padding: "12px",
//         borderRadius: "8px",
//         cursor: "grab",
//         zIndex: 1000,
//         fontSize: "12px",
//         fontFamily: "monospace",
//       }}
//     >
//       <strong style={{ display: "block", marginBottom: "8px" }}>
//         Console Output:
//       </strong>
//       <div>
//         {logs.slice(-10).map((log, idx) => (
//           <div key={idx} style={{ color: getColor(log.type) }}>
//             {log.message}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FloatingBox;
