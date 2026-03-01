# PRD — Levantamento de Ajustes e Simplificações do Site Enxerga

**Data:** 2026-02-27
**Arquivo analisado:** `index.html` (822 linhas)

---

## PARTE 1 — Oportunidades de Simplificação de Código

### 1.1 Repetição de `font-family`
A pilha de fontes `'Helvetica Neue', Helvetica, Arial, sans-serif` é declarada manualmente em **pelo menos 7 lugares** diferentes no CSS (`.f-sub`, `.f-label`, `.btn-outline`, `.nav-link`, `.mobile-nav-link`, etc.). Poderia ser substituída por uma variável CSS `--font-base` declarada uma vez no `:root`.

### 1.2 Animações `anim-*` e `reveal-delay-*` redundantes
As classes `.anim-0` até `.anim-3` (linhas 142–145) e `.reveal-delay-1` até `.reveal-delay-3` (linhas 156–158) são variações do mesmo `fadeUp` com delay diferente. O padrão pode ser reduzido com `--delay` como variável CSS inline ou com `nth-child` selectors.

### 1.3 Número do WhatsApp repetido 7 vezes
A URL `https://wa.me/5541988415351` aparece nos seguintes locais:
- Linha 324 — Botão "Fale Comigo" (nav desktop)
- Linha 343 — Botão "Fale Comigo" (nav mobile)
- Linha 379 — Botão "Agendar Conversa Gratuita" (hero)
- Linha 655 — Botão "Ver Portfólio Completo" (mobile)
- Linha 658 — Botão "Ver Portfólio Completo" (desktop)
- Linha 727 — Botão "Agendar Conversa Gratuita" (CTA)
- Linha 744 — Link de contato WhatsApp (CTA rodapé)

Poderia ser definida como constante JS: `const WA = 'https://wa.me/5541999837301'` e injetada dinamicamente, evitando o risco de edição parcial.

### 1.4 Padrão de barras coloridas nos cards de serviço
O bloco de três `<div>` coloridos (36px / 18px / 9px de largura) com cores variadas aparece em cada card (linhas 435–439, 460–464, 483–487) com estrutura idêntica. Pode ser abstraído num componente ou pelo menos num fragmento de template.

### 1.5 Tags de serviço (badges) com estilo idêntico
Cada card tem de 3 badges `<span>` com exatamente o mesmo estilo inline (`font-size:10px; padding:6px 14px; border:1px solid #333; color:#888; letter-spacing:0.15em; text-transform:uppercase`). Ao todo são 9 declarações idênticas (linhas 451–455, 474–478, 499–503). Poderia virar uma classe `.svc-tag`.

### 1.6 Bullet points da seção "Sobre" — estrutura triplicada
Os três blocos de "ponto + título + texto" (linhas 552–573) têm estrutura HTML idêntica, variando apenas cor do ponto, título e texto. Código repetitivo mas aceitável pela clareza; poderia ser gerado por JS.

### 1.7 Funções `toggleNav` e `closeNav` com lógica duplicada
`closeNav()` (linhas 786–790) executa manualmente o que `toggleNav()` já faz quando `isOpen = true`. Poderia ser substituída por `setNavState(false)` compartilhado.

### 1.8 Hover de links com `onmouseover`/`onmouseout` inline (linhas 736, 740)
Os links de Instagram e Email na seção CTA usam JavaScript inline para hover, enquanto o restante do site usa CSS `transition`. Inconsistência de padrão — deveriam usar CSS como os demais.

### 1.9 Separadores de 1px repetidos (linhas 389, 394)
O `<div style="width:1px;background:#1e1e1e;align-self:stretch;">` aparece duas vezes entre os stats. Poderia virar classe `.stat-divider`.

### 1.10 Blobs de gradiente radial em múltiplas seções
O padrão de `div` absoluto com `radial-gradient` como decoração de fundo aparece na seção Hero (linhas 352–354), Sobre (linha 513) e CTA (linha 705). A estrutura é quase idêntica — candidato a classe `.ambient-blob`.

---

## PARTE 2 — Estruturas Semelhantes em Múltiplos Locais

