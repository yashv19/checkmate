import { useParams } from "react-router-dom";
import Page from "../components/base_components/Page";
import RichNote from "../components/Notes/RichNote";

const NotesPage = () => {

    const { noteId } = useParams();
    return (<Page>
        {/* <Note id={noteId}/> */}
        <RichNote id={noteId} />
    </Page>)
}

export default NotesPage;