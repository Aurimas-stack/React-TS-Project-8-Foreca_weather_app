import { FC } from "react";

interface ErrorBlockProps {
  error: string;
}

const ErrorBlock: FC<ErrorBlockProps> = ({ error }): JSX.Element | null => {
  if (!error) return null;

  return <div className="error_cont">Error: {error}</div>;
};

export default ErrorBlock;
