import { MdExpandLess, MdExpandMore, MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useState } from "react";

const FileAndFolder = ({ data, level = 0, setAddActionData, otherInfo }) => {
    const [openedFol, setOpenedFold] = useState(data.filter(item => item.isFolder).map(item => item.id));


    const handleOpenFol = ({ folId }) => {
        const isOpened = openedFol.includes(folId)

        if (isOpened) setOpenedFold(openedFol.filter((e) => e !== folId))
        else setOpenedFold([...openedFol, folId])
    }


    const handleAddFolder = (parentNode) => {
        setAddActionData("folder")
        otherInfo.setDocNameParent(parentNode)
    }

    const handleAddFile = (parentNode) => {
        setAddActionData("file")
        otherInfo.setDocNameParent(parentNode)
    }

    const handleRemove = (parentNode) => {
        otherInfo.setDocNameParent(parentNode)
        otherInfo.handleRemove(parentNode)
    }

    return (
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
                                    {fol?.isFolder && <FiFolderPlus className="fol-action-icon" data-testid={`add-folder-{${fol?.id}}`} onClick={() => handleAddFolder(fol?.id)} />}
                                    {fol?.isFolder && <AiOutlineFileAdd className="fol-action-icon" data-testid={`add-file-{${fol?.id}}`} onClick={() => handleAddFile(fol?.id)} />}
                                    <MdDeleteOutline className="fol-action-icon" data-testid={`delete`} onClick={() => handleRemove(fol?.id)} />
                                </div>
                            </div>
                            {
                                Boolean(openedFol.includes(fol?.id) && fol?.children && fol?.children?.length) &&
                                <div className="sub-fol-container">
                                    <FileAndFolder data={fol?.children} level={folInd + 1} setAddActionData={setAddActionData} otherInfo={otherInfo} />
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FileAndFolder;
