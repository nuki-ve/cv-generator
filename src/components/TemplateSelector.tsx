import { atom } from "nanostores"
import type { TemplateKey } from "./templates/templateMap"
import CVTemplates from "./templates/templateMap"
import { toPascalCase } from "@/utils"

export const currentTemplate = atom<TemplateKey>('classic')

export default function TemplateSelector() {
  return (
    <div>
      {Object.keys(CVTemplates).map((templateKey, idx) => (
        <button
          key={idx}
          type="button" 
          onClick={() => currentTemplate.set(templateKey as TemplateKey)}
        >
          {toPascalCase(templateKey)}
        </button>
      ))}
    </div>
  )
}