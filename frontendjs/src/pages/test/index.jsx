import { Button } from "@/components/ui";
import FloatingBox from "@/devtool/FloatingBoxJS";
import React, { useEffect, useCallback, useState, use } from "react";

export default function Index() {
const string = "hello";

  useEffect(() => {
  const arr = string.split("").reverse().join("");
  console.log(arr);
})


  return (
    <div className="h-[100vh] w-full">
      <div className="flex justify-center items-center h-full">
      </div>
      <FloatingBox />
    </div>
  );
}
