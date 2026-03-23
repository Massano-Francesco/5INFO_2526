import mongoose from "mongoose";



const connect = async (user, passwd, dbname) => {
    let db;
    try {
        db = await mongoose.connect(
            `mongodb://${user}:${passwd}@mongolo:27017/${dbname}?authSource=admin`
        );
    } catch (e) {
        console.log(e);

    }


    return db;
}







const create_collection = async () => {
    //definiamo lo schema della nostra collezione
    // impostando  strict: "throw" quando aggiungiamo un documento
    // avviene una validazione e se il documento non rispetta il modello
    // viene generata un eccezione
    const schema = new mongoose.Schema({
        testo: "string",
        priorita: "string",
        stato: 'number'
    },
        { strict: "throw" });

    //creiamo un modello a partire dallo schema
    const todo = mongoose.models.todo || mongoose.model("todo", schema);

    // creiamo la collezione
    let collection = await todo.createCollection();

    return todo;
}

const add_document = async (model, doc) => {
    try {
        await model.create(doc);
    } catch (e) {
        console.log('Errore documento non rispetta lo schema');
    }
}

const search_document = async (model, params) => {
    let docs = await model.find(params);

    return docs;
}

const delete_document = async (model, params) => {
    let doc = await search_document(model, params);
    if (doc.length == 1)
        await doc[0].deleteOne();
}

let db = await connect('mongoadmin', 'qwe123', 'todo');

if (db.connection.readyState === 1)
    console.log('CONNESSIONE AL DB: OK!!!');

// creo una collezione
let collection = await create_collection();



export async function load({ params }) {
    const todos = await search_document(collection, {});
    return {
        todos: JSON.stringify(todos)
    };
}


export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();

        await add_document(collection, {
            testo: data.get('testo'),
            priorita: data.get('select'),
            stato: 0
        });


    },

    sottolinea: async ({ cookies, request }) => {
        const data = await request.formData();

        const id = data.get('id');

        const docs = await search_document(collection, { _id: id });

        if (docs.length === 1) {
            docs[0].stato = docs[0].stato === 1 ? 0 : 1;
            await docs[0].save();
        }
    },

    delete: async ({ cookies, request }) => {
        const data = await request.formData();

        const id = data.get('id');

        await delete_document(collection, { _id: id });


    }

};

