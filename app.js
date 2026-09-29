const shop = window.shop;
const root = document.getElementById('app');
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const today = new Date();
const localDate = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const start = localDate(today);
const slots = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'];
let chosenTime = '';

root.innerHTML = `
  <div class="demo-bar"><span class="demo-pulse"></span> Персональный пример сайта для «${esc(shop.name)}» <strong>ДЕМО · заявки не отправляются</strong></div>
  <header class="site-header shell">
    <a class="brand" href="#top" aria-label="${esc(shop.name)} — на главную"><span class="brand-mark">${esc(shop.name)}</span><span class="brand-caption">${esc(shop.subtitle)}<small>Грозный</small></span></a>
    <nav aria-label="Главная навигация"><a href="#services">Услуги</a><a href="#booking">Запись</a><a href="#contacts">Контакты</a></nav>
    <a class="header-book" href="#booking">Выбрать время <span aria-hidden="true">↗</span></a>
  </header>
  <main id="top">
    <section class="hero shell">
      <div class="hero-copy">
        <div class="eyebrow"><span class="line"></span> ШИНОМОНТАЖ / ГРОЗНЫЙ</div>
        <h1>${esc(shop.intro)}</h1>
        <p>${esc(shop.detail)}</p>
        <div class="hero-actions"><a class="button primary" href="#booking">Подобрать время <span aria-hidden="true">↗</span></a><a class="button ghost" href="#services">Наши услуги <span aria-hidden="true">↓</span></a></div>
        <div class="hero-meta"><div><span class="meta-label">АДРЕС МАСТЕРСКОЙ</span><span>${esc(shop.address)}</span></div><div><span class="meta-label">ТЕЛЕФОН</span><a href="tel:${shop.tel}">${esc(shop.phone)}</a></div></div>
      </div>
      <div class="hero-visual ${shop.photo ? 'has-photo' : 'graphic'}">
        ${shop.photo ? `<img src="${esc(shop.photo)}" alt="Вход в шиномонтаж 2022, фото из карточки 2ГИС" loading="eager">` : '<div class="tire-art" aria-hidden="true"><span class="tire-ring"></span><span class="tire-center">12</span></div>'}
        <span class="visual-index">01 / 02</span>
        <div class="visual-label"><span class="visual-kicker">ГОТОВЫ К ДОРОГЕ</span><strong>${esc(shop.name)}</strong><span>${esc(shop.subtitle)}</span></div>
        ${shop.photo ? `<a class="photo-credit" href="${shop.card}" target="_blank" rel="noopener noreferrer">Фото из карточки 2ГИС ↗</a>` : ''}
      </div>
    </section>
    <section class="facts shell" aria-label="Информация о мастерской"><div><span>01</span><strong>Услуги по делу</strong><small>Выберите то, что нужно автомобилю</small></div><div><span>02</span><strong>Время без звонка</strong><small>Пример выбора удобного окна</small></div><div><span>03</span><strong>Всё в одном месте</strong><small>Адрес и связь с мастерской</small></div></section>
    <section class="services shell" id="services"><div class="section-heading"><div><div class="eyebrow"><span class="line"></span> ЧТО ДЕЛАЕМ</div><h2>Для ваших колёс.</h2></div><p>Услуги из карточки мастерской в 2ГИС. Стоимость и доступность уточняются у бизнеса.</p></div><div class="service-grid">${shop.services.map((name, index) => `<a href="#booking" class="service-card" data-service="${esc(name)}"><span class="service-number">0${index+1} / 0${shop.services.length}</span><span class="service-icon" aria-hidden="true">${['◉','✦','⌁','✳'][index]}</span><strong>${esc(name)}</strong><span class="service-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></section>
    <section class="booking-wrap" id="booking"><div class="shell booking-layout"><div class="booking-aside"><div class="eyebrow"><span class="line"></span> КАК ЭТО МОГЛО БЫ РАБОТАТЬ</div><h2>Запись за пару касаний.</h2><p>Клиент выбирает услугу и удобное окно. В рабочей версии мастерская сама задаёт расписание и получает заявки.</p><div class="aside-note"><span>↗</span><div><strong>Сейчас это демонстрация.</strong><small>Окна условные, данные никуда не передаются.</small></div></div></div><form class="booking-form" id="booking-form"><div class="form-top"><span>01 — ВЫБОР ВРЕМЕНИ</span><span class="form-demo">ДЕМО</span></div><h3>Как к вам записаться?</h3><label class="field-label" for="service">Услуга</label><select id="service" required><option value="">Выберите услугу</option>${shop.services.map(name => `<option>${esc(name)}</option>`).join('')}</select><div class="two-fields"><div><label class="field-label" for="date">Дата</label><input id="date" type="date" min="${start}" value="${start}" required></div><div><label class="field-label" for="car">Автомобиль <span>необязательно</span></label><input id="car" type="text" maxlength="60" placeholder="Например, Kia Rio"></div></div><div class="field-label" id="time-label">Пример свободных окон</div><div class="slots" role="group" aria-labelledby="time-label">${slots.map(time => `<button type="button" class="slot" aria-pressed="false" data-time="${time}">${time}</button>`).join('')}</div><label class="field-label" for="customer">Ваше имя</label><input id="customer" type="text" maxlength="60" autocomplete="off" placeholder="Как к вам обращаться" required><label class="field-label" for="phone">Телефон</label><input id="phone" type="tel" inputmode="tel" autocomplete="off" placeholder="+7 900 000-00-00" required><button class="button primary submit" type="submit">Посмотреть подтверждение <span aria-hidden="true">↗</span></button><p class="form-foot">Это интерактивный макет. Мы не сохраняем и не отправляем введённые данные.</p></form></div></section>
    <section class="owner shell"><div class="owner-copy"><div class="eyebrow"><span class="line"></span> ВИД ДЛЯ МАСТЕРСКОЙ</div><h2>Расписание — у вас под рукой.</h2><p>Так владелец мог бы видеть окна дня и закрывать занятое время. Здесь показан пример без реальных клиентов.</p><button type="button" id="toggle-slot" class="button ghost dark-ghost">Закрыть окно 15:00 <span aria-hidden="true">↗</span></button></div><div class="schedule"><div class="schedule-head"><span>ГРАФИК / ПРИМЕР</span><strong>Сегодня <span class="schedule-dot"></span></strong></div><div class="schedule-row"><time>10:00</time><span class="schedule-tag">Свободно</span></div><div class="schedule-row"><time>11:30</time><span class="schedule-tag">Свободно</span></div><div class="schedule-row accent-row" id="demo-slot"><time>15:00</time><span class="schedule-tag">Свободно</span></div><div class="schedule-row"><time>18:00</time><span class="schedule-tag">Свободно</span></div><div class="schedule-bottom">Изменения в демо не сохраняются</div></div></section>
  </main>
  <footer id="contacts"><div class="shell footer-inner"><div><span class="footer-brand">${esc(shop.name)}</span><p>${esc(shop.subtitle)}<br>${esc(shop.address)}, Грозный</p></div><div class="footer-links"><a href="tel:${shop.tel}">${esc(shop.phone)} ↗</a><a href="${shop.card}" target="_blank" rel="noopener noreferrer">Карточка 2ГИС ↗</a></div></div><div class="shell footer-note">Концепт для демонстрации. Неофициальный сайт мастерской. Услуги и контакты взяты из открытой карточки 2ГИС; актуальность уточняйте у бизнеса.</div></footer>
  <dialog id="confirmation"><div class="dialog-icon">✓</div><div class="eyebrow">ДЕМОНСТРАЦИЯ</div><h2>Вот как увидит запись клиент.</h2><p id="confirmation-text"></p><p class="dialog-warning">Заявка не отправлена. Это только пример интерфейса.</p><button id="close-dialog" class="button primary">Понятно</button></dialog>
