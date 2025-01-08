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
    } catch (error) {
        console.log(`Error creating new note: ${error}`);
        throw error;
    }
};

const getAllNotes = async () => {
    try {
        const notes = await db.notes.toArray();
        return notes;
    } catch (error) {
        console.log(`Failed to fetch all notes: ${error}`);
        throw error;
    }
};

const getNote = async (id) => {
    try {
        const note = await db.notes.get(id);
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
        } else {
        }
    } catch (error) {
        console.log(`Failed to update note: ${error}`);
        throw error;
    }
};

const deleteNote = async (id) => {
    try {
        await db.notes.delete(id);
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