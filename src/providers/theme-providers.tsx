"use client";
import React from "react";
import { ConfigProvider } from "antd";

function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#A91D3A",
          borderRadius: 2,
          colorBgContainer: "#EEEEEE",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProviders;