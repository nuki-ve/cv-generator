export type FormFieldType = 'textarea' | 'select' | 'month' | 'text' | 'date' 
export type WhenCheckProp = 'disable' | null

export type FormField = {
  role: string
  type: FormFieldType
  label: string
  answers?: string[]
}

export type SectionType = 'personal' | 'skills' | 'inscription' | 'list' | 'description'

export type FormSectionTemplate = {
  type: SectionType
  placeholder: string
  fields: FormField[]
}

export type CVFormResult = {
  sections: FormResultSection[]
}

export type FormResultSection = {
  title: string
  type: SectionType
  aside: boolean
  fields: FormResultFields[]
}

export type FormResultFields = {[fieldName: string]: string}