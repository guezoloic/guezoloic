import React from 'react';

const Section = ({id, children }) => {
    return (
        <section id={id} className="h-screen flex items-center justify-center m-5">
            {children}
        </section>
    );
};

export default Section;