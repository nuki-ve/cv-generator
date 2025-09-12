import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as z from 'zod'
import CVForm from "../src/components/CVForm";
import type { CVFormResult } from "../src/types";

const sectionSchema = z.object({
  title: z.string(),
  type: z.enum(['personal', 'description', 'inscription', 'skills', 'list']),
  aside: z.boolean(),
  fields: z.array(z.record(z.string(), z.string()))
})

const formSchema = z.object({
  sections: z.array(sectionSchema)
})

describe('CVForm', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(<CVForm/>)
  })

  it('should render a form wiht "cv-form" as role', () => {
    render(<CVForm/>)

    expect(screen.getByRole('cv-form').tagName).toBe('FORM')
  })

  it('on submit, should return an object that satisfies the CVForm result schema', async () => {
    let result:CVFormResult
    const mockOnSubmit = vi.fn(data => result = data)
    render(<CVForm onSubmit={mockOnSubmit} />)

    fireEvent.click(screen.getByRole('submit'))
    fireEvent.click(screen.getByRole('append-section'))
    fireEvent.click(screen.getByRole('append-personal-fields-0'))
    fireEvent.click(screen.getByRole('submit'))

    await waitFor(() => {
      expect(mockOnSubmit).toBeCalled()
      expect(() => {
        console.log(result)
        formSchema.parse(result)
      }).not.toThrow()
    })
  })
})