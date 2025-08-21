function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(
  length,
  includeLower,
  includeUpper,
  includeNumber,
  includeSymbol
) {
  let password = "";
  const typesCount =
    includeLower + includeUpper + includeNumber + includeSymbol;
  const typesArr = [
    { lower: getRandomLower },
    { upper: getRandomUpper },
    { number: getRandomNumber },
    { symbol: getRandomSymbol },
  ].filter((item) => {
    const key = Object.keys(item)[0];
    return eval(`include${key.charAt(0).toUpperCase() + key.slice(1)}`);
  });

  if (typesCount === 0) {
    throw new Error("At least one character type should be selected");
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      password += type[funcName]();
    });
  }

  return password.slice(0, length);
}

const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

generateEl.addEventListener("click", () => {
  const length = parseInt(lengthEl.value);
  const includeLower = lowercaseEl.checked;
  const includeUpper = uppercaseEl.checked;
  const includeNumber = numbersEl.checked;
  const includeSymbol = symbolsEl.checked;

  try {
    const password = generatePassword(
      length,
      includeLower,
      includeUpper,
      includeNumber,
      includeSymbol
    );
    resultEl.innerText = password;
  } catch (error) {
    alert(error.message);
  }
});

clipboardEl.addEventListener("click", () => {
  navigator.clipboard.writeText(resultEl.innerText);
});
