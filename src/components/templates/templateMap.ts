const CVTemplates = {
  classic: () => import('./classic.module.less'),
  modern: () => import('./modern.module.less'),
  minimalist: () => import('./minimalist.module.less'),
} as const

export type TemplateKey = keyof typeof CVTemplates

export default CVTemplates