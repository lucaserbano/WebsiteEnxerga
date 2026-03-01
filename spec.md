# spec.md — Plano de Implementação dos Ajustes do Site Enxerga

**Gerado em:** 2026-02-27
**Baseado em:** PRD.md
**Arquivo alvo:** `index.html` (822 linhas) — único arquivo de código do projeto.

---

## Resumo dos Arquivos

| Arquivo | Ação | Motivo |
|---------|------|--------|
| `index.html` | **Modificar** | Único arquivo de código; contém todo HTML, CSS e JS inline |

Nenhum arquivo novo precisa ser criado. Todas as alterações ocorrem dentro de `index.html`.

---

## Bloco 1 — Mudanças de Conteúdo (baixa complexidade)

### M3 · "O que fazemos" → "O que faço"
- **Localização:** linha 423
- **O que mudar:** valor de texto dentro do `<div class="f-label">`

```html
<!-- ANTES -->
<div class="f-label" style="margin-bottom:18px;">O que fazemos</div>

<!-- DEPOIS -->
<div class="f-label" style="margin-bottom:18px;">O que faço</div>
```

---

### M1b · Texto do stat "0" (seção Hero)
- **Localização:** linha 392
- **O que mudar:** remover "publicidade<br>/ " do texto de legenda

```html
<!-- ANTES -->
<div style="font-size:10px;color:#666;letter-spacing:0.1em;text-transform:uppercase;margin-top:6px;line-height:1.6;">chances de publicidade<br>/ marketing forçado</div>

<!-- DEPOIS -->
<div style="font-size:10px;color:#666;letter-spacing:0.1em;text-transform:uppercase;margin-top:6px;line-height:1.6;">chances de marketing forçado</div>
```

---

## Bloco 2 — Mudanças de Layout (baixa complexidade)

### M1a · "Desde" acima de "2019"
- **Localização:** linhas 385–388, dentro de `.stats-grid`
- **O que mudar:** inverter a ordem dos dois `<div>` dentro do bloco do stat "2019" — o label "Desde" deve aparecer **antes** do número. Ajustar o estilo do label para parecer um rótulo/prefixo superior (fonte menor, muted).

```html
<!-- ANTES (linhas 385-388) -->
<div style="flex:1;">
  <div class="f-head" style="font-size:34px;color:#FFFF00;line-height:1;">2019</div>
  <div style="font-size:10px;color:#666;letter-spacing:0.12em;text-transform:uppercase;margin-top:6px;line-height:1.6;">Desde</div>
</div>

<!-- DEPOIS -->
<div style="flex:1;">
  <div style="font-size:9px;color:#666;letter-spacing:0.25em;text-transform:uppercase;margin-bottom:6px;">Desde</div>
  <div class="f-head" style="font-size:34px;color:#FFFF00;line-height:1;">2019</div>
</div>
```

---

## Bloco 3 — Mudanças de Tipografia

### M2 · `font-weight: 300 → 400` nos textos de conteúdo
- **Atenção:** NÃO alterar o `font-weight` global do `body` (linha 19) nem o elemento "Scroll" (linha 412).
- **Total de locais a modificar:** 12 atributos `font-weight:300` inline.

| Linha | Elemento | Contexto |
|-------|----------|----------|
| 371 | `<p class="anim-2">` | Parágrafo hero principal |
| 448 | `<p>` dentro de `.svc-card` (Fotografia) | Descrição do serviço |
| 472 | `<p>` dentro de `.svc-card` (Vídeo) | Descrição do serviço |
| 497 | `<p>` dentro de `.svc-card` (Marketing) | Descrição do serviço |
| 547 | `<p>` na seção Sobre | Parágrafo principal |
| 556 | `<div>` bullet 1 (texto) | Autoridade Real |
| 563 | `<div>` bullet 2 (texto) | Produção Audiovisual |
| 570 | `<div>` bullet 3 (texto) | Estratégia Integrada |
| 602 | `<p>` step 1 | Diagnóstico |
| 612 | `<p>` step 2 | Estratégia |
| 622 | `<p>` step 3 | Produção |
| 632 | `<p>` step 4 | Crescimento |
| 721 | `<p>` seção CTA | Parágrafo de fechamento |

**Operação:** em cada uma das linhas acima, substituir `font-weight:300` por `font-weight:400`.

---

## Bloco 4 — Mudança de Dados (muito baixa complexidade)

### M5 · Troca do número WhatsApp
- **Número antigo:** `5541988415351` / `+55 41 9 8841-5351`
- **Número novo:** `5541999837301` / `+55 41 9 9983-7301`
- **Operação:** substituição global (find & replace) em todo o arquivo.

| Linha | Contexto | O que substituir |
|-------|----------|-----------------|
| 324 | Nav desktop — "Fale Comigo" | URL no `href` |
| 343 | Nav mobile — "Fale Comigo" | URL no `href` |
| 379 | Hero — "Agendar Conversa Gratuita" | URL no `href` |
| 655 | Portfolio — botão mobile | URL no `href` |
| 658 | Portfolio — botão desktop | URL no `href` |
| 727 | CTA — "Agendar Conversa Gratuita" | URL no `href` |
| 744 | CTA — link WhatsApp | URL no `href` |
| 745 | CTA — texto visível | Número exibido ao usuário |

