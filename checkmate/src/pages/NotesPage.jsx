import { useParams } from "react-router-dom";
import Page from "../components/base_components/Page";
import NotesContainer from "../components/Notes/NotesContainer";
import { Typography } from "@mui/material";

const NotesPage = () => {

    const { noteId } = useParams();

    return (<Page>
        <Typography>{`Note: ${noteId}`}</Typography>
        <NotesContainer />
    </Page>)
}

export default NotesPage;