import React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, link }) => {
  return (
    <Link href={link}>
      <div className="card">
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default Card;