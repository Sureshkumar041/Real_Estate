import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import './style.css';

const AlertDialog = ({
    open,
    onClose,
    title,
    description,
    onConfirm,
}) => {
    return (
        <Dialog className="dialog-section" open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>

            <DialogActions className="dialog-action-container">
                {/* <Button onClick={onClose}>Cancel</Button> */}
                <button type="button" className="btn grey-btn" onClick={onClose}>Cancel</button>
                <button type="button" className="btn red-btn" onClick={() => {
                    onConfirm?.();
                    onClose();
                }}>Confirm</button>
                {/* <Button
                    onClick={() => {
                        onConfirm?.();
                        onClose();
                    }}
                    variant="contained"
                >
                    Confirm
                </Button> */}
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;