**Snippet de referência (linha 744–745):**
```html
<!-- ANTES -->
<a href="https://wa.me/5541988415351" target="_blank" class="btn-primary" style="font-size:11px;padding:10px 24px;display:inline-block;">
  +55 41 9 8841-5351
</a>

<!-- DEPOIS -->
<a href="https://wa.me/5541999837301" target="_blank" class="btn-primary" style="font-size:11px;padding:10px 24px;display:inline-block;">
  +55 41 9 9983-7301
</a>
```

---

## Bloco 5 — Nova Feature: Toggle Modo Claro/Escuro (alta complexidade)

### M4 · Toggle dark/light mode

Esta é a única mudança que exige adições em três lugares do arquivo: `<style>`, `<body>` e `<script>`.

---

#### 5.1 · CSS — Adicionar no `<style>` (após as variáveis existentes ou logo antes do fechamento `</style>`)

**Variáveis de tema no `:root`** e overrides `body.light-mode`:

```css
/* ── THEME VARIABLES ── */
:root {
  --bg: #000000;
  --text: #ffffff;
  --muted: #999;
  --border: #1a1a1a;
  --card-bg: #0a0a0a;
  --grid-line: rgba(255,255,255,0.07);
  --nav-bg: rgba(0,0,0,0.92);
  --mobile-menu-bg: rgba(0,0,0,0.97);
  --label-color: #888;
  --nav-link-color: #777;
  --section-sobre-bg: rgba(6,6,6,0.85);
  --scrollbar-thumb: #222;
}

body.light-mode {
  background-color: #ffffff;
  background-image:
    linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
  color: #111111;
}

body.light-mode .svc-card {
  background: #f5f5f5;
  border-color: #e0e0e0;
}

body.light-mode nav {
  background: rgba(255,255,255,0.95);
  border-color: #e8e8e8;
}

body.light-mode #mobile-menu {
  background: rgba(255,255,255,0.97);
}

body.light-mode .nav-link {
  color: #444;
}

body.light-mode .f-label {
  color: #555;
}

body.light-mode #sobre {
  background: rgba(245,245,245,0.85);
}

/* Scrollbar no modo claro */
body.light-mode ::-webkit-scrollbar-thumb {
  background: #ccc;
}

/* Ícone do toggle */
#theme-toggle {
  background: none;
  border: 1px solid #333;
  color: #999;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, color 0.2s;
  flex-shrink: 0;
}

#theme-toggle:hover {
  border-color: #fff;
  color: #fff;
}

body.light-mode #theme-toggle {
  border-color: #999;
  color: #444;
}

body.light-mode #theme-toggle:hover {
  border-color: #111;
  color: #111;
}
```

---

#### 5.2 · HTML — Botão do toggle na `<nav>` (duas posições)

**Nav desktop** — inserir o botão `#theme-toggle` dentro do `.nav-links`, antes do botão "Fale Comigo" (linha ~324):

```html
<!-- Inserir ANTES do botão "Fale Comigo" na nav desktop -->
<button id="theme-toggle" aria-label="Alternar tema" onclick="toggleTheme()" title="Modo claro/escuro">
  <!-- Ícone lua (modo escuro ativo) -->
  <svg id="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
  <!-- Ícone sol (modo claro ativo, oculto por padrão) -->
  <svg id="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="display:none;">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
</button>
```

**Nav mobile** — inserir o mesmo botão (ou uma versão simplificada) no `#mobile-menu`, após os links e antes do `<div>` com o "Fale Comigo" mobile (linha ~342):

```html
<!-- Inserir no #mobile-menu, antes do div do btn "Fale Comigo" -->
<div style="padding:8px 24px;">
  <button onclick="toggleTheme()" style="background:none;border:1px solid #333;color:#999;padding:10px 20px;width:100%;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;">
    Alternar Tema
  </button>
</div>
```

---

#### 5.3 · JavaScript — Adicionar no `<script>` (antes do fechamento `</script>`, linha ~818)

```javascript
// ── THEME TOGGLE ──
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  document.getElementById('icon-moon').style.display = isLight ? 'none' : '';
  document.getElementById('icon-sun').style.display  = isLight ? '' : 'none';
}

// Restaurar preferência ao carregar
(function() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    const moon = document.getElementById('icon-moon');
    const sun  = document.getElementById('icon-sun');
    if (moon) moon.style.display = 'none';
    if (sun)  sun.style.display  = '';
  }
})();
```

---

## Bloco 6 — Simplificações de Código (refatorações sem mudança visual)

Estas simplificações são **opcionais** (não afetam o visual) mas reduzem risco de inconsistência futura. Aplicar separadamente das mudanças obrigatórias.

---

### S1 · Variável CSS `--font-base` no `:root`
- **Localização:** `<style>`, adicionar no `:root`; substituir todas as declarações `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif` por `var(--font-base)`.
- **Impacto:** ~7 ocorrências em `.f-sub`, `.f-label`, `.btn-outline`, `.nav-link`, `.mobile-nav-link`, etc.

