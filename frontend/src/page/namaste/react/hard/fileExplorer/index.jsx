import { useState } from "react";
import FileAndFolder from "./FileAndFolder.jsx";
import './style.css'

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
            {
                id: 5, name: "index.js", isFolder: true,
                children: [{ id: 7, name: "nested file", isFolder: false }]
            },
        ],
    },
    { id: 6, name: "package.json", isFolder: false },
];

const FileExplorer = () => {
    const [data, setData] = useState(initialData),
        [idCounter, setIdCounter] = useState(7),
        [addActionType, setAddActionData] = useState(""),
        [docName, setDocName] = useState("");

    return (
        <div className="root">
            <h2>File Explorer</h2>
            <FileAndFolder data={data} setData={setData} setAddActionData={setAddActionData} />
            <div className="form-container">
                <form action="">
                    <label htmlFor="">Enter {addActionType} name </label>
                    <input placeholder={`Enter ${addActionType} name`} value={docName} name="doc-name" onChange={(e) => { setDocName(e?.target?.value) }} />
                </form>
            </div>
        </div>
    );
}

export default FileExplorer;