# API e Projeto Checklist

## 1. Revisão do Checklist
- [ ] Conferir todas as entidades e seus relacionamentos
- [ ] Validar campos obrigatórios e opcionais
- [ ] Verificar default values (ex: roleId default, status de Chamado)
- [ ] Confirmar regras de cascade onde necessário
- [ ] Revisar DTOs e validações com class-validator
- [ ] Testar endpoints CRUD de cada entidade
- [ ] Conferir se os dados sensíveis não estão sendo retornados (ex: senha)

## 2. Tokens e Autenticação
- [ ] Validar se a criação de tokens JWT está funcionando
- [ ] Conferir expiração do token (`expiresIn`)
- [ ] Testar endpoints protegidos com `@UseGuards(AuthGuard('jwt'))`
- [ ] Verificar se payload do token contém informações necessárias (ex: id, email, role)
- [ ] Confirmar que tokens inválidos ou expirados retornam `UnauthorizedException`
- [ ] Testar login, signup e refresh token (se houver)

## 3. Front-End
- [ ] Iniciar projeto front-end (Angular, React, ou outro)
- [ ] Conectar front-end à API
- [ ] Criar telas para:
  - [ ] Login e Signup
  - [ ] Visualização de Chamados
  - [ ] Criação de Chamados
  - [ ] Listagem de Usuários e Setores
- [ ] Implementar tratamento de tokens JWT no front (armazenamento seguro)
- [ ] Testar integração end-to-end com API
