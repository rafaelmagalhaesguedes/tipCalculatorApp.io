//
//  Trybe Programming School
//
//  Project: Calculate Tip
//  
//  Dev: Rafael Guedes
//

// Validate input data
const validateData = (bill, persons) => {
  if (!bill || isNaN(bill)) {
    throw new Error('Valor inválido, informe um valor númerico.');
  }
  if (isNaN(persons)) {
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
    validateData(bill, persons)
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

// Selecione o botão "Custom"
const customButton = document.querySelector('.tip.custom');

// Manipulador de eventos botão "Custom"
customButton.addEventListener('click', function() {
  // Obtenha o valor personalizado do campo de entrada
  const customValue = parseInt(prompt('Enter custom tip percentage:'));
  
  // Verifique se o valor personalizado é válido
  if (customValue && customValue > 0) {
    // Atualize o valor do botão "Custom" para exibir o valor personalizado
    customButton.textContent = customValue + '%';
    
    // Calcule a gorjeta com base no valor personalizado
    const billInput = document.getElementById('bill');
    const billAmount = parseFloat(billInput.value);
    const tipPercentage = customValue / 100;
    const tipAmount = billAmount * tipPercentage;
    
    // Atualize a exibição do valor da gorjeta
    const totalBillDisplay = document.getElementById('total-bill');
    totalBillDisplay.textContent = 'R$ ' + tipAmount.toFixed(2);
    
    // Atualize a exibição do valor total por pessoa
    const personsInput = document.getElementById('persons');
    const numberOfPersons = parseInt(personsInput.value);
    const totalPerPerson = (billAmount + tipAmount) / numberOfPersons;
    const totalPersonDisplay = document.getElementById('total-person');
    totalPersonDisplay.textContent = 'R$ ' + totalPerPerson.toFixed(2);
  }
});


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
const tipButtons = document.querySelectorAll('.tip');
buttonReset.addEventListener('click', () => {
  customButton.textContent = 'Custom';
  tipButtons.forEach(btn => btn.classList.remove('selected'));
  document.getElementById('bill').value = '';
  document.getElementById('persons').value = '';
  document.getElementById('total-bill').innerText = 'R$ 0.00';
  document.getElementById('total-person').innerText = 'R$ 0.00';
});