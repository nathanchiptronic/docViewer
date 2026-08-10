import { Snackbar, Alert } from "@mui/material"

export default function AlertToast({ toast, setToast }){
    return (
        <Snackbar
            open={toast.open}
            autoHideDuration={4000}
            onClose={() => setToast(prev => ({ ...prev, open: false }))}
        >
            <Alert severity={toast.severity}>
                {toast.message}
            </Alert>
        </Snackbar>
)
}