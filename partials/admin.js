export default `
  <div class="aurora"><span class="b1"></span><span class="b2"></span><span class="b3"></span></div>
  <div class="side-backdrop"></div>

  <div class="app">
    <!-- ============ SIDEBAR ============ -->
    <aside class="app-side scroll-thin">
      <a href="/trading-course-landing/" class="flex items-center gap-2 px-2 py-2 mb-1">
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-ink font-display font-extrabold text-lg">M</span>
        <span class="font-display font-extrabold text-lg text-white">Mind<span class="text-accent">Trade</span></span>
      </a>
      <div class="px-2 mb-3"><span class="badge badge-blue"><i class="fa-solid fa-shield-halved"></i> Админ-панель · демо</span></div>

      <nav class="flex flex-col gap-1 flex-1">
        <button class="nav-item active" data-view="dashboard"><i class="fa-solid fa-gauge-high"></i> Дашборд</button>
        <button class="nav-item" data-view="students"><i class="fa-solid fa-users"></i> Ученики</button>
        <button class="nav-item" data-view="leads"><i class="fa-solid fa-inbox"></i> Заявки <span id="leadBadge" class="badge badge-accent ml-auto">3</span></button>
        <button class="nav-item" data-view="content"><i class="fa-solid fa-layer-group"></i> Контент</button>
        <button class="nav-item" data-view="payments"><i class="fa-solid fa-credit-card"></i> Платежи</button>
        <button class="nav-item" data-view="server"><i class="fa-solid fa-server"></i> Сервер</button>
        <button class="nav-item" data-view="analytics"><i class="fa-solid fa-chart-pie"></i> Аналитика</button>
        <button class="nav-item" data-view="settings"><i class="fa-solid fa-gear"></i> Настройки</button>
      </nav>

      <a href="/trading-course-landing/" class="nav-item mt-2 text-slate-400"><i class="fa-solid fa-arrow-up-right-from-square"></i> На сайт</a>
      <a href="/trading-course-landing/login/" class="nav-item text-slate-400"><i class="fa-solid fa-right-from-bracket"></i> Выйти</a>
      <div class="px-3 pt-3 text-[11px] text-slate-600 flex flex-wrap gap-x-3 gap-y-1">
        <a href="/trading-course-landing/privacy/" class="hover:text-accent">Конфиденциальность</a>
        <a href="/trading-course-landing/cookie/" class="hover:text-accent">Cookie</a>
      </div>
    </aside>

    <!-- ============ MAIN ============ -->
    <div class="app-main">
      <header class="app-top">
        <button class="btn btn-ghost btn-sm lg:hidden" data-drawer-toggle><i class="fa-solid fa-bars"></i></button>
        <h1 id="page-title" class="font-display font-bold text-lg text-white">Дашборд</h1>
        <div class="hidden md:flex items-center gap-2 ml-4 flex-1 max-w-sm">
          <div class="relative w-full">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input class="input" style="padding-left:2.2rem;" placeholder="Поиск по ученикам, заявкам…" onkeydown="if(event.key==='Enter'){toast('Демо-поиск по CRM','info')}" />
          </div>
        </div>
        <div class="ml-auto flex items-center gap-2">
          <div class="dropdown">
            <button class="btn btn-ghost btn-sm relative" data-dropdown><i class="fa-regular fa-bell"></i><span class="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent"></span></button>
            <div class="dropdown-menu">
              <div class="px-3 py-2 text-xs text-slate-400 border-b border-white/10">Уведомления</div>
              <div class="dropdown-item"><i class="fa-solid fa-inbox text-accent"></i><div><div class="text-white text-sm">Новая заявка</div><div class="text-xs text-slate-500">Игорь · формат «Личный»</div></div></div>
              <div class="dropdown-item"><i class="fa-solid fa-money-bill-wave text-emerald-400"></i><div><div class="text-white text-sm">Оплата $2000</div><div class="text-xs text-slate-500">Личный · 5 мин назад</div></div></div>
              <div class="dropdown-item"><i class="fa-solid fa-server text-accent2"></i><div><div class="text-white text-sm">+1 подписка на сервер</div><div class="text-xs text-slate-500">годовая · $500</div></div></div>
            </div>
          </div>
          <div class="dropdown">
            <button class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5" data-dropdown>
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent2/50 to-accent/40 text-white font-semibold text-sm">A</span>
              <i class="fa-solid fa-chevron-down text-xs text-slate-400"></i>
            </button>
            <div class="dropdown-menu">
              <div class="px-3 py-2 text-xs text-slate-400 border-b border-white/10">Администратор</div>
              <div class="dropdown-item" data-view-link="settings"><i class="fa-solid fa-gear"></i> Настройки</div>
              <a href="/trading-course-landing/login/" class="dropdown-item"><i class="fa-solid fa-right-from-bracket"></i> Выйти</a>
            </div>
          </div>
        </div>
      </header>

      <div class="p-5 sm:p-7 max-w-7xl">

        <!-- ===================== DASHBOARD ===================== -->
        <section class="view active" data-view="dashboard">
          <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div class="card card-hover p-5">
              <div class="flex items-center justify-between"><span class="text-xs text-slate-400">Выручка за месяц</span><i class="fa-solid fa-money-bill-trend-up text-accent"></i></div>
              <div class="text-2xl font-display font-extrabold text-white mt-2">$48 200</div>
              <div class="text-xs text-emerald-400 mt-1"><i class="fa-solid fa-arrow-up"></i> +14% к прошлому</div>
            </div>
            <div class="card card-hover p-5">
              <div class="flex items-center justify-between"><span class="text-xs text-slate-400">Активные ученики</span><i class="fa-solid fa-users text-accent"></i></div>
              <div class="text-2xl font-display font-extrabold text-white mt-2">87</div>
              <div class="text-xs text-emerald-400 mt-1"><i class="fa-solid fa-arrow-up"></i> +9 за неделю</div>
            </div>
            <div class="card card-hover p-5">
              <div class="flex items-center justify-between"><span class="text-xs text-slate-400">Новые заявки (7 дн)</span><i class="fa-solid fa-inbox text-accent"></i></div>
              <div class="text-2xl font-display font-extrabold text-white mt-2">23</div>
              <div class="text-xs text-slate-400 mt-1">конверсия в оплату 18%</div>
            </div>
            <div class="card card-hover p-5">
              <div class="flex items-center justify-between"><span class="text-xs text-slate-400">Подписки на сервер</span><i class="fa-solid fa-server text-accent"></i></div>
              <div class="text-2xl font-display font-extrabold text-white mt-2">134</div>
              <div class="text-xs text-slate-400 mt-1">MRR ≈ $9 800</div>
            </div>
          </div>

          <div class="grid lg:grid-cols-3 gap-4 mt-4">
            <div class="lg:col-span-2 card p-5">
              <div class="flex items-center justify-between mb-3"><h3 class="font-display font-bold text-white">Выручка, последние 30 дней</h3><span class="text-xs font-mono text-emerald-400">$48 200</span></div>
              <canvas id="admRevenue" height="220" style="height:220px" class="w-full rounded-lg bg-black/20"></canvas>
            </div>
            <div class="card p-5">
              <h3 class="font-display font-bold text-white mb-4">Выручка по форматам</h3>
              <div id="revByFormat" class="space-y-4"></div>
            </div>
          </div>

          <div class="grid lg:grid-cols-2 gap-4 mt-4">
            <div class="card p-5">
              <div class="flex items-center justify-between mb-3"><h3 class="font-display font-bold text-white">Последние заявки</h3><button class="btn btn-ghost btn-sm" data-view-link="leads">Все →</button></div>
              <div id="dashLeads" class="space-y-2"></div>
            </div>
            <div class="card p-5">
              <h3 class="font-display font-bold text-white mb-3">Воронка</h3>
              <div class="space-y-3">
                <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">Визиты</span><span class="text-white">12 400</span></div><div class="progress"><i style="width:100%"></i></div></div>
                <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">Заявки</span><span class="text-white">128</span></div><div class="progress"><i style="width:42%"></i></div></div>
                <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">Оплаты</span><span class="text-white">23</span></div><div class="progress"><i style="width:18%"></i></div></div>
                <div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">Апселл на сервер</span><span class="text-white">14</span></div><div class="progress"><i style="width:11%"></i></div></div>
              </div>
            </div>
          </div>
        </section>

        <!-- ===================== STUDENTS ===================== -->
        <section class="view" data-view="students">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div class="flex gap-2 flex-wrap">
              <button class="chip active" data-sf="all" onclick="filterStudents('all',this)">Все</button>
              <button class="chip" data-sf="Групповой" onclick="filterStudents('Групповой',this)">Групповой</button>
              <button class="chip" data-sf="Личный" onclick="filterStudents('Личный',this)">Личный</button>
              <button class="chip" data-sf="Менторство" onclick="filterStudents('Менторство',this)">Менторство</button>
            </div>
            <div class="flex gap-2">
              <input id="studentSearch" class="input" style="max-width:220px" placeholder="Поиск по имени/email" oninput="renderStudents()" />
              <button class="btn btn-primary btn-sm" data-toast="Демо: добавление ученика вручную"><i class="fa-solid fa-plus"></i> Добавить</button>
            </div>
          </div>
          <div class="card overflow-hidden"><div class="overflow-x-auto scroll-thin"><table class="tbl min-w-[820px]">
            <thead><tr><th>Ученик</th><th>Формат</th><th>Прогресс</th><th>Винрейт</th><th>Сервер</th><th>Статус</th><th></th></tr></thead>
            <tbody id="studentsRows"></tbody>
          </table></div></div>
        </section>

        <!-- ===================== LEADS ===================== -->
        <section class="view" data-view="leads">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div class="flex gap-2 flex-wrap">
              <button class="chip active" data-lf="all" onclick="filterLeads('all',this)">Все</button>
              <button class="chip" data-lf="Новая" onclick="filterLeads('Новая',this)">Новые</button>
              <button class="chip" data-lf="В работе" onclick="filterLeads('В работе',this)">В работе</button>
              <button class="chip" data-lf="Закрыта" onclick="filterLeads('Закрыта',this)">Закрытые</button>
            </div>
            <button class="btn btn-outline btn-sm" onclick="exportLeads()"><i class="fa-solid fa-file-export"></i> Экспорт</button>
          </div>
          <div class="card overflow-hidden"><div class="overflow-x-auto scroll-thin"><table class="tbl min-w-[820px]">
            <thead><tr><th>Имя</th><th>Контакты</th><th>Интерес</th><th>Источник</th><th>Дата</th><th>Статус</th><th></th></tr></thead>
            <tbody id="leadsRows"></tbody>
          </table></div></div>
        </section>

        <!-- ===================== CONTENT ===================== -->
        <section class="view" data-view="content">
          <div class="flex items-center justify-between mb-4">
            <div><h2 class="font-display font-bold text-xl text-white">Контент курса</h2><p class="text-slate-400 text-sm mt-1">12 блоков · 36 уроков</p></div>
            <button class="btn btn-primary btn-sm" data-modal-open="addLesson"><i class="fa-solid fa-plus"></i> Добавить урок</button>
          </div>
          <div id="contentList" class="space-y-3"></div>
        </section>

        <!-- ===================== PAYMENTS ===================== -->
        <section class="view" data-view="payments">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <div class="surface p-4"><div class="text-xs text-slate-400">Выручка (мес)</div><div class="text-xl font-display font-bold text-white">$48 200</div></div>
            <div class="surface p-4"><div class="text-xs text-slate-400">Средний чек</div><div class="text-xl font-display font-bold text-white">$2 095</div></div>
            <div class="surface p-4"><div class="text-xs text-slate-400">Возвраты</div><div class="text-xl font-display font-bold text-white">$0</div></div>
            <div class="surface p-4"><div class="text-xs text-slate-400">MRR сервера</div><div class="text-xl font-display font-bold text-emerald-400">$9 800</div></div>
          </div>
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-display font-bold text-white">Транзакции</h3>
            <button class="btn btn-outline btn-sm" onclick="exportPayments()"><i class="fa-solid fa-file-export"></i> Экспорт</button>
          </div>
          <div class="card overflow-hidden"><div class="overflow-x-auto scroll-thin"><table class="tbl min-w-[760px]">
            <thead><tr><th>Дата</th><th>Клиент</th><th>Продукт</th><th>Сумма</th><th>Метод</th><th>Статус</th></tr></thead>
            <tbody id="payRows"></tbody>
          </table></div></div>
        </section>

        <!-- ===================== SERVER ===================== -->
        <section class="view" data-view="server">
          <div class="grid sm:grid-cols-3 gap-4 mb-5">
            <div class="card card-hover p-5"><div class="text-xs text-slate-400">Активных подписок</div><div class="text-2xl font-display font-extrabold text-white mt-1">134</div></div>
            <div class="card card-hover p-5"><div class="text-xs text-slate-400">MRR сервера</div><div class="text-2xl font-display font-extrabold gradient-text mt-1">$9 800</div></div>
            <div class="card card-hover p-5"><div class="text-xs text-slate-400">Отток (мес)</div><div class="text-2xl font-display font-extrabold text-white mt-1">3.2%</div></div>
          </div>
          <div class="grid lg:grid-cols-2 gap-4">
            <div class="card p-5">
              <h3 class="font-display font-bold text-white mb-3">Опубликовать обзор</h3>
              <form onsubmit="return postReview(event)" class="space-y-3">
                <select class="select"><option>Ежедневный обзор рынка</option><option>Макрообзор (раз в 2 недели)</option><option>Еженедельный обзор</option><option>Анонс</option></select>
                <textarea class="textarea" rows="4" placeholder="Текст обзора для сервера Secret Trading…" required></textarea>
                <div class="flex gap-2">
                  <button type="submit" class="btn btn-primary btn-sm"><i class="fa-solid fa-paper-plane"></i> Опубликовать</button>
                  <button type="button" class="btn btn-outline btn-sm" data-toast="Демо: запланировано на завтра 09:00">Запланировать</button>
                </div>
              </form>
            </div>
            <div class="card p-5">
              <div class="flex items-center justify-between mb-3"><h3 class="font-display font-bold text-white">Соревнования</h3><button class="btn btn-primary btn-sm" data-toast="Демо: создание соревнования"><i class="fa-solid fa-plus"></i> Создать</button></div>
              <div class="space-y-2">
                <div class="surface p-3 flex items-center justify-between"><div><div class="text-white text-sm font-medium">Лучший R за июнь</div><div class="text-xs text-slate-500">приз: $500 + проп-счёт · 64 участника</div></div><button class="btn btn-outline btn-sm" data-toast="Демо: подвести итоги">Итоги</button></div>
                <div class="surface p-3 flex items-center justify-between"><div><div class="text-white text-sm font-medium">Дисциплина недели</div><div class="text-xs text-slate-500">приз: подписка навсегда · 41 участник</div></div><button class="btn btn-outline btn-sm" data-toast="Демо: назначить победителя">Победитель</button></div>
              </div>
            </div>
          </div>
        </section>

        <!-- ===================== ANALYTICS ===================== -->
        <section class="view" data-view="analytics">
          <div class="grid lg:grid-cols-3 gap-4">
            <div class="lg:col-span-2 card p-5">
              <h3 class="font-display font-bold text-white mb-3">Трафик и заявки</h3>
              <canvas id="admTraffic" height="220" style="height:220px" class="w-full rounded-lg bg-black/20"></canvas>
            </div>
            <div class="card p-5">
              <h3 class="font-display font-bold text-white mb-4">Источники заявок</h3>
              <div id="sources" class="space-y-4"></div>
            </div>
          </div>
          <div class="grid sm:grid-cols-4 gap-3 mt-4">
            <div class="surface p-4"><div class="text-xs text-slate-400">Конверсия сайта</div><div class="text-xl font-display font-bold text-white">1.0%</div></div>
            <div class="surface p-4"><div class="text-xs text-slate-400">Заявка → оплата</div><div class="text-xl font-display font-bold text-white">18%</div></div>
            <div class="surface p-4"><div class="text-xs text-slate-400">CAC</div><div class="text-xl font-display font-bold text-white">$210</div></div>
            <div class="surface p-4"><div class="text-xs text-slate-400">LTV</div><div class="text-xl font-display font-bold text-emerald-400">$2 640</div></div>
          </div>
        </section>

        <!-- ===================== SETTINGS ===================== -->
        <section class="view" data-view="settings">
          <div class="grid lg:grid-cols-2 gap-4">
            <div class="card p-6">
              <h3 class="font-display font-bold text-white mb-4">Цены форматов</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3"><span class="text-sm text-slate-300 w-28">Групповой</span><input class="input" value="$1000" /></div>
                <div class="flex items-center gap-3"><span class="text-sm text-slate-300 w-28">Личный</span><input class="input" value="$2000" /></div>
                <div class="flex items-center gap-3"><span class="text-sm text-slate-300 w-28">Менторство</span><input class="input" value="$5000" /></div>
              </div>
              <button class="btn btn-primary btn-sm mt-4" data-toast="Цены сохранены (демо)" data-toast-type="success">Сохранить</button>
            </div>
            <div class="card p-6">
              <h3 class="font-display font-bold text-white mb-4">Подписка на сервер</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3"><span class="text-sm text-slate-300 w-28">1 месяц</span><input class="input" value="$100" /></div>
                <div class="flex items-center gap-3"><span class="text-sm text-slate-300 w-28">3 месяца</span><input class="input" value="$200" /></div>
                <div class="flex items-center gap-3"><span class="text-sm text-slate-300 w-28">1 год</span><input class="input" value="$500" /></div>
              </div>
              <button class="btn btn-primary btn-sm mt-4" data-toast="Цены подписки сохранены (демо)" data-toast-type="success">Сохранить</button>
            </div>
            <div class="card p-6">
              <h3 class="font-display font-bold text-white mb-4">Команда</h3>
              <div class="space-y-2 mb-3">
                <div class="surface p-3 flex items-center justify-between"><div class="flex items-center gap-2"><span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent font-semibold text-sm">А</span><div><div class="text-white text-sm">Александр</div><div class="text-xs text-slate-500">Владелец · ментор</div></div></div><span class="badge badge-accent">admin</span></div>
                <div class="surface p-3 flex items-center justify-between"><div class="flex items-center gap-2"><span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent2/20 text-accent2 font-semibold text-sm">К</span><div><div class="text-white text-sm">Куратор</div><div class="text-xs text-slate-500">Проверка ДЗ</div></div></div><span class="badge badge-blue">staff</span></div>
              </div>
              <button class="btn btn-outline btn-sm" data-toast="Демо: приглашение в команду"><i class="fa-solid fa-user-plus"></i> Пригласить</button>
            </div>
            <div class="card p-6">
              <h3 class="font-display font-bold text-white mb-4">Интеграции</h3>
              <div class="space-y-2">
                <div class="surface p-3 flex items-center justify-between"><div class="flex items-center gap-2"><i class="fa-brands fa-stripe text-blue-400 text-xl"></i><span class="text-sm text-white">Платёжный шлюз</span></div><button class="btn btn-outline btn-sm" data-toast="Демо: подключение платёжного шлюза">Подключить</button></div>
                <div class="surface p-3 flex items-center justify-between"><div class="flex items-center gap-2"><i class="fa-solid fa-link text-accent"></i><span class="text-sm text-white">Брокер API (read-only)</span></div><button class="btn btn-outline btn-sm" data-toast="Демо: импорт сделок из брокера в режиме read-only">Подключить</button></div>
                <div class="surface p-3 flex items-center justify-between"><div class="flex items-center gap-2"><i class="fa-brands fa-discord text-indigo-400 text-xl"></i><span class="text-sm text-white">Secret Trading сервер</span></div><span class="badge badge-green">подключён</span></div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>

  <!-- Add lesson modal -->
  <div class="modal" id="addLesson">
    <div class="modal-backdrop"></div>
    <div class="modal-panel">
      <div class="flex items-center justify-between mb-4"><h3 class="font-display font-bold text-lg text-white">Новый урок</h3><button data-modal-close class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button></div>
      <form onsubmit="return addLessonSubmit(event)" class="space-y-3">
        <div><label class="label">Блок</label><select id="al-mod" class="select"></select></div>
        <div><label class="label">Название урока</label><input id="al-title" class="input" placeholder="Например: Разбор паттернов" required /></div>
        <div class="grid grid-cols-2 gap-3"><div><label class="label">Длительность</label><input id="al-dur" class="input" placeholder="14:00" /></div><div><label class="label">Статус</label><select id="al-status" class="select"><option>Черновик</option><option>Опубликован</option></select></div></div>
        <button type="submit" class="btn btn-primary btn-block btn-shine">Создать урок</button>
        <p class="text-[11px] text-slate-500 text-center">Демо: добавится в список до перезагрузки.</p>
      </form>
    </div>
  </div>

  <!-- Student drawer modal -->
  <div class="modal" id="studentModal">
    <div class="modal-backdrop"></div>
    <div class="modal-panel">
      <div class="flex items-center justify-between mb-4"><h3 class="font-display font-bold text-lg text-white">Карточка ученика</h3><button data-modal-close class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button></div>
      <div id="studentBody"></div>
    </div>
  </div>

  <!-- Lead drawer modal -->
  <div class="modal" id="leadModal">
    <div class="modal-backdrop"></div>
    <div class="modal-panel">
      <div class="flex items-center justify-between mb-4"><h3 class="font-display font-bold text-lg text-white">Заявка</h3><button data-modal-close class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button></div>
      <div id="leadBody"></div>
    </div>
  </div>

  <div id="toast-wrap"></div>

  
  
`;
