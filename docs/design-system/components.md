# Componentes

## Componentes Base

### Button

**Variantes:**

| Variante | Referência | Quando usar |
|----------|-----------|-------------|
| primary / default | `bg-primary text-primary-foreground` | Ação principal da tela — máximo 1 por seção visual |
| secondary | `bg-secondary text-secondary-foreground` | Ação secundária, alternativa à principal |
| destructive | `bg-destructive text-destructive-foreground` | Ações irreversíveis (deletar, cancelar, logout) |
| outline | `border-2 border-border text-foreground` | Ação terciária, menor peso visual |
| ghost | `text-foreground hover:bg-muted` | Ações em toolbars, menus, overflow |
| link | `text-primary underline` | Navegação inline, links em texto |

**Tamanhos:**

| Tamanho | Classes | Padding | Quando usar |
|---------|---------|---------|-------------|
| lg | `px-6 py-3 text-base` | 24px × 12px | Botões principais de página, CTAs |
| default | `px-4 py-2 text-base` | 16px × 8px | Botões padrão em cards, listas |
| sm | `px-3 py-1 text-sm` | 12px × 4px | Botões em headers, inline actions |
| icon | `w-10 h-10 p-2` | 40×40px | Ícones isolados (home, back, menu) |

**Estados:**

- **Default:** fundo colorido, texto legível
- **Hover:** ajuste de opacidade ou tom (mais escuro/claro conforme tema)
- **Active/Pressed:** ainda mais escuro
- **Disabled:** `opacity-50` + `cursor-not-allowed`, nunca remover sem feedback visual
- **Loading:** mostrar spinner interno, desabilitar interação

**Regras:**

- Máximo 1 botão `primary` por seção visual
- Botões destrutivos sempre abrem modal/popover de confirmação
- Botões devem ter `testID` para testes E2E

---

### Input / TextInput

**Estados:**

| Estado | Classe | Quando |
|--------|--------|--------|
| Default | `border-2 border-border bg-input` | Estado inicial |
| Focus | `border-primary ring-1 ring-primary` | Usuário focou |
| Error | `border-2 border-destructive` | Validação falhou |
| Disabled | `bg-muted opacity-50 cursor-not-allowed` | Campo não editável |
| Loading | `opacity-50` | Dados sendo carregados |

**Regras:**

- **Label sempre presente:** todo input tem `<label>` associado via `htmlFor` (acessibilidade)
- **Mensagem de erro abaixo:** nunca como placeholder ou tooltip
- **Placeholder nunca substitui label:** placeholder é hint opcional
- **aria-describedby:** apontar para mensagem de erro
- **Validação:** usar Zod para validação (veja CLAUDE.md)

---

### Card

Componente de container para agrupar conteúdo relacionado.

**Props/Classes:**

- `p-4` a `p-6` (padding padrão)
- `bg-card` (fundo)
- `border border-border` (opcional, para separação visual)
- `rounded-lg` (borda arredondada)

**Uso:**

- Listas de itens
- Detalhes de uma transação ou registro
- Seções de formulário agrupadas

---

### Badge / Chip

Componente pequeno para tags, status, categorias.

**Variantes:**

| Variante | Classes | Uso |
|----------|---------|-----|
| primary | `bg-primary text-primary-foreground px-2 py-1` | Tag principal |
| secondary | `bg-secondary text-secondary-foreground px-2 py-1` | Tag secundária |
| success | `bg-success text-success-foreground px-2 py-1` | Status positivo |
| destructive | `bg-destructive text-destructive-foreground px-2 py-1` | Status crítico |
| outline | `border border-border text-foreground px-2 py-1` | Subtle tag |

---

### Icon Button

Botão com apenas um ícone, sem texto.

**Tamanho padrão:** `w-10 h-10` (40×40px, clicável)

**Uso:** back button, home, menu toggle, delete, edit

---

## Componentes Compostos Reutilizáveis

### PageHeader

Componente no topo de cada página/tela.

```
<PageHeader
  title="string"
  subtitle="string (opcional)"
  action={<Button>...</Button>} // opcional: botão de ação (criar, filtrar, etc.)
/>
```

**Posição:** logo após header/navigation

**Uso:** em todas as páginas principais

---

### EmptyState

Componente exibido quando uma lista, busca ou resultado está vazio.

```
<EmptyState
  icon={<Icon size={48} />}
  title="Nenhum resultado"
  description="Descrição do motivo"
  action={<Button>Criar novo</Button>} // opcional
/>
```

**Uso:** listas vazias, busca sem resultado, estados iniciais

---

### LoadingSpinner

Feedback visual durante carregamento.

```
<LoadingSpinner 
  size="lg" // lg, md, sm
  label="Carregando..." // opcional
/>
```

**Uso:** carregamento de página inteira, modal

---

### Skeleton

Placeholder que preserva o layout enquanto dados carregam.

```
<Skeleton 
  variant="text" // text, card, avatar, button
  lines={3} // para text
/>
```

**Uso:** carregamento de conteúdo que vai aparecer

---

### AlertDialog / ConfirmDialog

Modal de confirmação para ações irreversíveis.

```
<AlertDialog
  title="Deletar item?"
  description="Esta ação não pode ser desfeita."
  onConfirm={handleDelete}
  confirmText="Deletar"
  cancelText="Cancelar"
  variant="destructive" // destructive ou default
/>
```

**Regra:** sempre usar antes de ações destrutivas (delete, logout, hard reset)

---

### Toast / Snackbar

Notificação temporária no topo ou rodapé da tela.

```
showToast({
  message: "Salvo com sucesso",
  variant: "success", // success, error, warning, info
  duration: 3000
})
```

**Uso:** feedback de ações (criou, deletou, erro de rede, etc.)

---

## Guia de Quando Usar Cada Componente

| Situação | Componente |
|----------|-----------|
| Ação principal da tela | Button primary |
| Ação secundária / alternativa | Button secondary |
| Deletar / ação irreversível | Button destructive + AlertDialog |
| Editar um campo | Input (com label e validação) |
| Mostrar lista vazia | EmptyState |
| Esperando dados da API/DB | LoadingSpinner ou Skeleton |
| Feedback rápido (salvo, erro) | Toast |
| Agrupar conteúdo relacionado | Card |
| Status, categoria | Badge |
