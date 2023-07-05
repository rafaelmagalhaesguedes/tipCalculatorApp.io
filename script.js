//
//  Trybe Programming School
//
//  Project: Calculate Tip
//  
//  Dev: Rafael Guedes
//

// Calculate
const calculateTip = (bill, tip) => (bill * tip) / 100;
const calculateBill = (bill, totalTip) => bill + totalTip;
const calculatePerPerson = (totalBill, persons) => totalBill / persons;

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
      // Remove selected class from all buttons
      tipButtons.forEach(btn => btn.classList.remove('selected'));
      // Add selected class to the clicked button
      button.classList.add('selected');

      const tipValue = parseFloat(button.value);
      // Call main function after selecting tip
      main(tipValue);
    });
  });
}
selectTip();

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
    displayTotalBill.textContent = 'R$ ' + totalBill.toFixed(2);
    displayTotalPerson.textContent = 'R$ ' + perPerson.toFixed(2);
  } catch (error) {
    // Handle errors
    console.error(error);
    displayTotalBill.textContent = '';
    displayTotalPerson.textContent = '';
    return error.message;
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
buttonReset.addEventListener('click', () => {
  document.getElementById('bill').value = '';
  document.getElementById('persons').value ='';
  document.getElementById('total-bill').textContent = 'R$ 0.00';
  document.getElementById('total-person').textContent = 'R$ 0.00';
  // Remove selected class from all buttons
  const tipButtons = document.querySelectorAll('.tip');
  tipButtons.forEach(button => button.classList.remove('selected'));
});