# Status Check Dashboard

A simple web-based dashboard that monitors and displays the status of various services or endpoints. Built with a Node.js backend and a dynamic frontend, this tool helps teams keep track of system health in real-time.

## 🚀 Features

- ✅ Realtime or interval-based service checks
- 🌐 Web dashboard interface
- ⚙️ Configurable service endpoints
- 📊 Visual indicators for status (e.g., UP/DOWN)
- 🧩 Modular and easy to extend

## 📁 Project Structure

```
status-check-dashboard/
├── server/           # Node.js backend for status checks
├── public/           # Frontend files (HTML/CSS/JS)
├── node_modules/
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/akzotic18/status-checker-dashboard.git
   cd status-checker-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   node server/index.js
   ```

4. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

You can configure which endpoints to monitor by editing the config section in `server/index.js` or using a separate `config.json` (if applicable).

Example:

```js
const services = [
  { name: "Google", url: "https://www.google.com" },
  { name: "My API", url: "https://myapi.example.com/health" },
];
```

## 📦 Dependencies

- Node.js
- Express
- (Add other relevant packages you're using)

## 🧑‍💻 Author

- **akzotic18** — [GitHub Profile](https://github.com/akzotic18)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
