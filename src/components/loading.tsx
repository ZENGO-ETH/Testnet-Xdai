import Backdrop from "@mui/material/Backdrop";
import { Box, CircularProgress } from "@mui/material";

interface Props {
    open: boolean;
}
export default function Loading(props: Props) {
    const { open } = props;

    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        </Backdrop>
    );
}
