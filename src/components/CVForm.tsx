import { useFieldArray, useForm, type FieldValues } from "react-hook-form"
import CVSection from "@/components/CVSection"
import { sectionTemplates } from "@/const"
import type { CVFormResult, SectionType } from "@/types"

export default function CVForm({onSubmit=(_:FieldValues) => {}}) {
  const {handleSubmit, control, watch, register} = useForm<CVFormResult>({
  })

  const { fields: sections, append, remove } = useFieldArray({
    control,
    name: 'sections'
  })

  const appendSection = (type:SectionType) => () => {
    append({
      title: '',
      aside: false,
      type,
      fields: []
    })
  }

  return (
    <form role="cv-form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      {sections.map((section, index) => {
        const template = sectionTemplates.find(t => t.type === section.type)

        return (
          <fieldset key={section.id}>
            <CVSection 
              register={register} 
              sectionRemove={remove} 
              index={index} 
              template={template!}
              control={control}
            />
          </fieldset>
        )
      })}

      <button type="button" onClick={appendSection('personal')} role="append-section">append personal</button>
      <button type="button" onClick={appendSection('description')} role="append-profile-section">append profile</button>
      <button type="button" onClick={appendSection('inscription')} role="append-inscription-section">append inscription</button>
      <button type="button" onClick={appendSection('skills')} role="append-skills-section">append skills</button>
      <button type="button" onClick={appendSection('list')} role="append-list-section">append list</button>
      
      <input type="submit" role="submit"/>
      
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  )
}

