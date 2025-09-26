import { sectionTemplates } from "@/const"
import type { FieldSlot, FormResultFields, FormResultSection, FormSectionTemplate } from "@/types"
import { useStore } from "@nanostores/react"
import { formStore } from "./Form"
import { currentTemplate } from "./TemplateSelector"
import { useEffect, useState, type CSSProperties } from "react"
import CVTemplates, { type TemplateKey } from "./templates/templateMap"
import { toPascalCase } from "@/utils"

export default function CVRender(){
  const [styles, setStyles] = useState<CSSModuleClasses>({})

  const $templateKey = useStore(currentTemplate)

  useEffect(() => {
    // 1. Obtiene la función de carga del mapa
    const loadStyles = CVTemplates[$templateKey as TemplateKey]

    if (loadStyles) {
      // 2. Ejecuta la importación dinámica (retorna una Promesa)
      loadStyles()
        .then(module => {
          // 3. Cuando la promesa se resuelve, el 'module.default'
          // contiene el objeto de clases de CSS Modules
          setStyles(module.default); 
        })
        .catch(error => {
          console.error("Error al cargar los estilos:", error);
          setStyles({}); // Establece estilos vacíos en caso de fallo
        });
    } else {
      setStyles({});
    }
  }, [$templateKey])
  

  return (
    <main id="cv-render">
      <p>Current Template: {toPascalCase($templateKey)}</p>
      {styles['cv-container'] 
        ? <PreviewPage previewWidth={794} previewScale={1} aspectRatio={0.706650831} styles={styles}/>
        : <p>Loading styles...</p>
      }
    </main>
  )
}

type Props = {
  previewWidth: number
  previewScale: number
  aspectRatio: number
  styles: CSSModuleClasses
}

function PreviewPage({ previewWidth, previewScale=1, aspectRatio, styles}:Props) {
  const $formState = useStore(formStore)
  const widthScaled = previewWidth * previewScale

  const pageStyle = {
    fontSize: `${16 * previewScale}px`,
    width: `${widthScaled}px`,
    aspectRatio: aspectRatio,
  }

  const classNames = [styles['cv-container'] || '', 'cv-container'].join(' ')
  
  return (
    <article className={classNames} style={pageStyle}>
      {$formState.sections?.map((section, index) => (
        section.type === 'personal'
        ? <CVPersonalSection data={section} key={index}/>
        : <CVSection data={section} key={index}/>
      ))}
    </article>
  )
}

function CVSection({data}:{data:FormResultSection}) {
  const template = sectionTemplates.find(t => t.type === data.type)!
  return (
    <>
      <section className="cv-section">
        <div className="section-title">
          <strong>{data.title || template.placeholder}</strong>
        </div>
        <ul className="section-list">
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
    <li className="section-list-item">
      <div className="a-slot"><b>{getItem('a')}</b></div>
      <div className="b-slot">
        <span>{getItem('b')}</span>
        <span>{getItem('c') ? `, ${getItem('c')}` : null}</span>
      </div>
      <div className="d-slot">
        <span>{getItem("d")}</span>
      </div>
      <div className="date-slot">
        <span>{field['start-date-month']}</span>
        <span>{field['start-date-year'] && `/${field['start-date-year']}`}</span>
        <span>{field['finish-date-month'] && ` - ${field['finish-date-month']}`}</span>
        <span>{field['finish-date-year'] && `/${field['finish-date-year']}`}</span>
      </div>
      <br />
    </li>
  )
}

function CVPersonalSection({data}:{data:FormResultSection}) {
  const template = sectionTemplates.find(t => t.type === data.type)!
  // const getItem = (slot:FieldSlot, field:FormResultFields) => {
  //   const key = template.fields.find(f => f.slot === slot)?.role
  //   return key && field[key]
  // }
  
  return (
    <>
      <section>
        <div className="section-title">
          <strong>{data.title || template.placeholder}</strong>
        </div>
        {data.fields.map((field) => (
          <>
            {Object.entries(field).map(([key, value]) => (
              <div key={key}>
                <b>{toPascalCase(key)}:</b> <span>{value}</span>
              </div>
            ))}
          </>
        ))}
      </section>
      <br />
    </>
  )
}