import { useFieldArray } from "react-hook-form"
import type { Control, UseFieldArrayRemove, UseFormRegister } from "react-hook-form"
import FormField from "@/components/FormField"
import type { CVFormResult, FormSectionTemplate } from "@/types"

type Props = {
  /** The Section Template */
  template: FormSectionTemplate
  /** "sections" array remove function */
  sectionRemove: UseFieldArrayRemove,
  /** CVForm useForm.register function */
  register: UseFormRegister<CVFormResult>,
  /** Index of the section */
  index: number,
  control: Control<CVFormResult, any, CVFormResult>
}

/**
 * @description Render the inputs of the section and manage the data fields
 */
export default function CVSection({template, sectionRemove, register, index, control}:Props) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `sections.${index}.fields` as const // fields array
  })

  /** Base of the "name" with which the inputs will be registered, e.g., "sections.0" */
  const name = `sections.${index}` as const

  return (
    <>
      <legend>
        <button onClick={() => sectionRemove(index)}>X</button>
        <input placeholder={template!.placeholder} {...register(`${name}.title`)} />

        <label >
          <span>Aside</span>
          <input type='checkbox' {...register(`${name}.aside`)} />
        </label>

        <input {...register(`${name}.type`)} hidden />
      </legend>

      {fields.map((field, fieldIndex) => (
        <fieldset key={field.id}>
          <button onClick={() => remove(fieldIndex)}>X</button>

          {template.fields.map((fieldTemplate, idx) => (
            <label key={`${field.id}-${idx}`}>
              <span>{fieldTemplate.label}</span>

              <FormField 
                field={fieldTemplate} 
                fieldIndex={fieldIndex} 
                sectionIndex={index} 
                register={register} 
              />
            </label>
          ))}
        </fieldset>
      ))}
      <button 
        role={`append-${template.type}-fields-${index}`} // e.g., append-personal-fields-0
        onClick={() => append({})}
      >
        append
      </button>
    </>
  )
}