import React from 'react';
import Card from './card';

interface GridProps {
  items: {
    title: string;
    link: string;
  }[];
}

const Grid: React.FC<GridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <Card key={index} title={item.title} link={item.link} />
      ))}
    </div>
  );
};

export default Grid;