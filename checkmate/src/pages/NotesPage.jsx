import { useParams } from "react-router-dom";
import Page from "../components/base_components/Page";
import Note from "../components/Notes/Note";

const NotesPage = () => {

    const { noteId } = useParams();
    return (<Page>
        <Note id={noteId}/>
    </Page>)
}

export default NotesPage;