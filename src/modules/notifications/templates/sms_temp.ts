export const smsTemplate = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SMS — Notification</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #F4F6FA;
    --surface:   #FFFFFF;
    --surface-2: #F8F9FC;
    --border:    #E4E8F0;
    --border-2:  #CDD3DF;
    --accent:    #3B6FE8;
    --accent-lt: #EBF0FD;
    --accent-dk: #2550B8;
    --success:   #18A06B;
    --success-lt:#E6F7F1;
    --muted:     #8892A4;
    --text:      #1A2035;
    --text-2:    #4B5671;
    --shadow-sm: 0 1px 3px rgba(30,40,80,.06), 0 1px 2px rgba(30,40,80,.04);
    --shadow-md: 0 4px 16px rgba(30,40,80,.08), 0 1px 4px rgba(30,40,80,.04);
    --radius:    14px;
    --radius-sm: 9px;
    --radius-xs: 6px;
    --font: 'DM Sans', sans-serif;
    --mono: 'DM Mono', monospace;
  }

  html, body {
    min-height: 100vh;
    background: var(--bg);
    font-family: var(--font);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  /* ── Page shell ── */
  .page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem 3rem;
  }

  /* ── Top bar ── */
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.2rem;
  }
  .topbar-left { display: flex; align-items: center; gap: 14px; }
  .topbar-icon {
    width: 44px; height: 44px;
    border-radius: var(--radius-sm);
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 12px rgba(59,111,232,.35);
  }
  .topbar-icon i { font-size: 22px; color: #fff; }
  .topbar-title { font-size: 22px; font-weight: 600; color: var(--text); letter-spacing: -.3px; }
  .topbar-sub   { font-size: 13px; color: var(--muted); margin-top: 1px; }
  .badge-live {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 500; color: var(--success);
    background: var(--success-lt);
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid #b5e8d5;
  }
  .badge-live .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--success);
    animation: pulse 1.8s infinite;
  }
  @keyframes pulse {
    0%,100%{ box-shadow:0 0 0 0 rgba(24,160,107,.5) }
    50%    { box-shadow:0 0 0 5px rgba(24,160,107,0) }
  }

  /* ── Grid ── */
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 1.25rem;
    align-items: start;
  }

  /* ── Card ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }
  .card-header {
    padding: 1.15rem 1.4rem;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
    background: var(--surface);
  }
  .card-header-icon {
    width: 32px; height: 32px; border-radius: var(--radius-xs);
    background: var(--accent-lt);
    display: flex; align-items: center; justify-content: center;
  }
  .card-header-icon i { font-size: 16px; color: var(--accent); }
  .card-header h2 { font-size: 14px; font-weight: 600; color: var(--text); }
  .card-header p  { font-size: 12px; color: var(--muted); margin-top: 1px; }
  .card-body { padding: 1.4rem; }

  /* ── Form elements ── */
  .field { margin-bottom: 1.2rem; }
  .field:last-of-type { margin-bottom: 0; }
  label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-2);
    text-transform: uppercase;
    letter-spacing: .6px;
    margin-bottom: 7px;
  }

  .select-wrap { position: relative; }
  .select-wrap i {
    position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%);
    font-size: 16px; color: var(--muted);
    pointer-events: none;
  }
  select {
    width: 100%;
    appearance: none;
    height: 44px;
    padding: 0 38px 0 14px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface-2);
    font-family: var(--font);
    font-size: 14px;
    color: var(--text);
    cursor: pointer;
    transition: border-color .15s, box-shadow .15s;
  }
  select:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(59,111,232,.12);
  }
  select option[value=""] { color: var(--muted); }

  textarea {
    width: 100%;
    height: 148px;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface-2);
    font-family: var(--font);
    font-size: 14px;
    color: var(--text);
    line-height: 1.65;
    resize: none;
    transition: border-color .15s, box-shadow .15s;
  }
  textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(59,111,232,.12);
  }
  textarea::placeholder { color: #B5BCCC; }

  .char-row {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 7px;
  }
  .char-hint { font-size: 12px; color: var(--muted); }
  .char-count {
    font-size: 12px; font-family: var(--mono);
    color: var(--muted);
    transition: color .2s;
  }
  .char-count.warn { color: #e07a00; }
  .char-count.over { color: #d63030; }

  /* ── Divider ── */
  .divider {
    height: 1px; background: var(--border);
    margin: 1.4rem 0;
  }

  /* ── Send row ── */
  .send-row {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  }
  .toast {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 500; color: var(--success);
    background: var(--success-lt);
    border: 1px solid #b5e8d5;
    padding: 7px 13px;
    border-radius: 999px;
    opacity: 0;
    transform: translateY(4px);
    transition: opacity .25s, transform .25s;
    pointer-events: none;
  }
  .toast.show { opacity: 1; transform: translateY(0); }
  .toast i { font-size: 14px; }

  .btn-send {
    display: flex; align-items: center; gap: 8px;
    padding: 0 20px;
    height: 42px;
    border: none;
    border-radius: var(--radius-sm);
    background: var(--accent);
    color: #fff;
    font-family: var(--font);
    font-size: 14px; font-weight: 600;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(59,111,232,.35);
    transition: background .15s, box-shadow .15s, transform .1s, opacity .15s;
    white-space: nowrap;
  }
  .btn-send i { font-size: 16px; }
  .btn-send:hover:not(:disabled) {
    background: var(--accent-dk);
    box-shadow: 0 5px 14px rgba(59,111,232,.4);
  }
  .btn-send:active:not(:disabled) { transform: scale(.975); }
  .btn-send:disabled {
    opacity: .55;
    cursor: not-allowed;
    box-shadow: none;
  }
  .btn-send .spinner {
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .7s linear infinite;
    display: none;
  }
  .btn-send.loading .spinner { display: block; }
  .btn-send.loading .send-icon { display: none; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Stats ── */
  .stats-row {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 10px; margin-bottom: 1.2rem;
  }
  .stat {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px 12px;
    text-align: center;
  }
  .stat-val {
    font-size: 26px; font-weight: 600;
    color: var(--accent);
    font-family: var(--mono);
    letter-spacing: -1px;
    line-height: 1;
  }
  .stat-lbl {
    font-size: 11px; color: var(--muted);
    text-transform: uppercase; letter-spacing: .5px;
    margin-top: 5px;
  }

  /* ── Message list ── */
  .msg-list-wrap { max-height: 420px; overflow-y: auto; }
  .msg-list-wrap::-webkit-scrollbar { width: 4px; }
  .msg-list-wrap::-webkit-scrollbar-track { background: transparent; }
  .msg-list-wrap::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 4px; }

  .msg-list { display: flex; flex-direction: column; gap: 8px; }

  .msg-item {
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 11px 13px;
    background: var(--surface);
    cursor: default;
    transition: border-color .15s, box-shadow .15s;
    animation: slideIn .3s ease both;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .msg-item:hover {
    border-color: var(--border-2);
    box-shadow: var(--shadow-sm);
  }
  .msg-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 5px;
  }
  .msg-name {
    font-size: 13px; font-weight: 600; color: var(--text);
    display: flex; align-items: center; gap: 5px;
  }
  .msg-name i { font-size: 13px; color: var(--muted); }
  .msg-num {
    font-size: 11px; color: var(--muted);
    font-family: var(--mono);
    margin-top: 2px;
  }
  .msg-time {
    font-size: 11px; color: var(--muted);
    font-family: var(--mono);
    white-space: nowrap;
  }
  .msg-preview {
    font-size: 13px; color: var(--text-2);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-top: 6px;
    max-width: 100%;
  }
  .msg-footer {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 8px;
  }
  .badge-sent {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 10px; font-weight: 600;
    color: var(--success);
    background: var(--success-lt);
    border: 1px solid #b5e8d5;
    padding: 2px 8px; border-radius: 999px;
    text-transform: uppercase; letter-spacing: .4px;
  }
  .badge-sent i { font-size: 11px; }
  .msg-idx {
    font-size: 10px; color: var(--muted); font-family: var(--mono);
  }

  /* ── Empty state ── */
  .empty-state {
    text-align: center; padding: 2.5rem 1rem;
    color: var(--muted);
  }
  .empty-state i { font-size: 36px; opacity: .35; display: block; margin-bottom: 10px; }
  .empty-state p { font-size: 13px; }

  .toast.success { color: #18A06B; background: #E6F7F1; border: 1px solid #b5e8d5; padding: 7px 13px; border-radius: 999px; opacity: 0; transition: opacity .25s; }
.toast.error   { color: #d63030; background: #fdecec; border: 1px solid #f5c2c2; padding: 7px 13px; border-radius: 999px; opacity: 0; transition: opacity .25s; }
.toast.show    { opacity: 1; }

  /* ── Responsive ── */
  @media (max-width: 720px) {
    .grid { grid-template-columns: 1fr; }
    .topbar { flex-direction: column; align-items: flex-start; gap: 12px; }
  }
</style>
</head>
<body>

<div class="page">

  <!-- Top bar -->
  <div class="topbar">
    <div class="topbar-left">
      <div class="topbar-icon">💬</div>
      <div>
        <div class="topbar-title">Inbox Messenger</div>
        <div class="topbar-sub">Send text messages to your contacts</div>
      </div>
    </div>
    <div class="badge-live"><span class="dot"></span> System online</div>
  </div>

  <!-- Two-column grid -->
  <div class="grid">

    <!-- ── Col 8: Compose ── -->
    <div class="card">
      <div class="card-header">
        <div class="card-header-icon">✏️</div>
        <div>
          <h2>Compose Message</h2>
          <p>Select a recipient and write your message</p>
        </div>
      </div>
      <div class="card-body">

        <div class="field">
          <label for="recipient">Recipient Number</label>
          <div class="select-wrap">
            <select id="recipient">
              <option value="" disabled selected>Choose a contact number…</option>
              <option value="+923077615968|Muhammad Waqas">+92 307 7615968 - Muhammad Waqas</option>
              <option value="+923230081643|Muhammad Rizwan Arain">+92 323 0081643 - Muhammad Rizwan Arain</option>
              <option value="+1 (469) 555-0234|Carol White">+1 (469) 555-0234 — Adnan Ali</option>
              <option value="+1 (972) 555-0317|David Kim">+1 (972) 555-0317 — Bilal Riaz</option>
              <option value="+1 (817) 555-0422|Emma Davis">+1 (817) 555-0422 — Gulfam Irfan</option>
              <option value="+1 (214) 555-0558|Frank Lee">+1 (214) 555-0558 — Rehan Ali</option>
            </select>
            <i>  ˅ </i>
          </div>
        </div>

        <div class="field">
          <label for="message">Message</label>
          <textarea id="message" placeholder="Type your message here…" maxlength="160" oninput="onType()"></textarea>
          <div class="char-row">
            <span class="char-hint">Max 160 characters (1 SMS)</span>
            <span class="char-count" id="charCount">0 / 160</span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="send-row">
          <!-- <div class="toast" id="toast">
            ✓ Message sent successfully!
          </div> -->
          <div class="toast success" id="toast"></div>
          <!-- <button class="btn-send" id="sendBtn" onclick="sendMessage()">
            <span class="spinner"></span>
            ➤  Send Message
          </button> -->
          <button type="button" class="btn-send" id="sendBtn">
            <span class="spinner"></span>
            <span class="send-label">➤ Send Message</span>
          </button>
        </div>

      </div>
    </div>

    <!-- ── Col 4: Sent log ── -->
    <div class="card">
      <div class="card-header">
        <div class="card-header-icon">🕐</div>
        <div>
          <h2>Sent Messages</h2>
          <p>Recent outbox activity</p>
        </div>
      </div>
      <div class="card-body">

        <div class="stats-row">
          <div class="stat">
            <div class="stat-val" id="totalSent">0</div>
            <div class="stat-lbl">Total Sent</div>
          </div>
          <div class="stat">
            <div class="stat-val" id="totalRecip">0</div>
            <div class="stat-lbl">Recipients</div>
          </div>
        </div>

        <div class="msg-list-wrap">
          <div class="msg-list" id="msgList">
            <div class="empty-state" id="emptyState">
              <i class="ti ti-inbox-off"></i>
              <p>No messages sent yet.<br>Compose your first message.</p>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>

<script>
  // ── 1. Config & state ─────────────────────────────────────────────
  const API_URL = 'http://localhost:3000/notification/send-sms';
  const sent = [];
  const recipients = new Set();

  // ── 2. DOM refs ───────────────────────────────────────────────────
  const selEl = document.getElementById('recipient');
  const msgEl = document.getElementById('message');
  const btn = document.getElementById('sendBtn');
  const toast = document.getElementById('toast');
  const sendLabel = btn ? btn.querySelector('.send-label') : null;

  // ── 3. UI helpers ─────────────────────────────────────────────────
  function onType() {
    const len = msgEl?.value?.length;
    const el = document.getElementById('charCount');
    el.textContent = len + ' / 160';
    el.className =
      'char-count' + (len >= 160 ? ' over' : len >= 130 ? ' warn' : '');
  }

  function nowTime() {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function setLoading(loading) {
    btn.disabled = loading;
    btn.classList.toggle('loading', loading);
    if (sendLabel) {
      sendLabel.textContent = loading ? 'Sending…' : '➤ Send Message';
    }
  }

  let toastTimer = null;
  function showToast(type, text) {
    toast.className = 'toast show ' + type;
    toast.textContent = text;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 4000);
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function parseApiError(res, data) {
    if (data && Array.isArray(data.message)) return data.message.join(', ');
    if (data && typeof data.message === 'string') return data.message;
    if (data && typeof data.error === 'string') return data.error;
    return 'Request failed (' + res.status + ')';
  }

  // ── 4. HTTP: send SMS ─────────────────────────────────────────────
  async function sendSmsRequest(payload) {
    try {
      const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    let data = null;
    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      try {
        data = await res.json();
      } catch (e) {
        data = null;
      }
    } else {
      const text = await res.text();
      if (text) data = { message: text };
    }

    if (!res.ok) {
      const err = new Error(parseApiError(res, data));
      err.status = res.status;
      err.data = data;
      // throw err;
      console.error('API Error:', err);
    }
    return data;
    
    } catch (error) {
      console.error('Error in sendSmsRequest:', error);
    }
  }

  // ── 5. Render sent list ───────────────────────────────────────────
  function renderList() {
    const list = document.getElementById('msgList');

    if (!sent.length) {
      list.innerHTML =
        '<div class="empty-state" id="emptyState">No messages sent yet.<br>Compose your first message.</div>';
      return;
    }

    list.innerHTML = '';
    sent.forEach(function (m, i) {
      const el = document.createElement('motion');
      el.className = 'msg-item';
      el.innerHTML =
        '<div class="msg-top">' +
        '<div><motion class="msg-name">👤 ' +
        escHtml(m.name) +
        '</div><div class="msg-num">' +
        escHtml(m.number) +
        '</div></div>' +
        '<div class="msg-time">' +
        escHtml(m.time) +
        '</div></div>' +
        '<div class="msg-preview">' +
        escHtml(m.msg) +
        '</motion>' +
        '<div class="msg-footer">' +
        '<span class="badge-sent">✓ Sent</span>' +
        '<span class="msg-idx">#' +
        (sent.length - i) +
        '</span></div>';
      list.appendChild(el);
    });
  }

  // ── 6. Send flow (validate → API → UI) ────────────────────────────
  async function sendMessage() {
    const selVal = selEl.value.trim();
    const msg = msgEl.value.trim();

    if (!selVal) {
      selEl.focus();
      showToast('error', 'Please choose a recipient.');
      return;
    }
    if (!msg) {
      msgEl.focus();
      showToast('error', 'Please enter a message.');
      return;
    }

    const parts = selVal.split('|');
    const number = (parts[0] || '').trim();
    const name = (parts[1] || number).trim();

    // Matches InboxSmsDTO: { to, message }
    const payload = {
      to: number,
      message: msg,
    };

  
    setLoading(true);

    try {
      const result =  await sendSmsRequest(payload);
   

      sent.unshift({
        name: name,
        number: number,
        msg: msg,
        time: nowTime(),
      });
      recipients.add(number);

      document.getElementById('totalSent').textContent = String(sent.length);
      document.getElementById('totalRecip').textContent = String(
        recipients.size,
      );

      renderList();

      selEl.value = '';
      msgEl.value = '';
      onType();

      showToast('success', '✓ Message sent successfully!');
    } catch (err) {
      console.error('[sms] failed:', err);
      showToast(
        'error',
        '✗ ' + ('Failed to send message.'),
      );
    } finally {
      setLoading(false);
    }
  }

  // ── 7. Init ───────────────────────────────────────────────────────
  msgEl.addEventListener('input', onType);
  btn.addEventListener('click', sendMessage);
  onType();

</script>
</body>
</html>

  `;
};