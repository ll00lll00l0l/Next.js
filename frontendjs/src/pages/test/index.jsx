import { Button } from "@/components/ui";
import FloatingBox from "@/devtool/FloatingBoxJS";
import React, { useEffect, useCallback, useState } from "react";

export default function Index() {
const string = "hello";
 var array = "hello" ;
  useEffect(() => {
})


  return (
    <div className="h-[100vh] w-full">
      <div className="flex justify-center items-center h-full">
        <Button variant="outline" onClick={() => console.log(array)}>console</Button>
        <Button variant="outline" onClick={() => console.error(array)}>error</Button>
      </div>
      <FloatingBox />
    </div>
  );
}
