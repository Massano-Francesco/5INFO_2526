import { json } from "@sveltejs/kit";


let todos = [
    {
        id: 1,
        task: 'studiare TPSI',
        done: true,
        priority: 1
    }
]

export async function GET({ params, request, url}) {
    console.log('Ricevuto HTTP GET con parametro: ', params);

    if (params.id) {
        // accedo al DB e prelevo solo il todo con id = params.id
        // se non presente restituisco errore
        const todo = todos.filter(t => t.id == params.id)[0];
        return json(todos);
    }
    else {
        //se non ci sono parametri restituisco tutto
        // accedo al db e prelevo tutti i todo
        // restitutisco l'array dei todo
        //in caso contrario filtro per la chiave e valore forniti
        let res = todos;
        if(url.searchParams.has('priority')) {
            res = todos.filter(t => t.priority == +url.searchParams.get('priority'));
        }

        else if(url.searchParams.has('done')) {
            res = todos.filter(t => t.done == (url.searchParams.get('done')=== 'true'));
        }

        return json(res);
    }

}

export async function POST({request}) {

    console.log('Ricevuto HTTP POST');

    const body = await request.json();
    console.log('POST BODY: ', body);
    body['id'] = Math.ceil(Math.random() * 100);

    todos.push(body);


    //inserisco l'oggetto ToDo ricevuto nel DB
    return json('OK');
    
}



export async function PUT({ params, request}) {

    console.log('Ricevuto HTTP PUT con parametro:', params);

    const body = await request.json();
    console.log('PUT BODY: ', body);

    // verifico se l'oggetto con id = params.id esiste
    // in caso affermativo lo aggiorno con l'oggetto nel body
    // se l'oggetto non esiste nel Db restituisco errore

    let todo = todos.findIndex(t => t.id ==  params.id);
    todos[todo] = body;

    return json('OK');

}


export async function PATCH({ params, request}) {

    console.log('Ricevuto HTTP PATCH con parametro:', params);

    let body = await request.json();

    // verifico se l'oggetto con id = params.id esiste
    // in caso affermativo lo aggiorno con l'oggetto nel body
    // se l'oggetto non esiste nel Db restituisco errore
    let todo = todos.findIndex(t => t.id ==  params.id);

    const key = Object.keys(body);
    todos[todo][key] = body[key];

    return json('OK');
}


export  async function DELETE({params, request}) {

     console.log('Ricevuto HTTP PATCH con parametro:', params);

     //rimuovo l'oggetto con id = params.id dal DB
     //se non esiste restituisco errore

     todos = todos.filter(t => t.id != params.id);

     return json('OK');
    
}
