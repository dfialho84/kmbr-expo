# Componentes Reutilizáveis

Este diretório contém componentes React Native reutilizáveis que podem ser usados em múltiplas telas.

## Convenções

- Cada componente deve ser um arquivo separado em kebab-case: `my-button.tsx`
- Use TypeScript com tipagem completa (sem `any`)
- Componentes devem ser puros (sem efeitos colaterais)
- Use NativeWind para estilização (Tailwind para React Native)

## Exemplo

```tsx
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
}

export function MyButton({ label, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      className="bg-primary px-lg py-md rounded"
      onPress={onPress}
    >
      <Text className="text-white font-bold">{label}</Text>
    </TouchableOpacity>
  );
}
```
