import { useFieldArray, useForm, type FieldValues } from "react-hook-form"
import FormSection from "@/components/FormSection"
import { sectionTemplates } from "@/const"
import { atom } from 'nanostores'
import type { 
  CVFormResult, 
  FieldSlot, 
  FormResultFields,
  FormResultSection, 
  FormSectionTemplate, 
  SectionType 
} from "@/types"

export const formStore = atom<CVFormResult>({
  sections: []
})

export default function Form({onSubmit=(_:FieldValues) => {}}) {
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

  formStore.set(watch())

  return (
    <form role="cv-form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      {sections.map((section, index) => {
        const template = sectionTemplates.find(t => t.type === section.type)

        return (
          <fieldset key={section.id}>
            <FormSection 
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
      
      {/* <input type="submit" role="submit"/> */}
      
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

      {/* {watch().sections?.map((section, index) => (
        <ResultSection data={section} key={index}/>
      ))} */}
    </form>
  )
}

function ResultSection({data}:{data:FormResultSection}) {
  const template = sectionTemplates.find(t => t.type === data.type)!

  return (
    <>
      <section>
        <div>
          <strong>{data.title || template.placeholder}</strong>
        </div>
        <ul>
          {data.fields.map((field, index) => (
            <Li template={template} field={field} key={index}/>
          ))}
        </ul>
      </section>
    </>
  )
}

function Li({field, template}:{field:FormResultFields, template: FormSectionTemplate}) {
  const getItem = (slot:FieldSlot) => {
    const key = template.fields.find(f => f.slot === slot)?.role
    return key && field[key]
  }

  return (
    <li>
      <div><b>{getItem('a')}</b></div>
      <div>
        <span>{getItem('b')}</span>
        <span>{getItem('c') ? `, ${getItem('c')}` : null}</span>
      </div>
      <div>
        <small>{getItem("d")}</small>
      </div>
      <div>
        <span>{field['start-date-month']}</span>
        <span>{field['start-date-year'] && `/${field['start-date-year']}`}</span>
        <span>{field['finish-date-month'] && ` - ${field['finish-date-month']}`}</span>
        <span>{field['finish-date-year'] && `/${field['finish-date-year']}`}</span>
      </div>
      <br />
    </li>
  )
}