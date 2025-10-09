interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = ({ children, className = '', hover = true }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-md shadow-lg overflow-hidden ${
        hover ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
