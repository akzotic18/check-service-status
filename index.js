const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { NodeSSH } = require('node-ssh');

const app = express();
const ssh = new NodeSSH();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // If you serve a frontend from 'public' folder

app.post('/check-service', async (req, res) => {
  const { baseHost, baseUser, basePassword, serviceHost, servicesRaw } = req.body;

  if (!baseHost || !baseUser || !basePassword || !serviceHost || !servicesRaw) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }

  // Parse service list
  const services = servicesRaw
    .split(/\s+/) // Split by space, tab, or newline
    .filter(s => s.trim().length > 0);

  // Clear CSV before writing
  const csvHeader = `"Service Name","Status"\n`;
  fs.writeFileSync('service_status.csv', csvHeader);

  try {
    await ssh.connect({
      host: baseHost,
      username: baseUser,
      password: basePassword,
      tryKeyboard: true,
    });

    console.log('✅ Connected to base server.');

    const results = [];

    for (const service of services) {
      const command = `ssh -o StrictHostKeyChecking=no ${serviceHost} "systemctl status ${service} | grep Active"`;
      const result = await ssh.execCommand(command);

      let status = 'Unknown';

      if (result.stdout) {
        const match = result.stdout.match(/Active:\s+([a-z]+(?:\s+\([^)]+\))?)/i);
        status = match ? match[1] : 'Unrecognized format';
      } else if (result.stderr) {
        status = 'Error';
      }

      // Append to CSV and response
      const line = `"${service}","${status}"\n`;
      fs.appendFileSync('service_status.csv', line);
      results.push({ service, status });
      console.log(`✔ ${service} -> ${status}`);
    }

    res.json({ success: true, results });

  } catch (error) {
    console.error('❌ SSH Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    ssh.dispose();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
