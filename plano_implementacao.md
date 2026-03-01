# Plano de Implementação: Enxerga - Produções Audiovisuais

Este documento detalha o passo a passo exato (arquivos a criar, modificar e comandos a executar) para aplicar as melhorias propostas na estrutura do site.

## 1. Nova Estrutura de Diretórios
Os seguintes diretórios devem ser criados na raiz do projeto (`/Users/lucas/Downloads/Claude - Construção de sites/`):
- `assets/`
  - `assets/images/`
  - `assets/css/`
  - `assets/js/`
- `src/` (Para o arquivo de entrada do Tailwind)

## 2. Movimentação e Otimização de Arquivos (Imagens)
**Ação:** Mover as seguintes imagens da raiz para `assets/images/`:
- `0R5A3236.jpg`
- `0R5A5146-2-2.jpg`
- `0R5A8871-2.jpg`
- `Clara (12 de 114)-2-2.jpg`
- `Katia (38 de 129)-2-2.jpg`
- `Paola_Todas (28 de 247)-2-2.jpg`
- `logo enxerga.png`

*(Recomendado: converter todas essas imagens para o formato `.webp` para reduzir o tamanho e melhorar o tempo de carregamento)*

## 3. Configuração do Tailwind CSS para Produção
**Ação:** Inicializar o Tailwind CLI.
- Criar/Atualizar `package.json` com dependências de desenvolvimento (`npm install -D tailwindcss`).
- Criar arquivo `tailwind.config.js` executando `npx tailwindcss init`.
- Criar o arquivo `src/input.css` contendo as diretivas do Tailwind:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- No arquivo `tailwind.config.js`, configurar o `content` para apontar para o `index.html`: `content: ["./index.html"]`.

## 4. Criação de Novos Arquivos (Extração de Código)
- **`assets/css/custom.css` (ou incluir junto ao `input.css` do Tailwind):** Extrair todo o bloco `<style>...</style>` (da linha 8 até 305) do `index.html` para cá, mantendo apenas CSS puro.
- **`assets/js/main.js`:** Extrair todo o conteúdo da tag `<script>` (linhas 781 a 824) do `index.html` para este novo arquivo. E adicionar ao HTML via `<script src="assets/js/main.js" defer></script>`.

## 5. Modificações no `index.html`
**Ações a realizar no arquivo principal:**

1. **Remover CDN do Tailwind:**
   - Remover: `<script src="https://cdn.tailwindcss.com"></script>`
2. **Atualizar Head com CSS de Produção:**
   - Adicionar link para o output compilado do Tailwind: `<link rel="stylesheet" href="assets/css/style.css">`
3. **Adicionar Meta Tags SEO & Open Graph (Head):**
   - `<meta name="description" content="[Inserir descrição focada em audiovisual para médicos]">`
   - `<meta property="og:title" content="ENXERGA – Produções Audiovisuais para Profissionais">`
   - `<meta property="og:description" content="[Inserir descrição]">`
   - `<meta property="og:image" content="assets/images/og-image.jpg">` (Arquivo a ser definido/criado)
   - `<meta property="og:type" content="website">`
   - `<link rel="icon" href="assets/images/favicon.png" type="image/png">` (Arquivo a ser definido/criado)
4. **Atualizar Caminhos das Imagens:**
   - Em todas as tags `<img>`, alterar os `src` para apontar para `assets/images/`. 
   - Exemplo: de `src="logo enxerga.png"` para `src="assets/images/logo enxerga.png"`.
5. **Otimizações nas Imagens (Acessibilidade e Desempenho):**
   - Adicionar atributo `loading="lazy"` nas imagens da seção de portfólio.
   - Melhorar os atributos `alt` genéricos (`alt="Portfolio"`) por descrições como `alt="Fotografia profissional para médica clínica geral"`.
6. **Segurança de Links:**
   - Adicionar `rel="noopener noreferrer"` aos links `<a target="_blank">` (ex: link do WhatsApp).

## 6. Processo de Build
- Adicionar um script no `package.json` para compilar o CSS:
  `"build:css": "tailwindcss -i ./src/input.css -o ./assets/css/style.css --minify"`
- Executar esse comando sempre que houver modificações no HTML.

## Arquivos Pendentes (Aguardando Usuário)
Para que a implementação de SEO e compartilhamento fique 100% completa, são necessários:
1. **favicon:** Ícone para a aba do navegador (`favicon.png` ou `.ico`).
2. **og-image:** Imagem de miniatura (recomendado 1200x630 pixels) para compartilhamento em redes sociais/WhatsApp.
3. **Texto da descrição:** Paragrafo curto para `<meta name="description">`.
