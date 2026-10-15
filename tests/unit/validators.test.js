// tests/unit/validators.test.js
// 1. Importa as funções que vamos testar
const { isEmail, minLength } = require("../../src/helpers/validators");
// 2. describe = agrupa os testes de uma função
describe("validators.isEmail", () => {
// 3. it = um caso de teste. O texto diz o que DEVERIA acontecer
it("não retorna erro para um e-mail válido", () => {
// Arrange — prepara
const email = "ana@senai.br";
// Act — executa
const resultado = isEmail(email);
// Assert — confere (nos validators, null = "sem erro")
expect(resultado).toBeNull();
});
it("retorna mensagem de erro para e-mail sem @", () => {
const resultado = isEmail("ana.senai.br");
expect(resultado).toBe("E-mail inválido");
});
});

describe("validators.minLength", () => {
  it("aceita um texto com o tamanho exatamente igual ao mínimo (caso de borda)", () => {
    // Arrange — prepara os dados (Nome "Ana" tem 3 letras, mínimo exigido é 3)
    const valor = "Ana";
    const minimo = 3;
    const nomeCampo = "Nome";

    // Act — executa a função que está sendo testada
    const resultado = minLength(valor, minimo, nomeCampo);

    // Assert — confere se o resultado é null (o que significa "sem erro")
    expect(resultado).toBeNull();
  });
});
