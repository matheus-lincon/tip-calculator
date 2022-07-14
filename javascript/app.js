/*------- SELECTORS */
const billAmount = document.querySelector('#bill-amount')
const numberPeople = document.querySelector('#number-people')
const outputTipAmount = document.querySelector('#tip-amount')
const outputTotalAmount = document.querySelector('#total-amount')
const customTip = document.querySelector('#custom-tip')
const tips = document.querySelectorAll('.tip')
const resetButton = document.querySelector('#reset')

/*------- FUNCTIONS */
const getCalculatedTip = (tipValue) => {
  if (tipValue < 0) return -1

  let tip = tipValue === '' ? 0 : Number(tipValue)
  let bill = Number(billAmount.value)
  let people = Number(numberPeople.value)

  let percentage = (bill * tip) / 100

  let tipAmount = (percentage / people).toFixed(2)
  let totalAmount = ((percentage + bill) / people).toFixed(2)

  return { tipAmount, totalAmount }
}

const displayTip = ({ tipAmount, totalAmount }) => {
  outputTipAmount.textContent = `$${tipAmount}`
  outputTotalAmount.textContent = `$${totalAmount}`
}

const checkFields = () => {
  if (
    billAmount.value !== '' &&
    Number(billAmount.value) >= 0 &&
    numberPeople.value !== '' &&
    numberPeople.value !== '0' &&
    Number(numberPeople.value) >= 0
  )
    return true

  if (billAmount.value === '' || Number(billAmount.value) < 0) {
    addStyledFields(billAmount)
    activeAlertMessage(`${billAmount.id}-alert`)
  }

  if (
    numberPeople.value === '' ||
    numberPeople.value === '0' ||
    Number(numberPeople.value) < 0
  ) {
    addStyledFields(numberPeople)
    activeAlertMessage(`${numberPeople.id}-alert`)
  }

  return false
}

const activeCustomTipInput = () => {
  customTip.removeAttribute('readonly', 'false')
  customTip.placeholder = ''
}

const deactiveCustomTipInput = () => {
  customTip.setAttribute('readonly', 'true')
  customTip.value = ''
  customTip.placeholder = 'Custom'
}

const removeSelectedClass = () => {
  tips.forEach((tip) => {
    tip.classList.remove('selected')
  })

  cleanOutput()
}

const selectTip = (tip) => {
  if (tip.classList.contains('selected')) return

  removeSelectedClass()
  tip.classList.add('selected')

  if (tip.id === customTip.id) {
    activeCustomTipInput()
    return
  }

  deactiveCustomTipInput()
}

const addStyledFields = (field) => {
  field.classList.add('alert')
}

const removeStyledFields = (field) => {
  field.classList.remove('alert')
}

const activeAlertMessage = (id) => {
  const message = document.querySelector(`#${id}`)
  message.classList.add('active')
  message.setAttribute('aria-hidden', 'false')
}

const deactiveAlertMessage = (id) => {
  const message = document.querySelector(`#${id}`)
  message.classList.remove('active')
  message.setAttribute('aria-hidden', 'true')
}

const cleanOutput = () => {
  outputTipAmount.textContent = '$0.00'
  outputTotalAmount.textContent = '$0.00'
}

const cleanFields = () => {
  billAmount.value = ''
  numberPeople.value = ''

  cleanOutput()
  removeSelectedClass()
  deactiveCustomTipInput()
}

const handleBillAmount = (e) => {
  removeStyledFields(e.target)
  deactiveAlertMessage(`${e.target.id}-alert`)

  tips.forEach((tip) => {
    if (tip.id === customTip.id) deactiveCustomTipInput()
    removeSelectedClass()
  })
}

const handleNumberPeople = (e) => {
  removeStyledFields(e.target)
  deactiveAlertMessage(`${e.target.id}-alert`)

  tips.forEach((tip) => {
    if (tip.id === customTip.id) deactiveCustomTipInput()
    removeSelectedClass()
  })
}

/*------- EVENT LISTENERS */

//disable hover
const checkHover = () => {
  let touchTime = 0

  function enableHover() {
    if (new Date() - touchTime < 500) return
    document.body.classList.add('hasHover')
  }

  function disableHover() {
    document.body.classList.remove('hasHover')
  }

  function updateTouchTime() {
    touchTime = new Date()
  }

  document.addEventListener('touchstart', updateTouchTime, true)
  document.addEventListener('touchstart', disableHover, true)
  document.addEventListener('mousemove', enableHover, true)
}

//Event: disable hover (touch devices)
window.onload = () => checkHover()

//Event: select tip
tips.forEach((tip) => {
  tip.addEventListener('click', () => {
    const isFieldsFilled = checkFields()
    const isCustomTipSelected = tip.id === customTip.id ? true : false

    if (isFieldsFilled) {
      selectTip(tip)

      //Custom tip has a different behavior
      if (isCustomTipSelected) return

      //Normal tip behavior
      const calculatedTip = getCalculatedTip(tip.value)
      displayTip(calculatedTip)
    }
  })
})

//Event: remove alerts from fields when focus
billAmount.addEventListener('focus', (e) => handleBillAmount(e))
numberPeople.addEventListener('focus', (e) => handleNumberPeople(e))

//Event: reset button
resetButton.addEventListener('click', cleanFields)

//Event: Custom tip has different behavior
customTip.addEventListener('focusout', () => {
  if (customTip.value === '') {
    deactiveCustomTipInput()
    removeSelectedClass()
  }
})

customTip.addEventListener('input', () => {
  const outputTip = getCalculatedTip(customTip.value)
  displayTip(outputTip)
})
