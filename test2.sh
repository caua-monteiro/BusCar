#!/bin/bash
echo "Logging in..."
curl -s -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"joao@email.com", "senha":"123456"}' > res_login.json
TOKEN=$(grep -o '"token":"[^"]*' res_login.json | cut -d'"' -f4)
echo "Token obtained."

echo "Editing car (id 1)..."
curl -s -X PUT http://localhost:3000/carros/1 -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"precoDia": 150}' > res_edit_car.json
cat res_edit_car.json
echo ""

echo "Creating Aluguel..."
curl -s -X POST http://localhost:3000/alugueis -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"carroId":1, "dataInicio":"2026-06-20", "dataFim":"2026-06-22"}' > res_aluguel.json
cat res_aluguel.json
echo ""

echo "Listing Meus Alugueis..."
curl -s -X GET http://localhost:3000/alugueis/meus -H "Authorization: Bearer $TOKEN" > res_meus_alugueis.json
cat res_meus_alugueis.json
echo ""

ALUGUEL_ID=$(grep -o '"id":[0-9]*' res_aluguel.json | cut -d':' -f2 | head -1)

echo "Canceling Aluguel $ALUGUEL_ID..."
curl -s -w "\nHTTP STATUS: %{http_code}\n" -X DELETE http://localhost:3000/alugueis/$ALUGUEL_ID -H "Authorization: Bearer $TOKEN"
echo ""

