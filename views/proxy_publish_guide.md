# 🛡️ ShieldFlow Proxy — Publishing & Router Integration Guide

> **A comprehensive, step-by-step handbook for publishing ShieldFlow Proxy on your Local Area Network (LAN) and connecting home routers or client devices for Layer 7 domain blocklisting.**

---

## 📌 Architecture & Port Overview

ShieldFlow Proxy exposes two dedicated network ports when running:

| Port | Protocol | Service Component | Purpose |
| :---: | :---: | :--- | :--- |
| **`[3128]`** | **TCP** | **Core Forward Proxy** | Intercepts standard HTTP requests and HTTPS `CONNECT` tunnels. Evaluates domain blacklists and drops blocked requests with `[403 Forbidden]`. |
| **`[3000]`** | **HTTP** | **Web Control Surface & PAC** | Hosts the web control dashboard and serves the auto-proxy configuration script `[/proxy.pac]`. |

---

## 🚀 Part 1: Publishing ShieldFlow Proxy on LAN

Publishing the proxy on your local machine allows any device connected to your home Wi-Fi or router to route traffic through it.

### Step 1: Build & Launch the Server

Open PowerShell as Administrator inside the project root directory:

```powershell
# 1. Compile TypeScript source code to production JavaScript
npm run build

# 2. Launch using PM2 background process manager (Recommended for persistence)
npx pm2 start dist/main.js --name "shield-proxy"

# (Alternative) Launch directly using Node.js without PM2:
npm run start:prod
```

---

### Step 2: Identify Your Server's Local LAN IP Address

To route traffic to this computer, you must find its local IP assigned by your router:

```powershell
ipconfig
```

Look for your active network connection (**Wi-Fi** or **Ethernet**) and locate the **IPv4 Address**:
* Example value: `[192.168.1.50]` *(Your actual IP may be `[192.168.0.X]` or `[192.168.1.X]`)*.

---

### Step 3: Open Inbound Windows Firewall Port

By default, Windows Firewall blocks incoming connections from other network devices. Run this command in PowerShell to permit traffic on proxy port `[3128]`:

```powershell
netsh advfirewall firewall add rule name="ShieldFlow Proxy" dir=in action=allow protocol=TCP localport=3128
```

> **Optional:** If you plan to serve the PAC script `[/proxy.pac]` to other devices, also permit port `[3000]`:
> ```powershell
> netsh advfirewall firewall add rule name="ShieldFlow Web & PAC" dir=in action=allow protocol=TCP localport=3000
> ```

---

### Step 4: Verification Check

Confirm that the proxy listener is active on port `[3128]`:

```powershell
# Verify active listening state on port [3128]
Get-NetTCPConnection -LocalPort 3128 -State Listen
```

Your proxy is now published and reachable on your local network at:
* **Proxy IP Address**: `[192.168.1.50]` *(replace with your host IP)*
* **Proxy Port**: `[3128]`

---

## 🌐 Part 2: Home Router & Network Integration Methods

> [!IMPORTANT]
> **Understanding Consumer Routers:**
> Standard consumer routers (TP-Link, D-Link, Netgear, Huawei, ZTE, Tenda) operate at **Layer 3/4 (IP routing and NAT)**. They do not feature a native "WAN Forward Proxy" field in stock firmware.
> 
> Below are the **5 proven approaches** to integrate ShieldFlow Proxy into your home network, ranked from simplest to most advanced.

---

### 📋 Method Comparison Matrix

| Method | Where Configured | Technical Requirement | Scope | Recommended For |
| :--- | :--- | :--- | :--- | :--- |
| **`[Method 1]`** | Individual Devices | None (Works with any router) | Configured device only | Quickest testing & standard home routers |
| **`[Method 2]`** | Router DHCP | Router supports `[DHCP Option 252]` | All devices connecting to Wi-Fi | Smart homes with stock router supporting Option 252 |
| **`[Method 3]`** | Router Firewall | Router running `[OpenWrt / DD-WRT / MikroTik]` | Transparent network-wide | Advanced setups with custom router firmware |
| **`[Method 4]`** | Router DHCP Gateway | Dual-NIC or Dedicated Linux Gateway | Entire subnet | Enterprise / Home lab network gateway |
| **`[Method 5]`** | Router Web Admin | Router Parental Controls feature | Network-wide | When you do not want a host PC running 24/7 |

---

### 🔹 Method 1: Direct Device Proxy Setup (Universal & Simplest)

