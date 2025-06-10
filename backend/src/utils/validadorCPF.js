function validarCPF(cpf) {
 cpf = cpf.replace(/[^\d]+/g, ""); // já está certo

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const validarDigito = (base, fator) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i]) * (fator - i);
    }
    const resto = 11 - (soma % 11);
    return resto > 9 ? 0 : resto;
  };

  const digito1 = validarDigito(cpf.substr(0, 9), 10);
  const digito2 = validarDigito(cpf.substr(0, 10), 11);

  return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);
}

module.exports = { validarCPF };
