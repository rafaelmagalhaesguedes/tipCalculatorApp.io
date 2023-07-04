// Calculate
const calculateTip = (bill, tip) => (bill * tip) / 100;
const calculateBill = (bill, totalTip) => bill + totalTip;
const calculatePerPerson = (totalBill, persons) => totalBill / persons;

// Validade input data
const validateData = (bill, tip, persons) => {
  if (!bill) {
    throw new Error('Informe o valor da conta');
  }
  if (typeof bill !== 'number' || typeof tip !== 'number' || typeof persons !== 'number') {
    throw new Error('Informe apenas números');
  }
  if (persons <= 0 || bill < 0) {
    throw new Error('O número de pessoas deve ser maior que 0');
  }
};

// Main
function calculateTotalBill() {
  const bill = parseFloat(document.getElementById('bill').value);
  const tip = parseFloat(document.querySelector('.tip').value);
  const persons = parseInt(document.getElementById('persons').value);
  const displayTotalBill = document.getElementById('total-bill');
  const displayTotalPerson = document.getElementById('total-person');
  
  try {
    // Validate input data
    validateData(bill, tip, persons);
    
    // Calculate total bill
    const totalTip = calculateTip(bill, tip);
    const totalBill = calculateBill(bill, totalTip);
    const perPerson = calculatePerPerson(totalBill, persons);
    
    // Update the display
    displayTotalBill.textContent = 'R$' + totalBill.toFixed(2);
    displayTotalPerson.textContent = 'R$' + perPerson.toFixed(2);
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
// Start calc total bill
inputPersons.addEventListener('input', calculateTotalBill);
