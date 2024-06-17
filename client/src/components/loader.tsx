import React from "react";
import { Spin } from "antd";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="h-20 w-20 border-8">
        <Spin />
      </div>
    </div>
  );
}

export default Loader;
