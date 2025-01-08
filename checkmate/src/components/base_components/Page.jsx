import { Box } from "@mui/material"


const Page = ({children, ...rest}) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                padding: "1rem",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                overflow: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "#ddd transparent",
                backgroundColor: "#fff",
                borderRadius: "12px",
            }}
            {...rest}
        >
            {children}
        </Box>
    )
}

export default Page;