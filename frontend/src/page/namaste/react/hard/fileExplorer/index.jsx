import { useEffect, useState } from "react";
import FileAndFolder from "./FileAndFolder.jsx";
import './style.css';
import AlertDialog from "../../../../../components/alertDialog/index.jsx";
import toast from "react-hot-toast";

const initialData = [
    {
        id: 1,
        name: "public",
        isFolder: true,
        children: [{ id: 2, name: "index.html", isFolder: false }],
    },
    {
        id: 3,
        name: "src",
        isFolder: true,
        children: [
            { id: 4, name: "App.js", isFolder: false },
            { id: 5, name: "index.js", isFolder: false },
        ],
    },
    { id: 6, name: "package.json", isFolder: false },
];

const FileExplorer = () => {
    const [data, setData] = useState(initialData),
        [addActionType, setAddActionData] = useState(""),
        [docName, setDocName] = useState(""),
        [docNameParent, setDocNameParent] = useState(null),
        [isDelDialog, setIsDelDialog] = useState(false);

    useEffect(() => {
        if (addActionType && docNameParent) {
            setDocName("")
        }
    }, [addActionType, docNameParent])

    const handleReset = () => {
        setDocName("");
        setDocNameParent(null);
        setAddActionData("");
    }

    const getAllIds = (nodes) => {
        return nodes.flatMap(node => [
            node.id,
            ...(node.children ? getAllIds(node.children) : [])
        ]);
    };

    const handleRemove = (items, parentId) => {
        return items
            .filter(item => item.id !== parentId)
            .map(item => ({
                ...item,
                ...(item?.children && item?.children?.length ? {
                    children: handleRemove(item.children, parentId)
                } : {})
            }));
    };

    const handleNewDoc = (val, parentId) => {
        const payload = val;
        const ids = new Set(
            getAllIds(data)
        ), arrIds = [...ids].sort((a, b) => a - b);

        let uniqueId = null;
        for (let i = 1; i <= Math.max(...arrIds); i++) {
            if (!arrIds.includes(i)) {
                uniqueId = i;
            }
        }

        return payload.map((v, i) => {

            if (v.id === parentId) {
                v = {
                    ...v,
                    children: [
                        ...(v?.children ? v?.children : []),
                        {
                            id: uniqueId ?? arrIds.length + 1,
                            name: docName,
                            isFolder: addActionType === "folder",
                        }
                    ]
                }
            }

            if (v?.children && v?.children?.length) {
                v = {
                    ...v,
                    children: handleNewDoc(v?.children, parentId)
                }
            }

            return v
        })

    }


    return (
        <div className="root">
            <h2>File Explorer</h2>
            <FileAndFolder data={data} setData={setData} setAddActionData={setAddActionData} otherInfo={{
                setDocNameParent, handleRemove: () => setIsDelDialog(true)
            }} />
            {addActionType && <div className="form-container">
                <form className="doc-form">
                    <div>
                        <label htmlFor="">Enter {addActionType} name </label>
                        <input name="new file" placeholder={`Enter ${addActionType} name`} autoFocus value={docName} onChange={(e) => { setDocName(e?.target?.value) }} />
                    </div>
                    <div className="doc-btn-container">
                        <button type="submit" data-testid="add" className="btn green-btn" onClick={(e) => {
                            e?.preventDefault();
                            setData(handleNewDoc(data, docNameParent));
                            toast.success(`${addActionType === "file" ? "File" : "Folder"} added successfully`, {
                                position: "top-right"
                            })
                            handleReset();
                        }}>Add</button>
                        <button type="button" data-testid="cancel" className="btn grey-btn" onClick={() => {
                            setAddActionData("")
                        }}>Cancel</button>
                    </div>
                </form>
            </div>}
            <AlertDialog open={isDelDialog}
                onClose={() => setIsDelDialog(false)}
                title="Delete File"
                description="Are you sure you want to delete this file?"
                onConfirm={() => {
                    const res = handleRemove(data, docNameParent);
                    setData(res);
                    setIsDelDialog(false);
                    toast.success(`Deleted successfully`, {
                        position: "top-right"
                    })
                }} />
        </div>
    );
}

export default FileExplorer;