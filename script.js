const visor = document.getElementById("visor");
const botoes = document.querySelector(".botoes");

let valorAtual = "0";
let valorAnterior = null;
let operador = null;
let aguardandoNovoNumero = false;
let resultadoExibido = false;

// Atualiza o visor
function atualizarVisor() {
    visor.textContent = valorAtual;
}

// aqui vai digita os números
function digitarNumero(numero) {

    if (aguardandoNovoNumero || resultadoExibido) {
        valorAtual = numero;
        aguardandoNovoNumero = false;
        resultadoExibido = false;
    }

    else if (valorAtual === "0") {
        valorAtual = numero;
    }

    else if (valorAtual.length < 15) {
        valorAtual += numero;
    }

    atualizarVisor();
}

// Adiciona números decimais
function digitarDecimal() {

    if (aguardandoNovoNumero || resultadoExibido) {
        valorAtual = "0.";
        aguardandoNovoNumero = false;
        resultadoExibido = false;
    }

    else if (!valorAtual.includes(".")) {
        valorAtual += ".";
    }

    atualizarVisor();
}

// Seleciona a operação matemática
function escolherOperador(novoOperador) {

    if (operador !== null && !aguardandoNovoNumero) {
        calcular();

        if (String(valorAtual).startsWith("Erro")) {
            return;
        }
    }

    valorAnterior = Number(valorAtual);
    operador = novoOperador;

    aguardandoNovoNumero = true;
    resultadoExibido = false;
}

// Realiza os cálculos matemáticos
function calcular() {

    if (operador === null || valorAnterior === null) {
        return;
    }

    const segundoValor = Number(valorAtual);
    let resultado;

    switch (operador) {

        case "+":
            resultado = valorAnterior + segundoValor;
            break;

        case "-":
            resultado = valorAnterior - segundoValor;
            break;

        case "*":
            resultado = valorAnterior * segundoValor;
            break;

        case "/":

            if (segundoValor === 0) {

                valorAtual = "Erro: divisao por zero";

                valorAnterior = null;
                operador = null;

                aguardandoNovoNumero = true;
                resultadoExibido = false;

                atualizarVisor();
                return;
            }

            resultado = valorAnterior / segundoValor;
            break;
    }

    if (!Number.isFinite(resultado)) {

        valorAtual = "Erro: resultado invalido";

    } else {

        valorAtual = String(Number(resultado.toPrecision(12)));

    }

    valorAnterior = null;
    operador = null;

    aguardandoNovoNumero = true;
    resultadoExibido = true;

    atualizarVisor();
}

// Calcula a raiz quadrada
function calcularRaizQuadrada() {

    const numero = Number(valorAtual);

    if (numero < 0) {

        valorAtual = "Erro: raiz negativa";

        valorAnterior = null;
        operador = null;

        aguardandoNovoNumero = true;
        resultadoExibido = false;

        atualizarVisor();
        return;
    }

    const resultado = Math.sqrt(numero);

    valorAtual = String(Number(resultado.toPrecision(12)));

    valorAnterior = null;
    operador = null;

    aguardandoNovoNumero = true;
    resultadoExibido = true;

    atualizarVisor();
}

// Inverte o sinal do número (positivo/negativo)
function inverterSinal() {
    if (valorAtual === "0" || String(valorAtual).startsWith("Erro")) {
        return;
    }

    valorAtual = String(Number(valorAtual) * -1);
    atualizarVisor();
}

// Apaga o último número digitado
function apagarUltimoDigito() {

    if (aguardandoNovoNumero || resultadoExibido) {
        return;
    }

    valorAtual = valorAtual.length > 1
        ? valorAtual.slice(0, -1)
        : "0";

    if (valorAtual === "-" || valorAtual === "") {
        valorAtual = "0";
    }

    atualizarVisor();
}

// Limpa tudo da tela
function limparCalculadora() {

    valorAtual = "0";
    valorAnterior = null;
    operador = null;

    aguardandoNovoNumero = false;
    resultadoExibido = false;

    atualizarVisor();
}

// Identifica os cliques nos botões
botoes.addEventListener("click", (evento) => {

    const botao = evento.target.closest("button");

    if (!botao) return;

    if (botao.dataset.number !== undefined) {

        digitarNumero(botao.dataset.number);

    }

    else if (botao.dataset.operator) {

        escolherOperador(botao.dataset.operator);

    }

    else if (botao.dataset.action === "decimal") {

        digitarDecimal();

    }

    else if (botao.dataset.action === "sqrt") {

        calcularRaizQuadrada();

    }

    else if (botao.dataset.action === "invert") {

        inverterSinal();

    }

    else if (botao.dataset.action === "equals") {

        calcular();

    }

    else if (botao.dataset.action === "clear") {

        limparCalculadora();

    }

    else if (botao.dataset.action === "backspace") {

        apagarUltimoDigito();

    }

});

// Permitir que seja possivel usar a calculado do teclado
document.addEventListener("keydown", (evento) => {

    const tecla = evento.key;

    if (/^[0-9]$/.test(tecla)) {

        digitarNumero(tecla);

    }

    else if (tecla === "." || tecla === ",") {

        digitarDecimal();

    }

    else if (["+", "-", "*", "/"].includes(tecla)) {

        escolherOperador(tecla);

    }

    else if (tecla === "Enter" || tecla === "=") {

        evento.preventDefault();
        calcular();

    }

    else if (tecla === "Backspace") {

        apagarUltimoDigito();

    }

    else if (tecla === "Escape") {

        limparCalculadora();

    }

});
