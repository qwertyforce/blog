---
title: "rpi wireguard client + port forwarding setup"
date: "2021-03-08"
---

**[Wiregurad Server]** Install wireguard server - https://github.com/angristan/wireguard-install

Copy config file from server to client.

**[rpi]** Install wireguard client
```
echo "deb http://archive.raspbian.org/raspbian testing main" | sudo tee --append /etc/apt/sources.list.d/testing.list
printf 'Package: *\nPin: release a=testing\nPin-Priority: 50\n' | sudo tee --append /etc/apt/preferences.d/limit-testing
sudo apt update
sudo apt install wireguard -y
```
**[rpi]** Run wireguard
```
sudo wg-quick up {config filename}
```
**[rpi]** Enable start on Boot
```
sudo systemctl enable wg-quick@{config filename}
sudo systemctl start wg-quick@{config filename}
```
**[Wiregurad Server]** Enable port forwarding
```
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 8080 -j DNAT --to-destination 10.66.66.2
```