```css
:root {
  --font-base: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
/* Exemplo de uso: */
.f-label { font-family: var(--font-base); }
```

---

### S2 · Constante JS `WA` para a URL do WhatsApp
- **Localização:** `<script>`, início do bloco.
- **Impacto:** elimina os 7 hrefs hardcoded; qualquer troca futura de número é feita em 1 lugar.

```javascript
// Declarar no topo do <script>
const WA = 'https://wa.me/5541999837301';

// Injetar em todos os links WhatsApp ao carregar
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[data-wa]').forEach(a => { a.href = WA; });
});
```

> Para funcionar, adicionar `data-wa` em cada `<a>` de WhatsApp no HTML (remove o `href` hardcoded desses elementos).

---

### S3 · Classe `.svc-tag` para os badges de serviço
- **Localização:** `<style>`, adicionar classe. Substituir os 9 `<span>` com style inline idêntico.
- **Impacto:** 9 spans em linhas 451–455, 474–478, 499–503.

```css
/* Adicionar no <style> */
.svc-tag {
  font-size: 10px;
  padding: 6px 14px;
  border: 1px solid #333;
  color: #888;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
```

```html
<!-- ANTES -->
<span style="font-size:10px;padding:6px 14px;border:1px solid #333;color:#888;letter-spacing:0.15em;text-transform:uppercase;">Clínica</span>

<!-- DEPOIS -->
<span class="svc-tag">Clínica</span>
```

---

### S4 · Unificar `closeNav()` com `toggleNav()`
- **Localização:** `<script>`, funções nas linhas 778–790.
- **Impacto:** elimina lógica duplicada.

```javascript
// ANTES: closeNav() repete manualmente o que toggleNav() já faz

// DEPOIS: closeNav() apenas chama toggleNav com estado forçado
function setNavOpen(open) {
  const menu   = document.getElementById('mobile-menu');
  const toggle = document.getElementById('nav-toggle');
  menu.classList.toggle('open', open);
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
}

function toggleNav() { setNavOpen(!document.getElementById('mobile-menu').classList.contains('open')); }
function closeNav()  { setNavOpen(false); }
```

---

### S5 · Hover dos links via CSS (em vez de `onmouseover`/`onmouseout` inline)
- **Localização:** linhas 736 (Instagram) e 740 (Email) na seção CTA.
- **O que mudar:** remover atributos `onmouseover` e `onmouseout`; adicionar classe CSS.

```css
/* Adicionar no <style> */
.contact-link:hover { color: #fff; }
```

```html
<!-- ANTES -->
<a href="..." style="color:#999;..." onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#999'">instagram.com/enxerga</a>

<!-- DEPOIS -->
<a href="..." class="contact-link" style="color:#999;transition:color 0.2s;">instagram.com/enxerga</a>
```

---

### S6 · Classe `.stat-divider` para os separadores de 1px
- **Localização:** linhas 389 e 394 (dois `<div>` com `width:1px;background:#1e1e1e`).

```css
/* Adicionar no <style> */
.stat-divider { width:1px; background:#1e1e1e; align-self:stretch; }
```

```html
<!-- ANTES -->
<div style="width:1px;background:#1e1e1e;align-self:stretch;"></div>

<!-- DEPOIS -->
<div class="stat-divider"></div>
```

---

## Ordem de Implementação Recomendada

| Prioridade | Bloco | Tipo | Complexidade |
|-----------|-------|------|--------------|
| 1 | M5 — Troca WhatsApp | Conteúdo | Muito baixa |
| 2 | M3 — "O que faço" | Conteúdo | Muito baixa |
| 3 | M1b — Texto stat "0" | Conteúdo | Muito baixa |
| 4 | M1a — "Desde" acima do "2019" | Layout | Baixa |
| 5 | M2 — font-weight 300→400 | Tipografia | Baixa |
| 6 | M4 — Toggle dark/light | Feature | Alta |
| 7 | S3–S6 — Simplificações menores | Refatoração | Muito baixa |
| 8 | S1–S2 — Variáveis CSS/JS | Refatoração | Baixa |

---

## Checklist de Validação Pós-Implementação

- [ ] M5: "https://wa.me/5541988415351" não aparece mais em nenhum lugar do arquivo
- [ ] M5: "+55 41 9 9983-7301" aparece corretamente no texto visível (linha ~745)
- [ ] M3: texto "O que fazemos" foi substituído por "O que faço"
- [ ] M1b: legenda do stat "0" não contém "publicidade" nem `<br>`
- [ ] M1a: "Desde" está visualmente **acima** do número "2019"
- [ ] M2: elemento "Scroll" (linha ~412) mantém `font-weight:300` (não foi alterado)
- [ ] M4: botão de toggle aparece na nav desktop
- [ ] M4: modo claro persiste ao recarregar a página (localStorage)
- [ ] M4: ícone muda de lua → sol ao ativar modo claro
- [ ] M4: no modo claro, nenhum texto de conteúdo fica ilegível (branco sobre branco)
