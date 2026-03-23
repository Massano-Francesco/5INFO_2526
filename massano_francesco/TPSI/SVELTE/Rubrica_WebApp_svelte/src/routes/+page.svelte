<script>
    export let data;
</script>

<title>Rubrica JS</title>

<h1 class="main-title">Rubrica JS</h1>
<form method="POST" action="?/create" id="salva"></form>
<table>
    <tbody
        ><tr>
            <th>Cognome</th>
            <th>Nome</th>
            <th>Indirizzo</th>
            <th>Telefono</th>
            <th colspan="2">Azioni</th>
        </tr>
        <tr class="inputx">
            <td><input type="text" name="cognome" form="salva" size="15/" /></td
            >
            <td><input type="text" name="nome" form="salva" size="15/" /></td>
            <td
                ><input
                    type="text"
                    name="indirizzo"
                    form="salva"
                    size="30/"
                /></td
            >
            <td
                ><input
                    type="text"
                    name="telefono"
                    form="salva"
                    size="10/"
                /></td
            >
            <td>
                <button>Cerca</button>
            </td>
            <td>
                <button type="submit" form="salva">Salva</button>
            </td>
        </tr>
        {#each data.utenti as utente}
            <tr>
                <td>{utente.cognome}</td>
                <td>{utente.nome}</td>
                <td>{utente.indirizzo} </td>
                <td>{utente.telefono}</td>
                <td>
                    <form method="POST" action="?/delete">
                        <input type="hidden" name="id" value={utente.id} />
                        <button class="remove">Rimuovi</button>
                    </form>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .main-title {
        text-align: center;
        font-family: "Bebas Neue";
        font-size: 60px;
    }

    table {
        margin: auto;
        width: 40%;
        border-spacing: 0px 15px;
        text-align: center;
    }

    th {
        font-size: 20px;
    }
</style>
