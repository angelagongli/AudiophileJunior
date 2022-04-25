import React, { useEffect } from 'react';
import { Vex, Stave, StaveConnector } from 'vexflow';

export interface IEmptyStaffProps {};

const EmptyStaff: React.FunctionComponent<IEmptyStaffProps> = props => {
    const VF = Vex.Flow;
    console.log("VexFlow Build: " + JSON.stringify(VF.BUILD));

    useEffect(() => {
        const div = document.getElementById("staffDiv") as HTMLDivElement;
        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        renderer.resize(200, 200);
        const context = renderer.getContext();
        context.setFont("Arial", 10);

        const trebleStaff = new Stave(20, 0, 180);
        const bassStaff = new Stave(20, 100, 180);
        const brace = new StaveConnector(trebleStaff, bassStaff).setType(3);
        const startLine = new StaveConnector(trebleStaff, bassStaff).setType(1);
        const endLine = new StaveConnector(trebleStaff, bassStaff).setType(6);

        trebleStaff.addClef("treble").addTimeSignature("4/4");
        bassStaff.addClef("bass").addTimeSignature("4/4");

        // Empty grand staff is rendered below, here is one measure:
        trebleStaff.setContext(context).draw();
        bassStaff.setContext(context).draw();
        brace.setContext(context).draw();
        startLine.setContext(context).draw();
        endLine.setContext(context).draw();
    }, []);

    return (
        <div id="staffDiv">
            {/* For now we can only see, and not hear on here! */}
        </div>
    );
};

export default EmptyStaff;
