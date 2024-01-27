import { Children, ReactNode } from "react";

interface Props {
    className?: string;
    children: ReactNode;
}

const Text = ({children, className}: Props) => {

    return (
        <div className={className}>{children}</div>
    )
}

export default Text