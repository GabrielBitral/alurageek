export default function ehValorValido(campo) {
    if (!validaValor(campo.value)) {
        campo.setCustomValidity('O valor é inválido');
    }
}

function validaValor(valor) {
    const regex = /^\d*([.,]?\d{1,2})?$/;
    return regex.test(valor);
}