# Regras de Negócio - Sistema de Locação de Carros Pessoais

## 1. Gestão de Usuários

### 1.1 Cadastro e Autenticação
- Todos os usuários devem ter nome, email, telefone, CPF e endereço válidos
- O email deve ser único no sistema
- O CPF deve ser válido e único
- Todos os usuários devem aceitar os termos e condições antes de se registrar
- A autenticação é obrigatória para acessar funcionalidades principais

### 1.2 Perfil do Usuário
- Cada usuário deve ter um avaliação mínima de 3.0 para fazer reservas (após 5 avaliações)
- Proprietários precisam de avaliação mínima de 4.0 para listar novos carros
- Usuários com avaliação abaixo de 2.0 podem ter suas contas suspensas temporariamente
- Histórico de avaliações deve ser mantido por no mínimo 2 anos

---

## 2. Gestão de Carros

### 2.1 Cadastro e Documentação
- Proprietários só podem listar carros com documentação válida (CRLV, seguro)
- O seguro do carro é obrigatório e deve estar vigente
- Carros devem passar por revisão anual obrigatória
- Apenas carros com status "ativo" e "disponível" podem ser alugados
- Quilometragem deve ser registrada a cada locação

### 2.2 Disponibilidade e Status
- Carros podem ter status: disponível, alugado, em manutenção, suspenso
- Carros em manutenção não podem ser alugados
- Proprietários devem registrar manutenções com detalhes e data
- Um carro não pode ter duas reservas sobrepostas

### 2.3 Precificação
- A tarifa diária é definida pelo proprietário
- Tarifa mínima: R$ 50,00 por dia
- Tarifa máxima: sem limite, a critério do proprietário
- Descontos por períodos longos (7+ dias) são opcionais

---

## 3. Gestão de Reservas

### 3.1 Criação e Validação
- Locatários podem fazer reservas com no mínimo 24 horas de antecedência
- Reservas máximas: 30 dias consecutivos
- Reservas futuras (máximo 6 meses) são permitidas
- A data de devolução deve ser posterior à data de retirada
- Horário padrão de retirada: 09:00 / Devolução: 18:00 (Alterações podem ser feitas)

### 3.2 Cancelamento e Modificação
- Cancelamento com 48h de antecedência: reembolso de 100%
- Cancelamento com 24-48h de antecedência: reembolso de 50%
- Cancelamento com menos de 24h: sem reembolso
- Modificação de datas: permitida se houver disponibilidade
- Proprietário pode cancelar com 48h de antecedência + justificativa

### 3.3 Confirmação
- Reserva precisa de confirmação de pagamento para ser ativa
- Proprietário recebe notificação de nova reserva
- Locatário recebe código de acesso ao carro após confirmação

---

## 4. Filtragem e Busca

### 4.1 Critérios de Busca
- Filtro por data de disponibilidade (início e fim)
- Filtro por localização (raio de distância personalizável)
- Filtro por tipo/marca de carro
- Filtro por preço (mínimo e máximo)
- Filtro por avaliação do proprietário

### 4.2 Priorização
- Carros mais bem avaliados aparecem primeiro
- Carros mais próximos da localização do usuário (dentro do raio escolhido)
- Carros com melhor custo-benefício destacados

---

## 5. Sistema de Pagamento

### 5.1 Métodos de Pagamento
- Cartão de crédito (obrigatório)
- Transferência bancária
- Pix (quando disponível)
- Boleto bancário

### 5.2 Processamento
- Pagamento é processado ao confirmar a reserva
- Valor cobrado é a diária × quantidade de dias + seguro adicional (se escolhido)
- Pagamentos são processados de forma segura (PCI compliance)
- Comprovante é gerado automaticamente

### 5.3 Reembolsos
- Reembolsos seguem política de cancelamento
- Processamento: máximo 5 dias úteis
- Devolução para a mesma forma de pagamento

---

## 6. Sistema de Avaliação

