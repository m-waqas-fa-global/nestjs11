# ShieldFlow Proxy

> **High-Performance Forward Proxy, Layer 7 Domain Firewall & Local Gateway Controller built on NestJS.**

ShieldFlow Proxy is a lightweight, robust forward proxy server designed for enterprise perimeter defense, productivity control, and local area network (LAN) traffic governance. It intercepts outbound HTTP requests and HTTPS `CONNECT` tunnels, evaluating them in real time against domain blacklists to protect networks against malicious domains, distracting social media, and bandwidth congestion.

---

## 🚀 Key Features

* **HTTP & HTTPS Forward Proxy**: Handles standard HTTP requests and encrypted HTTPS `CONNECT` TCP socket tunneling on port `3128`.
* **Layer 7 Domain Filtering**: Fast exact-match and wildcard subdomain matching (`*.instagram.com`, `*.tiktok.com`) powered by `DomainBlockService`.
* **Active Threat Termination**: Immediately drops blocked sessions with an HTTP `403 Forbidden` response and severs TCP client sockets.
* **Web Control Surface**: Built-in dashboard on port `3000` for viewing operational metrics, search-filtering blocked domains, and managing policies.
* **Auto-Discovery Engine (PAC / WPAD)**: Dynamically generates and serves `proxy.pac` and `wpad.dat` scripts for zero-touch client onboarding.
* **Home Router & Gateway Ready**: Fully documented 4-phase deployment model for integrating directly into home routers (TP-Link, OpenWrt, AsusWRT, Mikrotik) or functioning as a dedicated Linux default gateway.

---

## 🌐 Port Architecture

| Port | Protocol | Purpose | Description |
| :---: | :---: | :--- | :--- |
| **`3128`** | **TCP** | **Proxy Service** | Handles HTTP traffic and HTTPS `CONNECT` socket tunnels. |
| **`3000`** | **HTTP** | **Web Control Surface** | Serves the admin management UI and the dynamic PAC script (`/proxy.pac`). |

---

## 📦 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation
```bash
# Clone or navigate to the repository
git clone <repo-url>
cd shield-flow-proxy

# Install dependencies
npm install
```

### Running the Application

```bash
# Development (watch mode)
npm run start:dev

# Production build and launch
npm run build
npm run start:prod
```

### Continuous Production Daemon (PM2)
To keep ShieldFlow Proxy running persistently in the background after reboots:
```bash
npm install -g pm2
pm2 start dist/main.js --name shieldflow
pm2 save
pm2 startup
```

---

## ⚙️ Client Configuration

### Option A: Manual Proxy Setup (Any Device)
Configure your device network or browser settings:
* **Proxy Server IP / Hostname**: `127.0.0.1` *(or your server's LAN IP, e.g., `192.168.1.100`)*
* **Proxy Port**: `3128`

### Option B: Automatic Proxy Setup via PAC Script
1. Open Chrome and go to `chrome://settings/system` → **Open your computer's proxy settings**.
2. Under **Automatic proxy setup**:
   * Enable **Use setup script**.
   * Enter Script URL: `http://<SERVER_IP>:3000/proxy.pac` (or `http://localhost:3000/proxy.pac`).
3. Click **Save**.

---

## 🛡️ Home Router & Gateway Integration

ShieldFlow Proxy can protect every phone, tablet, PC, and smart device on your home network without manual configuration per device.

### 4-Phase Deployment Pipeline:
```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  Phase 1: Server Prep       Phase 2: Router Setup     Phase 3: Firewall    Phase 4: Test│
│  [NestJS + PM2 on 0.0.0.0] ──> [DHCP Opt 252 / WPAD] ──> [Block Direct 80/443] ──> [403 Check] │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Phase 1: Nest.js Server Preparation**
   * Reserve a permanent static IP (e.g., `192.168.1.100`) for the server host.
   * Open inbound firewall ports `3128` and `3000` for your local subnet (`192.168.1.0/24`).
   * Run NestJS continuously with PM2.
2. **Phase 2: Router Configuration (Choose 1 Method)**
   * **Method A (Standard Routers)**: Add **DHCP Option 252** with `http://192.168.1.100:3000/wpad.dat`.
   * **Method B (OpenWrt / DD-WRT)**: Add iptables port redirection (`DNAT --to 192.168.1.100:3128`).
   * **Method C (Default Gateway)**: Point the router DHCP Default Gateway IP to `192.168.1.100`.
3. **Phase 3: Router Firewall Enforcement**
   * Block direct outbound ports `80` & `443` for all LAN client IPs so users cannot bypass the proxy.
4. **Phase 4: Client Verification**
   * Reconnect devices to Wi-Fi. Safe traffic passes through normally; blocked domains trigger an immediate **403 Forbidden** termination.

---

## 📊 Visual Architectural Diagrams

The project includes production-ready vector diagrams located in the `views/` folder:

* **[views/finalarchitectureflow.svg](views/finalarchitectureflow.svg)**: Complete end-to-end deployment pipeline (Steps 1 to 11) with technical specs.
* **[views/router-integration-phases.svg](views/router-integration-phases.svg)**: 4-phase router integration blueprint with 1-line step descriptions.
* **[views/network-diagram.svg](views/network-diagram.svg)**: Animated real-time packet flow simulation from LAN clients to the WAN.
* **[views/features-matrix.svg](views/features-matrix.svg)**: 3-pillar capabilities matrix covering Security, QoS, and Enterprise Protocols.
* **[views/tasks-and-purpose.svg](views/tasks-and-purpose.svg)**: Operational roles, packet lifecycle, and target feature roadmap.

---

## 🔌 API Reference

| Endpoint | Method | Response | Description |
| :--- | :---: | :---: | :--- |
| `/` | `GET` | HTML (EJS) | Central Control Surface Web Dashboard. |
| `/api/blocked-domains` | `GET` | JSON | Returns proxy port, total count, and list of blocked domains. |
| `/proxy/health` | `GET` | JSON | Proxy health status and version identifier. |
| `/proxy.pac`, `/wpad.dat` | `GET` | Plaintext / JS | Dynamically generated Proxy Auto-Config script. |

---

## 📁 Project Structure

```
shield-flow-proxy/
├── src/
│   ├── common/
│   │   └── config/
│   │       └── proxy.config.ts       # Proxy port and blocked domains list
│   ├── proxy/
│   │   ├── services/
│   │   │   ├── domain-block.service.ts # Subdomain & exact matching engine
│   │   │   └── proxy.service.ts        # HTTP & HTTPS CONNECT proxy core
│   │   ├── proxy.controller.ts       # Health check API
│   │   └── proxy.module.ts           # Proxy dependency injection module
│   ├── app.controller.ts             # Web UI & REST endpoints
│   ├── app.service.ts                # Application data provider
│   ├── app.module.ts                 # Root application module
│   └── main.ts                       # Application bootstrap (Port 3000 & EJS setup)
├── views/
│   ├── home-page.ejs                 # Web dashboard interface
│   ├── finalarchitectureflow.svg     # End-to-end deployment pipeline diagram
│   ├── router-integration-phases.svg # 4-Phase router integration diagram
│   ├── network-diagram.svg           # Real-time animated flow diagram
│   ├── features-matrix.svg           # 3-Pillar capabilities matrix
│   └── tasks-and-purpose.svg         # Operational tasks and roadmap diagram
├── proxy.setup.md                    # Quick client and router configuration notes
└── package.json                      # Project dependencies & scripts
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
