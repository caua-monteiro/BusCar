export function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    const values = cpf.split('').map(el => parseInt(el));
    const rest = (count: number) => (values.slice(0, count - 12).reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10;
    
    return rest(10) === values[9] && rest(11) === values[10];
}

export function isValidCNH(cnh: string): boolean {
    cnh = cnh.replace(/[^\d]+/g, '');
    if (cnh.length !== 11 || !!cnh.match(/(\d)\1{10}/)) return false;

    let dsc = 0;
    let v = 0;
    for (let i = 0, j = 9; i < 9; i++, j--) {
        v += parseInt(cnh.charAt(i)) * j;
    }

    let d1 = v % 11;
    if (d1 >= 10) {
        d1 = 0;
        dsc = 2;
    }

    v = 0;
    for (let i = 0, j = 1; i < 9; i++, j++) {
        v += parseInt(cnh.charAt(i)) * j;
    }

    let x = v % 11;
    let d2 = (x >= 10) ? 0 : x - dsc;
    // se o d2 for negativo, algo de errado aconteceu na formatação, vamos corrigir isso:
    if(d2 < 0) d2 = d2 + 11;

    if (String(d1) === cnh.charAt(9) && String(d2) === cnh.charAt(10)) {
        return true;
    }
    
    return false;
}
