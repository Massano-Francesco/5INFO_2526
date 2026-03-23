<script>
    export let data;
    export let form;
    let id, titolo, regista, anno;
    let action = "aggiungi";
    let error = false;

    function edit_film(film) {
        action = "modifica";
        id = film.id;
        titolo = film.titolo;
        regista = film.regista;
        anno = film.anno;
    }

    if(form?.form_error){
        error= true;
        titolo = form.form_vals.titolo;
        regista = form.form_vals.regista;
        anno = form.form_vals.anno;
    }
</script>

<div class="container">
    <h1>Videoteca</h1>
    <form method="POST" action="?/{action}">
        {#if action == "modifica"}
            <input type="hidden" name="id" bind:value={id} />
        {/if}
        <input
            type="text"
            name="titolo"
            placeholder="Titolo"
            bind:value={titolo}
        />
        <p class={error && titolo?.length == 0? '' : 'hidden'}>titolo invalido</p>
        <input
            type="text"
            name="regista"
            placeholder="Regista"
            bind:value={regista}
        />
        <p class={error && regista?.length == 0? '' : 'hidden'}>regista invalido</p>
        <input
            type="text"
            name="anno"
            placeholder="Anno di uscita"
            bind:value={anno}
        />
        <p class={error && anno?.length == 0? '' : 'hidden'}>anno invalido</p>
        <button type="submit" id="submitButton">Aggiungi Film</button>
    </form>

    <table id="movieTable">
        <thead>
            <tr>
                <th>Titolo</th>
                <th>Regista</th>
                <th width="5%">Anno</th>
                <th width="25%">Azioni</th>
            </tr>
        </thead>
        <tbody>
            {#each data.film as f}
                <tr>
                    <td>{f.titolo}</td>
                    <td>{f.regista}</td>
                    <td>{f.anno}</td>
                    <td>
                        <button class="edit" on:click={() => edit_film(f)}
                            >Modifica</button
                        >
                        <form method="POST" action="?/delete">
                            <input type="hidden" name="id" value={f.id}>
                            <button type="submit">Rimuovi</button>
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    :global(body) {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }

    .container {
        max-width: 800px;
        margin: 20px auto;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
        color: #333;
    }
    
    p {
        color: red;
        font-weight: bold;
    }

    .hidden {
        display: none;
    }

    form {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }

    form input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    form button {
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
    }

    form button:hover {
        color: white;
        background-color: #4cae4c;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    table th,
    table td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
    }

    table th {
        background-color: #f8f8f8;
    }

    table td button {
        background-color: #d9534f;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        margin-right: 10px;
        cursor: pointer;
    }

    table td button:hover {
        background-color: #c9302c;
    }

    table td button.edit {
        background-color: #0275d8;
    }

    table td button.edit:hover {
        background-color: #025aa5;
    }

    .error {
        border: 2px solid red;
    }
</style>
