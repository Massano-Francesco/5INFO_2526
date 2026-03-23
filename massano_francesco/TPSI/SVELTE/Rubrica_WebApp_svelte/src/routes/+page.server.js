export const csr = true; // csr attivo
export const ssr = true; //ssr attivo

import Database from 'better-sqlite3';

const db = new Database('USER.db', { verbose: console.log });

export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log('CREATE ACTION');
        console.log('I VALORI DEL FORM SONO', data);

        const query2 = db.prepare('INSERT INTO Utente (cognome,nome,indirizzo,telefono) VALUES (@cognome, @nome, @indirizzo, @telefono)');

        const user = {
            cognome: data.get('cognome'),
            nome: data.get('nome'),
            indirizzo: data.get('indirizzo'),
            telefono: data.get('telefono')
        }

        if (user.cognome && user.nome && user.indirizzo && user.telefono) {
            const res2 = query2.run({
                cognome: user.cognome,
                nome: user.nome,
                indirizzo: user.indirizzo,
                telefono: user.telefono,
            });
        }

        else {
            return {
                form_error: true,
                form_vals: user
            }
        }
    },


    delete: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log('DELETE ACTION');
        console.log('I VALORI DEL FORM SONO', data);

        const query4 = db.prepare(
            'DELETE FROM Utente WHERE id = ?'
        )

        const res4 = query4.run(+data.get('id'));
    }




};

export function load({ params }) {
    console.log('ESECUZIONE FUNZIONE LOAD', Date.now());

    const query1 = db.prepare('SELECT * FROM Utente');
    const res1 = query1.all();

    return {
        utenti: res1,
    };
}