#!/bin/bash
echo "Registering user 2..."
curl -s -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"nome":"Maria Souza", "email":"maria@email.com", "senha":"password", "telefone":"11988887777"}' > res_reg2.json
cat res_reg2.json
echo ""

echo "Logging in User 2..."
curl -s -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"maria@email.com", "senha":"password"}' > res_login2.json
TOKEN2=$(grep -o '"token":"[^"]*' res_login2.json | cut -d'"' -f4)

echo "Updating profile..."
curl -s -X PUT http://localhost:3000/usuarios/me -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN2" -d '{"nome":"Maria Updated"}' > res_put_user.json
cat res_put_user.json
echo ""

echo "Creating conversa with user 1..."
curl -s -X POST http://localhost:3000/conversas -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN2" -d '{"usuarioDestino": 1}' > res_conv.json
cat res_conv.json
echo ""

CONV_ID=$(grep -o '"id":[0-9]*' res_conv.json | cut -d':' -f2 | head -1)

echo "Sending message to conversa $CONV_ID..."
curl -s -X POST http://localhost:3000/conversas/$CONV_ID/mensagens -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN2" -d '{"texto":"Olá Joao, quero alugar!"}' > res_msg.json
cat res_msg.json
echo ""

echo "Listing mensagens..."
curl -s -X GET http://localhost:3000/conversas/$CONV_ID/mensagens -H "Authorization: Bearer $TOKEN2" > res_msgs.json
cat res_msgs.json
echo ""

