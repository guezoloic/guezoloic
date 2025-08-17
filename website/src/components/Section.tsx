import React from 'react';

const Section = ({ children }) => {
    return (
        <section className="h-screen flex items-center justify-center m-5">
            {children}
        </section>
    );
};

export default Section;