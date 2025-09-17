# Guia de Instalação do Quiz de Perfumes

Este guia mostra como incorporar o quiz de perfumes em um projeto React/Next.js externo.

## 📋 Dependências Necessárias

Adicione estas dependências ao seu `package.json`:

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.9.1",
    "@radix-ui/react-label": "latest",
    "@radix-ui/react-radio-group": "latest",
    "@radix-ui/react-slot": "latest",
    "axios": "^1.10.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.454.0",
    "next": "^14.2.30",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

## 📁 Estrutura de Arquivos

Após a instalação, você terá os seguintes arquivos:

```
seu-projeto/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── radio-group.tsx
│   │   └── label.tsx
│   ├── PerfumeQuiz.tsx
│   └── PriceAnchoring.tsx
├── lib/
│   └── utils.ts
├── styles/
│   └── animations.module.css
└── public/
    ├── logo.svg
    ├── per1.png
    ├── per2.png
    ├── per3.png
    ├── kit1.jpg
    ├── kit2.jpg
    └── kit3.jpg
```

### 📦 Arquivos Fornecidos

Este pacote inclui todos os arquivos necessários:
- `PerfumeQuiz.tsx` - Componente principal do quiz
- `PriceAnchoring.tsx` - Componente de ofertas e preços
- `utils.ts` - Funções utilitárias e tracking
- `animations.module.css` - Estilos de animação
- `ui-components/` - Componentes UI (Button, RadioGroup, Label)
- `package-dependencies.json` - Lista de dependências necessárias

## 📁 Arquivos a Copiar

### 1. Componentes UI (shadcn/ui)
Crie a pasta `components/ui/` e copie:
- `button.tsx`
- `radio-group.tsx` 
- `label.tsx`

### 2. Utilitários
Crie a pasta `lib/` e copie:
- `utils.ts`

### 3. Componentes Principais
Crie a pasta `components/` e copie:
- `price-anchoring.tsx`

### 4. Estilos
Crie a pasta `styles/` e copie:
- `animations.module.css`

### 5. Hooks
Crie a pasta `hooks/` e copie:
- `use-toast.ts`
- `use-mobile.tsx`

### 6. Imagens
Copie para a pasta `public/`:
- `per1.png` até `per11.png`
- `logo.svg`
- `icons.jpg`
- `footer.jpg`

## 🚀 Instalação Passo a Passo

### 1. Instalar Dependências
```bash
npm install @hookform/resolvers @radix-ui/react-label @radix-ui/react-radio-group @radix-ui/react-slot axios class-variance-authority clsx lucide-react tailwind-merge tailwindcss-animate
```

### 2. Configurar Tailwind CSS
Certifique-se de que seu `tailwind.config.js` inclui:
```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 3. Criar Página do Quiz
Para Next.js App Router, crie `app/quiz/page.tsx`:
```tsx
import PerfumeQuiz from '@/components/PerfumeQuiz'

export default function QuizPage() {
  return <PerfumeQuiz />
}
```

Para Next.js Pages Router, crie `pages/quiz.tsx`:
```tsx
import PerfumeQuiz from '@/components/PerfumeQuiz'

export default function QuizPage() {
  return <PerfumeQuiz />
}
```

## 🔧 Configurações Adicionais

### Variáveis de Ambiente
Crie um arquivo `.env.local` com:
```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID_1=seu_pixel_id
NEXT_PUBLIC_TIKTOK_PIXEL_ID_1=seu_pixel_id
NEXT_PUBLIC_N8N_WEBHOOK_URL=sua_webhook_url
NEXT_PUBLIC_N8N_WEBHOOK_KEY=sua_webhook_key
```

### Configuração de Alias
No seu `tsconfig.json`, certifique-se de ter:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 📝 Adaptações Necessárias

1. **Ajustar imports**: Verifique se todos os caminhos `@/` estão corretos
2. **Personalizar estilos**: Adapte as cores e estilos conforme sua marca
3. **Configurar tracking**: Ajuste os pixels de tracking conforme necessário
4. **Testar responsividade**: Verifique se funciona bem em mobile

## 🎯 Uso

Após a instalação, o quiz estará disponível na rota `/quiz` do seu projeto.

## 🔍 Troubleshooting

- **Erro de imports**: Verifique se todos os componentes UI foram copiados
- **Estilos não aplicados**: Confirme se o Tailwind CSS está configurado corretamente
- **Imagens não carregam**: Verifique se as imagens estão na pasta `public/`
- **TypeScript errors**: Certifique-se de que os tipos estão corretos

## 📞 Suporte

Se encontrar problemas, verifique:
1. Todas as dependências foram instaladas
2. Todos os arquivos foram copiados corretamente
3. As configurações do Tailwind estão corretas
4. Os caminhos de import estão corretos