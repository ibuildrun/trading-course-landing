export default `

  <div id="progress"></div>
  <div class="aurora"><span class="b1"></span><span class="b2"></span><span class="b3"></span></div>
  <canvas id="candles"></canvas>

  <div class="layer">

  <!-- ============ HEADER ============ -->
  <header id="top" class="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="#top" class="anchor flex items-center gap-2 group">
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-ink font-display font-extrabold text-lg shadow-lg shadow-accent/20 group-hover:scale-110 group-hover:rotate-6 transition-transform">M</span>
          <span class="font-display font-extrabold text-lg tracking-tight text-white">Mind<span class="text-accent">Trade</span></span>
        </a>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#mentor" class="anchor nav-link hover:text-white transition-colors">О менторе</a>
          <a href="#how" class="anchor nav-link hover:text-white transition-colors">Как учим</a>
          <a href="#program" class="anchor nav-link hover:text-white transition-colors">Программа</a>
          <a href="#cabinet" class="anchor nav-link hover:text-white transition-colors">Кабинет</a>
          <a href="#pricing" class="anchor nav-link hover:text-white transition-colors">Цены</a>
          <a href="#server" class="anchor nav-link hover:text-white transition-colors">Сервер</a>
        </nav>
        <div class="hidden md:flex items-center gap-3">
          <a href="/trading-course-landing/login/" class="btn-anim inline-flex items-center text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5">
            <i class="fa-regular fa-circle-user mr-1.5"></i>Войти в кабинет
          </a>
          <a href="#contact" class="anchor btn-anim btn-shine text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent2 text-ink shadow-lg shadow-accent/25 hover:shadow-accent/40">
            Старт <i class="fa-solid fa-arrow-right ml-1"></i>
          </a>
        </div>
        <button id="burger" aria-label="Меню" class="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-slate-200 hover:bg-white/5"><i class="fa-solid fa-bars text-lg"></i></button>
      </div>
    </div>
    <div id="mobile-menu" class="md:hidden hidden border-t border-white/5 glass">
      <nav class="px-4 py-4 flex flex-col gap-1 text-sm font-medium">
        <a href="#mentor" class="anchor mobile-link px-3 py-3 rounded-lg hover:bg-white/5 hover:text-accent">О менторе</a>
        <a href="#how" class="anchor mobile-link px-3 py-3 rounded-lg hover:bg-white/5 hover:text-accent">Как учим</a>
        <a href="#program" class="anchor mobile-link px-3 py-3 rounded-lg hover:bg-white/5 hover:text-accent">Программа</a>
        <a href="#cabinet" class="anchor mobile-link px-3 py-3 rounded-lg hover:bg-white/5 hover:text-accent">Кабинет</a>
        <a href="#pricing" class="anchor mobile-link px-3 py-3 rounded-lg hover:bg-white/5 hover:text-accent">Цены</a>
        <a href="#server" class="anchor mobile-link px-3 py-3 rounded-lg hover:bg-white/5 hover:text-accent">Сервер</a>
        <a href="#contact" class="anchor mobile-link px-3 py-3 rounded-lg hover:bg-white/5 hover:text-accent">Контакты</a>
        <div class="grid grid-cols-2 gap-2 pt-2">
          <a href="/trading-course-landing/login/" class="text-center px-3 py-2.5 rounded-lg border border-white/10 text-slate-200 text-sm">Кабинет</a>
          <a href="#contact" class="anchor mobile-link text-center px-3 py-2.5 rounded-lg bg-gradient-to-r from-accent to-accent2 text-ink font-semibold text-sm">Старт</a>
        </div>
      </nav>
    </div>
  </header>

  <!-- ============ HERO ============ -->
  <section class="relative pt-28 pb-10 sm:pt-36 overflow-hidden">
    <div class="absolute inset-0 grid-bg opacity-40 pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="reveal-l is-visible">
          <span class="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent mb-6 glow-pulse">
            <span class="h-1.5 w-1.5 rounded-full bg-accent pulse-dot"></span>
            Честное обучение. Без гарантий прибыли
          </span>
          <h1 class="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-white tracking-tight">
            Трейдинг — это <span class="gradient-text">дисциплина</span>, а не лотерея
          </h1>
          <p class="mt-5 text-lg text-slate-300/90 max-w-xl">
            Научись управлять рисками без иллюзий. Авторский курс ментора с 8-летним опытом. Без обещаний «лёгких денег» — только система, психология и статистика.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#how" class="anchor magnetic btn-anim btn-shine inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent2 text-ink font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40">
              <i class="fa-solid fa-play"></i> Как устроено обучение
            </a>
            <button onclick="enterCabinet()" class="magnetic btn-anim inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10">
              <i class="fa-solid fa-table-columns text-accent"></i> Посмотреть кабинет
            </button>
          </div>
          <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-slate-400">
            <div class="flex items-center gap-2"><i class="fa-solid fa-shield-halved text-accent"></i> Риск-менеджмент в основе</div>
            <div class="flex items-center gap-2"><i class="fa-solid fa-brain text-accent"></i> Психология торговли</div>
            <div class="flex items-center gap-2"><i class="fa-solid fa-chart-line text-accent"></i> Опора на статистику</div>
          </div>
        </div>

        <div class="reveal-r is-visible">
          <div class="floaty relative rounded-2xl border border-white/10 bg-ink2/70 p-4 sm:p-6 shadow-2xl shadow-black/40" data-parallax="0.05">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-red-400/80"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/80"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-green-400/80"></span>
                <span class="ml-2 text-xs text-slate-400 font-mono">BTC/USDT · 1H · demo</span>
              </div>
              <span class="text-xs font-mono text-accent">+0.00%</span>
            </div>
            <canvas id="priceChart" class="w-full rounded-lg" height="280"></canvas>
            <div class="mt-3 grid grid-cols-3 gap-3 text-center">
              <div class="rounded-lg bg-white/5 py-2"><div class="text-[11px] text-slate-400">Риск на сделку</div><div class="text-sm font-semibold text-white">1%</div></div>
              <div class="rounded-lg bg-white/5 py-2"><div class="text-[11px] text-slate-400">R:R цель</div><div class="text-sm font-semibold text-white">1:3</div></div>
              <div class="rounded-lg bg-white/5 py-2"><div class="text-[11px] text-slate-400">Подход</div><div class="text-sm font-semibold text-accent">Система</div></div>
            </div>
            <p class="mt-3 text-[11px] text-slate-500 text-center">График — иллюстрация. Не является торговой рекомендацией.</p>
          </div>
        </div>
      </div>
      <div class="scroll-hint hidden lg:flex flex-col items-center gap-2 text-slate-500 text-xs mt-12">
        <span>Листай вниз</span><i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>

    <div class="mt-10 marquee border-y border-white/5 bg-white/[0.02] py-3">
      <div class="marquee-track text-sm font-mono" id="ticker"></div>
    </div>
  </section>

  <!-- ============ TEXT REVEAL ============ -->
  <section class="py-24 sm:py-36">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="reveal-words font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-center">
        <span class="w">Рынок</span> <span class="w">не</span> <span class="w">прощает</span> <span class="w">хаос.</span>
        <span class="w accent">Дисциплина,</span> <span class="w accent">риск-менеджмент</span> <span class="w">и</span> <span class="w accent">система</span>
        <span class="w">превращают</span> <span class="w">случайные</span> <span class="w">сделки</span> <span class="w">в</span> <span class="w">управляемый</span> <span class="w">процесс.</span>
      </p>
    </div>
  </section>

  <!-- ============ HOW IT WORKS — PINNED ============ -->
  <section id="how" class="pin-wrap scrolly-steps">
    <div class="pin-stage">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid lg:grid-cols-2 gap-10 items-center">
          <div class="order-2 lg:order-1">
            <div class="relative rounded-2xl border border-white/10 bg-ink2/70 p-4 sm:p-6 shadow-2xl shadow-black/40">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-mono text-slate-400">Демо-терминал · обучение по шагам</span>
                <span id="stagePhase" class="text-xs font-semibold text-accent">Хаос</span>
              </div>
              <canvas id="stageChart" class="w-full rounded-lg bg-black/20" height="340"></canvas>
              <div class="mt-4 grid grid-cols-4 gap-2 text-center text-[11px]">
                <div class="stage-pill rounded-lg bg-white/5 py-2" data-i="0">Структура</div>
                <div class="stage-pill rounded-lg bg-white/5 py-2" data-i="1">Риск</div>
                <div class="stage-pill rounded-lg bg-white/5 py-2" data-i="2">Психология</div>
                <div class="stage-pill rounded-lg bg-white/5 py-2" data-i="3">Система</div>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <span class="text-sm font-semibold text-accent uppercase tracking-wider">Как устроено обучение</span>
            <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2 mb-7">От хаоса — к торговой системе</h2>
            <div class="space-y-4">
              <div class="step-card active rounded-2xl border border-white/10 bg-ink2/40 p-5" data-step="0">
                <div class="flex items-start gap-4"><span class="step-num inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white font-bold">1</span>
                  <div><h3 class="font-display font-bold text-white">Видеть структуру, а не шум</h3><p class="text-slate-400 text-sm mt-1">Учимся читать тренды, уровни и фазы рынка вместо хаотичного угадывания.</p></div></div>
              </div>
              <div class="step-card rounded-2xl border border-white/10 bg-ink2/40 p-5" data-step="1">
                <div class="flex items-start gap-4"><span class="step-num inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white font-bold">2</span>
                  <div><h3 class="font-display font-bold text-white">Защищать счёт риском</h3><p class="text-slate-400 text-sm mt-1">Стоп-лосс, риск 1% на сделку, контроль просадки — счёт переживает серию убытков.</p></div></div>
              </div>
              <div class="step-card rounded-2xl border border-white/10 bg-ink2/40 p-5" data-step="2">
                <div class="flex items-start gap-4"><span class="step-num inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white font-bold">3</span>
                  <div><h3 class="font-display font-bold text-white">Управлять психологией</h3><p class="text-slate-400 text-sm mt-1">Дневник сделок и работа с эмоциями убирают импульсивность и переторговку.</p></div></div>
              </div>
              <div class="step-card rounded-2xl border border-white/10 bg-ink2/40 p-5" data-step="3">
                <div class="flex items-start gap-4"><span class="step-num inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white font-bold">4</span>
                  <div><h3 class="font-display font-bold text-white">Собрать свою систему</h3><p class="text-slate-400 text-sm mt-1">Чёткие правила входа и выхода превращают торговлю в повторяемый процесс.</p></div></div>
              </div>
            </div>
            <p class="text-[11px] text-slate-500 mt-5"><i class="fa-solid fa-arrow-down text-accent mr-1"></i> Прокручивай — график слева меняется вместе с этапом.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ MENTOR ============ -->
  <section id="mentor" class="py-16 sm:py-24 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-5 gap-10 items-center">
        <div class="reveal-l lg:col-span-2">
          <div class="relative mx-auto max-w-sm floaty" data-parallax="0.04">
            <div class="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-ink2 to-ink flex items-center justify-center overflow-hidden">
              <i class="fa-solid fa-user-tie text-[7rem] text-slate-600"></i>
              <div class="absolute inset-0 grid-bg opacity-30"></div>
            </div>
            <span class="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] bg-black/60 text-slate-300 px-3 py-1 rounded-full border border-white/10">Фото для демо</span>
          </div>
        </div>
        <div class="reveal-r lg:col-span-3">
          <span class="text-sm font-semibold text-accent uppercase tracking-wider">О менторе</span>
          <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">Александр</h2>
          <p class="text-slate-300 mt-4 leading-relaxed">
            Трейдер с 2016 года. Прошёл путь от потери $10k до системного подхода — пережил несколько сливов и восстановлений и знает цену каждой ошибки. Обучает честному трейдингу без фейков: <span class="text-white font-medium">никогда не продавал курсы с гарантиями прибыли</span>.
          </p>
          <p class="text-slate-300 mt-3 leading-relaxed">
            Ведёт Discord-комьюнити и разборы сделок — и прибыльных, и убыточных. Считает, что убыток по правилам — это часть системы, а не провал.
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-7">
            <div class="card-hover rounded-xl border border-white/10 bg-ink2/50 p-4 text-center">
              <div class="font-display font-extrabold text-2xl gradient-text"><span class="count" data-to="8">0</span> лет</div><div class="text-xs text-slate-400 mt-1">на рынке</div>
            </div>
            <div class="card-hover rounded-xl border border-white/10 bg-ink2/50 p-4 text-center">
              <div class="font-display font-extrabold text-2xl gradient-text"><span class="count" data-to="150">0</span>+</div><div class="text-xs text-slate-400 mt-1">личных консультаций</div>
            </div>
            <div class="card-hover rounded-xl border border-white/10 bg-ink2/50 p-4 text-center">
              <div class="font-display font-extrabold text-2xl gradient-text"><span class="count" data-to="80">0</span>+</div><div class="text-xs text-slate-400 mt-1">учеников с системой</div>
            </div>
          </div>
          <p class="text-[11px] text-slate-500 mt-3">Цифры приведены для демонстрации.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ PROGRAM — AUTO CAROUSEL ============ -->
  <section id="program" class="py-16 sm:py-24 scroll-mt-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 reveal">
        <div>
          <span class="text-sm font-semibold text-accent uppercase tracking-wider">Программа курса</span>
          <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">12 блоков — полная система трейдинга</h2>
          <p class="mt-3 inline-flex items-center gap-2 text-sm text-accent"><i class="fa-solid fa-lock"></i> Уникальная авторская программа — этих материалов нет в открытом доступе</p>
          <p class="text-slate-400 mt-2">Лента едет сама. Наведи, чтобы остановить, тяни мышью или листай стрелками. Клик — детали.</p>
        </div>
        <div class="flex gap-2">
          <button id="c-prev" aria-label="Назад" class="btn-anim h-11 w-11 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10"><i class="fa-solid fa-chevron-left"></i></button>
          <button id="c-next" aria-label="Вперёд" class="btn-anim h-11 w-11 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="c-edge-l"></div><div class="c-edge-r"></div>
      <div id="c-mask" class="c-mask"><div id="program-track" class="c-track"></div></div>
    </div>
  </section>

  <!-- ============ MARKETS ============ -->
  <section class="py-12 sm:py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto reveal">
        <span class="text-sm font-semibold text-accent uppercase tracking-wider">Рынки</span>
        <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">Какие рынки изучаем</h2>
        <p class="text-slate-400 mt-3">Принципы системы переносятся между рынками — учим работать на разных классах активов.</p>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6 text-center">
          <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent text-2xl mx-auto"><i class="fa-brands fa-bitcoin"></i></span>
          <div class="font-display font-bold text-white mt-4">Crypto</div>
          <div class="text-xs text-slate-400 mt-1">Криптовалюты</div>
        </div>
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6 text-center">
          <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent text-2xl mx-auto"><i class="fa-solid fa-money-bill-trend-up"></i></span>
          <div class="font-display font-bold text-white mt-4">Forex</div>
          <div class="text-xs text-slate-400 mt-1">Валютные пары</div>
        </div>
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6 text-center">
          <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent text-2xl mx-auto"><i class="fa-solid fa-chart-line"></i></span>
          <div class="font-display font-bold text-white mt-4">Index</div>
          <div class="text-xs text-slate-400 mt-1">Фондовые индексы</div>
        </div>
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6 text-center">
          <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent text-2xl mx-auto"><i class="fa-solid fa-coins"></i></span>
          <div class="font-display font-bold text-white mt-4">Metals</div>
          <div class="text-xs text-slate-400 mt-1">Металлы (золото и др.)</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ CABINET DEMO ============ -->
  <section id="cabinet" class="py-16 sm:py-24 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto reveal">
        <span class="inline-flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider">Личный кабинет <span class="text-[10px] normal-case bg-accent/15 text-accent px-2 py-0.5 rounded-full">демо</span></span>
        <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">Учёба, прогресс и дневник — в одном месте</h2>
        <p class="text-slate-400 mt-3">Так выглядит кабинет ученика: прогресс по модулям, кривая капитала и журнал сделок. Данные демонстрационные.</p>
      </div>

      <div class="reveal mt-12 rounded-2xl border border-white/10 bg-ink2/70 overflow-hidden shadow-2xl shadow-black/40">
        <!-- chrome -->
        <div class="app-chrome flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div class="flex items-center gap-2">
            <span class="h-3 w-3 rounded-full bg-red-400/80"></span><span class="h-3 w-3 rounded-full bg-yellow-400/80"></span><span class="h-3 w-3 rounded-full bg-green-400/80"></span>
            <span class="ml-3 text-xs text-slate-400 font-mono hidden sm:inline">app.mindtrade.demo / кабинет ученика</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <i class="fa-solid fa-circle text-accent text-[8px]"></i> онлайн
            <span class="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-accent2/40 text-white font-semibold">А</span>
          </div>
        </div>

        <div class="grid lg:grid-cols-[230px_1fr]">
          <!-- sidebar -->
          <aside class="border-b lg:border-b-0 lg:border-r border-white/10 p-3">
            <nav class="flex lg:flex-col gap-2 overflow-x-auto">
              <button class="tab-btn active flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent text-slate-300 text-sm whitespace-nowrap w-full" data-tab="overview"><i class="fa-solid fa-gauge-high w-4"></i> Обзор</button>
              <button class="tab-btn flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent text-slate-300 text-sm whitespace-nowrap w-full" data-tab="lessons"><i class="fa-solid fa-graduation-cap w-4"></i> Мои уроки</button>
              <button class="tab-btn flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent text-slate-300 text-sm whitespace-nowrap w-full" data-tab="journal"><i class="fa-solid fa-book-open w-4"></i> Дневник сделок</button>
              <button onclick="toast('Демо: Discord-комьюнити подключается в полной версии','info')" class="tab-btn flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent text-slate-300 text-sm whitespace-nowrap w-full"><i class="fa-brands fa-discord w-4"></i> Сообщество</button>
              <div class="hidden lg:block mt-4 rounded-xl bg-accent/5 border border-accent/20 p-4">
                <div class="text-xs text-slate-300">Тариф</div>
                <div class="font-display font-bold text-white">Премиум</div>
                <button onclick="scrollToId('#pricing')" class="mt-2 text-xs text-accent hover:underline">Управлять →</button>
              </div>
            </nav>
          </aside>

          <!-- panels -->
          <div class="p-5 sm:p-7 min-h-[520px]">

            <!-- OVERVIEW -->
            <div data-panel="overview">
              <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div class="card-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-center gap-4">
                  <svg viewBox="0 0 80 80" class="h-16 w-16 -rotate-90 shrink-0">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(148,163,184,0.18)" stroke-width="8"/>
                    <circle id="progRing" class="ring-fg" cx="40" cy="40" r="34" fill="none" stroke="#2DD4BF" stroke-width="8" stroke-linecap="round" stroke-dasharray="213.6" stroke-dashoffset="213.6"/>
                  </svg>
                  <div><div class="text-2xl font-display font-extrabold text-white"><span id="progPct">0</span>%</div><div class="text-xs text-slate-400">Прогресс курса</div></div>
                </div>
                <div class="card-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div class="flex items-center justify-between"><span class="text-xs text-slate-400">Уроки пройдены</span><i class="fa-solid fa-graduation-cap text-accent"></i></div>
                  <div class="text-2xl font-display font-extrabold text-white mt-2">5 <span class="text-slate-500 text-base">/ 12</span></div>
                  <div class="h-2 rounded-full bg-white/10 mt-3 overflow-hidden"><div class="bar h-full rounded-full bg-gradient-to-r from-accent to-accent2" data-w="42%"></div></div>
                </div>
                <div class="card-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div class="flex items-center justify-between"><span class="text-xs text-slate-400">Дисциплина</span><i class="fa-solid fa-shield-halved text-accent"></i></div>
                  <div class="text-2xl font-display font-extrabold text-white mt-2">92%</div>
                  <div class="h-2 rounded-full bg-white/10 mt-3 overflow-hidden"><div class="bar h-full rounded-full bg-gradient-to-r from-accent to-accent2" data-w="92%"></div></div>
                </div>
                <div class="card-hover rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div class="flex items-center justify-between"><span class="text-xs text-slate-400">Серия дней</span><i class="fa-solid fa-fire text-orange-400"></i></div>
                  <div class="text-2xl font-display font-extrabold text-white mt-2">14 <span class="text-slate-500 text-base">дней</span></div>
                  <div class="text-xs text-slate-500 mt-3">Заходишь и ведёшь дневник без пропусков</div>
                </div>
              </div>

              <div class="grid lg:grid-cols-3 gap-4 mt-4">
                <div class="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="font-display font-bold text-white">Кривая капитала</h3>
                    <span class="text-xs font-mono text-emerald-400">+18.4% <span class="text-slate-500">/ демо</span></span>
                  </div>
                  <canvas id="eqChart" class="w-full rounded-lg bg-black/20" height="200"></canvas>
                  <p class="text-[11px] text-slate-500 mt-2">Демо-данные. Прошлые результаты не гарантируют будущей доходности.</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 class="font-display font-bold text-white mb-3">Последняя активность</h3>
                  <ul class="space-y-3 text-sm">
                    <li class="flex gap-3"><i class="fa-solid fa-circle-check text-emerald-400 mt-0.5"></i><div><div class="text-slate-200">Завершён модуль «Свинг-трейдинг»</div><div class="text-xs text-slate-500">2 часа назад</div></div></li>
                    <li class="flex gap-3"><i class="fa-solid fa-pen-to-square text-accent mt-0.5"></i><div><div class="text-slate-200">Добавлена сделка EUR/USD +3R</div><div class="text-xs text-slate-500">вчера</div></div></li>
                    <li class="flex gap-3"><i class="fa-solid fa-clipboard-check text-accent2 mt-0.5"></i><div><div class="text-slate-200">Пройден тест по риск-менеджменту</div><div class="text-xs text-slate-500">2 дня назад</div></div></li>
                    <li class="flex gap-3"><i class="fa-solid fa-trophy text-yellow-400 mt-0.5"></i><div><div class="text-slate-200">Достижение: «Дневник 20+ записей»</div><div class="text-xs text-slate-500">3 дня назад</div></div></li>
                  </ul>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mt-4">
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300"><i class="fa-solid fa-medal text-yellow-400 mr-1"></i> Риск-план собран</span>
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300"><i class="fa-solid fa-fire text-orange-400 mr-1"></i> 7 дней подряд</span>
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300"><i class="fa-solid fa-book text-accent mr-1"></i> 20+ записей в дневнике</span>
                <span class="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300"><i class="fa-solid fa-diagram-project text-accent2 mr-1"></i> Первая система</span>
              </div>
            </div>

            <!-- LESSONS -->
            <div data-panel="lessons" class="hidden">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-display font-bold text-white">Мои уроки</h3>
                <span class="text-xs text-slate-400">5 из 12 завершено</span>
              </div>
              <div id="lessons-list" class="space-y-3"></div>
            </div>

            <!-- JOURNAL -->
            <div data-panel="journal" class="hidden">
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4"><div class="text-xs text-slate-400">Winrate</div><div class="text-xl font-display font-bold text-white">58%</div></div>
                <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4"><div class="text-xs text-slate-400">Сделок</div><div class="text-xl font-display font-bold text-white">24</div></div>
                <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4"><div class="text-xs text-slate-400">Средний R</div><div class="text-xl font-display font-bold text-emerald-400">+0.7</div></div>
                <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4"><div class="text-xs text-slate-400">Профит-фактор</div><div class="text-xl font-display font-bold text-white">1.9</div></div>
              </div>
              <div class="overflow-x-auto rounded-xl border border-white/10">
                <table class="w-full text-sm min-w-[640px]">
                  <thead class="bg-white/[0.04] text-slate-400 text-xs uppercase tracking-wide">
                    <tr><th class="text-left font-medium px-4 py-3">Дата</th><th class="text-left font-medium px-4 py-3">Инструмент</th><th class="text-left font-medium px-4 py-3">Сторона</th><th class="text-left font-medium px-4 py-3">Риск</th><th class="text-left font-medium px-4 py-3">Результат</th><th class="text-left font-medium px-4 py-3">Статус</th></tr>
                  </thead>
                  <tbody id="journal-rows" class="divide-y divide-white/5"></tbody>
                </table>
              </div>
              <p class="text-[11px] text-slate-500 mt-3">Демо-журнал. В полной версии дневник заполняется вашими сделками и считает статистику автоматически.</p>
            </div>

          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 reveal">
        <a href="/trading-course-landing/app/" class="btn-anim btn-shine inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent2 text-ink font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40">
          <i class="fa-solid fa-table-columns"></i> Открыть демо-кабинет
        </a>
        <a href="#contact" class="anchor btn-anim inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10">
          Хочу такой кабинет <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- ============ REAL TRADES ============ -->
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto reveal">
        <span class="text-sm font-semibold text-accent uppercase tracking-wider">Честно о результатах</span>
        <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">Примеры из реальной торговли</h2>
        <p class="text-slate-400 mt-3">Убытки — нормальная часть процесса. Главное — следовать правилам.</p>
      </div>

      <div class="grid sm:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6 text-center">
          <div class="text-xs text-slate-400 uppercase tracking-wide">Интрадей</div>
          <div class="font-display font-extrabold text-3xl gradient-text mt-1">~60%</div>
          <div class="text-xs text-slate-400 mt-1">винрейт ментора</div>
        </div>
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6 text-center">
          <div class="text-xs text-slate-400 uppercase tracking-wide">Свинг</div>
          <div class="font-display font-extrabold text-3xl gradient-text mt-1">~80%</div>
          <div class="text-xs text-slate-400 mt-1">винрейт ментора</div>
        </div>
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6 text-center">
          <div class="text-xs text-slate-400 uppercase tracking-wide">Позиционный</div>
          <div class="font-display font-extrabold text-3xl gradient-text mt-1">~90%</div>
          <div class="text-xs text-slate-400 mt-1">винрейт ментора</div>
        </div>
      </div>
      <p class="reveal text-[11px] text-slate-500 text-center mt-3 max-w-3xl mx-auto">Винрейт — это доля прибыльных сделок по стилю, а не гарантия дохода. Прошлые результаты не гарантируют будущих.</p>

      <div class="reveal mt-10 max-w-4xl mx-auto">
        <div class="text-center text-sm text-slate-400 mb-4">Средние показатели учеников по форматам обучения</div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6">
            <div class="flex items-center gap-2 text-white font-display font-bold"><i class="fa-solid fa-users text-accent"></i> Групповое обучение</div>
            <div class="flex gap-8 mt-4">
              <div><div class="font-display font-extrabold text-3xl gradient-text">от 40%</div><div class="text-xs text-slate-400 mt-1">винрейт</div></div>
              <div><div class="font-display font-extrabold text-3xl gradient-text">2.5 : 1</div><div class="text-xs text-slate-400 mt-1">средний RR</div></div>
            </div>
          </div>
          <div class="card-hover rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/[0.07] to-accent2/[0.05] p-6">
            <div class="flex items-center gap-2 text-white font-display font-bold"><i class="fa-solid fa-user-graduate text-accent"></i> Личная программа</div>
            <div class="flex gap-8 mt-4">
              <div><div class="font-display font-extrabold text-3xl gradient-text">50%</div><div class="text-xs text-slate-400 mt-1">винрейт</div></div>
              <div><div class="font-display font-extrabold text-3xl gradient-text">3 : 1</div><div class="text-xs text-slate-400 mt-1">средний RR</div></div>
            </div>
          </div>
        </div>
        <p class="text-[11px] text-slate-500 text-center mt-3">Средние показатели по ученикам формата. RR — соотношение прибыли к риску. Это не гарантия результата для каждого.</p>
      </div>

      <div class="reveal mt-8 max-w-3xl mx-auto rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/[0.08] to-accent2/[0.05] p-6 sm:p-8 text-center">
        <div class="text-sm text-slate-300">Средняя доходность учеников и членов коммьюнити</div>
        <div class="font-display font-extrabold text-4xl sm:text-5xl gradient-text mt-2">20–40% <span class="text-2xl sm:text-3xl">/ мес</span></div>
        <p class="text-[11px] text-slate-400 mt-3 max-w-2xl mx-auto">Это не гарантия дохода и не типичный результат для каждого. Доходность зависит от рынка, риск-менеджмента и дисциплины; возможны убытки вплоть до потери капитала. Прошлые результаты не гарантируют будущих.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mt-12">
        <div class="reveal card-hover rounded-2xl border border-emerald-500/20 bg-ink2/50 p-6">
          <div class="flex items-center justify-between mb-4"><span class="inline-flex items-center gap-2 text-emerald-400 font-semibold"><i class="fa-solid fa-arrow-trend-up"></i> Удачная сделка</span><span class="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">+3R</span></div>
          <canvas class="trade-canvas w-full rounded-lg bg-black/20" data-type="win" height="170"></canvas>
          <div class="grid grid-cols-3 gap-3 mt-4 text-center text-sm">
            <div><div class="text-slate-400 text-xs">Риск</div><div class="text-white font-semibold">1%</div></div>
            <div><div class="text-slate-400 text-xs">Профит</div><div class="text-emerald-400 font-semibold">3R</div></div>
            <div><div class="text-slate-400 text-xs">По плану</div><div class="text-white font-semibold">Да</div></div>
          </div>
          <p class="text-sm text-slate-400 mt-4">Вход на ретесте уровня, стоп под структурой. Цель достигнута — позиция закрыта по правилам.</p>
        </div>
        <div class="reveal card-hover rounded-2xl border border-red-500/20 bg-ink2/50 p-6">
          <div class="flex items-center justify-between mb-4"><span class="inline-flex items-center gap-2 text-red-400 font-semibold"><i class="fa-solid fa-arrow-trend-down"></i> Убыточная сделка</span><span class="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-1 rounded">−1R</span></div>
          <canvas class="trade-canvas w-full rounded-lg bg-black/20" data-type="loss" height="170"></canvas>
          <div class="grid grid-cols-3 gap-3 mt-4 text-center text-sm">
            <div><div class="text-slate-400 text-xs">Риск</div><div class="text-white font-semibold">1%</div></div>
            <div><div class="text-slate-400 text-xs">Убыток</div><div class="text-red-400 font-semibold">1R</div></div>
            <div><div class="text-slate-400 text-xs">По плану</div><div class="text-white font-semibold">Да</div></div>
          </div>
          <p class="text-sm text-slate-400 mt-4">Сработал стоп-лосс. Убыток зафиксирован по правилам — это часть системы, а не ошибка дисциплины.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ TESTIMONIALS ============ -->
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto reveal">
        <span class="text-sm font-semibold text-accent uppercase tracking-wider">Отзывы</span>
        <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">Что меняется у учеников</h2>
        <p class="text-slate-400 mt-3">Без сумм заработка — только про подход и дисциплину.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-6 mt-12">
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6">
          <div class="text-accent mb-3"><i class="fa-solid fa-quote-left text-2xl"></i></div>
          <p class="text-slate-200">«Стал понимать рынок и перестал сливать депозит хаотично. Появилась структура в голове.»</p>
          <div class="flex items-center gap-3 mt-5"><span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent2/30 text-white font-semibold">И</span><div><div class="text-white text-sm font-semibold">Иван</div><div class="text-xs text-slate-400">ученик курса</div></div></div>
        </div>
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6">
          <div class="text-accent mb-3"><i class="fa-solid fa-quote-left text-2xl"></i></div>
          <p class="text-slate-200">«Дисциплина выросла, теперь торгую строго по плану. Эмоции больше не управляют сделками.»</p>
          <div class="flex items-center gap-3 mt-5"><span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent2/30 text-white font-semibold">М</span><div><div class="text-white text-sm font-semibold">Мария</div><div class="text-xs text-slate-400">ученица курса</div></div></div>
        </div>
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-6">
          <div class="text-accent mb-3"><i class="fa-solid fa-quote-left text-2xl"></i></div>
          <p class="text-slate-200">«Риск-менеджмент реально спас счёт во время просадки. Понял, зачем нужны правила.»</p>
          <div class="flex items-center gap-3 mt-5"><span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent2/30 text-white font-semibold">Д</span><div><div class="text-white text-sm font-semibold">Дмитрий</div><div class="text-xs text-slate-400">ученик курса</div></div></div>
        </div>
      </div>
      <p class="text-[11px] text-slate-500 text-center mt-6">Отзывы и имена приведены для демонстрации прототипа.</p>
    </div>
  </section>

  <!-- ============ PRICING ============ -->
  <section id="pricing" class="py-16 sm:py-24 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto reveal">
        <span class="text-sm font-semibold text-accent uppercase tracking-wider">Тарифы</span>
        <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">Выбери формат обучения</h2>
        <p class="text-slate-400 mt-3">Три формата — от группы до личного менторства. Прозрачные условия, без скрытых платежей.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-6 mt-12">
        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-8 flex flex-col">
          <div class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent text-lg"><i class="fa-solid fa-users"></i></div>
          <h3 class="font-display font-bold text-xl text-white mt-4">Групповой</h3>
          <p class="text-sm text-slate-400 mt-1">Обучение в группе с разборами</p>
          <div class="mt-4 flex items-end gap-2"><span class="font-display font-extrabold text-4xl text-white">$1000</span><span class="text-slate-400 mb-1">/ за курс</span></div>
          <div class="mt-3 self-start inline-flex items-center gap-2 text-xs text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1"><i class="fa-solid fa-server"></i> Secret Trading — на время обучения</div>
          <ul class="mt-6 space-y-3 text-slate-300 flex-1">
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Все 12 блоков и видеолекции</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Групповые разборы сделок</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Discord-комьюнити и домашки</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Личный кабинет и дневник сделок</li>
            <li class="flex gap-3 text-slate-500"><i class="fa-solid fa-minus mt-1"></i> Личные сессии с ментором</li>
          </ul>
          <button onclick="toast('Это демо — оплата не проводится. В боевой версии будет платёжный шлюз','info')" class="btn-anim mt-8 w-full py-3 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10">Выбрать</button>
        </div>

        <div class="reveal card-hover relative rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/[0.08] to-accent2/[0.06] p-8 flex flex-col md:-mt-4 md:mb-[-1rem]">
          <span class="absolute -top-3 right-6 text-xs font-semibold bg-gradient-to-r from-accent to-accent2 text-ink px-3 py-1 rounded-full shadow-lg shadow-accent/30">Популярный</span>
          <div class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent text-lg"><i class="fa-solid fa-user-graduate"></i></div>
          <h3 class="font-display font-bold text-xl text-white mt-4">Личный</h3>
          <p class="text-sm text-slate-400 mt-1">Индивидуальное обучение с ментором</p>
          <div class="mt-4 flex items-end gap-2"><span class="font-display font-extrabold text-4xl text-white">$2000</span><span class="text-slate-400 mb-1">/ за курс</span></div>
          <div class="mt-3 self-start inline-flex items-center gap-2 text-xs text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1"><i class="fa-solid fa-server"></i> Secret Trading — на 1 год</div>
          <ul class="mt-6 space-y-3 text-slate-200 flex-1">
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Всё из формата «Групповой»</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Личные сессии с ментором</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Персональная проверка домашних заданий</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Приоритетная поддержка</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Помощь с торговой системой и проп-счётом</li>
          </ul>
          <button onclick="toast('Это демо — оплата не проводится. В боевой версии будет платёжный шлюз','info')" class="btn-anim btn-shine mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent2 text-ink font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40">Выбрать</button>
        </div>

        <div class="reveal card-hover rounded-2xl border border-white/10 bg-ink2/50 p-8 flex flex-col">
          <div class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent text-lg"><i class="fa-solid fa-crown"></i></div>
          <h3 class="font-display font-bold text-xl text-white mt-4">Менторство</h3>
          <p class="text-sm text-slate-400 mt-1">Личное ведение до результата</p>
          <div class="mt-4 flex items-end gap-2"><span class="font-display font-extrabold text-4xl text-white">$5000</span><span class="text-slate-400 mb-1">/ за курс</span></div>
          <div class="mt-3 self-start inline-flex items-center gap-2 text-xs text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1"><i class="fa-solid fa-server"></i> Secret Trading — навсегда</div>
          <ul class="mt-6 space-y-3 text-slate-300 flex-1">
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Всё из формата «Личный»</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Еженедельные 1:1 сессии с ментором</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Сопровождение до построения своей системы</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Разбор работы с проп-счетами (в рамках правил)</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Постоянная связь с ментором</li>
            <li class="flex gap-3"><i class="fa-solid fa-check text-accent mt-1"></i> Доп. блок по психологии: внедрение моделей поведения, которые приводят к нужному результату</li>
          </ul>
          <div class="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-400"><i class="fa-solid fa-heart-pulse text-accent mr-1"></i> Подходит не только опытным, но и тем, кому важно проработать ментальные барьеры и дисциплину.</div>
          <button onclick="toast('Это демо — оплата не проводится. В боевой версии будет платёжный шлюз','info')" class="btn-anim mt-6 w-full py-3 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10">Выбрать</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ SECRET TRADING SERVER ============ -->
  <section id="server" class="py-16 sm:py-24 scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-10 items-center">
        <!-- Left: about -->
        <div class="reveal-l">
          <span class="inline-flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider"><i class="fa-solid fa-lock"></i> Закрытый сервер</span>
          <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">Сервер <span class="gradient-text">Secret Trading</span></h2>
          <p class="text-slate-300 mt-4 leading-relaxed">
            Закрытое комьюнити с регулярной аналитикой от команды менторов и приглашённых экспертов. Доступ открыт <span class="text-white font-medium">только тем, кто проходит обучение</span>.
          </p>
          <div class="mt-5 space-y-4 text-slate-300">
            <div class="flex gap-3"><i class="fa-solid fa-sun text-accent mt-1"></i><div><span class="text-white font-medium">Ежедневные обзоры рынка</span> перед началом торгового дня — от команды опытных трейдеров и менторов проекта</div></div>
            <div class="flex gap-3"><i class="fa-solid fa-globe text-accent mt-1"></i><div><span class="text-white font-medium">Макроэкономический обзор раз в 2 недели</span> — от управляющего хедж-фондами в США с опытом более 10 лет в финансах и инвестициях</div></div>
            <div class="flex gap-3"><i class="fa-solid fa-calendar-week text-accent mt-1"></i><div><span class="text-white font-medium">Еженедельный обзор рынка</span> лично от ментора проекта</div></div>
            <div class="flex gap-3"><i class="fa-solid fa-trophy text-accent mt-1"></i><div><span class="text-white font-medium">Соревнования между трейдерами</span> с ценными призами: денежные суммы в&nbsp;$, проп-счета и пожизненная бесплатная подписка на сервер</div></div>
          </div>

          <div class="mt-6 rounded-xl border border-white/10 bg-ink2/50 p-5">
            <div class="text-sm font-semibold text-white mb-3">Доступ входит в формат обучения:</div>
            <div class="grid sm:grid-cols-3 gap-3 text-sm">
              <div class="rounded-lg bg-white/5 p-3"><div class="text-slate-400 text-xs">Групповой</div><div class="text-white font-medium mt-1">на время обучения</div></div>
              <div class="rounded-lg bg-white/5 p-3"><div class="text-slate-400 text-xs">Личный</div><div class="text-white font-medium mt-1">на 1 год</div></div>
              <div class="rounded-lg bg-white/5 p-3"><div class="text-slate-400 text-xs">Менторство</div><div class="text-accent font-medium mt-1">навсегда</div></div>
            </div>
          </div>
          <p class="text-[11px] text-slate-500 mt-3">Сервер носит образовательный характер. Это не сигналы с гарантией прибыли — окончательные решения вы принимаете самостоятельно.</p>
        </div>

        <!-- Right: subscription -->
        <div class="reveal-r">
          <div class="rounded-2xl border border-white/10 bg-ink2/60 p-6 sm:p-8">
            <div class="flex items-center gap-3 mb-2">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-ink text-lg"><i class="fa-solid fa-server"></i></span>
              <div>
                <div class="font-display font-bold text-white">Продление доступа</div>
                <div class="text-xs text-slate-400">по подписке · только для учеников курса</div>
              </div>
            </div>
            <p class="text-sm text-slate-400 mt-2 mb-5">Когда включённый в обучение период закончится, доступ к серверу можно продлить:</p>

            <div class="space-y-3">
              <button onclick="toast('Это демо — оплата подписки не проводится. В боевой версии будет платёжный шлюз','info')" class="card-hover w-full text-left rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between">
                <div><div class="font-semibold text-white">1 месяц</div><div class="text-xs text-slate-400">доступ к серверу Secret Trading</div></div>
                <div class="text-right"><div class="font-display font-extrabold text-2xl text-white">$100</div></div>
              </button>
              <button onclick="toast('Это демо — оплата подписки не проводится. В боевой версии будет платёжный шлюз','info')" class="card-hover relative w-full text-left rounded-xl border border-accent/40 bg-accent/[0.06] p-4 flex items-center justify-between">
                <span class="absolute -top-2.5 left-4 text-[10px] font-semibold bg-gradient-to-r from-accent to-accent2 text-ink px-2 py-0.5 rounded-full">выгодно</span>
                <div><div class="font-semibold text-white">3 месяца</div><div class="text-xs text-slate-400">≈ $67 / мес · экономия 33%</div></div>
                <div class="text-right"><div class="font-display font-extrabold text-2xl text-white">$200</div></div>
              </button>
              <button onclick="toast('Это демо — оплата подписки не проводится. В боевой версии будет платёжный шлюз','info')" class="card-hover relative w-full text-left rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between">
                <span class="absolute -top-2.5 left-4 text-[10px] font-semibold bg-white/10 text-accent px-2 py-0.5 rounded-full">макс. выгода</span>
                <div><div class="font-semibold text-white">1 год</div><div class="text-xs text-slate-400">≈ $42 / мес · экономия 58%</div></div>
                <div class="text-right"><div class="font-display font-extrabold text-2xl text-white">$500</div></div>
              </button>
            </div>
            <p class="text-[11px] text-slate-500 mt-4 text-center">Подписка доступна только тем, кто приобрёл обучение.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ DISCLAIMER ============ -->
  <section class="py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="reveal rounded-2xl border-2 border-yellow-400/40 bg-yellow-400/[0.06] p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row gap-4 items-start">
          <span class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-300 text-2xl"><i class="fa-solid fa-triangle-exclamation"></i></span>
          <div>
            <h3 class="font-display font-bold text-lg text-yellow-200 mb-2">Предупреждение о рисках</h3>
            <p class="text-yellow-100/80 leading-relaxed text-sm sm:text-base">
              Торговля на финансовых рынках сопряжена с высоким риском потери капитала. Любые результаты в прошлом не гарантируют прибыли в будущем. Курс носит образовательный характер и не даёт гарантий дохода. Все торговые решения вы принимаете самостоятельно. Проп-фирмы имеют свои правила — не нарушайте их.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ CONTACT ============ -->
  <section id="contact" class="py-16 sm:py-24 scroll-mt-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="reveal rounded-2xl border border-white/10 bg-ink2/60 p-7 sm:p-10">
        <div class="text-center max-w-xl mx-auto">
          <span class="text-sm font-semibold text-accent uppercase tracking-wider">Бесплатная консультация</span>
          <h2 class="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">Записаться на разговор с ментором</h2>
          <p class="text-slate-400 mt-3">Оставь контакты — обсудим твою ситуацию и подберём формат обучения.</p>
        </div>
        <form id="lead-form" class="mt-8 space-y-4" novalidate>
          <div class="grid sm:grid-cols-2 gap-4">
            <div><label class="block text-sm text-slate-300 mb-1.5">Имя</label>
              <input name="name" type="text" required placeholder="Как к вам обращаться" class="w-full rounded-xl bg-ink/60 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition" /></div>
            <div><label class="block text-sm text-slate-300 mb-1.5">Email</label>
              <input name="email" type="email" required placeholder="you@email.com" class="w-full rounded-xl bg-ink/60 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition" /></div>
          </div>
          <div><label class="block text-sm text-slate-300 mb-1.5">Telegram <span class="text-slate-500">(опционально)</span></label>
            <input name="telegram" type="text" placeholder="@username" class="w-full rounded-xl bg-ink/60 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition" /></div>
          <label class="flex items-start gap-3 text-sm text-slate-300 cursor-pointer select-none">
            <input type="checkbox" class="mt-1 h-4 w-4 rounded border-white/20 bg-ink text-accent focus:ring-accent/40" />
            <span>Я ознакомлен с дисклеймером и принимаю условия обучения.</span>
          </label>
          <button type="submit" class="btn-anim btn-shine w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent2 text-ink font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40">
            <i class="fa-solid fa-paper-plane mr-2"></i> Отправить заявку
          </button>
          <p class="text-[11px] text-slate-500 text-center">Демо-форма: данные никуда не отправляются.</p>
        </form>
      </div>
    </div>
  </section>

  <!-- ============ FOOTER ============ -->
  <footer class="border-t border-white/5 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#top" class="anchor flex items-center gap-2">
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-ink font-display font-extrabold text-lg">M</span>
          <span class="font-display font-extrabold text-lg text-white">Mind<span class="text-accent">Trade</span></span>
        </a>
        <nav class="flex items-center gap-6 text-sm text-slate-400">
          <a href="/trading-course-landing/privacy/" class="hover:text-accent transition-colors">Политика конфиденциальности</a>
          <a href="/trading-course-landing/offer/" class="hover:text-accent transition-colors">Оферта</a>
          <a href="/trading-course-landing/admin/" class="hover:text-accent transition-colors">Админ-панель</a>
        </nav>
        <div class="flex items-center gap-3">
          <a href="#" onclick="toast('Демо-ссылка на соцсеть','info'); return false;" class="btn-anim inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-accent hover:border-accent/40" aria-label="Telegram"><i class="fa-brands fa-telegram"></i></a>
          <a href="#" onclick="toast('Демо-ссылка на соцсеть','info'); return false;" class="btn-anim inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-accent hover:border-accent/40" aria-label="Discord"><i class="fa-brands fa-discord"></i></a>
          <a href="#" onclick="toast('Демо-ссылка на соцсеть','info'); return false;" class="btn-anim inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-accent hover:border-accent/40" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>
      <p class="text-center text-xs text-slate-500 mt-8">© 2026 MindTrade. Образовательный проект. Прототип для демонстрации.</p>
    </div>
  </footer>

  </div><!-- /.layer -->

  <button id="toTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Наверх" class="fixed bottom-5 left-5 z-[90] h-12 w-12 rounded-full bg-gradient-to-br from-accent to-accent2 text-ink shadow-lg shadow-accent/30 flex items-center justify-center hover:scale-110 transition-transform"><i class="fa-solid fa-arrow-up"></i></button>

  <!-- MODAL -->
  <div id="modal" class="fixed inset-0 z-[80] hidden items-center justify-center p-4">
    <div id="modal-backdrop" class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0"></div>
    <div id="modal-panel" class="modal-panel relative w-full max-w-lg rounded-2xl border border-white/10 bg-ink2 p-7 shadow-2xl opacity-0 scale-95">
      <button onclick="closeModal()" class="absolute top-4 right-4 h-9 w-9 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5"><i class="fa-solid fa-xmark"></i></button>
      <div class="flex items-center gap-3 mb-4">
        <span id="modal-icon" class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent text-xl"><i class="fa-solid fa-book"></i></span>
        <div><div id="modal-tag" class="text-xs font-semibold text-accent uppercase tracking-wider">Блок</div><h3 id="modal-title" class="font-display font-bold text-xl text-white">Заголовок</h3></div>
      </div>
      <p id="modal-desc" class="text-slate-300 leading-relaxed"></p>
      <div class="mt-5 rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-4 text-sm text-slate-400"><i class="fa-solid fa-circle-info text-accent mr-2"></i> Детальный план блока будет в полной версии курса.</div>
      <button onclick="closeModal()" class="btn-anim mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent2 text-ink font-semibold">Понятно</button>
    </div>
  </div>

  <div id="toast-wrap" aria-live="polite"></div>

  
`;
