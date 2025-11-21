# Configuração do Supabase para GuiaCP

Este guia te ajudará a configurar o Supabase para o projeto GuiaCP.

## 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha:
   - **Name**: GuiaCP
   - **Database Password**: Escolha uma senha forte (anote!)
   - **Region**: Escolha a mais próxima (ex: South America - São Paulo)
5. Clique em "Create new project"

## 2. Configurar Variáveis de Ambiente

1. No dashboard do Supabase, vá em **Settings** > **API**
2. Copie os seguintes valores:
   - **Project URL** (URL)
   - **anon public** (API Key)

3. Abra o arquivo `.env.local` na raiz do projeto
4. Substitua os valores:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_projeto_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

## 3. Criar Tabela no Banco de Dados

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em "New query"
3. Copie todo o conteúdo do arquivo `supabase-schema.sql`
4. Cole no editor e clique em "Run"

Isso criará:
- Tabela `contents` com todos os campos necessários
- Índices para performance
- Row Level Security (RLS) policies
- Trigger para atualizar `updated_at` automaticamente

## 4. Configurar Storage

1. No dashboard do Supabase, vá em **Storage**
2. Clique em "Create a new bucket"
3. Preencha:
   - **Name**: `content-images`
   - **Public bucket**: ✅ Marque como público
4. Clique em "Create bucket"

### Configurar Políticas do Storage

1. Clique no bucket `content-images`
2. Vá na aba "Policies"
3. Clique em "New Policy"
4. Selecione "For full customization"
5. Crie as seguintes políticas:

**Política 1: Leitura Pública**
- **Policy name**: Public read access
- **Allowed operation**: SELECT
- **Target roles**: public
- **Policy definition**: `true`

**Política 2: Upload Autenticado**
- **Policy name**: Authenticated upload
- **Allowed operation**: INSERT
- **Target roles**: authenticated
- **Policy definition**: `true`

**Política 3: Delete Autenticado**
- **Policy name**: Authenticated delete
- **Allowed operation**: DELETE
- **Target roles**: authenticated
- **Policy definition**: `true`

## 5. Configurar Autenticação

1. No dashboard do Supabase, vá em **Authentication** > **Providers**
2. Certifique-se de que **Email** está habilitado
3. Vá em **Authentication** > **Users**
4. Clique em "Add user" > "Create new user"
5. Preencha:
   - **Email**: seu_email@exemplo.com
   - **Password**: sua_senha_segura
   - **Auto Confirm User**: ✅ Marque
6. Clique em "Create user"

## 6. Testar a Aplicação

1. Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Acesse: `http://localhost:3000/admin/login`
3. Faça login com as credenciais que você criou
4. Teste criar um novo conteúdo com imagem

## Verificação

Se tudo estiver configurado corretamente:
- ✅ Você consegue fazer login
- ✅ A página de conteúdos carrega sem erros
- ✅ Você consegue criar novos conteúdos
- ✅ Imagens são enviadas e exibidas corretamente
- ✅ A página de configurações mostra status "Conectado"

## Solução de Problemas

### Erro: "Invalid API key"
- Verifique se copiou corretamente a `anon key` do Supabase
- Certifique-se de que reiniciou o servidor após alterar `.env.local`

### Erro ao criar conteúdo
- Verifique se executou o SQL schema corretamente
- Confira se as políticas RLS estão ativas

### Imagens não carregam
- Verifique se o bucket `content-images` é público
- Confira as políticas de storage

### Não consegue fazer login
- Verifique se criou o usuário no Authentication
- Certifique-se de que marcou "Auto Confirm User"

## Recursos Úteis

- [Documentação do Supabase](https://supabase.com/docs)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
