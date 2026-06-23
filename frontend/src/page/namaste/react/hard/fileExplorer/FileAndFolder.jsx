import { MdExpandLess, MdExpandMore, MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useState } from "react";

const FileAndFolder = ({ data, setData, level = 0, setAddActionData }) => {
    const [openedFol, setOpenedFold] = useState([]);


    const handleOpenFol = ({ folId }) => {

        const isOpened = openedFol.includes(folId)


        if (isOpened) setOpenedFold(openedFol.filter((e) => e !== folId))
        else setOpenedFold([...openedFol, folId])
    }


    const handleAddFolder = () => {
        setAddActionData("folder")
    }

    const handleAddFile = () => {
        setAddActionData("file")
    }

    const handleRemove = () => {
        // setData()
    }

    return (
        <div>
            <div className={`file-explorer-container ${level === 0 ? "parent-conatainer" : ""}`}>
                <div className="doc-name-container">
                    {
                        data.map((fol, folInd) => (
                            <div className="doc-name-section" key={folInd}>
                                <div className="doc-name-row">
                                    <p className={`doc-name`}>
                                        {fol?.isFolder && <span className="folder-view" onClick={() => handleOpenFol({ folId: fol?.id })} >{
                                            openedFol.includes(fol?.id) ?
                                                <MdExpandMore />
                                                :
                                                <MdExpandLess />}</span>}
                                        {fol?.name}
                                    </p>

                                    <div className="folder-action-section">
                                        {fol?.isFolder && <FiFolderPlus className="fol-action-icon" onClick={() => handleAddFolder()} />}
                                        {fol?.isFolder && <AiOutlineFileAdd className="fol-action-icon" onClick={() => handleAddFile()} />}
                                        <MdDeleteOutline className="fol-action-icon" onClick={() => handleRemove()} />
                                    </div>
                                </div>
                                {
                                    openedFol.includes(fol?.id) && fol?.children && fol?.children?.length &&
                                    <div className="sub-fol-container">
                                        <FileAndFolder data={fol?.children} level={folInd + 1} />
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FileAndFolder;
