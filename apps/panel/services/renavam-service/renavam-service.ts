export class RenavamService {
  public isValidRenavam(renavam: string | number): boolean {
    if (!renavam) {
      return false;
    }

    const renavamParaString = renavam.toString();

    const renavamNormalizado = this.normalizeOlderRenavam(renavamParaString);

    if (renavamNormalizado.length !== 11) {
      return false;
    }

    const renavamSemDigito = renavamNormalizado.substring(0, 10);

    const renavamReversoSemDigito = renavamSemDigito.split('').reverse().join('');

    let soma = 0;

    for (let i = 0; i < 8; i++) {
      let algarismo = Number(renavamReversoSemDigito[i]);
      let multiplicador = i + 2;
      soma += algarismo * multiplicador;
    }

    soma += Number(renavamReversoSemDigito.charAt(8)) * 2;
    soma += Number(renavamReversoSemDigito.charAt(9)) * 3;

    const mod11 = soma % 11;

    let ultimoDigitoCalculado = 11 - mod11;

    ultimoDigitoCalculado = ultimoDigitoCalculado >= 10 ? 0 : ultimoDigitoCalculado;

    const digitoRealInformado = Number(
      renavamParaString.substring(renavamParaString.length - 1, renavamParaString.length),
    );

    if (ultimoDigitoCalculado == digitoRealInformado) {
      return true;
    }
    return false;
  }

  public normalizeOlderRenavam(renavam: string): string {
    if (renavam.match('^([0-9]{9})$')) {
      renavam = '00' + renavam;
    }

    return renavam;
  }
}