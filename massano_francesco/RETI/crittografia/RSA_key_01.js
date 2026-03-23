function main() {
    let p = process.argv[2];
    let q = process.argv[3];
    let e;
    let i = 0;
    let max = 0;

    let n = p * q;
    let m = (p-1) * (q-1);

    while(i<m){
        i++;
        if(i == 2){if(max < i ){ max = i;}}
        if(i == 3){if(max < i ){ max = i;}}
        if(i == 5){if(max < i ){ max = i;}}
        if(i == 7){if(max < i ){ max = i;}}
        if(i % 2 != 0 && i % 3 != 0 && i%5 != 0 && i % 7 != 0){
            if(max < i ){ max = i;}
        }
        e = max;
        
    }
    console.log(`chiave pubblica: (${e},${n})`);

    chiave_privata(p,q,n,m,e)
}

main()


function chiave_privata(p,q,n,m,e) {
    let d;
    let i=0;
    while(d!=1){
        i++;
        if(i == e){
            continue;
        }else{
            d = (e * i)%m
        }
        
    }
    d = i;
    console.log(`chiave privata: (${d},${n})`);
}