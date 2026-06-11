export default `
  <div class="aurora"><span class="b1"></span><span class="b2"></span><span class="b3"></span></div>

  <div class="layer" style="min-height:100vh; display:grid; grid-template-columns:1fr;">
    <div style="display:grid; min-height:100vh;" class="lg-split">

      <!-- Brand panel -->
      <aside class="brand-panel">
        <div style="max-width:460px;">
          <a href="/trading-course-landing/" style="display:inline-flex; align-items:center; gap:.6rem; margin-bottom:2.5rem;">
            <span style="display:inline-flex; height:40px; width:40px; align-items:center; justify-content:center; border-radius:.8rem; background:linear-gradient(135deg,#2DD4BF,#3B82F6); color:#0B1121; font-weight:800; font-size:1.2rem;" class="font-display">M</span>
            <span class="font-display" style="font-weight:800; font-size:1.25rem; color:#fff;">Mind<span style="color:#2DD4BF;">Trade</span></span>
          </a>
          <h1 class="font-display" style="font-weight:800; font-size:2.4rem; line-height:1.15; color:#fff; margin:0 0 1rem;">
            Личный кабинет <span class="gradient-text">ученика</span>
          </h1>
          <p style="color:#cbd5e1; font-size:1.05rem; line-height:1.6;">
            Прогресс по 12 блокам, уроки, дневник сделок и статистика — в одном месте. Учись системно и веди статистику честно.
          </p>
          <div style="margin-top:2rem; display:grid; gap:.9rem;">
            <div style="display:flex; gap:.8rem; align-items:center; color:#cbd5e1;"><i class="fa-solid fa-circle-check" style="color:#2DD4BF;"></i> Прогресс и продолжение с того же места</div>
            <div style="display:flex; gap:.8rem; align-items:center; color:#cbd5e1;"><i class="fa-solid fa-circle-check" style="color:#2DD4BF;"></i> Дневник сделок и аналитика результатов</div>
            <div style="display:flex; gap:.8rem; align-items:center; color:#cbd5e1;"><i class="fa-solid fa-circle-check" style="color:#2DD4BF;"></i> Подключение брокера в режиме «только чтение»</div>
          </div>
          <canvas id="brandChart" height="120" style="width:100%; height:120px; margin-top:2rem; border-radius:.8rem; background:rgba(0,0,0,.2);"></canvas>
          <p style="font-size:.7rem; color:#64748b; margin-top:.6rem;">Демо-данные. Не является торговой рекомендацией.</p>
        </div>
      </aside>

      <!-- Form panel -->
      <main style="display:flex; align-items:center; justify-content:center; padding:2rem 1.5rem;">
        <div class="card" style="width:100%; max-width:420px; padding:2rem;">
          <div style="display:flex; gap:.5rem; padding:.3rem; background:rgba(255,255,255,.04); border-radius:.8rem; margin-bottom:1.5rem;">
            <button id="tab-login" class="btn btn-primary btn-block btn-sm" onclick="switchAuth('login')">Вход</button>
            <button id="tab-reg" class="btn btn-ghost btn-block btn-sm" onclick="switchAuth('reg')">Регистрация</button>
          </div>

          <form id="auth-form" onsubmit="return doAuth(event)">
            <div id="reg-name" style="display:none; margin-bottom:1rem;">
              <label class="label">Имя</label>
              <input class="input" type="text" placeholder="Как к вам обращаться" />
            </div>
            <div style="margin-bottom:1rem;">
              <label class="label">Email</label>
              <input class="input" type="email" placeholder="you@email.com" value="student@demo.io" />
            </div>
            <div style="margin-bottom:.6rem;">
              <label class="label">Пароль</label>
              <div style="position:relative;">
                <input id="pwd" class="input" type="password" placeholder="••••••••" value="demo1234" />
                <button type="button" onclick="togglePwd()" style="position:absolute; right:.6rem; top:50%; transform:translateY(-50%); background:none; border:none; color:#64748b; cursor:pointer;"><i class="fa-regular fa-eye"></i></button>
              </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.2rem; font-size:.82rem;">
              <label style="display:flex; gap:.5rem; align-items:center; color:#cbd5e1; cursor:pointer;"><input type="checkbox" checked /> Запомнить меня</label>
              <a href="#" data-toast="Демо: восстановление пароля в полной версии" style="color:#2DD4BF;">Забыли пароль?</a>
            </div>
            <label style="display:flex; gap:.6rem; align-items:flex-start; color:#94a3b8; font-size:.78rem; margin-bottom:1rem; cursor:pointer;">
              <input type="checkbox" required style="margin-top:.15rem;" />
              <span>Принимаю <a href="/trading-course-landing/privacy/" style="color:#2DD4BF;">политику конфиденциальности</a> и даю <a href="/trading-course-landing/consent/" style="color:#2DD4BF;">согласие на обработку ПДн</a>.</span>
            </label>
            <button type="submit" class="btn btn-primary btn-block btn-shine"><i class="fa-solid fa-right-to-bracket"></i> <span id="auth-submit">Войти в кабинет</span></button>
          </form>

          <div style="display:flex; align-items:center; gap:1rem; margin:1.4rem 0; color:#64748b; font-size:.8rem;">
            <span style="flex:1; height:1px; background:rgba(255,255,255,.1);"></span> или <span style="flex:1; height:1px; background:rgba(255,255,255,.1);"></span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:.6rem;">
            <button class="btn btn-outline btn-sm" data-toast="Демо: вход через Google в полной версии"><i class="fa-brands fa-google"></i> Google</button>
            <button class="btn btn-outline btn-sm" data-toast="Демо: вход через Telegram в полной версии"><i class="fa-brands fa-telegram"></i> Telegram</button>
          </div>

          <p style="text-align:center; color:#64748b; font-size:.75rem; margin-top:1.4rem;">
            Это демо-вход. Любые данные подойдут — нажмите «Войти».<br>
            <a href="/trading-course-landing/" style="color:#94a3b8;"><i class="fa-solid fa-arrow-left"></i> На главную</a>
            &nbsp;·&nbsp; <a href="/trading-course-landing/admin/" style="color:#2DD4BF;">Демо админ-панели</a>
          </p>
        </div>
      </main>
    </div>
  </div>

  

  
  
`;
