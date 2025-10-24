# 💸 Paytem – P2P Payment App (Paytm Clone)

A **modern, secure, monorepo-based P2P payment app** built with **Next.js**, **Prisma**, **Express**, and **TailwindCSS**.  
Supports **on-ramp**, **P2P transfers**, and **bank webhooks**, providing a full Paytm-like experience.

---

## 🚀 Features

- 🔁 **P2P Transfers** – Instantly send money via phone number  
- 💰 **On-Ramp (Add Money)** – Bank integration via webhook  
- ⚡ **Real-time Balance Updates**  
- 📱 **Responsive UI** – Mobile-first, Paytm-inspired interface  
- 🔐 **Secure Webhooks** – HDFC-style bank callbacks  
- 🧩 **TypeScript + Turborepo** – Scalable monorepo architecture  

---

## 🧠 Tech Stack

| Layer | Technologies |
|:------|:-------------|
| **Frontend** | Next.js 15, React 19, TailwindCSS, Lucide Icons |
| **Backend** | Express, Prisma ORM |
| **Database** | PostgreSQL |
| **Build System** | Turborepo, esbuild |
| **Authentication** | NextAuth.js |
| **State Management** | Jotai |

---

## 🗂️ Project Structure

```bash
paytem/
├── apps/
│   └── user-app/          # Next.js frontend
│   └── bank-webhook/          # Next.js frontend
├── packages/
│   ├── db/                # Prisma schema + client
│   ├── ui/                # Shared UI components
│   └── store/             # Global state (Jotai)
├── bank-webhook/          # Express webhook server
└── package.json
````

---

## ⚙️ Prerequisites

* **Node.js** ≥ 18
* **PostgreSQL** (local or Docker)
* **npm** ≥ 10.9.2

---

## 🧩 Setup & Run

### 1. Clone & Install

```bash
git clone https://github.com/CoddingwithPranav/PaytmNextjs.git
cd paytem
npm install
```

---

### 2. Setup PostgreSQL

#### 🐳 Option A: Docker (Recommended)

```bash
docker run --name postgres-paytem \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=paytem \
  -p 5432:5432 \
  -d postgres
```

#### 💻 Option B: Local Installation

Install PostgreSQL and create a database named `paytem`.

---

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/paytem"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

---

### 4. Run Database Migrations

```bash
npm run db:generate
npm run db:migrate
```

---

### 5. Start Services

Run each service in a separate terminal:

**Frontend (Next.js)**

```bash
npm run dev
# → http://localhost:3000
```

**Bank Webhook (Express)**

```bash
cd bank-webhook
npm run dev
# → http://localhost:3003/hdfcWebhook
```

---

## 🧰 Scripts

| Command                  | Description                            |
| :----------------------- | :------------------------------------- |
| `npm run dev`            | Start all apps in dev mode (Turborepo) |
| `npm run build`          | Build all apps                         |
| `npm run db:generate`    | Generate Prisma client                 |
| `npm run db:migrate`     | Run Prisma migrations                  |
| `npm run start-user-app` | Start production frontend              |

---

## 🪝 Webhook Flow (On-Ramp)

1. User initiates **Add Money** → triggers `createOnRampTransaction`
2. Redirects to **bank simulation page**
3. Bank calls → `POST /hdfcWebhook`
4. Webhook updates:

   * User `balance` → incremented
   * `onRampTransaction.status` → `"Success"`

Example payload:

```json
{
  "token": "abc123",
  "user_identifier": "1",
  "amount": "50000"  
}
```

---


## 🌿 Environment Variables

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

---

## 🤝 Contributing

1. **Fork** the repository
2. Create a new branch → `feat/xxx` or `fix/xxx`
3. Run `npm run format` before committing
4. **Submit a PR** 🎉

---

## 📜 License

**MIT License**
Free to use, modify, and distribute.

---

> 💙 *Made with TypeScript and passion by [Your Name]*
> *“Secure. Simple. Seamless Payments.”*

```
