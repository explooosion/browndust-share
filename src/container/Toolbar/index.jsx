import { useState, memo } from "react";

import DisplayGroup from "./DisplayGroup";
import OutputGroup from "./OutputGroup";
import ButtonGroup from "./ButtonGroup";

const Toolbar = memo(function Toolbar() {
    const [downloadSizeSelected, setDownloadSizeSelected] = useState(1);
    const [downloadSizeCustom, setDownloadSizeCustom] = useState(0);

    return (
        <div className="flex flex-col p-4 bg-black bg-opacity-30 rounded space-y-4">
            <DisplayGroup />
            <OutputGroup
                downloadSizeSelected={downloadSizeSelected}
                setDownloadSizeSelected={setDownloadSizeSelected}
                downloadSizeCustom={downloadSizeCustom}
                setDownloadSizeCustom={setDownloadSizeCustom}
            />
            <ButtonGroup
                downloadSizeSelected={downloadSizeSelected}
                downloadSizeCustom={downloadSizeCustom}
            />
        </div>
    );
});

export default Toolbar;
