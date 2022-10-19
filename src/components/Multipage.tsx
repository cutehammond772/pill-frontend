import React, { PropsWithChildren, useEffect } from 'react';

const Multipage = React.forwardRef<HTMLElement, PropsWithChildren>((props, ref) => {
    const array = React.Children.toArray(props.children);
    const pages = array.length;

    // <Multipage> Component 렌더링 시 호출
    useEffect(() => {
    }, []);
    return (
        <>
            {props.children}
        </>);
});

export default Multipage;