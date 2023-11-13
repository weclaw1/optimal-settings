"use client";

import { useState } from "react";

import Tab from "./Tab";

type TabSwitcherProps = {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
  type?: "boxed" | "bordered" | "lifted";
  size?: "xs" | "sm" | "md" | "lg";
  initialActiveTab?: number;
};

export default function TabSwitcher({
  tabs,
  type,
  size,
  initialActiveTab = 0,
}: TabSwitcherProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  let tabsClasses = "flex flex-row justify-center tabs";
  if (type === "boxed") {
    tabsClasses += ` tabs-${type}`;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={tabsClasses}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={tab.label}
              label={tab.label}
              type={type !== "boxed" ? type : undefined}
              size={size}
              active={index === activeTab}
              onClick={() => setActiveTab(index)}
            />
          );
        })}
      </div>
      {tabs[activeTab].content}
    </div>
  );
}
