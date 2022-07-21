var formatNumber = d3.format(".0f"),
  formatBillion = function (x) {
    return formatNumber(x / 1e9) + "B";
  },
  formatMillion = function (x) {
    return formatNumber(x / 1e6) + "M";
  },
  formatThousand = function (x) {
    return formatNumber(x / 1e3) + "k";
  };

function formatAbbreviation(x) {
  var v = Math.abs(x);
  return (v >= 0.9995e6 ? formatMillion : formatThousand)(x);
}
