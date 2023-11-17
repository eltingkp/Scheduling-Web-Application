import json
import socket
import requests

server = socket.socket()

server.bind(('localhost', 3000))

server.listen(3)

print('waiting for connections')

while True:
    client, addr = server.accept()
    print("connected with", addr)

    data = client.recv(1024).decode()
    print(data)

    json_data = json.loads(data)
    api_url = json_data["data"]
    print(api_url)

    headers = {"accept": "application/json"}

    response = requests.get(api_url, headers=headers)

    client.send(bytes(response.text, 'utf-8'))

    # client.send(bytes(data, 'utf-8'))

    client.close()
