import { sectionTemplates } from "@/const"
import type { FieldSlot, FormResultFields, FormResultSection, FormSectionTemplate } from "@/types"
import { useStore } from "@nanostores/react"
import { formStore } from "./Form"

export default function CVRender(){
  return (
    <main id="cv-render">
      <PreviewPage previewWidth={794} previewScale={1} aspectRatio={0.706650831}/>
    </main>
  )
}

type Props = {
  previewWidth: number
  previewScale: number
  aspectRatio: number
}

function PreviewPage({ previewWidth, previewScale=1, aspectRatio}:Props) {
  const $formState = useStore(formStore)
  const widthScaled = previewWidth * previewScale

  const pageStyle = {
    fontSize: `${16 * previewScale}px`,
    width: `${widthScaled}px`,
    aspectRatio: aspectRatio,
  }
  
  return (
    <article className="page" style={pageStyle}>
      {$formState.sections?.map((section, index) => (
        <CVSection data={section} key={index}/>
      ))}
    </article>
  )
}

function CVSection({data}:{data:FormResultSection}) {
  const template = sectionTemplates.find(t => t.type === data.type)!

  return (
    <>
      <section>
        <div>
          <strong>{data.title || template.placeholder}</strong>
        </div>
        <ul>
          {data.fields.map((field, index) => (
            <SectionItem template={template} field={field} key={index}/>
          ))}
        </ul>
      </section>
    </>
  )
}

function SectionItem({field, template}:{field:FormResultFields, template: FormSectionTemplate}) {
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
        <span>{getItem("d")}</span>
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

function CVPersonalSection({data, template}:{data:FormResultSection, template: FormSectionTemplate}) {
  return (
    <>
      <section>
        {template.fields.map((field) => (
          <span>{field['first-name']}</span>
        ))}
      </section>
    </>
  )
}