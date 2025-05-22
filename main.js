const BASE_URL =
  "https://v6.exchangerate-api.com/v6/79ba4c4dd22fa4856ee803b2/latest";

const dropdowns = document.querySelectorAll("select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = currCode;
    newOption.value = currCode;
    if (currCode === "USD" && select.name === "from") {
      newOption.selected = true; // Correctly set as selected
    } else if (currCode === "BDT" && select.name === "to") {
      newOption.selected = true; // Correctly set as selected
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    const selectedCode = evt.target;
    updateFlag(selectedCode);
  });
}

const updateFlag = (element) => {
  const currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
  element.parentElement.querySelector("img").alt = currCode;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

button.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
