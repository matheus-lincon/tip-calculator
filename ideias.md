```javascript
/*------------- Selectors */

const billAmount = document.querySelector('#bill-amount')
const outputTipAmount = document.querySelector('#tip-amount')
const outputTotalAmount = document.querySelector('#total-amount')
const numberPeople = document.querySelector('#number-people')
const resetButton = document.querySelector('#reset')
const customTip = document.querySelector('#custom-tip')
const tips = document.querySelectorAll('.tip')
const invalid = document.querySelector('.invalid')

/*------------ EventListener */

// Event: disable hover (touch devices)
window.onload = () => {
  checkHover()
}

// Event: tips
tips.forEach((tip) => {
  tip.addEventListener('click', (e) => {
    if (checkFields() === false) {
      alertUser()
      return
    }

    if (e.target.id === 'custom-tip') {
      selectTip(e.target)
      return
    }
    selectTip(e.target)
    calculateTip(e.target.value)
  })
})

document.querySelector('#custom-tip').addEventListener('focusout', () => {
  resetCustomButton(customTip, false)
})

// Event: remove styled fields when focused
billAmount.addEventListener('focus', (e) => {
  removeStyledFields(e.target)
})

numberPeople.addEventListener('focus', (e) => {
  removeStyledFields(e.target)
})

//Event: reset all fields
resetButton.addEventListener('click', reset)

/*------------ Functions */

//calculate tip
function calculateTip(tip) {
  let tipValue = Number(tip)
  let bill = Number(billAmount.value)
  let people = Number(numberPeople.value)
  let percentageTip = (bill * tipValue) / 100

  let tipAmount = (percentageTip / people).toFixed(2)
  let totalAmount = ((percentageTip + bill) / people).toFixed(2)

  updateOutput(tipAmount, totalAmount)
}

//update output
function updateOutput(tipAmount, totalAmount) {
  outputTipAmount.innerText = `$${tipAmount}`
  outputTotalAmount.innerText = `$${totalAmount}`
}

//reset
function reset() {
  billAmount.value = ''
  numberPeople.value = ''
  outputTipAmount.innerText = ''
  outputTotalAmount.innerText = ''

  tips.forEach((tip) => {
    tip.classList.remove('selected')
  })

  resetCustomButton(customTip, true)
}

// select tip
function selectTip(target) {
  if (target.classList.contains('selected')) return

  //turn button into number input
  if (target.id === 'custom-tip') {
    target.placeholder = ''
    target.removeAttribute('readonly')
    target.style.textAlign = 'right'
    target.type = 'number'
    target.value = ''

    target.addEventListener('input', () => {
      calculateTip(target.value)
    })
  }

  tips.forEach((tip) => {
    tip.classList.remove('selected')
  })

  target.classList.add('selected')
}

//check fields
function checkFields() {
  if (numberPeople.value === '0') return false
  if (billAmount.value === '' || numberPeople.value === '') return false
  return true
}

//alert user
function alertUser() {
  if (billAmount.value === '') addStyledFields(billAmount)
  if (numberPeople.value === '') addStyledFields(numberPeople)
  if (numberPeople.value === '0') addStyledFields(numberPeople)
}

//reset custom button
function resetCustomButton(button, clear = false) {
  if (button.value === '' && clear === false) return
  button.type = 'text'
  button.value = ''
  button.setAttribute('readonly', 'true')
  button.placeholder = 'Custom'
  button.style.textAlign = 'center'
  button.classList.remove('selected')
}

//style fields for user alert
function addStyledFields(field) {
  //Add styled border to field
  field.style.border = '2px solid var(--red)'

  //Add alert text to field && Set attributes
  if (field.id === 'bill-amount') {
    document.querySelector('#bill-alert').classList.add('active')
    document.querySelector('#bill-alert').setAttribute('aria-hidden', 'false')
  } else if (field.id === 'number-people') {
    document.querySelector('#number-people-alert').classList.add('active')
    document
      .querySelector('#number-people-alert')
      .setAttribute('aria-hidden', 'false')
  }
}

function removeStyledFields(field) {
  if (field.style.border === 'none') return

  //remove styled border to field
  field.style.border = 'none'

  //remove alert text to field && Set attributes
  if (field.id === 'bill-amount') {
    document.querySelector('#bill-alert').classList.remove('active')
    document.querySelector('#bill-alert').setAttribute('aria-hidden', 'true')
  } else if (field.id === 'number-people') {
    document.querySelector('#number-people-alert').classList.remove('active')
    document
      .querySelector('#number-people-alert')
      .setAttribute('aria-hidden', 'true')
  }
}

```