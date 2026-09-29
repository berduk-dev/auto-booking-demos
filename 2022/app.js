const dateInput = document.getElementById('date');
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0')
].join('-');
dateInput.min = localToday;
dateInput.value = localToday;

let chosenTime = '';
const timeError = document.getElementById('time-error');
const slotButtons = [...document.querySelectorAll('.slot')];

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('service').value = link.dataset.service;
  });
});

slotButtons.forEach(button => {
  button.addEventListener('click', () => {
    slotButtons.forEach(slot => {
      slot.classList.remove('selected');
      slot.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('selected');
    button.setAttribute('aria-pressed', 'true');
    chosenTime = button.dataset.time;
    timeError.hidden = true;
  });
});

const dialog = document.getElementById('confirmation');
document.getElementById('booking-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!chosenTime) {
    timeError.hidden = false;
    slotButtons[0].focus();
    return;
  }
  const service = document.getElementById('service').value;
  const customerInput = document.getElementById('customer');
  const phoneInput = document.getElementById('phone');
  const name = customerInput.value.trim();
  if (!name || !phoneInput.value.trim()) {
    const invalidInput = name ? phoneInput : customerInput;
    invalidInput.value = '';
    invalidInput.reportValidity();
    return;
  }
  const date = dateInput.value;
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date(date + 'T12:00:00'));
  document.getElementById('confirmation-text').textContent =
    name + ', ' + service.toLowerCase() + ' — ' + formattedDate + ' в ' + chosenTime + ', «2022».';
  dialog.showModal();
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());

document.getElementById('toggle-slot').addEventListener('click', event => {
  const row = document.getElementById('demo-slot');
  const closed = row.classList.toggle('closed');
  row.querySelector('span').textContent = closed ? 'Закрыто' : 'Свободно';
  event.currentTarget.firstChild.textContent =
    closed ? 'Открыть окно 15:00 ' : 'Закрыть окно 15:00 ';
});
