# Health Monitor
Simple nodeJS app that monitors a bunch of domains, whenever their status goes from down to up or up to down it sends a message on slack.

## Getting started
### Configuring the project
Edit __config/conf.js__ and add your slack webhook url and your domains.
### Running the tool
```bash
git clone https://github.com/0xClpz/health-monitor.git
cd health-monitor
babel-node index.js
```