| Padrão | Localizações no código | Ocorrências |
|--------|------------------------|-------------|
| URL WhatsApp | Linhas 324, 343, 379, 655, 658, 727, 744 | 7× |
| Barra colorida do card (`36px / 18px / 9px`) | Linhas 435, 460, 483 | 3× |
| Badge de serviço `.svc-tag` (mesmo estilo inline) | Linhas 451–455, 474–478, 499–503 | 9 spans |
| Bullet point (ponto + f-head + texto) | Linhas 552–558, 559–565, 566–572 | 3× |
| Step item (número + título + parágrafo) | Linhas 596–604, 607–615, 618–626, 629–637 | 4× |
| Blob de gradiente decorativo | Linhas 352–354, 513, 705 | 3× |
| `font-family: 'Helvetica Neue'...` inline | CSS: múltiplas classes | 7+ |
| `transition: ... cubic-bezier(0.16,1,0.3,1)` | CSS: múltiplos seletores | 5+ |

---

## PARTE 3 — Mudanças Solicitadas

### MUDANÇA 1 — Seção de estatísticas (Stats)

**Localização:** Linhas 385–399 (seção Hero, bloco `.stats-grid`)

**Mudança 1a — "Desde" antes de "2019"**
- Situação atual: O número `2019` aparece primeiro (linha 386), e "Desde" aparece como legenda abaixo (linha 387).
- Mudança: Inverter a ordem visual — "Desde" deve aparecer **acima** (ou antes) do "2019", funcionando como prefixo/rótulo superior.
- Sugestão de implementação: mover o `div` com "Desde" para antes do `div` com o número, ajustando tamanho/estilo para parecer um label de rótulo acima do número.

**Mudança 1b — Texto do stat "0"**
- Situação atual (linha 392–393): `chances de publicidade<br>/ marketing forçado`
- Mudança: `chances de marketing forçado` (remover "publicidade<br>/ ")
- Linha exata: `<div style="font-size:10px;color:#666;...">chances de publicidade<br>/ marketing forçado</div>`

---

### MUDANÇA 2 — Peso de fonte dos textos principais

**Objetivo:** Melhorar legibilidade e contraste. O "Scroll" (linha 412) tem o mesmo `font-weight: 300` do `body`, o que o faz se perder visualmente entre os textos de conteúdo. A solução é aumentar o peso dos textos de conteúdo, **sem alterar o scroll indicator**.

**Locais a aumentar o font-weight (de 300 → 400):**

| Descrição | Linha(s) | Valor atual |
|-----------|----------|-------------|
| Parágrafo hero (copy principal) | 371 | `font-weight:300` |
| Parágrafos dos cards de serviço | 448, 472, 497 | `font-weight:300` |
| Parágrafo da seção Sobre | 547 | `font-weight:300` |
| Bullet points (textos) | 556, 563, 570 | `font-weight:300` |
| Parágrafos dos steps | 602, 612, 622, 632 | `font-weight:300` |
| Parágrafo do CTA | 721 | `font-weight:300` |
| Body (declaração global) | 19 | `font-weight: 300` (afeta o scroll também — NÃO alterar aqui) |

**O "Scroll" NÃO deve ser alterado** (linha 412 — `font-size:9px; letter-spacing:0.4em; opacity:0.3` — mantém 300 ou reduz opacity ainda mais se necessário).

---

### MUDANÇA 3 — "O que fazemos" → "O que faço"

**Localização:** Linha 423

**Situação atual:**
```html
<div class="f-label" style="margin-bottom:18px;">O que fazemos</div>
```

**Mudança:**
```html
<div class="f-label" style="margin-bottom:18px;">O que faço</div>
```

---

### MUDANÇA 4 — Toggle modo diurno / noturno

**Objetivo:** Adicionar um botão interativo (liga/desliga) que alterna entre modo escuro (atual) e modo claro (fundo branco, texto preto).

**Referência de inspiração:** https://codepen.io/peterbenoit/pen/azmoXxP

**Localização do botão:** Recomendado na barra de navegação, ao lado do botão "Fale Comigo" (linha ~319–325), ou como botão flutuante fixo no canto inferior direito.

**Escopo das mudanças de código:**

1. **CSS — variáveis de tema no `:root`** (a adicionar no `<style>`):
   - Definir variáveis `--bg`, `--text`, `--muted`, `--border`, `--card-bg` para o modo escuro (valores atuais).
   - Criar seletor `body.light-mode` com overrides: fundo branco, texto preto, cards em cinza muito claro, bordas em #ddd, etc.
   - O grid de fundo (linhas 14–17) precisará de override para modo claro (linhas mais escuras/visíveis).
   - O noise overlay (linha 166–173) deve ter opacidade aumentada ou cor ajustada no modo claro.

