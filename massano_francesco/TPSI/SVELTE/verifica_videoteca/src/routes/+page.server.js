import Database from 'better-sqlite3';

const db = new Database('FILM.db');


export function load({ params }) {
    const query1 = db.prepare('SELECT * FROM FILM');

    const res1 = query1.all();

    return {
        film: res1
    }
};


export const actions = {
    aggiungi: async ({ cookies, request }) => {
        const data = await request.formData();

        const query2 = db.prepare('INSERT INTO FILM (titolo,regista,anno) VALUES (@titolo,@regista,@anno)');

        const film = {
            titolo: data.get('titolo'),
            regista: data.get('regista'),
            anno: data.get('anno')
        }

        if (film.titolo && film.regista && film.anno) {
            const res2 = query2.run({
                titolo: film.titolo,
                regista: film.regista,
                anno: film.anno
            });
        }
        else {
            return {
                form_error: true,
                form_vals: film
            };
        }

    },

    modifica: async ({ cookies, request }) => {
        const data = await request.formData();

        const query3 = db.prepare('UPDATE FILM SET titolo=@titolo, regista=@regista, anno=@anno WHERE id=@id');

        const film = {
            id: data.get('id'),
            titolo: data.get('titolo'),
            regista: data.get('regista'),
            anno: data.get('anno')
        }

        if (film.titolo && film.regista && film.anno) {
            const res3 = query3.run({
                id: film.id,
                titolo: film.titolo,
                regista: film.regista,
                anno: film.anno
            });
        }
        else {
            return {
                form_error: true,
                form_vals: film
            };
        }

    },

    delete: async ({ cookies, request }) => {
        const data = await request.formData();

        const query4 = db.prepare('DELETE FROM FILM WHERE id = ?');

        const res4 = query4.run(+data.get('id'));

    }



}
