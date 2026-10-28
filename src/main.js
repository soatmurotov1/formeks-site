(function(){
  const D = window.__FOMEKS_DATA__;
  const fmt = n => Math.round(n).toLocaleString('ru-RU').replace(/,/g,' ');
  const fmtKg = n => (n>=1000? (n/1000).toFixed(1)+' t' : fmt(n)+' kg');
  function esc(s){ return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function formatPhone(p){
    const d = (p||'').replace(/\D/g,'');
    const last9 = d.slice(-9);
    if(last9.length<9) return p;
    return '+998 '+last9.slice(0,2)+' '+last9.slice(2,5)+' '+last9.slice(5,7)+' '+last9.slice(7,9);
  }

  const DEMO_ACCOUNT = {
    code:'0001', isDemo:true, hasPhoto:true,
    name:{uz:'Test kabinet', ru:'Тестовый кабинет'},
    address:{uz:'Namuna uchun', ru:'Для примера'},
    total_kg:500, total_sum:1500000, total_paid:1500000, total_debt:0, entries:3,
    history:[
      {date:'2026-01-15', kg:150, sum:450000},
      {date:'2026-02-20', kg:200, sum:600000},
      {date:'2026-03-10', kg:150, sum:450000}
    ]
  };

  const I18N = {
    uz:{
      'nav.home':"Bosh sahifa",'nav.account':"Mening hisobim",'nav.order':"Mashina chaqirish",
      'hero.title1':"Fomeks qoldig'ini qayta ishlating —",'hero.title2':"tabiatni asrang, pul ishlang.",
      'hero.lead':"Har bir yetkazib bergan kilogramingiz shu yerda hisobga olinadi. Kim qancha topshirgani, to'lovlar va navbatdagi mashina — barchasi ochiq ko'rinishda.",
      'hero.joinGroup':"📣 Telegram guruhimizga qo'shiling",
      'hero.priceLabel':"Xarid narxi:",
      'stat.kg':"jami yig'ilgan, kg",'stat.paid':"jami to'langan, so'm",'stat.suppliers':"yetkazib beruvchi",
      'top.title':"TOP-5 yetkazib beruvchi",'top.note':"jami kg bo'yicha",
      'chart.title':"Oylik dinamika",'chart.note':"kg / oy",
      'how.title':"Qanday ishlaydi",'how.note':"3 qadam",
      'how1.title':"1. Qoldiqni tayyorlang",'how1.text':"Yorliq yopishmagan, axlat aralashmagan fomeksni qopga joylang.",
      'how2.title':"2. Mashina chaqiring",'how2.text':"Saytda buyurtma bering — 10 tonnalik Isuzu har 5–6 kunda yig'ib boradi.",
      'how3.title':"3. Pulingizni oling",'how3.text':"Zavodda tarozida o'lchanadi, natija va rasm yuboriladi, kartaga 3 000 so'm/kg o'tkaziladi.",
      'footer.text':"FOMEKS QOLDIQ · UzQoldiq.uz — Ma'lumotlar ichki hisobot asosida yangilanadi.",
      'login.title':"Mening hisobim",'login.text':"Sizga berilgan kodni kiriting — ro'yxatdan o'tish shart emas.",
      'login.btn':"Kirish",'login.demoHint':"Demo uchun sinab ko'ring:",
      'acc.logout':"Chiqish",'acc.kg':"jami topshirilgan, kg",'acc.sum':"jami summasi, so'm",'acc.paid':"to'langan, so'm",
      'acc.historyTitle':"To'lovlar tarixi",'acc.thDate':"Sana",'acc.thKg':"Miqdor, kg",'acc.thSum':"Summasi, so'm",'acc.thStatus':"Holati",'acc.thPhoto':"Rasm",'acc.thReceipt':"Chek",
      'acc.orderBtn':"🚛 Mashina chaqirish",'status.paid':"To'landi",
      'photo.btn':"📷 Rasm",'photo.title':"Qoldiq surati",'photo.demoCap':"Namunaviy surat — tarozida o'lchash paytida",'photo.realCap':"Rasm hali ulanmagan. Har bir yetkazib berish uchun rasm tez orada qo'shiladi.",
      'receipt.btn':"🧾 Chek",'receipt.title':"To'lov cheki",'receipt.supplier':"Yetkazib beruvchi",'receipt.date':"Sana",'receipt.kg':"Miqdori",'receipt.price':"Narxi",'receipt.total':"Jami to'landi",'receipt.stamp':"TO'LANDI ✓",
      'receipt.empty':"Chek hali biriktirilmagan",'receipt.attachBtn':"Chek rasmini biriktirish",'receipt.attachNote':"Namuna: bu yerda tanlangan rasm faqat shu ko'rish uchun ko'rinadi. Kassir tomonidan yuklangan chek barcha qurilmalarda ko'rinishi uchun tizimga ulanish kerak.",
      'order.title':"Mashina chaqirish",'order.note':"Fomeks qoldig'ini olib ketish uchun buyurtma",
      'order.name':"Ism / do'kon nomi",'order.code':"Kodingiz (bo'lsa)",'order.phone':"Telefon raqami",
      'order.kg':"Taxminiy miqdor, kg",'order.address':"Manzil",'order.note':"Izoh (ixtiyoriy)",
      'order.card':"Karta raqami (to'lov uchun)",'order.cardName':"Karta egasi F.I.Sh.",
      'order.location':"Lokatsiya (xohlasangiz)",'order.locationBtn':"📍 Joylashuvni yuborish",'order.locationPh':"Hali yuborilmagan",
      'order.submit':"Buyurtmani yuborish",'order.successTitle':"Buyurtma qabul qilindi!",
      'order.again':"Yana buyurtma berish",
      'order.badge':"Buyurtma tafsilotlari operatorga Telegram orqali avtomatik yetkaziladi. Zudlik bilan bog'lanish uchun +998 97 721 26 09 raqamiga qo'ng'iroq qiling.",
      'tier1.title':"Tabiat do'sti", 'tier1.desc':"Siz allaqachon tabiatni asrashga ulush qo'shdingiz — har bir kilogram muhim!",
      'tier2.title':"Tabiat himoyachisi", 'tier2.desc':"Doimiy hamkorligingiz tufayli kamroq chiqindi yer ostiga ko'miladi. Rahmat!",
      'tier3.title':"Tabiat qahramoni", 'tier3.desc':"Siz eng faol hamkorlarimizdan birisiz — sizning hissangiz katta o'zgarish yaratmoqda.",
      'tier4.title':"Super halol hamkor", 'tier4.desc':"Eng yuqori daraja! Halolligingiz va doimiyligingiz uchun katta rahmat — siz bizning eng ishonchli hamkorimizsiz.",
      'tree.level':(n)=> n+"-daraja",
      'tree.flowers':(n)=> n===1 ? "1 ta magnoliya guli ochildi" : n+" ta magnoliya guli ochildi",
      'tree.next':(kg)=> "Keyingi gulgacha: "+kg+" kg",
      'game.title':"O'ynang va daraxtni suvgaring",'game.note':"mini-o'yin",
      'game.round1':"1-tur",'game.round2':"2-tur",
      'game.r1hintStart':"🧺 Fomeks qoldig'ini qayta ishlashga topshiring",
      'game.r1hintGo':"♻️ Qayta ishlanmoqda... pul olyapsiz!",
      'game.r1hintDone':"🎉 Barakalla! Siz fomeksni qayta ishladingiz va pul oldingiz!",
      'game.r1btn':"🧺 Topshirish",'game.r1next':"2-tur: Daraxtni suvgaring →",
      'game.hintStart':"👇 Chelakni oling",'game.hintPour':"💧 Suv quying! Yana, yana!",
      'game.hintDone':"🎉 Ajoyib! Daraxt to'liq gullab-yashnadi!",'game.reset':"↺ Qayta o'ynash",
      'success.msg':(name)=> "Rahmat, "+name+"! Buyurtmangiz qabul qilindi. Haydovchimiz 3 ish kuni ichida siz bilan bog'lanib, qoldiqni olib ketadi.",
      'contact.title':"Biz bilan bog'lanish",'contact.call':"📞 Qo'ng'iroq qilish",'contact.tg':"✈️ Telegram'da yozish",
    },
    ru:{
      'nav.home':"Главная",'nav.account':"Мой кабинет",'nav.order':"Вызов машины",
      'hero.title1':"Перерабатывайте отходы фомекса —",'hero.title2':"берегите природу, зарабатывайте.",
      'hero.lead':"Каждый сданный килограмм фиксируется здесь. Кто сколько сдал, выплаты и следующая машина — всё открыто.",
      'hero.joinGroup':"📣 Вступить в Telegram-группу",
      'hero.priceLabel':"Цена закупки:",
      'stat.kg':"всего собрано, кг",'stat.paid':"всего выплачено, сум",'stat.suppliers':"поставщиков",
      'top.title':"ТОП-5 поставщиков",'top.note':"по общему кг",
      'chart.title':"Динамика по месяцам",'chart.note':"кг / месяц",
      'how.title':"Как это работает",'how.note':"3 шага",
      'how1.title':"1. Подготовьте отходы",'how1.text':"Фомекс без наклеек и мусора, упакованный в мешок.",
      'how2.title':"2. Вызовите машину",'how2.text':"Оформите заявку на сайте — 10-тонный Isuzu забирает каждые 5–6 дней.",
      'how3.title':"3. Получите деньги",'how3.text':"На заводе взвешивают, присылают результат и фото, на карту переводят 3 000 сум/кг.",
      'footer.text':"FOMEKS QOLDIQ · UzQoldiq.uz — Данные обновляются на основе внутренней отчётности.",
      'login.title':"Мой кабинет",'login.text':"Введите выданный вам код — регистрация не нужна.",
      'login.btn':"Войти",'login.demoHint':"Попробуйте демо-код:",
      'acc.logout':"Выйти",'acc.kg':"всего сдано, кг",'acc.sum':"на сумму, сум",'acc.paid':"выплачено, сум",
      'acc.historyTitle':"История платежей",'acc.thDate':"Дата",'acc.thKg':"Кол-во, кг",'acc.thSum':"Сумма, сум",'acc.thStatus':"Статус",'acc.thPhoto':"Фото",'acc.thReceipt':"Чек",
      'acc.orderBtn':"🚛 Вызвать машину",'status.paid':"Оплачено",
      'photo.btn':"📷 Фото",'photo.title':"Фото отхода",'photo.demoCap':"Пример фото — во время взвешивания",'photo.realCap':"Фото пока не подключено. Скоро появится к каждой сдаче отдельно.",
      'receipt.btn':"🧾 Чек",'receipt.title':"Чек об оплате",'receipt.supplier':"Поставщик",'receipt.date':"Дата",'receipt.kg':"Количество",'receipt.price':"Цена",'receipt.total':"Итого оплачено",'receipt.stamp':"ОПЛАЧЕНО ✓",
      'receipt.empty':"Чек ещё не прикреплён",'receipt.attachBtn':"Прикрепить фото чека",'receipt.attachNote':"Демо: выбранное фото видно только в этом просмотре. Чтобы чек кассира был виден на всех устройствах, нужно подключить систему хранения.",
      'order.title':"Вызов машины",'order.note':"Заявка на вывоз отходов фомекса",
      'order.name':"Имя / название точки",'order.code':"Ваш код (если есть)",'order.phone':"Номер телефона",
      'order.kg':"Примерное кол-во, кг",'order.address':"Адрес",'order.note':"Комментарий (необязательно)",
      'order.card':"Номер карты (для оплаты)",'order.cardName':"Ф.И.О. владельца карты",
      'order.location':"Локация (по желанию)",'order.locationBtn':"📍 Отправить локацию",'order.locationPh':"Пока не отправлена",
      'order.submit':"Отправить заявку",'order.successTitle':"Заявка принята!",
      'order.again':"Оформить ещё раз",
      'order.badge':"Детали заявки автоматически передаются оператору в Telegram. Для срочной связи звоните по номеру +998 97 721 26 09.",
      'tier1.title':"Друг природы", 'tier1.desc':"Вы уже вносите вклад в защиту природы — каждый килограмм важен!",
      'tier2.title':"Защитник природы", 'tier2.desc':"Благодаря вашему постоянству меньше отходов оказывается на земле. Спасибо!",
      'tier3.title':"Герой природы", 'tier3.desc':"Вы один из самых активных партнёров — ваш вклад создаёт настоящую перемену.",
      'tier4.title':"Супер честный партнёр", 'tier4.desc':"Высший уровень! Огромное спасибо за честность и постоянство — вы наш самый надёжный партнёр.",
      'tree.level':(n)=> "Уровень "+n,
      'tree.flowers':(n)=> n===1 ? "Раскрылся 1 цветок магнолии" : "Раскрылось цветков магнолии: "+n,
      'tree.next':(kg)=> "До следующего цветка: "+kg+" кг",
      'game.title':"Поиграйте и полейте дерево",'game.note':"мини-игра",
      'game.round1':"Тур 1",'game.round2':"Тур 2",
      'game.r1hintStart':"🧺 Сдайте отходы фомекса на переработку",
      'game.r1hintGo':"♻️ Перерабатывается... вы получаете деньги!",
      'game.r1hintDone':"🎉 Отлично! Вы переработали фомекс и получили деньги!",
      'game.r1btn':"🧺 Сдать",'game.r1next':"Тур 2: полить дерево →",
      'game.hintStart':"👇 Возьмите ведро",'game.hintPour':"💧 Поливайте! Ещё, ещё!",
      'game.hintDone':"🎉 Отлично! Дерево полностью расцвело!",'game.reset':"↺ Играть заново",
      'success.msg':(name)=> "Спасибо, "+name+"! Ваша заявка принята. Водитель свяжется с вами в течение 3 рабочих дней и заберёт отходы.",
      'contact.title':"Связаться с нами",'contact.call':"📞 Позвонить",'contact.tg':"✈️ Написать в Telegram",
    }
  };

  let LANG = 'uz';
  function t(key){ return I18N[LANG][key] || key; }

  function applyStaticI18n(){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const val = I18N[LANG][key];
      if(typeof val === 'string') el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
      const key = el.getAttribute('data-i18n-ph');
      const val = I18N[LANG][key];
      if(typeof val === 'string') el.placeholder = val;
    });
    document.querySelectorAll('.lang-switch button').forEach(b=>b.classList.toggle('active', b.dataset.lang===LANG));
  }

  // ---- overall stats ----
  function renderStats(){
    document.getElementById('s-total-kg').textContent = fmtKg(D.overall.total_kg);
    document.getElementById('s-suppliers').textContent = D.overall.supplier_count;
  }

  // ---- top 5 ----
  function renderTop5(){
    const board = document.getElementById('top5-board');
    const top5 = D.suppliers.slice(0,5);
    const maxKg = top5[0].total_kg;
    board.innerHTML = top5.map((s,i)=>`
      <div class="board-row">
        <div class="rank">${i+1}</div>
        <div class="who"><div class="name">${esc(s.name)}</div><div class="trees">${'🌳'.repeat(Math.max(1,Math.floor(s.total_kg/1000)))}</div></div>
        <div class="amt"><div class="kg">${fmtKg(s.total_kg)}</div></div>
        <div class="bar-bg"><div class="bar-fg" style="width:${(s.total_kg/maxKg*100).toFixed(0)}%"></div></div>
      </div>`).join('');
  }

  // ---- monthly chart ----
  let chartInstance = null;
  function renderChart(){
    const months = Object.keys(D.monthly).sort();
    const kgVals = months.map(m=>D.monthly[m].kg);
    const styleVars = getComputedStyle(document.documentElement);
    const cssVar = n => styleVars.getPropertyValue(n).trim();
    if(chartInstance) chartInstance.destroy();
    chartInstance = new Chart(document.getElementById('monthlyChart'), {
      type:'bar',
      data:{ labels: months, datasets:[{ label:'kg', data:kgVals, backgroundColor: cssVar('--red') || '#E1131A', borderRadius:6, maxBarThickness:22 }]},
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false}, tooltip:{callbacks:{label:c=>fmt(c.raw)+' kg'}} },
        scales:{
          x:{ grid:{display:false}, ticks:{ color: cssVar('--ink-soft')||'#7A6660', font:{size:9} } },
          y:{ grid:{color: cssVar('--line')||'#F0DCCF'}, ticks:{ color: cssVar('--ink-soft')||'#7A6660' } }
        }
      }
    });
  }

  // ---- phone contact modal ----
  document.getElementById('phone-kicker').addEventListener('click', ()=>{
    openModal(`
      <h3>${t('contact.title')}</h3>
      <a class="btn" href="tel:+998977212609" style="text-decoration:none;">${t('contact.call')}</a>
      <a class="btn gold" href="https://t.me/+998977212609" target="_blank" style="text-decoration:none;margin-top:10px;">${t('contact.tg')}</a>
    `);
  });

  // ---- status level + magnolia tree ----
  function levelInfo(kg){
    const level = Math.max(1, Math.floor(kg/500)+1);
    let tierKey, emoji;
    if(level <= 2){ tierKey='tier1'; emoji='🌱'; }
    else if(level <= 5){ tierKey='tier2'; emoji='🌿'; }
    else if(level <= 9){ tierKey='tier3'; emoji='🌳'; }
    else { tierKey='tier4'; emoji='🏆'; }
    return { level, emoji, title: t(tierKey+'.title'), desc: t(tierKey+'.desc') };
  }

  const FLOWER_SLOTS = [
    [120,232],[75,215],[165,215],[50,180],[95,172],[145,172],[190,180],
    [30,140],[70,128],[110,120],[130,120],[170,128],[210,140],
    [45,95],[85,80],[120,68],[155,80],[195,95],
    [65,45],[100,30],[140,30],[175,45],
    [90,10],[150,10]
  ];
  const LEAF_SLOTS = [
    [95,222],[145,222],[60,198],[180,198],[35,160],[110,150],[130,150],[205,160],
    [55,112],[95,100],[145,100],[185,112],[75,62],[135,62],[175,70],
    [110,40],[160,40]
  ];
  function petal(cx,cy,bloom,scale){
    scale = scale||1;
    const col = bloom ? '#E1568B' : 'transparent';
    let g = `<g transform="translate(${cx},${cy}) scale(${scale})">`;
    if(bloom){
      for(let i=0;i<6;i++){
        g += `<ellipse cx="0" cy="-6" rx="4.2" ry="7" fill="${col}" opacity="0.92" transform="rotate(${i*60})"/>`;
      }
      g += `<circle cx="0" cy="0" r="2.6" fill="#F6B21B"/>`;
    }
    g += `</g>`;
    return g;
  }
  function leaf(cx,cy,rot){
    return `<ellipse cx="${cx}" cy="${cy}" rx="9" ry="4.5" fill="#5C9A5F" opacity="0.85" transform="rotate(${rot||20} ${cx} ${cy})"/>`;
  }
  function magnoliaSVG(bloomCount){
    const maxSlots = FLOWER_SLOTS.length;
    const shown = Math.min(bloomCount, maxSlots);
    let flowers = '';
    FLOWER_SLOTS.forEach((p,i)=>{ if(i < shown) flowers += petal(p[0], p[1], true); });
    let leaves = '';
    LEAF_SLOTS.forEach((p,i)=>{ leaves += leaf(p[0], p[1], (i%2? -25:25)); });
    const overflow = bloomCount > maxSlots ? bloomCount - maxSlots : 0;
    const trunkCol = '#8A6A4E';
    const overflowBadge = overflow > 0 ? `<g transform="translate(120,20)">
        <circle r="16" fill="#F6B21B"/>
        <text x="0" y="5" text-anchor="middle" font-size="14" font-weight="800" fill="#3A2500">+${overflow}</text>
      </g>` : '';
    return `<svg viewBox="0 0 240 260" xmlns="http://www.w3.org/2000/svg">
      <path d="M120 250 L120 190" stroke="${trunkCol}" stroke-width="10" stroke-linecap="round"/>
      <path d="M120 225 Q90 218 75 215" stroke="${trunkCol}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M120 225 Q150 218 165 215" stroke="${trunkCol}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M120 190 Q80 182 50 180" stroke="${trunkCol}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
      <path d="M120 190 Q105 178 95 172" stroke="${trunkCol}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M120 190 Q135 178 145 172" stroke="${trunkCol}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M120 190 Q160 182 190 180" stroke="${trunkCol}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
      <path d="M50 180 Q40 158 30 140" stroke="${trunkCol}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M95 172 Q80 148 70 128" stroke="${trunkCol}" stroke-width="4.2" fill="none" stroke-linecap="round"/>
      <path d="M120 172 Q115 145 110 120" stroke="${trunkCol}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M120 172 Q125 145 130 120" stroke="${trunkCol}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M145 172 Q160 148 170 128" stroke="${trunkCol}" stroke-width="4.2" fill="none" stroke-linecap="round"/>
      <path d="M190 180 Q200 158 210 140" stroke="${trunkCol}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M30 140 Q38 118 45 95" stroke="${trunkCol}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M70 128 Q78 105 85 80" stroke="${trunkCol}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M120 120 Q120 95 120 68" stroke="${trunkCol}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M170 128 Q162 105 155 80" stroke="${trunkCol}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M210 140 Q202 118 195 95" stroke="${trunkCol}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M85 80 Q75 62 65 45" stroke="${trunkCol}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M120 68 Q110 48 100 30" stroke="${trunkCol}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M120 68 Q130 48 140 30" stroke="${trunkCol}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M155 80 Q165 62 175 45" stroke="${trunkCol}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M100 30 Q95 18 90 10" stroke="${trunkCol}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M140 30 Q145 18 150 10" stroke="${trunkCol}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      ${leaves}
      ${flowers}
      ${overflowBadge}
    </svg>`;
  }
  function renderTreeCard(s){
    const li = levelInfo(s.total_kg);
    document.getElementById('tree-emoji').textContent = li.emoji;
    document.getElementById('tree-level').textContent = I18N[LANG]['tree.level'](li.level);
    document.getElementById('tree-title').textContent = li.title;
    document.getElementById('tree-desc').textContent = li.desc;
    const bloomCount = Math.floor(s.total_kg/500);
    document.getElementById('tree-svg-wrap').innerHTML = magnoliaSVG(bloomCount);
    const remainder = 500 - (s.total_kg % 500);
    const flowersLine = I18N[LANG]['tree.flowers'](bloomCount);
    const nextLine = I18N[LANG]['tree.next'](Math.round(remainder));
    document.getElementById('tree-count').textContent = flowersLine + ' · ' + nextLine;
  }

  // ---- tabs ----
  const tabs = document.querySelectorAll('nav.tabs button');
  const views = { home: document.getElementById('view-home'), account: document.getElementById('view-account'), order: document.getElementById('view-order') };
  function showView(name){
    tabs.forEach(b=>b.classList.toggle('active', b.dataset.view===name));
    Object.entries(views).forEach(([k,el])=>el.classList.toggle('active', k===name));
  }
  tabs.forEach(b=>b.addEventListener('click', ()=>showView(b.dataset.view)));

  // ---- lang switch ----
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.addEventListener('click', ()=>{
      LANG = b.dataset.lang;
      applyStaticI18n();
      renderTop5();
      updateGameHint();
      updateR1UI();
      updateGameRoundNote();
      if(currentSupplier) renderAccount(currentSupplier);
    });
  });

  // ---- login / account ----
  let currentSupplier = null;
  const codeMap = {}; D.suppliers.forEach(s=>codeMap[s.code]=s);
  codeMap[DEMO_ACCOUNT.code] = DEMO_ACCOUNT;
  document.getElementById('demo-code').textContent = DEMO_ACCOUNT.code;

  function nameOf(s){ return s.isDemo ? s.name[LANG] : s.name; }
  function addrOf(s){ return s.isDemo ? (s.address[LANG]||'') : (s.address||''); }

  function renderAccount(s){
    currentSupplier = s;
    document.getElementById('login-box').style.display='none';
    document.getElementById('acc-dashboard').style.display='block';
    document.getElementById('acc-name').textContent = nameOf(s);
    document.getElementById('acc-meta').textContent = 'ID: '+s.code+(s.phone? ' · 📞 '+formatPhone(s.phone):'');
    document.getElementById('acc-kg').textContent = fmtKg(s.total_kg);
    document.getElementById('acc-sum').textContent = fmt(s.total_sum);
    document.getElementById('acc-paid').textContent = fmt(s.total_paid);
    renderTreeCard(s);
    document.getElementById('acc-count').textContent = s.entries + (LANG==='uz' ? " ta topshiriq" : " записей");
    const tbody = document.querySelector('#acc-history tbody');
    tbody.innerHTML = s.history.slice().reverse().map((h,idx)=>`
      <tr>
        <td>${h.date || '—'}</td>
        <td>${fmt(h.kg)}</td>
        <td>${fmt(h.sum)}</td>
        <td><span class="status-pill">${t('status.paid')}</span></td>
        <td><button class="icon-btn" data-photo-idx="${idx}" style="${h.photo?'border-color:var(--red);color:var(--red);':''}">${h.photo ? '📷 ✓' : t('photo.btn')}</button></td>
        <td><button class="icon-btn" data-receipt-idx="${idx}" style="${h.receipt?'border-color:var(--red);color:var(--red);':(h.note?'border-color:var(--sky);color:var(--sky);':'')}">${h.receipt ? '🧾 ✓' : (h.note ? 'ℹ️' : t('receipt.btn'))}</button></td>
      </tr>`).join('');
    tbody.querySelectorAll('[data-photo-idx]').forEach(btn=>{
      btn.addEventListener('click', ()=> openPhotoModal(s, s.history.slice().reverse()[+btn.dataset.photoIdx]));
    });
    tbody.querySelectorAll('[data-receipt-idx]').forEach(btn=>{
      btn.addEventListener('click', ()=> openReceiptModal(s, s.history.slice().reverse()[+btn.dataset.receiptIdx]));
    });
  }

  document.getElementById('login-btn').addEventListener('click', doLogin);
  document.getElementById('code-input').addEventListener('keydown', e=>{ if(e.key==='Enter') doLogin(); });
  function doLogin(){
    const code = document.getElementById('code-input').value.trim();
    const s = codeMap[code];
    const err = document.getElementById('login-err');
    if(!s){ err.textContent = LANG==='uz' ? "Bunday kod topilmadi. Qaytadan tekshiring." : "Такой код не найден. Проверьте ещё раз."; return; }
    err.textContent='';
    renderAccount(s);
  }
  document.getElementById('logout-btn').addEventListener('click', ()=>{
    currentSupplier = null;
    document.getElementById('acc-dashboard').style.display='none';
    document.getElementById('login-box').style.display='block';
    document.getElementById('code-input').value='';
  });
  document.getElementById('acc-order-btn').addEventListener('click', ()=>{
    showView('order');
    if(currentSupplier){
      document.getElementById('f-name').value = nameOf(currentSupplier);
      document.getElementById('f-code').value = currentSupplier.code;
      document.getElementById('f-phone').value = currentSupplier.phone || '';
      document.getElementById('f-address').value = addrOf(currentSupplier);
    }
  });

  // ---- modal: photo & receipt ----
  const BAG_SVG = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="22" width="44" height="30" rx="4" stroke="currentColor" stroke-width="2.5"/>
    <path d="M20 22 L24 10 H40 L44 22" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M14 34 H50 M14 42 H50" stroke="currentColor" stroke-width="2"/>
  </svg>`;
  function openModal(html){
    document.getElementById('modal-box').innerHTML = `<button class="modal-close" id="modal-close-btn">✕</button>` + html;
    document.getElementById('modal-overlay').classList.add('open');
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
  }
  function closeModal(){ document.getElementById('modal-overlay').classList.remove('open'); }
  document.getElementById('modal-overlay').addEventListener('click', e=>{ if(e.target.id==='modal-overlay') closeModal(); });

  function openPhotoModal(s, h){
    if(h.photo){
      openModal(`
        <h3>${t('photo.title')}</h3>
        <img src="${h.photo}" style="width:100%;border-radius:14px;display:block;">
        <div style="margin-top:10px;text-align:center;color:var(--ink-soft);font-size:12.5px;">${h.date||''} · ${fmt(h.kg)} kg</div>
      `);
      return;
    }
    const cap = s.hasPhoto ? t('photo.demoCap') : t('photo.realCap');
    openModal(`
      <h3>${t('photo.title')}</h3>
      <div class="photo-placeholder">${BAG_SVG}<div class="cap">${esc(cap)}</div></div>
      <div style="margin-top:10px;text-align:center;color:var(--ink-soft);font-size:12.5px;">${h.date||''} · ${fmt(h.kg)} kg</div>
    `);
  }

  function openReceiptModal(s, h){
    if(h.receipt){
      openModal(`
        <h3>${t('receipt.title')}</h3>
        <img src="${h.receipt}" style="width:100%;border-radius:14px;display:block;">
        <div style="margin-top:10px;text-align:center;color:var(--ink-soft);font-size:12.5px;">${h.date||''} · ${fmt(h.sum)} so'm</div>
      `);
      return;
    }
    if(h.note){
      openModal(`
        <h3>${t('receipt.title')}</h3>
        <div class="photo-placeholder">
          <div style="font-size:34px;">ℹ️</div>
          <div class="cap">${esc(h.note)}</div>
        </div>
        <div style="margin-top:10px;text-align:center;color:var(--ink-soft);font-size:12.5px;">${h.date||''} · ${fmt(h.kg)} kg</div>
      `);
      return;
    }
    openModal(`
      <h3>${t('receipt.title')}</h3>
      <div id="receipt-slot">
        <div class="photo-placeholder" id="receipt-empty">
          <div style="font-size:34px;">🧾</div>
          <div class="cap">${esc(t('receipt.empty'))}</div>
        </div>
      </div>
      <div style="margin-top:10px;text-align:center;color:var(--ink-soft);font-size:12.5px;">${h.date||''} · ${fmt(h.sum)} so'm</div>
      <label class="btn ghost" style="margin-top:14px;display:flex;">
        📎 ${t('receipt.attachBtn')}
        <input type="file" id="receipt-file-input" accept="image/*" style="display:none;">
      </label>
      <div style="margin-top:10px;font-size:11.5px;color:var(--ink-soft);text-align:center;">${esc(t('receipt.attachNote'))}</div>
    `);
    document.getElementById('receipt-file-input').addEventListener('change', function(){
      const file = this.files && this.files[0];
      if(!file) return;
      const url = URL.createObjectURL(file);
      document.getElementById('receipt-slot').innerHTML = `<img src="${url}" style="width:100%;border-radius:14px;display:block;">`;
    });
  }

  // ---- geolocation ----
  document.getElementById('loc-btn').addEventListener('click', ()=>{
    const input = document.getElementById('f-location');
    if(!navigator.geolocation){ input.value = LANG==='uz' ? "Brauzer qo'llamaydi" : "Браузер не поддерживает"; return; }
    input.value = LANG==='uz' ? "Aniqlanmoqda..." : "Определяется...";
    navigator.geolocation.getCurrentPosition(
      pos=>{ input.value = pos.coords.latitude.toFixed(5)+', '+pos.coords.longitude.toFixed(5); },
      ()=>{ input.value = LANG==='uz' ? "Ruxsat berilmadi" : "Доступ не разрешён"; }
    );
  });

  // ---- notification config ----
  // Telegram: create a bot via @BotFather, get the token, then message your bot once
  // and open https://api.telegram.org/bot<TOKEN>/getUpdates to find your chat id.
  // Fill both values below and republish to enable Telegram notifications.
  const NOTIFY_CONFIG = {
    telegramBotToken: '8894204455:AAFSfVEY1ZgV5lJ6Xlj4wTj2vpkMSJe5lvg',
    telegramChatId: '2763817'
  };

  function sendToNetlify(fields){
    const body = new URLSearchParams({ 'form-name':'fomeks-order', ...fields }).toString();
    return fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body })
      .catch(()=>{});
  }
  function sendToTelegram(fields){
    if(!NOTIFY_CONFIG.telegramBotToken || !NOTIFY_CONFIG.telegramChatId) return Promise.resolve();
    const text = "🚛 Yangi buyurtma!\n"
      + "Ism: " + fields.name + "\n"
      + "Kod: " + (fields.code || '-') + "\n"
      + "Telefon: " + fields.phone + "\n"
      + "Miqdor: " + fields.kg + " kg\n"
      + "Manzil: " + fields.address + "\n"
      + "Lokatsiya: " + (fields.location || '-') + "\n"
      + "Karta: " + (fields.card || '-') + "\n"
      + "Karta egasi: " + (fields.cardname || '-') + "\n"
      + "Izoh: " + (fields.note || '-');
    const url = "https://api.telegram.org/bot" + NOTIFY_CONFIG.telegramBotToken + "/sendMessage";
    return fetch(url, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ chat_id: NOTIFY_CONFIG.telegramChatId, text })
    }).catch(()=>{});
  }

  // ---- order form ----
  document.getElementById('order-form').addEventListener('submit', function(e){
    e.preventDefault();
    const fields = {
      name: document.getElementById('f-name').value,
      code: document.getElementById('f-code').value,
      phone: document.getElementById('f-phone').value,
      kg: document.getElementById('f-kg').value,
      address: document.getElementById('f-address').value,
      location: document.getElementById('f-location').value,
      card: document.getElementById('f-card').value,
      cardname: document.getElementById('f-cardname').value,
      note: document.getElementById('f-note').value
    };
    Promise.all([ sendToNetlify(fields), sendToTelegram(fields) ]).finally(()=>{
      document.getElementById('success-text').textContent = I18N[LANG]['success.msg'](fields.name);
      this.style.display='none';
      document.getElementById('order-success').style.display='block';
    });
  });
  document.getElementById('order-again-btn').addEventListener('click', ()=>{
    document.getElementById('order-success').style.display='none';
    document.getElementById('order-form').reset();
    document.getElementById('order-form').style.display='block';
  });

  // ---- mini game: water the tree ----
  const GAME_MAX = FLOWER_SLOTS.length;
  let gameWater = 0, gameCanTaken = false;
  try {
    gameWater = parseInt(localStorage.getItem('fomeks_game_water') || '0', 10) || 0;
    gameCanTaken = gameWater > 0;
  } catch(e){}

  function saveGameState(){
    try { localStorage.setItem('fomeks_game_water', String(gameWater)); } catch(e){}
  }
  function renderGameTree(){
    document.getElementById('game-tree-wrap').innerHTML = magnoliaSVG(gameWater);
  }
  function updateGameHint(){
    const hintEl = document.getElementById('game-hint');
    if(gameWater >= GAME_MAX) hintEl.textContent = t('game.hintDone');
    else if(gameCanTaken) hintEl.textContent = t('game.hintPour');
    else hintEl.textContent = t('game.hintStart');
  }
  function spawnDrop(){
    const can = document.getElementById('game-can');
    const rect = can.getBoundingClientRect();
    const d = document.createElement('div');
    d.className = 'g-drop';
    d.textContent = '💧';
    d.style.left = (rect.left + rect.width/2 - 8) + 'px';
    d.style.top = (rect.top + rect.height*0.7) + 'px';
    document.getElementById('game-particles').appendChild(d);
    setTimeout(()=>d.remove(), 650);
  }
  function petalBurst(){
    const card = document.getElementById('game-card');
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width/2, cy = rect.top + rect.height*0.35;
    const emojis = ['🌸','🌺','🌷','✨','💮'];
    const container = document.getElementById('game-particles');
    const vw = window.innerWidth, vh = window.innerHeight;
    for(let i=0;i<70;i++){
      const el = document.createElement('div');
      el.className = 'g-petal';
      el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      const ex = (Math.random()-0.5) * vw * 1.3;
      const ey = (Math.random()) * vh * 1.1 - vh*0.15;
      el.style.left = cx + 'px';
      el.style.top = cy + 'px';
      el.style.setProperty('--end', `translate(${ex}px, ${ey}px)`);
      el.style.setProperty('--spin', (Math.random()*720-360)+'deg');
      el.style.animation = `petal-burst ${1.2+Math.random()*0.8}s ease-out ${Math.random()*0.15}s forwards`;
      container.appendChild(el);
      setTimeout(()=>el.remove(), 2400);
    }
  }
  function initGame(){
    renderGameTree();
    updateGameHint();
    const can = document.getElementById('game-can');
    const resetBtn = document.getElementById('game-reset-btn');
    if(gameWater >= GAME_MAX) resetBtn.style.display = 'inline-flex';
    if(gameCanTaken) can.classList.add('active');
    can.addEventListener('click', ()=>{
      if(!gameCanTaken){
        gameCanTaken = true;
        can.classList.add('active');
        updateGameHint();
        return;
      }
      if(gameWater >= GAME_MAX) return;
      gameWater++;
      saveGameState();
      renderGameTree();
      spawnDrop();
      updateGameHint();
      if(gameWater >= GAME_MAX){
        can.classList.remove('active');
        setTimeout(petalBurst, 200);
        resetBtn.style.display = 'inline-flex';
      }
    });
    resetBtn.addEventListener('click', ()=>{
      gameWater = 0; gameCanTaken = false;
      saveGameState();
      renderGameTree();
      updateGameHint();
      can.classList.remove('active');
      resetBtn.style.display = 'none';
    });
  }

  // ---- mini game round 1: recycling for money ----
  let r1Count = 0, r1Done = false;
  try {
    r1Done = localStorage.getItem('fomeks_game_round1_done') === '1';
    r1Count = r1Done ? R1_MAX_SAFE() : (parseInt(localStorage.getItem('fomeks_game_r1count')||'0',10)||0);
  } catch(e){}
  function R1_MAX_SAFE(){ return 6; }
  const R1_MAX = 6, R1_PER_BAG = 45000;

  function updateGameRoundNote(){
    const note = document.getElementById('game-round-note');
    note.textContent = (document.getElementById('round1-wrap').style.display!=='none') ? t('game.round1') : t('game.round2');
  }

  function spawnCoins(originEl){
    const rect = originEl.getBoundingClientRect();
    const container = document.getElementById('game-particles');
    for(let i=0;i<8;i++){
      const el = document.createElement('div');
      el.className = 'g-coin';
      el.textContent = '💰';
      el.style.left = (rect.left + rect.width/2) + 'px';
      el.style.top = (rect.top + rect.height/2) + 'px';
      el.style.setProperty('--cx', ((Math.random()-0.5)*120)+'px');
      el.style.setProperty('--cy', (-40-Math.random()*60)+'px');
      container.appendChild(el);
      setTimeout(()=>el.remove(), 800);
    }
  }

  function updateR1UI(){
    document.getElementById('r1-bags').textContent = '🧺'.repeat(Math.max(0, R1_MAX - r1Count)) || '—';
    document.getElementById('r1-money-total').textContent = fmt(r1Count*R1_PER_BAG) + " so'm";
    const hint = document.getElementById('r1-hint');
    const btn = document.getElementById('r1-btn');
    if(r1Count >= R1_MAX){
      hint.textContent = t('game.r1hintDone');
      btn.textContent = t('game.r1next');
    } else if(r1Count > 0){
      hint.textContent = t('game.r1hintGo');
      btn.textContent = t('game.r1btn');
    } else {
      hint.textContent = t('game.r1hintStart');
      btn.textContent = t('game.r1btn');
    }
  }

  function startRound2(){
    document.getElementById('round1-wrap').style.display = 'none';
    document.getElementById('round2-wrap').style.display = 'block';
    updateGameRoundNote();
    initGame();
  }

  function initRound1(){
    updateR1UI();
    updateGameRoundNote();
    document.getElementById('r1-btn').addEventListener('click', function(){
      if(r1Count >= R1_MAX){
        try{ localStorage.setItem('fomeks_game_round1_done','1'); }catch(e){}
        startRound2();
        return;
      }
      r1Count++;
      try{ localStorage.setItem('fomeks_game_r1count', String(r1Count)); }catch(e){}
      const machine = document.getElementById('r1-machine');
      machine.classList.remove('spin'); void machine.offsetWidth; machine.classList.add('spin');
      spawnCoins(document.getElementById('r1-money-total'));
      updateR1UI();
    });
  }

  // ---- init ----
  applyStaticI18n();
  renderStats();
  renderTop5();
  renderChart();
  if(r1Done){
    document.getElementById('round1-wrap').style.display = 'none';
    document.getElementById('round2-wrap').style.display = 'block';
    updateGameRoundNote();
    initGame();
  } else {
    initRound1();
  }
})();
