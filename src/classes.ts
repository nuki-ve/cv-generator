import type { FormField, FormResultFields, FormResultSection } from "@/types"

export class Section {
  title: string
  type: string
  aside: boolean
  fields:Field[]

  constructor(title:string, type:string, aside:boolean, fields:Field[]) {
    this.type = type
    this.title = title
    this.aside = aside
    this.fields = fields
  }

  parse(){
    const parsedFields:FormResultFields = {}

    this.fields.forEach(field => Object.assign(parsedFields, field.parse()))

    return {
      title: this.title,
      type: this.type,
      aside: this.aside,
      fields: [parsedFields]
    } as FormResultSection
  }
}

export class Field {
  role: string
  type: string
  title: string
  answers?: string[]

  constructor({role, type, title, answers=[]}:FormField){
    this.role = role
    this.type = type
    this.title = title
    this.answers = answers
  }

  parse(){
    return {[this.role]: ''} as FormResultFields
  }
}