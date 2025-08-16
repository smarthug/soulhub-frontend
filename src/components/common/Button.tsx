import { cn } from '@/utils/cn'

export function Button({className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?:'primary'|'ghost'}) {
  const variant = (props as any).variant ?? 'primary'
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 rounded-2xl text-sm font-medium shadow-soft',
        variant==='primary' && 'bg-brand-600 text-white hover:bg-brand-700',
        variant==='ghost' && 'bg-transparent hover:bg-slate-100',
        className
      )}
      {...props}
    />
  )
}
