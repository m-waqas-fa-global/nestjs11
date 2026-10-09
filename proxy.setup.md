# ShieldFlow Proxy — Chrome & System Automatic Proxy Setup (PAC)

## 1. What is a PAC Script (`proxy.pac`)?
A **Proxy Auto-Configuration (PAC)** file is a JavaScript function (`FindProxyForURL(url, host)`) that tells Chrome and your Operating System which proxy server to use for each website dynamically.

ShieldFlow Proxy serves this script automatically at:
```http
http://<SERVER_IP>:3000/proxy.pac
# or for local testing:
http://localhost:3000/proxy.pac
```

---

## 2. Chrome & Windows Automatic Proxy Configuration

Chrome delegates proxy management to the operating system's network settings.

### Step 1: Open Proxy Settings
1. In Chrome, open a new tab and go to:
   ```
   chrome://settings/system
   ```
2. Click **"Open your computer's proxy settings"** (this opens Windows Proxy Settings).

### Step 2: Configure Automatic Setup Script
In the Windows Settings window under **Automatic proxy setup**:

1. **Automatically detect settings**: Set to **OFF** (to prevent conflicts).
2. **Use setup script**: Toggle to **ON**.
3. **Script address**: Enter your ShieldFlow PAC URL:
   ```
   http://127.0.0.1:3000/proxy.pac
   ```
   *(Replace `127.0.0.1` with your server's LAN IP, e.g. `http://192.168.1.50:3000/proxy.pac`, if connecting from other devices on the network).*
4. Click **Save**.

### Step 3: Verify Manual Proxy is Disabled
Under **Manual proxy setup**:
* **Use a proxy server**: Ensure this is **OFF** (the PAC script manages routing automatically).

---

## 3. How to Verify in Chrome

1. **Verify PAC Download**:
   Open `http://localhost:3000/proxy.pac` in your browser. You should see the JavaScript function returning:
   ```javascript
   function FindProxyForURL(url, host) { ... }
   ```

2. **Test Normal Browsing**:
   Visit `https://google.com` or `https://github.com` — pages should load normally.

3. **Test Blocked Domain Filtering**:
   Visit a blocked domain (e.g., `https://www.instagram.com` or `https://www.tiktok.com`):
   * ShieldFlow Proxy intercepts the request and terminates it with a **403 Forbidden** block page.



Manual proxy setup:
   proxy ip address: [127.0.0.1]
   proxy port: [3128]

---

## 5. Home Router & Gateway 4-Phase Integration Diagrams
Visual architecture diagrams are available at:
* **Final Architecture Flow (Word-for-Word)**: `views/finalarchitectureflow.svg`
* **4-Phase Integration Detail**: `views/router-integration-phases.svg`

**Reference Links**:
**MicroService Architecture Blog Url**: 
 - https://buymeacoffee.com/m.waqas/building-future-erp-one-microservice-time


Proxy Server Port: [3128]
Port(TCP):[443] HTTP Secure (HTTPS / encrypted web traffic)