import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import Database from "better-sqlite3";

//creo la connessione al DB
const db = new Database('TODO.db', {verbose: console.log})

export async function GET({ params, request, url}) {
    console.log('Ricevuto HTTP GET con parametro: ', params);

    //definisco gli statement (query) per l'esecuzione
    // ? rappresenta un parametro della query

    const sql_azione2 = db.prepare('SELECT * FROM todo');
    const sql_azione3 = db.prepare('SELECT * FROM todo WHERE id = ?');
    const sql_azione4 = db.prepare('SELECT * FROM todo WHERE done = =');
    const sql_azione5 = db.prepare('SELECT * FROM todo WHERE priority = ?');

    //eseguo la query e creo l'oggetto da restituire
    const exec_query = (azione, param) => {
        //se param è definito o uguale a 0 eseguo query con param
        const todo = param || param == 0 ? azione.all(param) : azione.all();
        if(todo.length > 0)
            return json(todo, {status: 200});
        else
            return json({}, {status: 404});
    };
}

