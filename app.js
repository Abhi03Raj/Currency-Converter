const selectElements = document.querySelectorAll(".currency-select");
const result = document.querySelector("#result");
const form = document.querySelector("#converter-form");
const fromFlag = document.querySelector("#from-flag");
const toFlag = document.querySelector("#to-flag");

for (let select of selectElements) {
  for (let currency in countryList) {
    const countryCode = countryList[currency];
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = `${countryNames[countryCode]} (${currency})`;
    select.appendChild(option);
  }
}

function updateFlag(selectId, flagImgId) {
  const select = document.querySelector(`#${selectId}`);
  const flag = document.querySelector(`#${flagImgId}`);
  const currency = select.value;
  const countryCode = countryList[currency];
  flag.src = `https://flagsapi.com/${countryCode}/flat/32.png`;
}

// Set default selection and flags
window.addEventListener("load", () => {
  document.querySelector("#from").value = "USD";
  document.querySelector("#to").value = "INR";
  updateFlag("from", "from-flag");
  updateFlag("to", "to-flag");
});

// Flag change on selection
document.querySelector("#from").addEventListener("change", () => {
  updateFlag("from", "from-flag");
});
document.querySelector("#to").addEventListener("change", () => {
  updateFlag("to", "to-flag");
});

// Currency conversion
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = parseFloat(document.querySelector("#amount").value);
  const from = document.querySelector("#from").value;
  const to = document.querySelector("#to").value;

  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    result.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (err) {
    result.textContent = "Error fetching exchange rate.";
  }
});
