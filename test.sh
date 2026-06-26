#!/bin/bash
echo "Registering user..."
curl -s -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"nome":"João Silva", "email":"joao@email.com", "senha":"123456", "telefone":"42999999999"}' > res_reg.json
cat res_reg.json
echo ""

echo "Logging in..."
curl -s -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"joao@email.com", "senha":"123456"}' > res_login.json
cat res_login.json
echo ""

TOKEN=$(grep -o '"token":"[^"]*' res_login.json | cut -d'"' -f4)

echo "Creating car..."
curl -s -X POST http://localhost:3000/carros -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"marca":"Honda", "modelo":"Civic", "ano":2022, "precoDia":180.00, "descricao":"Ótimo estado", "cidade":"Ponta Grossa"}' > res_car.json
cat res_car.json
echo ""

echo "Testing Home destaques..."
curl -s -X GET http://localhost:3000/home > res_home.json
cat res_home.json
echo ""
