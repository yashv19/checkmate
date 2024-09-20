

const openConnection = () => {
    
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("checkmate", 1);
    
        request.onupgradeneeded = event => {
            console.log("Updated needed triggered");
            const db = event.target.result;
        
            const objectStore = db.createObjectStore("notes", {keyPath: "id"});
            objectStore.createIndex("title", "title", { unique: false });

            objectStore.transaction.oncomplete = (event) => {
                resolve(db); //db connection
            }
        }
        
        request.onerror = (event) => {
            console.error("Failed to connect to database.")
            console.error(event);
            reject(event.target.error);
        }
        
        request.onsuccess = (event) => {
            resolve(event.target.result); //db connection
        }
    })
}


// CRUD operations

const createNewNote = (note) => {
    return new Promise(async (resolve, reject) => {
        const db = await openConnection();
        const transaction = db.transaction(["notes"], "readwrite");
        const objectStore = transaction.objectStore("notes");
        transaction.onerror = (event) => {
            console.log(`error creating new. ${event.target.error}`);
            reject(event.target.error);
        }

        const request = objectStore.add(note);
        request.onsuccess = (event) => {
            console.log(`Success! ${event.target.result} added.`)
            resolve();
        }
    })
}

const getAllNotes = () => {
    return new Promise(async (resolve, reject) => {
        const db = await openConnection();

        const transaction = db.transaction(["notes"], "readonly");
        const objectStore = transaction.objectStore("notes");

        transaction.onerror = (event) => {
            console.log(`Failed to fetch all notes. ${event.target.error}`)
            reject(event.target.error);
        }

        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            console.log(`Success retreiving all notes.`);
            resolve(event.target.result);
        }
    })
}

const getNote = (id) => {
    return new Promise(async (resolve, reject) => {
        const db = await openConnection();

        const transaction = db.transaction(["notes"], "readonly");
        const objectStore = transaction.objectStore("notes");

        transaction.onerror = (event) => {
            console.log(`Failed to fetch note. ${event.target.error}`)
            reject(event.target.error);
        }

        const request = objectStore.get(id);

        request.onsuccess = (event) => {
            console.log(`Success retreiving Note ${id}.`);
            resolve(event.target.result);
        }
    })
}

const updateNote = (updatedNote) => {
    return new Promise(async (resolve, reject) => {
        const db = await openConnection();

        const transaction = db.transaction(["notes"], "readwrite");
        const objectStore = transaction.objectStore("notes");

        transaction.onerror = (event) => {
            console.log(`Failed to fetch note. ${event.target.error}`)
            reject(event.target.error);
        }

        const request = objectStore.get(updatedNote.id);

        request.onsuccess = (event) => {
            console.log(`Retrieved note. Will now update.`)
            let note = event.target.result;
            note = {...note, ...updatedNote};

            const requestUpdate = objectStore.put(note);

            requestUpdate.onerror = (event) => {
                console.log(`Failed to update. Terminating. ${event.target.error}`);
                reject(event.target.error);
            }

            requestUpdate.onsuccess = (event) => {
                console.log(`Successfully updated note`);
                resolve();
            }
        }
    })
}

const IDB = {
    createNewNote,
    getAllNotes,
    getNote,
    updateNote
}

export default IDB;

// db.onerror = event => {
//     console.log("Error from indexedDB");
//     console.error(`Database error: ${event.target.error?.message}`);
// }