### 6.1 Avaliação de Proprietários
- Locatários avaliam proprietários e carros após cada locação
- Escala: 1 a 5 estrelas
- Avaliações podem incluir comentários
- Mínimo de 5 avaliações para cálculo de nota média
- Apenas locatários que completaram a reserva podem avaliar

### 6.2 Avaliação de Locatários
- Proprietários avaliam locatários após cada locação
- Escala: 1 a 5 estrelas
- Avaliações podem incluir comentários
- Histórico de avaliações é publicado

### 6.3 Gestão de Avaliações
- Avaliações abusivas/inadequadas podem ser removidas
- Disputas de avaliação devem ser reportadas
- Período para editar avaliação: 7 dias após criação

---

## 7. Seguro

### 7.1 Cobertura Obrigatória
- Seguro básico é obrigatório em toda locação
- Cobertura mínima: danos ao carro e terceiros
- Franquia: no máximo 10% do valor do carro

### 7.2 Seguro Adicional
- Seguro expandido (opcional): cobertura total sem franquia
- Proteção contra roubo (opcional)
- Proteção contra vidros e pneus (opcional)

### 7.3 Sinistros
- Sinistro deve ser reportado em até 12 horas após o ocorrido
- Documentação obrigatória: foto, BO, relatório de danos
- Análise do sinistro: máximo 10 dias úteis

---

## 8. Multas e Penalidades

### 8.1 Causas de Multa
- Devolução atrasada: R$ 10,00 por hora (máximo 10 horas) + nova locação obrigatória
- Dano ao carro: Total do dano no carro. Em caso de isenção de culpa do locatário o culpado deve pagar
- Violação de trânsito em nome do locatário: responsabilidade do locatário
- Falta de limpeza do carro: À definir com o proprietário

### 8.2 Procedimento
- Multa deve ser comunicada em até 3 dias após devolução
- Locatário tem direito a contestação em até 5 dias
- Multa não paga: bloqueio de novas reservas

### 8.3 Atrasos
- Atraso de até 1 hora: sem multa
- Atraso de 1-3 horas: 25% da diária
- Atraso de 3-6 horas: 50% da diária
- Atraso de mais de 6 horas: cobrança de nova diária completa
---

## 9. Notificações

### 9.1 Tipos de Notificação
- Confirmação de reserva
- Lembrete de retirada (24h antes)
- Confirmação de devolução
- Avaliação pendente
- Multa registrada
- Mensagens de suporte/atendimento
- Promoções e ofertas especiais (opt-in)
- Notificações de chat

### 9.2 Canais
- Email (obrigatório)
- SMS (opcional)
- Notificações in-app (se aplicável)
---

## 10. Localização

### 10.1 Raio de Busca
- Raio padrão: 10 km
- Raio máximo personalizável: 100 km
- Localização usada: CEP ou coordenadas GPS do usuário

### 10.2 Pontos de Retirada/Devolução
- Definido entre Locatário e proprietário em chat
---

## 11. Segurança e Privacidade

### 11.1 Dados Pessoais
- Dados de usuários são encriptados em repouso
- Comunicações são por HTTP
- LGPD compliance obrigatória
- Backup periódico de dados

### 11.2 Acesso ao Carro
- Código de acesso único por reserva
- Validade: 30 minutos antes até 1 hora após horário agendado
- Log de acesso é registrado

---

## 12. Suporte e Disputas

### 12.1 Atendimento
- Tempo de resposta: máximo 24 horas
- Canais: chat, email, telefone
- Horário: segunda a domingo, 08:00 - 22:00

### 12.2 Resolução de Conflitos
- Mediação entre locatário e proprietário
- Análise de evidências (fotos, histórico)
- Decisão em até 15 dias
- Possibilidade de escalação para árbitro

---

## 13. Conformidade e Regulamentações

### 13.1 Registros
- Manutenção de registro de todas as transações por 5 anos
- Conformidade com legislação de locação de veículos
- Cumprimento de regulações municipais/estaduais

### 13.2 Responsabilidades
- Plataforma não é responsável por acidentes ou danos criminosos
- Locatário é responsável por multas de trânsito
- Proprietário é responsável pela manutenção preventiva do carro