* **When to use:** Works with **any router** without needing admin access or custom router firmware.
* **How it works:** Devices explicitly direct their browser and application HTTP/HTTPS requests to the proxy host `[192.168.1.50:3128]`.

#### A. Setup on Windows 10 / 11:
1. Press `[Win + I]` to open **Settings** → Navigate to **Network & Internet** → **Proxy**.
2. Under **Manual proxy setup**, click **Set up** (or toggle **Use a proxy server** to `[ON]`).
3. Enter:
   * **Proxy IP address**: `[192.168.1.50]`
   * **Port**: `[3128]`
4. Check `[Don't use proxy server for local (intranet) addresses]`.
5. Click **Save**.

#### B. Setup on Android:
1. Open **Settings** → **Wi-Fi**.
2. Tap the gear icon or long-press your connected home Wi-Fi network → Tap **Modify Network** (or **Advanced**).
3. Change **Proxy** from `[None]` to `[Manual]`.
4. Enter:
   * **Proxy hostname**: `[192.168.1.50]`
   * **Proxy port**: `[3128]`
5. Tap **Save**.

#### C. Setup on iOS (iPhone / iPad):
1. Open **Settings** → **Wi-Fi** → Tap the `[(i)]` info button next to your connected Wi-Fi.
2. Scroll to the bottom and tap **Configure Proxy**.
3. Select **Manual**.
4. Enter:
   * **Server**: `[192.168.1.50]`
   * **Port**: `[3128]`
5. Tap **Save**.

---

### 🔹 Method 2: Router DHCP Option 252 (WPAD Auto-Discovery)

* **When to use:** Your router allows configuring custom DHCP options.
* **How it works:** When phones, tablets, and laptops obtain an IP via DHCP, the router broadcasts `[Option 252]`. Devices automatically download `[http://192.168.1.50:3000/proxy.pac]` and route web traffic through the proxy without manual setup on each device.

#### Step-by-Step Configuration:
1. Open a web browser and access your router admin portal:
   * URL: `[http://192.168.1.1]` or `[http://192.168.0.1]`
2. Log in with your router administrator credentials.
3. Navigate to **Network** / **LAN** / **DHCP Server Settings**.
4. Look for **Custom DHCP Options** or **DHCP Options Table**.
5. Add a new option entry:
   * **Option Code / Number**: `[252]`
   * **Option Type**: `[String]` / `[Text]`
   * **Option Value**: `[http://192.168.1.50:3000/proxy.pac]`
6. Click **Apply / Save** and restart the router.
7. Reconnect client devices to Wi-Fi so they renew their DHCP lease.

---

### 🔹 Method 3: Transparent Proxy via Router NAT (OpenWrt / DD-WRT / MikroTik)

* **When to use:** You have a router running custom firmware like **OpenWrt**, **DD-WRT**, **MikroTik RouterOS**, or **AsusWRT-Merlin**.
* **How it works:** The router's firewall intercepts all outbound TCP packets on port `[80]` (HTTP) and port `[443]` (HTTPS) and redirects them via Destination NAT (`[DNAT]`) to `[192.168.1.50:3128]`.

#### Step-by-Step Configuration (OpenWrt / Linux IPTables):
SSH into your router terminal:

```bash
# 1. Redirect standard HTTP traffic (Port 80) to ShieldFlow Proxy
iptables -t nat -A PREROUTING -i br-lan -p tcp --dport 80 -j DNAT --to-destination 192.168.1.50:3128

# 2. Redirect standard HTTPS traffic (Port 443) to ShieldFlow Proxy
iptables -t nat -A PREROUTING -i br-lan -p tcp --dport 443 -j DNAT --to-destination 192.168.1.50:3128

# 3. Ensure proxy server traffic is excluded from looping back onto itself:
iptables -t nat -I PREROUTING -s 192.168.1.50 -j ACCEPT
```

#### MikroTik RouterOS Configuration:
In WinBox / WebFig Terminal:

```routeros
/ip firewall nat add chain=dstnat action=dst-nat to-addresses=192.168.1.50 to-ports=3128 protocol=tcp in-interface=bridge dst-port=80,443 src-address=!192.168.1.50
```

---

### 🔹 Method 4: Default Gateway Redirection (Dedicated Gateway Machine)

* **When to use:** You want your PC or a dedicated mini-PC / Raspberry Pi to act as the primary network gateway for the household.
* **How it works:** The router's DHCP assigns your proxy machine's IP as the **Default Gateway** instead of the router itself.

