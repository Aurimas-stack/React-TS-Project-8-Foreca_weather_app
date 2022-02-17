import {FC} from "react";

import "./ErrorBlock.scss";

interface ErrorBlockProps {
    word:string;
}

const ErrorBlock: FC<ErrorBlockProps> = ({word}): JSX.Element | null => {
    if(!word) return null;

    return <div className="error_cont">Error: {word}</div>
}

export default ErrorBlock;