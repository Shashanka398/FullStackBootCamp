document.querySelector('.calculate').addEventListener('click', calculateEMI);

var loanAmt=0;
var inrstAmt=0;

function calculateEMI() {

const loanAmount = parseFloat(document.getElementById('loanAmount').value);
  const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
  const loanTerm = parseFloat(document.getElementById('loanTerm').value)*12;
  const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
  const totalInterst=(loanTerm*emi.toFixed(2))-loanAmount;
  const totalPayable=totalInterst+loanAmount;
  const emiElement = document.querySelector(".emi");
  const totalIntrestElement = document.querySelector(".totalIntrest");
  const totalPayableElement = document.querySelector(".totalPayable");
  emiElement.innerHTML = `Your EMI: ₹${emi.toFixed(2)}`;
  totalIntrestElement.innerHTML=`Your Total Intrest:₹${totalInterst.toFixed(0)}`;
  totalPayableElement.innerHTML=`Your Total Payble Amount: ₹${totalPayable.toFixed(0)}`;
  google.charts.load('current', {'packages':['corechart']});
  const box=document.querySelector(".resBox");
  box.style.display="block";
  document.querySelector('.calculate').addEventListener('click', calculateEMI);drawChart(loanAmount,totalInterst);
  
  
}


document.getElementById('loanAmountSlider').addEventListener('input', updateLoanAmount);
document.getElementById('interestRateSlider').addEventListener('input', updateInterestRate);
document.getElementById('loanTermSlider').addEventListener('input', updateLoanTerm);

function updateLoanAmount() {
    const loanAmountSlider = document.getElementById('loanAmountSlider');
    const loanAmountInput = document.getElementById('loanAmount');
    loanAmountInput.value = loanAmountSlider.value;
}

function updateInterestRate() {
    const interestRateSlider = document.getElementById('interestRateSlider');
    const interestRateInput = document.getElementById('interestRate');
    interestRateInput.value = interestRateSlider.value;
}
function updateLoanTerm(){
    const loanTermSlider = document.getElementById('loanTermSlider');
    const loanTermInput = document.getElementById('loanTerm');
    loanTermInput.value = loanTermSlider.value;
}
  function drawChart(loanAmount,totalInterst) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Total Intrest', loanAmount],
      ['Your Total Payble Amount', totalInterst],
     
    ]);

    // Set chart options
    var options = {'title':'Break up of total paymanet',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }