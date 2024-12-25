import { Box } from "@mui/material"


const Page = ({children, ...rest}) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                overflow: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "#ddd transparent",
            }}
            {...rest}
        >
            {children}
        </Box>
    )
}

export default Page;