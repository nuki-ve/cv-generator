import type { FormField, FormResultFields, FormResultSection } from "@/types"

/**
 * @class This class is a section template generator
 * @classdesc
 * It uses the same templates of the sectionTemplates const,
 * but change the placeholder and the field labels. Also
 * have a parse function that returns a FormResultSection
 * object that can be used as defaultValues at CVForm's useForm
 */
export class Section {
  title: string
  type: string
  aside: boolean
  fields:Field[]

  /** 
   * @param title The section title that shows on the final CV
   * @param type Define the fields of the section and his style on the CV
   * @param aside If true, the section will show on the side column of the CV.
   * If false, shows on the main column
   * @param fields The fields of the templates, these fields are of the class Field
   * 
   * @example
   * const mySection = new Section('Section Title', 'skills', true, [
   *  new Field(...),
   *  new Field(...)
   * ]) // {type:'Section Title', type: 'skills', aside: true, fields: [Field, Field]}  
   */
  constructor(title:string, type:string, aside:boolean, fields:Field[]) {
    this.type = type
    this.title = title
    this.aside = aside
    this.fields = fields
  }

  /**
   * @returns a FormResultSection object with the same schema as useForm onSubmit result
   * @description Can be used to set defaultValues at CVForm's useForm
   * @example
   * const mySection = new Section(...)
   * // Inside the react component
   * useForm({
   *  defaultValues: { section: [mySection.parse()]}
   * })
   */
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

/**
 * @class This class creates a field for section templates
 */
export class Field {
  role: FormField['role']
  type: FormField['type']
  label: FormField['label']
  answers?: FormField['answers']

  /**
   * 
   * @param role It is the name with which the input is 
   * registered when using the useForm.register function, 
   * it also defines the role attribute
   * @param type It renders different inputs depending on the type.
   * Some types render custom inputs (textarea, select, month), 
   * others simply create a common input element by assigning the type attribute
   * @param label The label of the input in the CVForm
   * @param answers If the input have predefined answers (like selects), these are passed here.
   * Its just an array, each item can be a simple string or 
   * can be an array of 2 items [value, text]
   * @example
   * answers = ['A1', ['0', 'Begginer']]
   * answers[0] => (<option value={answer}>{answer}</option>)
   * answers[1] => (<option value={answer.value}>{answer.text}</option>)
   */
  constructor(
    role:FormField['role'],
    type:FormField['type'], 
    label:FormField['label'], 
    answers=[]
  ){
    this.role = role
    this.type = type
    this.label = label
    this.answers = answers
  }

  /**
   * @returns a FormResultField object with the same schema as useForm onSubmit result fields
   * @description Its used by the Section class to set defaultValues at CVForm's useForm
   * @example
   * new Field('firstName', 'text', 'First Name').parse() => {firstName: ""}
   */
  parse(){
    return {[this.role]: ''} as FormResultFields
  }
}