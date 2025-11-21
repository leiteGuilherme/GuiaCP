# Como fazer Deploy no Vercel

O Vercel é a plataforma recomendada para hospedar aplicações Next.js. Siga os passos abaixo para colocar seu projeto no ar.

## 1. Preparar o Projeto (Git)

Seu projeto precisa estar em um repositório Git (GitHub, GitLab ou Bitbucket).

1.  **Commitar suas alterações:**
    Certifique-se de que todas as suas mudanças estão salvas e commitadas.
    ```bash
    git add .
    git commit -m "Preparando para deploy"
    ```

2.  **Enviar para o GitHub (exemplo):**
    *   Crie um novo repositório no GitHub.
    *   Siga as instruções do GitHub para enviar seu código existente:
    ```bash
    git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
    git branch -M main
    git push -u origin main
    ```

## 2. Configurar no Vercel

1.  Crie uma conta em [vercel.com](https://vercel.com) (pode usar sua conta do GitHub).
2.  No dashboard, clique em **"Add New..."** -> **"Project"**.
3.  Importe o repositório Git que você acabou de criar.

## 3. Configurar Variáveis de Ambiente

Esta é a parte mais importante. O Vercel precisa das chaves do Supabase para funcionar.

1.  Na tela de configuração do projeto no Vercel ("Configure Project"), procure a seção **"Environment Variables"**.
2.  Adicione as seguintes variáveis (copie os valores do seu arquivo `.env.local`):

    *   **Nome:** `NEXT_PUBLIC_SUPABASE_URL`
    *   **Valor:** (Sua URL do Supabase, ex: `https://xyz.supabase.co`)

    *   **Nome:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   **Valor:** (Sua chave anônima do Supabase)

3.  Clique em **"Deploy"**.

## 4. Finalização

O Vercel vai construir seu projeto e, em alguns minutos, ele estará online! Você receberá uma URL (ex: `guiacp.vercel.app`) para acessar seu site.

### Observação sobre o Supabase

Certifique-se de que a URL do seu site no Vercel (ex: `https://guiacp.vercel.app`) esteja adicionada na lista de **Redirect URLs** no painel do Supabase:
1.  Vá no Supabase Dashboard -> Authentication -> URL Configuration.
2.  Adicione a URL do seu site em "Site URL" e "Redirect URLs".
