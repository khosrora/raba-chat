import React from "react";
import Content from "./layout_components/Content";
import Header from "./layout_components/Header";

function Layoutprovider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

export default Layoutprovider;
