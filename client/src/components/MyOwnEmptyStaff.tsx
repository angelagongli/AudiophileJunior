import React, { useEffect } from 'react';

export interface IMyOwnEmptyStaffProps {};

const MyOwnEmptyStaff: React.FunctionComponent<IMyOwnEmptyStaffProps> = props => {
    useEffect(() => {
        // This is still not my very own empty staff in the sense that I can only
        // Make the staff draw itself in real time by looking at/following this
        // Page: https://jakearchibald.com/2013/animated-line-drawing-svg/
        const lineSet = document.getElementsByTagName("line");
        for (let l = 0; l < lineSet.length; l++) {
            // The drawing essentially depends on the length of the dash being
            // Set to the whole length of the line, and the gap that the dash is
            // Pulled back from by the offset being set to the whole length of the line as well
            lineSet[l].style.strokeDasharray = '250 250';
            lineSet[l].style.strokeDashoffset = '250';
            lineSet[l].getBoundingClientRect();
            lineSet[l].style.transition = 'stroke-dashoffset 2s ease-in-out';
            // Then the offset comes down from the whole length of the line going
            // All the way to 0 at which point the dash is completely pushed back
            lineSet[l].style.strokeDashoffset = '0';
        }
    }, []);

    return (
        <div id="myOwnStaffDiv">
            <svg width="300" height="200" stroke="black" strokeWidth="0.5px">
                <line x1="20" y1="10" x2="250" y2="10" />
                <line x1="20" y1="20" x2="250" y2="20" />
                <line x1="20" y1="30" x2="250" y2="30" />
                <line x1="20" y1="40" x2="250" y2="40" />
                <line x1="20" y1="50" x2="250" y2="50" />

                <line x1="20" y1="110" x2="250" y2="110" />
                <line x1="20" y1="120" x2="250" y2="120" />
                <line x1="20" y1="130" x2="250" y2="130" />
                <line x1="20" y1="140" x2="250" y2="140" />
                <line x1="20" y1="150" x2="250" y2="150" />

                <line x1="20" y1="10" x2="20" y2="150" />
                <line x1="245" y1="10" x2="245" y2="150" />
                <line x1="250" y1="10" x2="250" y2="150" strokeWidth="2.5px" />
                {/* How do I draw the brace? */}
            </svg>
        </div>
    );
};

export default MyOwnEmptyStaff;