#### Step-by-Step Configuration:
1. Access your router admin dashboard at `[http://192.168.1.1]`.
2. Go to **DHCP Server Settings**.
3. Locate the **Default Gateway / Gateway IP** field (which normally defaults to `[192.168.1.1]`).
4. Change the Gateway IP to: `[192.168.1.50]` *(Your proxy host PC)*.
5. Set DNS Server to: `[1.1.1.1]` or `[8.8.8.8]`.
6. Save and reboot the router.

---

### 🔹 Method 5: Router Built-in Domain Filtering (No Proxy Needed)

* **When to use:** You want to block domains network-wide without keeping your computer running 24/7.
* **How it works:** Uses the router's embedded firewall hardware to drop DNS queries or TCP connections to specific domain names.

#### Step-by-Step Configuration:
1. Log in to router portal (`[http://192.168.1.1]`).
2. Navigate to **Security** / **Parental Controls** / **Access Control** / **Domain Filtering**.
3. Enable **Domain Blocking / URL Filter**.
4. Add the target domains to the blacklist:
   * `[instagram.com]`
   * `[tiktok.com]`
   * `[facebook.com]`
5. Click **Apply / Save**.

---

## 🛑 Part 3: How to Stop & Deactivate the Proxy

Follow these steps to safely bring down the proxy without disconnecting household internet:

### Step 1: Remove Proxy from Client Devices
> [!CAUTION]
> Always remove the proxy settings from client devices **before** shutting down the server. If devices still point to the proxy while it is offline, web browsers will throw `[ERR_PROXY_CONNECTION_FAILED]`.

* On Windows / Mac / Android / iOS:
  * Open Wi-Fi / Network Settings → Change Proxy setting back to `[None]` / `[Off]`.
  * Direct internet connectivity is restored immediately.

---

### Step 2: Stop the NestJS Proxy Process
In ShieldFlow, the proxy service runs inside the main NestJS runtime lifecycle. Shutting down the NestJS application terminates **both** port `[3000]` and proxy port `[3128]` concurrently:

```powershell
# If running via PM2:
npx pm2 stop shield-proxy
npx pm2 delete shield-proxy

# If running directly in PowerShell:
# Press [Ctrl + C] in the terminal window to terminate the process
```

---

### Step 3: Remove Windows Firewall Rule (Optional Cleanup)
If you wish to close inbound access on port `[3128]`:

```powershell
netsh advfirewall firewall delete rule name="ShieldFlow Proxy"
```

---

## 🎯 Part 4: Domain Blocklist Configuration & Best Practices

All blocked domain definitions are configured in:
`[src/common/config/proxy.config.ts]`

### Recommended Configuration Syntax

Always configure root domains without leading `[www.]` or protocol prefixes:

```typescript
// Define categorized blacklist arrays:
const SOCIALMEDIA = [
    'instagram.com',
    'tiktok.com',
    'facebook.com',
];

const RESTRICTED_SITES = [
    'wisden.com',
    'arena.ai',
    'angularspace.com',
];

// Export unified BLOCKED_DOMAINS array:
export const BLOCKED_DOMAINS = [
    ...SOCIALMEDIA,
    ...RESTRICTED_SITES,
];

// Proxy listening port:
export const PROXY_PORT = parseInt(process.env.PROXY_PORT || '3128', 10);
```

### Why Use Root / Apex Domains?

In `[src/proxy/services/domain-block.service.ts]`, the inspection engine performs both exact equality checks and suffix matching:

```typescript
// Subdomain match logic:
for (const domain of this.blockedDomains) {
  if (lowerHost === domain) return true;
  if (lowerHost.endsWith('.' + domain)) return true;
}
```

Configuring `['instagram.com']` automatically blocks:
* `[instagram.com]` *(Exact root match)*
* `[www.instagram.com]` *(Subdomain match)*
* `[api.instagram.com]` *(API endpoints)*
* `[m.instagram.com]` *(Mobile web)*

---

## 🧪 Part 5: Testing & Verification

Once your proxy is active, verify that domain filtering works correctly:

```powershell
# 1. Test normal non-blocked traffic through proxy (Should return HTTP 200 OK):
curl.exe -x http://192.168.1.50:3128 -I https://google.com

# 2. Test blocked domain traffic through proxy (Should return HTTP 403 Forbidden):
curl.exe -x http://192.168.1.50:3128 -I https://instagram.com
```

### Expected Response for Blocked Domains:
```http
HTTP/1.1 403 Forbidden
Content-Type: text/plain
Content-Length: 42
Connection: close

Unable to access block by ShieldFlow Proxy.
```
