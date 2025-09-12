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

/**
 * @description Renders the input corresponding to the type supplied in the field prop
 */
export default function RenderField({ field, register, fieldIndex, sectionIndex }: Props) {
  /**"name" with which the input will be registered */
  const name = `sections.${sectionIndex}.fields.${fieldIndex}.${field.role}` as const

  switch(field.type) {
    case 'textarea':
      return <textarea {...register(name)} role={field.role}></textarea>;

    case 'month':
      return (
        <>
          <select  {...register(`${name}-month`)} role={`${field.role}-month`} >
            {months.map(([idx, month]) => <option value={idx} key={idx}>{month}</option>)}
          </select>
          <select {...register(`${name}-year`)} role={`${field.role}-year`} >
            {hundredYears.map(year => <option value={year} key={year}>{year}</option>)}
          </select>
        </>
      );

    case 'select':
      return (
        <select {...register(name)} role={`${field.role}`} >
          {field.answers!.map(answer => <option value={answer} key={answer}>{answer}</option>)}
        </select>
      );

    default:
      return <input {...register(name)} type={field.type} role={field.role} />;
  }
}