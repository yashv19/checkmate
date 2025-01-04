import Dexie from 'dexie';

// Set up Dexie database
const db = new Dexie("checkmate");
db.version(1).stores({
    notes: "id, title", // id is the primary key, title is indexed
});

// CRUD operations

const createNewNote = async (note) => {
    try {
        await db.notes.add(note);
        console.log(`Success! ${note.id} added.`);
    } catch (error) {
        console.log(`Error creating new note: ${error}`);
        throw error;
    }
};

const getAllNotes = async () => {
    try {
        const notes = await db.notes.toArray();
        console.log(`Success retrieving all notes.`);
        return notes;
    } catch (error) {
        console.log(`Failed to fetch all notes: ${error}`);
        throw error;
    }
};

const getNote = async (id) => {
    try {
        const note = await db.notes.get(id);
        console.log(`Success retrieving Note ${id}.`);
        return note;
    } catch (error) {
        console.log(`Failed to fetch note: ${error}`);
        throw error;
    }
};

const updateNote = async (updatedNote) => {
    try {
        const note = await db.notes.get(updatedNote.id);
        if (note) {
            await db.notes.put({ ...note, ...updatedNote });
            console.log(`Successfully updated note ${updatedNote.id}.`);
        } else {
            console.log(`Note with id ${updatedNote.id} not found.`);
        }
    } catch (error) {
        console.log(`Failed to update note: ${error}`);
        throw error;
    }
};

const deleteNote = async (id) => {
    try {
        await db.notes.delete(id);
        console.log(`Note ${id} deleted.`);
    } catch (error) {
        console.log(`Failed to delete note: ${error}`);
        throw error;
    }
};

// Export the API
const IDB = {
    createNewNote,
    getAllNotes,
    getNote,
    updateNote,
    deleteNote,
};

export default IDB;