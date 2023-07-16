//
//  Trybe Programming School
//
//  Project: Calculate Tip
//  
//  Dev: Rafael Guedes
//

// Validate input data
const validateData = (bill, tip, persons) => {
  if (!bill || isNaN(bill)) {
    throw new Error('Valor inválido, informe um valor númerico.');
  }
  if (isNaN(tip) || isNaN(persons)) {
    throw new Error('Valor inválido, informe apenas números');
  }
  if (persons <= 0) {
    throw new Error('O número de pessoas deve ser maior que 0');
  }
};

// Select tip value
const selectTip = () => {
  const tipButtons = document.querySelectorAll('.tip');
  tipButtons.forEach(button => {
    button.addEventListener('click', () => {
      tipButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      const tipValue = parseFloat(button.value);
      main(tipValue);
    });
  });
}
selectTip();

// Calculate
const calculateTip = (bill, tip) => (bill * tip) / 100;
const calculateBill = (bill, totalTip) => bill + totalTip;
const calculatePerPerson = (totalBill, persons) => totalBill / persons;

// Main function
function main(tip = 0) {
  // Data input
  const bill = parseFloat(document.getElementById('bill').value);
  const persons = parseInt(document.getElementById('persons').value);
  const displayTotalBill = document.getElementById('total-bill');
  const displayTotalPerson = document.getElementById('total-person');
  
  // Data Processing
  try {
    // Validate input data
    validateData(bill, tip, persons);
    // Calculate total bill
    const totalTip = calculateTip(bill, tip);
    const totalBill = calculateBill(bill, totalTip);
    const perPerson = calculatePerPerson(totalBill, persons);
    // Output data
    displayTotalBill.textContent = 'R$ ' + totalTip.toFixed(2);
    displayTotalPerson.textContent = 'R$ ' + perPerson.toFixed(2);
  } catch (error) {
    alert(error.message);
    location.reload();
  }
}

// Get input persons to start operation
const inputPersons = document.getElementById('persons');
// Start calc total bill when the number of persons is provided
inputPersons.addEventListener('input', () => {
  if (inputPersons.value) {
    main();
  }
});

// Reset data inputs
const buttonReset = document.getElementById('reset');
buttonReset.addEventListener('click', () => location.reload());