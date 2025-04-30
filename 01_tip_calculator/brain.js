const billAmountInput = document.querySelector('#bill-amount');
const tipPercentageSelect = document.querySelector('#tip-percentage');
const numberOfPeopleInput = document.querySelector('#number-of-people');
const calculateButton = document.querySelector('#calculate-button');
const tipAmountParagraph = document.querySelector('#tip-amount');
const totalAmountParagraph = document.querySelector('#total-amount');
const amountPerPersonParagraph = document.querySelector("#amount-per-person");

const loader = () => {
  const card = document.createElement('div');
  card.classList.add('loader');
  card.textContent = "Loading...";
  document.body.append(card);
  setTimeout(() => {
    document.querySelector('.loader').remove();
  }, 3000);
}

window.onload = () => {
  loader();
}

calculateButton.addEventListener("click", () => {

  if (billAmountInput.value === '') {
    return notification('Please provide bill amount');
  }

  if (tipPercentageSelect.value === '') {
    return notification('Please provide tip percentage');
  }

  if (numberOfPeopleInput.value === '') {
    return notification('Please provide number of people');
  }

  const billAmount = parseFloat(billAmountInput.value);
  const tipPercentage = parseFloat(tipPercentageSelect.value) / 100;
  const numberOfPeople = parseInt(numberOfPeopleInput.value);

  const tipAmount = billAmount * tipPercentage;
  const totalAmount = billAmount + tipAmount;
  const amountPerPerson = totalAmount / numberOfPeople;

  tipAmountParagraph.innerHTML = `Tip Amount : <span class="result-value">${tipAmount.toFixed(2)}</span>`;
  totalAmountParagraph.innerHTML = `Total Amount : <span class="result-value">${totalAmount.toFixed(2)}</span>`;
  amountPerPersonParagraph.innerHTML = `Amount Per Person : <span class="result-value">${amountPerPerson.toFixed(2)}</span>`
});

const notification = message => {
  const card = document.createElement('div');
  card.classList.add('notification');
  card.textContent = message;
  document.body.append(card);
  setTimeout(() => {
    document.querySelector('.notification').remove();
  }, 2000);
}