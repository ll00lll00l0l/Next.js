import { Button } from "@/components/ui";
import FloatingBox from "@/devtool/FloatingBoxJS";
import React, { useEffect, useCallback, useState } from "react";

export default function Index() {
 let log = "this console" ;
 let array = "this error" ;
  useEffect(() => {
})


  return (
    <div className="h-[100vh] w-full">
      <div className="flex justify-center items-center h-full gap-3">
        <Button variant="outline" onClick={() => console.log(log)}>console</Button>
        <Button variant="outline" onClick={() => console.error(array)}>error</Button>
      </div>
      <FloatingBox />
    </div>
  );
}
