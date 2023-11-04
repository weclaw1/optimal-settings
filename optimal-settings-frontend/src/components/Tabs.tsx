import { useState } from 'react';

import Tab from './Tab';

type TabsProps = {
  children: React.ReactElement<ChildrenProps>[];
  type?: 'boxed' | 'bordered' | 'lifted';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  initialActiveTab?: number;
};

type ChildrenProps = {
  label: string;
};

export default function Tabs({ children, type, size, initialActiveTab = 0 }: TabsProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  let tabsClasses = 'tabs';
  if (type === 'boxed') {
    tabsClasses += ` tabs-${type}`;
  }

  return (
    <>
      <div className={tabsClasses}>
        {children.map((child, index) => {
          const { label } = child.props;
          return (
            <Tab
              key={label}
              label={label}
              type={type !== 'boxed' ? type : undefined}
              size={size}
              active={index === activeTab}
              onClick={() => setActiveTab(index)}
            />
          );
        })}
      </div>
      {children[activeTab]}
    </>
  );
} 