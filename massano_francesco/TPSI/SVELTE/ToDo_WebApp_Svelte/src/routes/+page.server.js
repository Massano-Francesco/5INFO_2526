export const csr = true;
export const ssr = true;

import Database from 'better-sqlite3';

const db = new Database('USER.db', { verbose: console.log });

let utenti = [];
export function load({ params }) {
    console.log('ESECUZIONE FUNZIONE LOAD: ', Date.now());

    const query1 = db.prepare('SELECT * FROM Utente');
    const res1 = query1.all();

    return {
        utenti: res1

    }

};

export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log('CREATE ACTION');
        console.log('I VALORI DEL FORM SONO: ', data);

        const query2 = db.prepare('INSERT INTO Utente (testo,priorita,stato) VALUES(@testo, @priorita,@stato)');

        const user = {
            testo: data.get('testo'),
            priorita: data.get('select'),
            stato: 0
        }
        
        if(user.testo && user.priorita){
            const res2 = query2.run({
                testo :user.testo,
                priorita: user.priorita,
                stato : user.stato
            });
        
        }
        else{
            return {
                form_error: true,
                form_vals: user
            }
        }

    },

    sottolinea: async ({ cookies, request }) => {
        const data = await request.formData();
        const id = +data.get('id');
        console.log('SOTTOLINEA ACTION ID');
        console.log('I VALORI DEL FORM SONO: ', data);

        const query3 = db.prepare(
            'SELECT stato FROM Utente WHERE id = ?'
        );
        const utente = query3.get(id); // utente è { stato: 0 } o { stato: 1 }
        let nuovoStato = utente.stato === 0 ? 1 : 0; // prendi lo stato e inverti

        const query4 = db.prepare('UPDATE Utente SET stato = ? WHERE id = ?');
        query4.run(nuovoStato, id);

    },

    delete: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log('DELETE ACTION');
        console.log('I VALORI DEL FORM SONO: ', data);

        const query5 = db.prepare(
            'DELETE FROM Utente WHERE id = ?'
        );
        const res5 = query5.run(+data.get('id'));



    }

};