`;

document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { document.getElementById('service').value = link.dataset.service; }));
document.querySelectorAll('.slot').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.slot').forEach(slot => { slot.classList.remove('selected'); slot.setAttribute('aria-pressed', 'false'); }); button.classList.add('selected'); button.setAttribute('aria-pressed', 'true'); chosenTime = button.dataset.time; }));
document.getElementById('booking-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!chosenTime) { document.querySelector('.slots').classList.add('needs-choice'); document.querySelector('.slot').focus(); return; }
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const name = document.getElementById('customer').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (!service || !date || !name || !phone) return;
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {day:'numeric', month:'long', year:'numeric'}).format(new Date(`${date}T12:00:00`));
  document.getElementById('confirmation-text').textContent = `${name}, ${service.toLowerCase()} — ${formattedDate} в ${chosenTime}, ${shop.name}. В реальной версии сюда придёт подтверждение от мастерской.`;
  document.getElementById('confirmation').showModal();
});
document.getElementById('close-dialog').addEventListener('click', () => document.getElementById('confirmation').close());
document.getElementById('toggle-slot').addEventListener('click', event => { const row = document.getElementById('demo-slot'); const closed = row.classList.toggle('closed'); row.querySelector('.schedule-tag').textContent = closed ? 'Закрыто' : 'Свободно'; event.currentTarget.firstChild.textContent = closed ? 'Открыть окно 15:00 ' : 'Закрыть окно 15:00 '; });
