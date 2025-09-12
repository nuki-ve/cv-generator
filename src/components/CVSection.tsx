import { useFieldArray } from "react-hook-form"
import type { Control, UseFieldArrayRemove, UseFormRegister } from "react-hook-form"
import RenderField from "@/components/RenderField"
import type { CVFormResult, FormSectionTemplate } from "@/types"

type Props = {
  template: FormSectionTemplate
  sectionRemove: UseFieldArrayRemove,
  register: UseFormRegister<CVFormResult>,
  index: number,
  control: Control<CVFormResult, any, CVFormResult>
}

export default function CVSection({template, sectionRemove, register, index, control}:Props) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `sections.${index}.fields` as const
  })

  return (
    <>
      <legend>
        <button onClick={() => sectionRemove(index)}>X</button>
        <input placeholder={template!.placeholder} {...register(`sections.${index}.title`)} />
        <label >
          <span>Aside</span>
          <input type='checkbox' {...register(`sections.${index}.aside`)} />
        </label>
        <input {...register(`sections.${index}.type`)} hidden />
      </legend>
      {fields.map((field, fieldIndex) => (
        <fieldset key={field.id}> 
          <button onClick={() => remove(fieldIndex)}>X</button>
          {template.fields.map((fieldTemplate, idx) => (
            <label key={`${field.id}-${idx}`}>
              <span>{fieldTemplate.title}</span>
              <RenderField field={fieldTemplate} fieldIndex={fieldIndex} sectionIndex={index} register={register} />
            </label>
          ))}
        </fieldset>
      ))}
      <button role={`append-${template.type}-fields-${index}`} onClick={() => append({})}>append</button>
    </>
  )
}