"use client";

import { useState } from "react";

type TabSwitcher = {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
  type?: "boxed" | "bordered" | "lifted";
  size?: "xs" | "sm" | "md" | "lg";
  initialActiveTab?: number;
};

type Tab = {
  label: string;
  active?: boolean;
  onClick: () => void;
};

const Tab = ({ label, active, onClick }: Tab) => {
  let tabClasses = "tab";
  if (active) {
    tabClasses += " tab-active";
  }
  return (
    <a className={tabClasses} onClick={onClick}>
      {label}
    </a>
  );
};

export default function TabSwitcher({
  tabs,
  type,
  size,
  initialActiveTab = 0,
}: TabSwitcher) {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  let tabsClasses = "flex flex-row justify-center tabs gap-4";
  if (type) {
    tabsClasses += ` tabs-${type}`;
  }
  if (size) {
    tabsClasses += ` tabs-${size}`;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={tabsClasses}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={tab.label}
              label={tab.label}
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
