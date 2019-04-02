import * as React from "react";

const RawHTML = ({children}: {children: string}) => {
    return (<span dangerouslySetInnerHTML={{__html: children.replace(/\n/g, '<br />')}}></span>);
};

export default RawHTML;