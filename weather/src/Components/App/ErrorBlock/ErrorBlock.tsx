import {FC} from "react";

interface ErrorBlockProps {
    word:string;
}

const ErrorBlock: FC<ErrorBlockProps> = ({word}): JSX.Element | null => {
    if(!word) return null;

    return <div>{word}</div>
}

export default ErrorBlock;