export const emailTemplate = (name: string) => {
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email — Notification</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --page-bg: #e8eef7;
      --surface: #ffffff;
      --border: #dadce0;
      --text: #202124;
      --muted: #5f6368;
      --primary: #1a73e8;
      --primary-hover: #1557b0;
      --toolbar-bg: #f1f3f4;
      --radius: 12px;
      --shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
      --font-ui: "Google Sans", "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
      --font-body: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-body);
      font-size: 14px;
      background: var(--page-bg);
      color: var(--text);
      -webkit-font-smoothing: antialiased;
    }

    .shell {
      width: 100%;
      max-width: 900px;
      padding: 24px 16px;
      margin: 0 auto;
    }

    .compose-card {
      background: var(--surface);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
      overflow: hidden;
    }

    .compose-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(180deg, #fafbfc 0%, #fff 100%);
    }

    .compose-title {
      font-family: var(--font-ui);
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0.00625em;
      line-height: 20px;
    }

    .email-logo-mark {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--primary);
      opacity: 0.95;
    }

    .email-logo-mark svg {
      display: block;
    }

    .field-row {
      display: flex;
      align-items: center;
      min-height: 48px;
      padding: 0 16px;
      border-bottom: 1px solid var(--border);
      gap: 12px;
    }
    .field-row:last-of-type { border-bottom: none; }

    .field-label {
      width: 72px;
      flex-shrink: 0;
      font-family: var(--font-ui);
      font-size: 13px;
      color: var(--muted);
      font-weight: 500;
      letter-spacing: 0.00625em;
    }

    .field-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      font-family: var(--font-body);
      letter-spacing: 0.00625em;
      padding: 12px 0;
      color: var(--text);
      background: transparent;
    }
    .field-input::placeholder { color: #80868b; }

    .toolbar {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 6px 8px;
      background: var(--toolbar-bg);
      border-bottom: 1px solid var(--border);
      flex-wrap: wrap;
    }

    .toolbar button {
      border: none;
      background: transparent;
      padding: 8px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
      font-family: var(--font-ui);
      color: var(--muted);
    }
    .toolbar button:hover { background: rgba(0, 0, 0, 0.06); }

    .body-wrap {
      min-height: 220px;
      padding: 0;
    }

    .body-input {
      width: 100%;
      min-height: 220px;
      border: none;
      outline: none;
      resize: vertical;
      padding: 16px;
      font-size: 14px;
      line-height: 1.6;
      font-family: var(--font-body);
      letter-spacing: 0.00625em;
      color: var(--text);
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-top: 1px solid var(--border);
      background: #fafbfc;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn-send {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      font-size: 14px;
      font-family: var(--font-ui);
      font-weight: 500;
      letter-spacing: 0.00625em;
      color: #fff;
      background: var(--primary);
      border: none;
      border-radius: 24px;
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3);
      transition: background 0.15s, box-shadow 0.15s;
    }
    .btn-send:hover {
      background: var(--primary-hover);
      box-shadow: 0 1px 3px rgba(60, 64, 67, 0.35);
    }

    .btn-secondary {
      padding: 8px 16px;
      font-size: 13px;
      font-family: var(--font-ui);
      color: var(--muted);
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-secondary:hover { background: rgba(0, 0, 0, 0.04); }

    .hint {
      font-size: 12px;
      font-family: var(--font-body);
      color: var(--muted);
      letter-spacing: 0.00625em;
    }
  </style>
</head>
<body>
  <div class="shell">
    <div class="compose-card" role="application" aria-label="Compose email">
      <header class="compose-header">
        <span class="compose-title">New message</span>
        <div class="email-logo-mark" title="Mail" aria-label="Mail">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
          </svg>
        </div>
      </header>

      <form id="compose-form" novalidate>
        <div class="field-row">
          <label class="field-label" for="from">From</label>
          <input class="field-input" type="email" id="from" name="from" placeholder="you@company.com" autocomplete="email" />
        </div>
        <div class="field-row">
          <label class="field-label" for="to">To</label>
          <input class="field-input" type="email" id="to" name="to" placeholder="Recipients" autocomplete="off" />
        </div>
        <div class="field-row">
          <label class="field-label" for="subject">Subject</label>
          <input class="field-input" type="text" id="subject" name="subject" placeholder="Subject" />
        </div>

        <div class="toolbar" aria-hidden="true">
          <button type="button" disabled>𝐁</button>
          <button type="button" disabled>𝐼</button>
          <button type="button" disabled>𝑈</button>
          <button type="button" disabled>Link</button>
          <button type="button" disabled>Attach</button>
        </div>

        <div class="body-wrap">
          <textarea class="body-input" id="description" name="description" placeholder="Compose email…"></textarea>
        </div>

        <footer class="footer">
          <button type="submit" class="btn-send" id="btn-send">Send</button>
          <div class="hint">UI only — wire <code>fetch</code> to <code>POST /notification/send-email</code> when ready.</div>
          <button type="button" class="btn-secondary" id="btn-discard">Discard draft</button>
        </footer>
      </form>
    </div>
  </div>

   <script>
    (function () {
      var form = document.getElementById("compose-form");
      var statusEl = document.getElementById("send-status");

      function readPayload() {
        return {
          to: (document.getElementById("to").value || "").trim(),
          from: (document.getElementById("from").value || "").trim(),
          subject: (document.getElementById("subject").value || "").trim(),
          description: (document.getElementById("description").value || "").trim()
        };
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var payload = readPayload();
    
        var btn = document.getElementById("btn-send");
        btn.disabled = true;
        if (statusEl) statusEl.textContent = "Sending…";

        fetch("/notification/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            return res.json().then(function (data) {
              return { ok: res.ok, status: res.status, data: data };
            });
          })
          .then(function (result) {
            if (statusEl) {
              statusEl.textContent = result.ok
                ? "Sent — " + JSON.stringify(result.data)
                : "Error " + result.status + " — " + JSON.stringify(result.data);
            }
          
          })
          .catch(function (err) {
            console.error("[compose] fetch failed:", err);
            if (statusEl) statusEl.textContent = "Network error — check console.";
          })
          .finally(function () {
            btn.disabled = false;
          });
      });

      document.getElementById("btn-discard").addEventListener("click", function () {
        form.reset();
        if (statusEl) statusEl.textContent = "Sends to POST /notification/send-email (same origin).";
      });
    })();
  </script>
</body>
</html>
  `;
};