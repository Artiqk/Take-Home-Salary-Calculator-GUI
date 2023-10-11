
function calculateAnnualTaxes(annualNetSalary) {
  const taxRange = [
    [0, 10777],
    [10778, 27478],
    [27479, 78570],
    [78571, 168994],
    [168995, Infinity]
  ];

  const taxRangePercentages = [0, 0.11, 0.3, 0.41, 0.45];

  let totalTax = 0;

  // Precalculate the tax for each tax range.
  const taxRangeTaxes = taxRange.map((range, index) => {
    const minTax = range[0];
    const maxTax = range[1];
    const percentage = taxRangePercentages[index];

    return (maxTax - minTax) * percentage;
  });

  // Calculate the total tax by adding up the tax for each tax range that the annual net salary falls into.
  for (let i = 0; i < taxRange.length; i++) {
    const minTax = taxRange[i][0];
    const maxTax = taxRange[i][1];

    if (annualNetSalary >= maxTax) {
      totalTax += taxRangeTaxes[i];
    } else {
      totalTax += (annualNetSalary - minTax) * taxRangePercentages[i];
      break;
    }
  }

  return parseInt(totalTax);
}



const calculateNetSalary = () => {
  const calculateBtn      = document.getElementById('calculate-btn');

  const grossSalaryInput  = document.getElementById('gross-salary-input');

  const selectMonth       = document.querySelector('.form-select');

  calculateBtn.addEventListener('click', () => {
    const numberOfMonths        = parseInt(selectMonth.options[selectMonth.selectedIndex].value);

    const annualGrossSalary     = parseInt(grossSalaryInput.value);

    const socialTaxes           = annualGrossSalary * 0.23;

    const annualNetSalary       = annualGrossSalary - socialTaxes;

    const monthlyGrossSalary    = parseInt(annualGrossSalary / numberOfMonths);
     
    const monthlyNetSalary      = parseInt(annualNetSalary / numberOfMonths);

    const annualTaxes           = calculateAnnualTaxes(annualNetSalary);

    const monthlyTaxes          = parseInt(annualTaxes / 12);

    const annualTakeHomeSalary  = parseInt(annualNetSalary - annualTaxes);

    const monthlyTakeHomeSalary = parseInt(annualTakeHomeSalary / numberOfMonths);


    document.getElementById('annual-gross-salary').textContent = `${annualGrossSalary.toLocaleString()}€`;

    document.getElementById('annual-net-salary').textContent = `${annualNetSalary.toLocaleString()}€`;

    document.getElementById('monthly-gross-salary').textContent = `${monthlyGrossSalary.toLocaleString()}€`;

    document.getElementById('monthly-net-salary').textContent = `${monthlyNetSalary.toLocaleString()}€`;

    document.getElementById('annual-taxes').textContent = `${annualTaxes.toLocaleString()}€`;

    document.getElementById('monthly-taxes').textContent = `${monthlyTaxes.toLocaleString()}€`;
    
    document.getElementById('annual-take-home-salary').textContent = `${annualTakeHomeSalary.toLocaleString()}€`;

    document.getElementById('monthly-take-home-salary').textContent = `${monthlyTakeHomeSalary.toLocaleString()}€`;

    
  });
}

document.addEventListener('DOMContentLoaded', calculateNetSalary);