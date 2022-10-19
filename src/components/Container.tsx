import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
    return (
        <div className="pill-container">
            {children}
        </div>
    );
};

export default Container;