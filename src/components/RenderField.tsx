import type { UseFormRegister } from "react-hook-form";
import { months } from "@/const";
import { hundredYears } from "@/utils";
import type { CVFormResult, FormField } from "@/types";

type Props = {
  field: FormField,
  register: UseFormRegister<CVFormResult>
  fieldIndex: number
  sectionIndex: number
}

export default function RenderField({ field, register, fieldIndex, sectionIndex }: Props) {
  const registration = register(`sections.${sectionIndex}.fields.${fieldIndex}.${field.role}`)
  switch(field.type) {
    case 'textarea':
      return <textarea {...registration} role={field.role}></textarea>;
    case 'month':
      return <>
        <select {...register(`sections.${sectionIndex}.fields.${fieldIndex}.${field.role}-month`)} role={`${field.role}-month`} >
          {months.map(([idx, month]) => <option value={idx} key={idx}>{month}</option>)}
        </select>
        <select {...register(`sections.${sectionIndex}.fields.${fieldIndex}.${field.role}-year`)} role={`${field.role}-year`} >
          {hundredYears.map(year => <option value={year} key={year}>{year}</option>)}
        </select>
      </>;
    case 'select':
      return <select {...registration} role={`${field.role}`} >
        {field.answers!.map(answer => <option value={answer} key={answer}>{answer}</option>)}
      </select>
    default:
      return <input {...registration} type={field.type} role={field.role} />;
  }
}