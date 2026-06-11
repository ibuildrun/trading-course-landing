export default `
  <div class="aurora"><span class="b1"></span><span class="b2"></span><span class="b3"></span></div>
  <div class="side-backdrop"></div>

  <div class="app">
    <!-- ============ SIDEBAR ============ -->
    <aside class="app-side scroll-thin">
      <a href="/trading-course-landing/" class="flex items-center gap-2 px-2 py-2 mb-4">
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-ink font-display font-extrabold text-lg">M</span>
        <span class="font-display font-extrabold text-lg text-white">Mind<span class="text-accent">Trade</span></span>
      </a>

      <div class="flex items-center gap-3 px-2 py-3 mb-3 rounded-xl border border-white/10 bg-white/[0.03]">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-accent2/40 text-white font-semibold">А</span>
        <div class="min-w-0">
          <div class="text-sm font-semibold text-white truncate">Александр</div>
          <div class="text-xs"><span class="badge badge-accent">Личный</span></div>
        </div>
      </div>

      <nav class="flex flex-col gap-1 flex-1">
        <button class="nav-item active" data-view="overview"><i class="fa-solid fa-gauge-high"></i> Обзор</button>
        <button class="nav-item" data-view="courses"><i class="fa-solid fa-graduation-cap"></i> Мои курсы</button>
        <button class="nav-item" data-view="journal"><i class="fa-solid fa-book-open"></i> Дневник сделок</button>
        <button class="nav-item" data-view="achievements"><i class="fa-solid fa-trophy"></i> Достижения</button>
        <button class="nav-item" data-view="community"><i class="fa-brands fa-discord"></i> Сообщество</button>
        <button class="nav-item" data-view="billing"><i class="fa-solid fa-credit-card"></i> Подписка</button>
        <button class="nav-item" data-view="settings"><i class="fa-solid fa-gear"></i> Настройки</button>
      </nav>

      <div class="mt-3 rounded-xl border border-accent/20 bg-accent/[0.06] p-4">
        <div class="text-xs text-slate-300">Доступ к курсу</div>
        <div class="font-display font-bold text-white">Активен до 11.07.2026</div>
        <button class="btn btn-primary btn-sm btn-block mt-3" data-view-link="billing">Продлить</button>
      </div>

      <a href="/trading-course-landing/" class="nav-item mt-2 text-slate-400"><i class="fa-solid fa-right-from-bracket"></i> Выйти</a>
    </aside>

    <!-- ============ MAIN ============ -->
    <div class="app-main">
      <!-- Topbar -->
      <header class="app-top">
        <button class="btn btn-ghost btn-sm lg:hidden" data-drawer-toggle><i class="fa-solid fa-bars"></i></button>
        <h1 id="page-title" class="font-display font-bold text-lg text-white">Обзор</h1>
        <div class="hidden md:flex items-center gap-2 ml-4 flex-1 max-w-sm">
          <div class="relative w-full">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
            <input class="input" style="padding-left:2.2rem;" placeholder="Поиск по урокам…" onkeydown="if(event.key==='Enter'){toast('Демо-поиск: в полной версии ищет по урокам и записям','info')}" />
          </div>
        </div>
        <div class="ml-auto flex items-center gap-2">
          <div class="dropdown">
            <button class="btn btn-ghost btn-sm relative" data-dropdown><i class="fa-regular fa-bell"></i><span class="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent"></span></button>
            <div class="dropdown-menu">
              <div class="px-3 py-2 text-xs text-slate-400 border-b border-white/10">Уведомления</div>
              <div class="dropdown-item"><i class="fa-solid fa-circle-check text-emerald-400"></i><div><div class="text-white text-sm">Урок проверен</div><div class="text-xs text-slate-500">ДЗ по риску — зачтено</div></div></div>
              <div class="dropdown-item"><i class="fa-solid fa-bullhorn text-accent"></i><div><div class="text-white text-sm">Новый вебинар</div><div class="text-xs text-slate-500">в четверг 19:00</div></div></div>
              <div class="dropdown-item"><i class="fa-solid fa-comment text-accent2"></i><div><div class="text-white text-sm">Ответ ментора</div><div class="text-xs text-slate-500">в треде по сделке</div></div></div>
            </div>
          </div>
          <div class="dropdown">
            <button class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5" data-dropdown>
              <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-accent2/40 text-white font-semibold text-sm">А</span>
              <i class="fa-solid fa-chevron-down text-xs text-slate-400"></i>
            </button>
            <div class="dropdown-menu">
              <div class="dropdown-item" data-view-link="settings"><i class="fa-solid fa-user"></i> Профиль</div>
              <div class="dropdown-item" data-view-link="billing"><i class="fa-solid fa-credit-card"></i> Подписка</div>
              <a href="/trading-course-landing/" class="dropdown-item"><i class="fa-solid fa-right-from-bracket"></i> Выйти</a>
            </div>
          </div>
        </div>
      </header>

      <div class="p-5 sm:p-7 max-w-7xl">

        <!-- ===================== OVERVIEW ===================== -->
        <section class="view active" data-view="overview">
          <div class="mb-6">
            <h2 class="font-display font-extrabold text-2xl sm:text-3xl text-white">Привет, Александр 👋</h2>
            <p class="text-slate-400 mt-1">Так держать — ты на 45% пути. Сегодня хороший день, чтобы продолжить.</p>
          </div>

          <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div class="card card-hover p-5 flex items-center gap-4">
              <svg viewBox="0 0 80 80" class="h-16 w-16 -rotate-90 shrink-0">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(148,163,184,0.18)" stroke-width="8"/>
                <circle id="ovRing" class="ring-fg" cx="40" cy="40" r="34" fill="none" stroke="#2DD4BF" stroke-width="8" stroke-linecap="round" stroke-dasharray="213.6" stroke-dashoffset="213.6"/>
              </svg>
              <div><div class="text-2xl font-display font-extrabold text-white"><span id="ovPct">0</span>%</div><div class="text-xs text-slate-400">Прогресс курса</div></div>
            </div>
            <div class="card card-hover p-5">
              <div class="flex items-center justify-between"><span class="text-xs text-slate-400">Уроки пройдены</span><i class="fa-solid fa-graduation-cap text-accent"></i></div>
              <div class="text-2xl font-display font-extrabold text-white mt-2">15 <span class="text-slate-500 text-base">/ 36</span></div>
              <div class="progress mt-3"><i data-w="42%"></i></div>
            </div>
            <div class="card card-hover p-5">
              <div class="flex items-center justify-between"><span class="text-xs text-slate-400">Дисциплина</span><i class="fa-solid fa-shield-halved text-accent"></i></div>
              <div class="text-2xl font-display font-extrabold text-white mt-2">92%</div>
              <div class="progress mt-3"><i data-w="92%"></i></div>
            </div>
            <div class="card card-hover p-5">
              <div class="flex items-center justify-between"><span class="text-xs text-slate-400">Серия дней</span><i class="fa-solid fa-fire text-orange-400"></i></div>
              <div class="text-2xl font-display font-extrabold text-white mt-2">14 <span class="text-slate-500 text-base">дней</span></div>
              <div class="text-xs text-slate-500 mt-3">Без пропусков дневника</div>
            </div>
          </div>

          <div class="grid lg:grid-cols-3 gap-4 mt-4">
            <div class="lg:col-span-2 card p-5 relative overflow-hidden">
              <div class="absolute inset-0 grid-bg opacity-30"></div>
              <div class="relative">
                <span class="badge badge-accent mb-3">Продолжить обучение</span>
                <h3 class="font-display font-bold text-xl text-white">Блок 6 · Свинг-трейдинг</h3>
                <p class="text-slate-400 text-sm mt-1">Урок 2 из 3 — «Разбор на примерах». Осталось ~18 минут.</p>
                <div class="progress mt-4 max-w-md"><i data-w="40%"></i></div>
                <button class="btn btn-primary mt-5 btn-shine" onclick="openLesson(5,1)"><i class="fa-solid fa-play"></i> Продолжить урок</button>
              </div>
            </div>
            <div class="card p-5">
              <h3 class="font-display font-bold text-white mb-3">Последняя активность</h3>
              <ul class="space-y-3 text-sm">
                <li class="flex gap-3"><i class="fa-solid fa-circle-check text-emerald-400 mt-0.5"></i><div><div class="text-slate-200">Завершён урок «Тренды»</div><div class="text-xs text-slate-500">2 часа назад</div></div></li>
                <li class="flex gap-3"><i class="fa-solid fa-pen-to-square text-accent mt-0.5"></i><div><div class="text-slate-200">Сделка EUR/USD +3R в дневник</div><div class="text-xs text-slate-500">вчера</div></div></li>
                <li class="flex gap-3"><i class="fa-solid fa-trophy text-yellow-400 mt-0.5"></i><div><div class="text-slate-200">Достижение «Дневник 20+»</div><div class="text-xs text-slate-500">3 дня назад</div></div></li>
              </ul>
            </div>
          </div>

          <div class="grid lg:grid-cols-3 gap-4 mt-4">
            <div class="lg:col-span-2 card p-5">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-display font-bold text-white">Кривая капитала <span class="text-xs text-slate-500 font-normal">/ из дневника</span></h3>
                <span class="text-xs font-mono text-emerald-400">+18.4% <span class="text-slate-500">демо</span></span>
              </div>
              <canvas id="ovEquity" height="200" class="w-full rounded-lg bg-black/20"></canvas>
              <p class="text-[11px] text-slate-500 mt-2">Демо-данные. Прошлые результаты не гарантируют будущей доходности.</p>
            </div>
            <div class="card p-5">
              <h3 class="font-display font-bold text-white mb-3">Ближайшее</h3>
              <div class="space-y-3">
                <div class="surface p-3 flex items-center gap-3"><i class="fa-solid fa-video text-accent"></i><div><div class="text-sm text-white">Вебинар: разбор сделок</div><div class="text-xs text-slate-500">чт, 19:00</div></div></div>
                <div class="surface p-3 flex items-center gap-3"><i class="fa-solid fa-user-clock text-accent2"></i><div><div class="text-sm text-white">Личная сессия с ментором</div><div class="text-xs text-slate-500">пн, 15:00</div></div></div>
                <div class="surface p-3 flex items-center gap-3"><i class="fa-solid fa-clipboard-list text-yellow-400"></i><div><div class="text-sm text-white">Дедлайн ДЗ по риску</div><div class="text-xs text-slate-500">сб</div></div></div>
              </div>
            </div>
          </div>
        </section>

        <!-- ===================== COURSES ===================== -->
        <section class="view" data-view="courses">
          <div class="card p-5 mb-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 class="font-display font-bold text-xl text-white">Трейдинг: полная система</h2>
                <p class="text-slate-400 text-sm mt-1">12 блоков · 36 уроков · ~14 часов видео</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-display font-extrabold gradient-text">45%</div>
                <div class="text-xs text-slate-400">пройдено</div>
              </div>
            </div>
            <div class="progress mt-4"><i data-w="45%"></i></div>
          </div>
          <div id="modules-list" class="space-y-3"></div>
        </section>

        <!-- ===================== LESSON PLAYER ===================== -->
        <section class="view" data-view="lesson">
          <button class="btn btn-ghost btn-sm mb-4" data-view-link="courses"><i class="fa-solid fa-arrow-left"></i> К списку курсов</button>
          <div class="grid lg:grid-cols-[1fr_320px] gap-5">
            <div>
              <div class="card overflow-hidden">
                <div class="relative bg-black/40" style="aspect-ratio:16/9;">
                  <div class="absolute inset-0 grid-bg opacity-30"></div>
                  <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <button onclick="toast('Демо: видео-плеер подключается в полной версии','info')" class="h-16 w-16 rounded-full bg-gradient-to-br from-accent to-accent2 text-ink flex items-center justify-center text-2xl hover:scale-110 transition-transform"><i class="fa-solid fa-play"></i></button>
                    <span class="text-xs text-slate-400">демо-видео урока</span>
                  </div>
                  <span class="absolute bottom-3 right-3 text-xs bg-black/60 px-2 py-1 rounded text-slate-300" id="lesson-dur">18:24</span>
                </div>
              </div>
              <div class="mt-4">
                <div class="text-sm text-accent font-semibold" id="lesson-mod">Блок 6 · Свинг-трейдинг</div>
                <h2 class="font-display font-extrabold text-2xl text-white mt-1" id="lesson-title">Разбор на примерах</h2>
              </div>
              <div class="flex gap-2 mt-4 border-b border-white/10">
                <button class="lt-tab btn btn-ghost btn-sm active-tab" data-lt="desc" onclick="lessonTab('desc')">Описание</button>
                <button class="lt-tab btn btn-ghost btn-sm" data-lt="mat" onclick="lessonTab('mat')">Материалы</button>
                <button class="lt-tab btn btn-ghost btn-sm" data-lt="notes" onclick="lessonTab('notes')">Конспект</button>
              </div>
              <div class="py-4">
                <div data-lt-panel="desc" class="text-slate-300 leading-relaxed">
                  В этом уроке разбираем реальные примеры сэтапов: как находить точку входа, ставить стоп под структурой и сопровождать позицию. Демо-описание — в полной версии здесь полный конспект и тайм-коды.
                </div>
                <div data-lt-panel="mat" class="hidden space-y-2">
                  <a href="#" data-toast="Демо: загрузка материалов в полной версии" class="surface p-3 flex items-center gap-3 hover:bg-white/[0.06]"><i class="fa-solid fa-file-pdf text-red-400"></i> Чек-лист сэтапа.pdf <span class="ml-auto text-xs text-slate-500">240 КБ</span></a>
                  <a href="#" data-toast="Демо: загрузка материалов в полной версии" class="surface p-3 flex items-center gap-3 hover:bg-white/[0.06]"><i class="fa-solid fa-table text-emerald-400"></i> Шаблон дневника.xlsx <span class="ml-auto text-xs text-slate-500">88 КБ</span></a>
                </div>
                <div data-lt-panel="notes" class="hidden">
                  <textarea class="textarea" rows="6" placeholder="Твои заметки к уроку (демо, не сохраняются)…"></textarea>
                  <button class="btn btn-outline btn-sm mt-2" data-toast="Демо: заметки сохранятся в полной версии">Сохранить заметку</button>
                </div>
              </div>
              <div class="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                <button class="btn btn-outline btn-sm" id="lesson-prev"><i class="fa-solid fa-arrow-left"></i> Назад</button>
                <button class="btn btn-primary btn-shine" onclick="toast('Урок отмечен пройденным (демо)','success')"><i class="fa-solid fa-check"></i> Отметить пройденным</button>
                <button class="btn btn-outline btn-sm" id="lesson-next">Далее <i class="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
            <aside>
              <div class="card p-4">
                <h3 class="font-display font-bold text-white mb-3" id="lesson-list-title">Уроки блока</h3>
                <div id="lesson-list" class="space-y-1"></div>
              </div>
            </aside>
          </div>
        </section>

        <!-- ===================== JOURNAL ===================== -->
        <section class="view" data-view="journal">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 class="font-display font-bold text-xl text-white">Дневник сделок</h2>
              <p class="text-slate-400 text-sm mt-1">История и статистика. Вноси вручную или подключи брокера в режиме «только чтение».</p>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-outline btn-sm" data-toast="Демо: подключение брокера/биржи по API в режиме «только чтение» (как Myfxbook). Деньги не двигаются — только импорт истории." data-toast-type="info"><i class="fa-solid fa-link"></i> Подключить брокера</button>
              <button class="btn btn-primary btn-sm" data-modal-open="addTrade"><i class="fa-solid fa-plus"></i> Добавить сделку</button>
            </div>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <div class="surface p-4"><div class="text-xs text-slate-400">Winrate</div><div class="text-xl font-display font-bold text-white" id="jWin">58%</div></div>
            <div class="surface p-4"><div class="text-xs text-slate-400">Сделок</div><div class="text-xl font-display font-bold text-white" id="jCount">24</div></div>
            <div class="surface p-4"><div class="text-xs text-slate-400">Средний R</div><div class="text-xl font-display font-bold text-emerald-400" id="jAvg">+0.7</div></div>
            <div class="surface p-4"><div class="text-xs text-slate-400">Профит-фактор</div><div class="text-xl font-display font-bold text-white">1.9</div></div>
          </div>

          <div class="flex gap-2 mb-4">
            <button class="chip active" data-filter="all" onclick="filterJournal('all',this)">Все</button>
            <button class="chip" data-filter="win" onclick="filterJournal('win',this)">Прибыльные</button>
            <button class="chip" data-filter="loss" onclick="filterJournal('loss',this)">Убыточные</button>
          </div>

          <div class="card overflow-hidden">
            <div class="overflow-x-auto scroll-thin">
              <table class="tbl min-w-[680px]">
                <thead><tr><th>Дата</th><th>Инструмент</th><th>Сторона</th><th>Риск</th><th>Результат</th><th>Статус</th></tr></thead>
                <tbody id="journal-rows"></tbody>
              </table>
            </div>
          </div>
          <p class="text-[11px] text-slate-500 mt-3">Демо-журнал. Данные хранятся только в этой вкладке и сбрасываются при перезагрузке.</p>
        </section>

        <!-- ===================== ACHIEVEMENTS ===================== -->
        <section class="view" data-view="achievements">
          <h2 class="font-display font-bold text-xl text-white mb-1">Достижения</h2>
          <p class="text-slate-400 text-sm mb-5">Геймификация мотивирует не бросать обучение. Открыто 6 из 12.</p>
          <div id="ach-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </section>

        <!-- ===================== COMMUNITY ===================== -->
        <section class="view" data-view="community">
          <div class="card p-5 mb-5">
            <h2 class="font-display font-bold text-lg text-white mb-3">Что внутри сервера Secret Trading</h2>
            <div class="grid sm:grid-cols-2 gap-3 text-sm">
              <div class="surface p-3 flex gap-3"><i class="fa-solid fa-sun text-accent mt-0.5"></i><div class="text-slate-300">Ежедневные обзоры рынка перед стартом дня — от команды менторов</div></div>
              <div class="surface p-3 flex gap-3"><i class="fa-solid fa-globe text-accent mt-0.5"></i><div class="text-slate-300">Макрообзор раз в 2 недели — от управляющего хедж-фондами в США (10+ лет)</div></div>
              <div class="surface p-3 flex gap-3"><i class="fa-solid fa-calendar-week text-accent mt-0.5"></i><div class="text-slate-300">Еженедельный обзор рынка лично от ментора</div></div>
              <div class="surface p-3 flex gap-3"><i class="fa-solid fa-trophy text-accent mt-0.5"></i><div class="text-slate-300">Соревнования с призами: деньги в&nbsp;$, проп-счета, пожизненная подписка</div></div>
            </div>
          </div>
          <div class="grid lg:grid-cols-3 gap-5">
            <div class="lg:col-span-2 card p-5">
              <h2 class="font-display font-bold text-xl text-white mb-4">Лента сообщества</h2>
              <div class="space-y-4">
                <div class="surface p-4">
                  <div class="flex items-center gap-3 mb-2"><span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent font-semibold">М</span><div><div class="text-white text-sm font-semibold">Мария</div><div class="text-xs text-slate-500">#разбор-сделок · 2 ч назад</div></div></div>
                  <p class="text-slate-300 text-sm">Зашла в лонг по GOLD на ретесте, стоп под уровнем, риск 1%. Закрыла +2R по плану. Прикладываю скрин в тред.</p>
                  <div class="flex gap-4 mt-3 text-xs text-slate-400"><button data-toast="Демо-реакция" class="hover:text-accent"><i class="fa-regular fa-thumbs-up"></i> 12</button><button data-toast="Демо-комментарий" class="hover:text-accent"><i class="fa-regular fa-comment"></i> 4</button></div>
                </div>
                <div class="surface p-4">
                  <div class="flex items-center gap-3 mb-2"><span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent2/20 text-accent2 font-semibold">А</span><div><div class="text-white text-sm font-semibold">Александр <span class="badge badge-accent ml-1">ментор</span></div><div class="text-xs text-slate-500">#анонсы · вчера</div></div></div>
                  <p class="text-slate-300 text-sm">В четверг 19:00 — живой разбор ваших сделок за неделю. Скидывайте кейсы в тред заранее.</p>
                  <div class="flex gap-4 mt-3 text-xs text-slate-400"><button data-toast="Демо-реакция" class="hover:text-accent"><i class="fa-regular fa-thumbs-up"></i> 31</button><button data-toast="Демо-комментарий" class="hover:text-accent"><i class="fa-regular fa-comment"></i> 9</button></div>
                </div>
              </div>
            </div>
            <div class="card p-5">
              <div class="flex items-center gap-2 mb-3"><i class="fa-solid fa-server text-accent"></i><h3 class="font-display font-bold text-white">Сервер Secret Trading</h3></div>
              <div class="text-xs text-slate-400 mb-3">Доступ открыт · формат «Личный» (до 11.06.2027)</div>
              <div class="space-y-1 text-sm">
                <div class="nav-item"># общий-чат</div>
                <div class="nav-item"># разбор-сделок</div>
                <div class="nav-item"># вопросы-ментору</div>
                <div class="nav-item"># анонсы</div>
              </div>
              <button class="btn btn-primary btn-block mt-4" data-toast="Демо: переход на сервер Secret Trading в полной версии"><i class="fa-solid fa-arrow-up-right-from-square"></i> Открыть сервер</button>
            </div>
          </div>
        </section>

        <!-- ===================== BILLING ===================== -->
        <section class="view" data-view="billing">
          <h2 class="font-display font-bold text-xl text-white mb-5">Подписка и оплата</h2>
          <div class="grid lg:grid-cols-3 gap-4">
            <div class="lg:col-span-2 card p-6">
              <div class="flex items-center justify-between">
                <div><div class="text-xs text-slate-400">Формат обучения</div><div class="font-display font-extrabold text-2xl text-white">Личный</div></div>
                <span class="badge badge-green">Активен</span>
              </div>
              <div class="text-sm text-slate-400 mt-2">$2000 · разовый доступ к курсу · открыт до 11.07.2026</div>
              <div class="flex flex-wrap gap-2 mt-5">
                <button class="btn btn-primary btn-sm" data-modal-open="checkout">Сменить тариф</button>
                <button class="btn btn-outline btn-sm" data-toast="Демо: автопродление отключено">Отменить автопродление</button>
              </div>
            </div>
            <div class="card p-6">
              <div class="text-xs text-slate-400 mb-2">Способ оплаты</div>
              <div class="surface p-4 flex items-center gap-3"><i class="fa-brands fa-cc-visa text-2xl text-blue-400"></i><div><div class="text-white text-sm">•••• 4242</div><div class="text-xs text-slate-500">истекает 08/27</div></div></div>
              <button class="btn btn-outline btn-sm btn-block mt-3" data-modal-open="checkout">Изменить карту</button>
            </div>
          </div>

          <!-- Secret Trading server -->
          <div class="card p-6 mt-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-ink text-lg"><i class="fa-solid fa-server"></i></span>
                <div>
                  <div class="font-display font-bold text-white">Сервер Secret Trading</div>
                  <div class="text-xs text-slate-400">Входит в формат «Личный» · активен до 11.06.2027</div>
                </div>
              </div>
              <span class="badge badge-green">Доступ открыт</span>
            </div>
            <div class="text-sm text-slate-400 mt-4 mb-3">Продлить доступ по подписке (только для учеников курса):</div>
            <div class="grid sm:grid-cols-3 gap-3">
              <button class="surface card-hover p-4 text-left" data-modal-open="checkout"><div class="text-white font-semibold">1 месяц</div><div class="font-display font-extrabold text-xl text-white mt-1">$100</div></button>
              <button class="surface card-hover p-4 text-left" style="border-color:rgba(45,212,191,.4)" data-modal-open="checkout"><div class="text-white font-semibold">3 месяца <span class="badge badge-accent ml-1">−33%</span></div><div class="font-display font-extrabold text-xl text-white mt-1">$200</div></button>
              <button class="surface card-hover p-4 text-left" data-modal-open="checkout"><div class="text-white font-semibold">1 год <span class="badge badge-accent ml-1">−58%</span></div><div class="font-display font-extrabold text-xl text-white mt-1">$500</div></button>
            </div>
          </div>

          <h3 class="font-display font-bold text-white mt-6 mb-3">История платежей</h3>
          <div class="card overflow-hidden"><div class="overflow-x-auto scroll-thin"><table class="tbl min-w-[560px]">
            <thead><tr><th>Дата</th><th>Описание</th><th>Сумма</th><th>Статус</th><th></th></tr></thead>
            <tbody>
              <tr><td>02.06.2026</td><td>Обучение «Личный» · курс + сервер 1 год</td><td>$2000.00</td><td><span class="badge badge-green">Оплачено</span></td><td><a href="#" data-toast="Демо: счёт-фактура" class="text-accent text-sm">Чек</a></td></tr>
              <tr><td>15.03.2026</td><td>Бронь места (предоплата)</td><td>$200.00</td><td><span class="badge badge-green">Оплачено</span></td><td><a href="#" data-toast="Демо: счёт-фактура" class="text-accent text-sm">Чек</a></td></tr>
            </tbody>
          </table></div></div>
        </section>

        <!-- ===================== SETTINGS ===================== -->
        <section class="view" data-view="settings">
          <h2 class="font-display font-bold text-xl text-white mb-5">Настройки</h2>
          <div class="grid lg:grid-cols-2 gap-4">
            <div class="card p-6">
              <h3 class="font-display font-bold text-white mb-4">Профиль</h3>
              <div class="flex items-center gap-4 mb-4">
                <span class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-accent2/40 text-white font-bold text-xl">А</span>
                <button class="btn btn-outline btn-sm" data-toast="Демо: загрузка аватара в полной версии">Сменить фото</button>
              </div>
              <div class="space-y-3">
                <div><label class="label">Имя</label><input class="input" value="Александр" /></div>
                <div><label class="label">Email</label><input class="input" value="student@demo.io" /></div>
                <div><label class="label">Telegram</label><input class="input" value="@student" /></div>
              </div>
              <button class="btn btn-primary btn-sm mt-4" data-toast="Профиль сохранён (демо)" data-toast-type="success">Сохранить</button>
            </div>
            <div class="space-y-4">
              <div class="card p-6">
                <h3 class="font-display font-bold text-white mb-4">Уведомления</h3>
                <label class="flex items-center justify-between py-2"><span class="text-sm text-slate-300">Email о новых уроках</span><input type="checkbox" checked></label>
                <label class="flex items-center justify-between py-2"><span class="text-sm text-slate-300">Напоминания о вебинарах</span><input type="checkbox" checked></label>
                <label class="flex items-center justify-between py-2"><span class="text-sm text-slate-300">Ответы ментора в Discord</span><input type="checkbox"></label>
              </div>
              <div class="card p-6">
                <h3 class="font-display font-bold text-white mb-4">Безопасность</h3>
                <button class="btn btn-outline btn-sm btn-block" data-toast="Демо: смена пароля в полной версии">Сменить пароль</button>
                <button class="btn btn-outline btn-sm btn-block mt-2" data-toast="Демо: двухфакторная аутентификация в полной версии">Включить 2FA</button>
              </div>
              <div class="card p-6" style="border-color:rgba(239,68,68,.3)">
                <h3 class="font-display font-bold text-red-300 mb-2">Опасная зона</h3>
                <p class="text-xs text-slate-400 mb-3">Удаление аккаунта необратимо.</p>
                <button class="btn btn-sm" style="background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3)" data-toast="Демо: аккаунт не удалён" data-toast-type="error">Удалить аккаунт</button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>

  <!-- ===== Add trade modal ===== -->
  <div class="modal" id="addTrade">
    <div class="modal-backdrop"></div>
    <div class="modal-panel">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-display font-bold text-lg text-white">Добавить сделку</h3>
        <button data-modal-close class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <form onsubmit="return submitTrade(event)" class="space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div><label class="label">Инструмент</label><input id="t-inst" class="input" placeholder="EUR/USD" required /></div>
          <div><label class="label">Сторона</label><select id="t-side" class="select"><option>Long</option><option>Short</option></select></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="label">Риск, %</label><input id="t-risk" class="input" value="1" /></div>
          <div><label class="label">Результат, R</label><input id="t-res" class="input" placeholder="+3 или -1" required /></div>
        </div>
        <div><label class="label">Комментарий</label><input id="t-note" class="input" placeholder="по плану / стоп / ручное" /></div>
        <button type="submit" class="btn btn-primary btn-block btn-shine">Сохранить сделку</button>
        <p class="text-[11px] text-slate-500 text-center">Демо: добавится в таблицу до перезагрузки страницы.</p>
      </form>
    </div>
  </div>

  <!-- ===== Checkout modal ===== -->
  <div class="modal" id="checkout">
    <div class="modal-backdrop"></div>
    <div class="modal-panel">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-display font-bold text-lg text-white">Оплата подписки</h3>
        <button data-modal-close class="text-slate-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="grid grid-cols-3 gap-3 mb-4">
        <button class="surface p-3 text-left card-hover" onclick="toast('Выбран формат «Групповой» (демо)','info')"><div class="text-white font-semibold">Групповой</div><div class="text-sm text-slate-400">$1000</div></button>
        <button class="surface p-3 text-left card-hover" style="border-color:rgba(45,212,191,.4)" onclick="toast('Выбран формат «Личный» (демо)','info')"><div class="text-white font-semibold">Личный</div><div class="text-sm text-slate-400">$2000</div></button>
        <button class="surface p-3 text-left card-hover" onclick="toast('Выбран формат «Менторство» (демо)','info')"><div class="text-white font-semibold">Менторство</div><div class="text-sm text-slate-400">$5000</div></button>
      </div>
      <form onsubmit="return submitPay(event)" class="space-y-3">
        <div><label class="label">Номер карты</label><input class="input" placeholder="4242 4242 4242 4242" required /></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="label">Срок</label><input class="input" placeholder="MM/YY" required /></div>
          <div><label class="label">CVC</label><input class="input" placeholder="123" required /></div>
        </div>
        <div><label class="label">Имя на карте</label><input class="input" placeholder="ALEKSANDR" required /></div>
        <button type="submit" class="btn btn-primary btn-block btn-shine"><i class="fa-solid fa-lock"></i> Оплатить (демо)</button>
        <p class="text-[11px] text-slate-500 text-center">Это демо — оплата не проводится, платёжный шлюз подключается в боевой версии.</p>
      </form>
    </div>
  </div>

  <div id="toast-wrap"></div>

  
  
`;
