<script>
    export let data;
</script>

<div class="container">
    <h1 class="titolo">TODO SVELTE</h1>
    <form method="POST" action="?/create">
        <div class="head">
            <label for="testo">
                <input type="text" name="testo" id="testo" size="70px" />
            </label>
            <label for="select" class="selezione">
                <select name="select" id="select">
                    <option value="bassa">Bassa</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                </select>
            </label>
            <label for="aggiungi">
                <button class="button">
                    <span class="material-symbols-outlined icon1">add</span>
                </button>
            </label>
        </div>
    </form>

    <hr class="riga" />

    <ul>
        {#each data.utenti as utente}
            <li class="tabel_row">
                <div
                    class="testo"
                    style="text-decoration: {utente.stato === 1
                        ? 'line-through'
                        : 'none'}"
                >
                    {utente.testo}
                </div>
                <div>{utente.priorita}</div>
                <form method="POST" action="?/sottolinea">
                    <input type="hidden" name="id" value={utente.id} />
                    <div>
                        <button class="button">
                            <span class="material-symbols-outlined icon2"
                                >check</span
                            >
                        </button>
                    </div>
                </form>

                <form method="POST" action="?/delete">
                    <input type="hidden" name="id" value={utente.id} />
                    <div>
                        <button class="button">
                            <span class="material-symbols-outlined icon3"
                                >delete</span
                            >
                        </button>
                    </div>
                </form>
            </li>
        {/each}
    </ul>
</div>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .titolo {
        font-size: 50px;
        font-weight: bolder;
    }

    .head {
        display: flex;
        margin-top: 100px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .button {
        background-color: white;
        border: none;
    }

    .tabel_row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .icon1 {
        color: green;
        font-size: 60px;
    }

    .icon2 {
        color: green;
        font-size: 60px;
    }

    .icon3 {
        color: red;
        font-size: 60px;
    }

    .selezione {
        margin-left: 90px;
    }

    .riga {
        margin-top: 40px;
        width: 80vw;
        height: 10px;
        background-color: grey;
    }

    .testo {
        margin-right: 150px;
    }
</style>
