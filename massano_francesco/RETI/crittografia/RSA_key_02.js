// Scrivere un programma in JS che dato un testo in chiaro lo cifri in RSA e viceversa e lo stampi sulla console.

// I parametri sono forniti sulla linea di comando e includono:
// - modalità di funzionamento (encryption o decriiption)
// - Kpriv e KPub
// - testo in chiaro o cifrato
//  RSA.

// utilizzare il seguente alfabeto

// Esempio:

// Usage rsa_enc_dec <E|D> <N> <Npub> <Npriv> <clear or cypher text>

// $ node rsa_enc_dec.js E 33 39 19 "CIAO RSA"

// OaAC dGA


function main() {
    let mod_funzionamento = process.argv[2];
    let N = process.argv[3];
    let Npub = BigInt(process.argv[4]);
    let Npriv = BigInt(process.argv[5]);
    let text = process.argv[6];
    let full_alphabet = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!£$%&/()=?^@,.-;:_òàùèì()[]{}<>|";

    let alfabeto = full_alphabet.slice(0,N).split("");
    let testo_trasmesso = text.split("");

    let n = BigInt(N);
    
    if(mod_funzionamento == "E"){encription(n,Npub,alfabeto,testo_trasmesso)}
    if(mod_funzionamento == "D"){decription(n,Npriv,alfabeto,testo_trasmesso)}
    
}

main()

function encription(n,Npub,alfabeto,testo_trasmesso) {
    let text_criptato = [];
    let numeri = [];
    let indici = [];
    testo_trasmesso.forEach((element) => {
        if(element == " "){numeri.push(" ")}
        else{numeri.push(alfabeto.indexOf(element));}
    });
    
    numeri.forEach((element) => {
        let e = BigInt(element);
        if(e == " "){indici.push(" ");}
        else{indici.push((e**Npub)%n);}
        
    });
    
    indici.forEach(element => {
        if(element == " "){text_criptato.push(" ");}
        else{text_criptato.push(alfabeto[element]);}
        
    });
    console.log(text_criptato.join(""));
}

function decription(n,Npriv,alfabeto,testo_trasmesso) {
    let text_criptato = [];
    let numeri = [];
    let indici = [];
    testo_trasmesso.forEach((element) => {
        if(element == " "){numeri.push(" ")}
        else{numeri.push(alfabeto.indexOf(element));}
    });
    
    numeri.forEach((element) => {
        let e = BigInt(element);
        if(e == " "){indici.push(" ");}
        else{indici.push((e**Npriv)%n);}
        
    });
    
    indici.forEach(element => {
        if(element == " "){text_criptato.push(" ");}
        else{text_criptato.push(alfabeto[element]);}
        
    });
    console.log(text_criptato.join(""));
}