export function mapMesesParaEstacoes(nasaData) {
  if (!nasaData) return null;

  const mesesPorEstacao = {
    Verão: ["DEC", "JAN", "FEB"],
    Outono: ["MAR", "APR", "MAY"],
    Inverno: ["JUN", "JUL", "AUG"],
    Primavera: ["SEP", "OCT", "NOV"],
  };

  const parametros = [
    "T2M",
    "T2M_MAX",
    "T2M_MIN",
    "PRECTOTCORR",
    "ALLSKY_SFC_SW_DWN",
  ];
  const resultado = {};

  parametros.forEach((param) => {
    if (!nasaData[param]) return;

    resultado[param] = {};

    Object.entries(mesesPorEstacao).forEach(([estacao, meses]) => {
      const valores = [];

      Object.values(nasaData[param]).forEach((anoObj) => {
        meses.forEach((mes) => {
          if (anoObj[mes] !== undefined) valores.push(anoObj[mes]);
        });
      });

      const media =
        valores.length > 0
          ? valores.reduce((a, b) => a + b, 0) / valores.length
          : null;
      resultado[param][estacao] = media;
    });
  });

  return resultado;
}