2. **HTML — botão do toggle** (a adicionar):
   - Elemento `<button id="theme-toggle">` com ícone de sol/lua (SVG inline ou emoji).
   - Posicionamento sugerido: na nav desktop ao lado do "Fale Comigo", e no footer do menu mobile.
   - Precisa de estado visual claro (ícone muda de lua → sol ao ativar modo claro).

3. **JavaScript — lógica do toggle** (a adicionar no `<script>`):
   - Função `toggleTheme()` que adiciona/remove classe `light-mode` no `<body>`.
   - Persistência via `localStorage` para manter a preferência entre visitas.
   - Atualizar ícone do botão conforme estado.

4. **Cores que precisam de override no modo claro:**
   - `body` background: `#000` → `#fff`
   - `body` color: `#fff` → `#111`
   - `.svc-card` background: `#0a0a0a` → `#f5f5f5`
   - `.svc-card` border: `#1a1a1a` → `#e0e0e0`
   - Nav background: `rgba(0,0,0,0.92)` → `rgba(255,255,255,0.95)`
   - `#mobile-menu` background: `rgba(0,0,0,0.97)` → `rgba(255,255,255,0.97)`
   - Textos `#999`, `#888`, `#777`, `#666` → tons de cinza escuro (`#444`, `#555`, `#333`)
   - `.f-label` color `#888` → `#555`
   - `.nav-link` color `#777` → `#444`
   - Seção "sobre" background `rgba(6,6,6,0.85)` → `rgba(245,245,245,0.85)`
   - Portfolio section background → `rgba(240,240,240,0.85)`
   - Scrollbar: `#222` → `#ccc`
   - Grid de fundo: `rgba(255,255,255,0.07)` → `rgba(0,0,0,0.06)`

---

### MUDANÇA 5 — Troca do número de telefone/WhatsApp

**Número atual:** `5541988415351` (aparece como `+55 41 9 8841-5351` no display)
**Número novo:** `5541999837301` (aparece como `+55 41 9 9983-7301` no display)

**Todos os locais a alterar:**

| Linha | Contexto | O que alterar |
|-------|----------|---------------|
| 324 | Nav desktop — "Fale Comigo" | `href="https://wa.me/5541988415351"` → `...5541999837301` |
| 343 | Nav mobile — "Fale Comigo" | `href="https://wa.me/5541988415351"` → `...5541999837301` |
| 379 | Hero — "Agendar Conversa Gratuita" | `href="https://wa.me/5541988415351"` → `...5541999837301` |
| 655 | Portfolio — botão mobile | `href="https://wa.me/5541988415351"` → `...5541999837301` |
| 658 | Portfolio — botão desktop | `href="https://wa.me/5541988415351"` → `...5541999837301` |
| 727 | CTA — "Agendar Conversa Gratuita" | `href="https://wa.me/5541988415351"` → `...5541999837301` |
| 744 | CTA — link WhatsApp com texto | `href="https://wa.me/5541988415351"` → `...5541999837301` |
| 745 | CTA — texto visível do número | `+55 41 9 8841-5351` → `+55 41 9 9983-7301` |

**Total de ocorrências da URL:** 7
**Total de ocorrências do número no texto visível:** 1 (linha 745)

---

## RESUMO GERAL

| # | Tipo | Impacto | Complexidade |
|---|------|---------|--------------|
| 1 | Simplificação: variáveis CSS de fonte | Manutenção | Baixa |
| 2 | Simplificação: variáveis CSS de animação | Manutenção | Baixa |
| 3 | Simplificação: URL WhatsApp como constante JS | Manutenção / Bug-prevention | Baixa |
| 4 | Simplificação: classe `.svc-tag` para badges | Manutenção | Baixa |
| 5 | Simplificação: `closeNav` / `toggleNav` unificados | Manutenção | Baixa |
| 6 | Simplificação: hover de links via CSS | Consistência | Muito baixa |
| M1a | Mudança: "Desde" acima do "2019" | Visual / UX | Baixa |
| M1b | Mudança: texto stat "0" | Conteúdo | Muito baixa |
| M2 | Mudança: font-weight dos textos principais | Legibilidade | Baixa |
| M3 | Mudança: "O que fazemos" → "O que faço" | Conteúdo | Muito baixa |
| M4 | Mudança: toggle modo claro/escuro | Feature | Alta |
| M5 | Mudança: número WhatsApp (7 locais + display) | Conteúdo | Muito baixa |
