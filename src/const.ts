import type { FormSectionTemplate } from "@/types"

/** Used to render the CVSection components */
export const sectionTemplates:FormSectionTemplate[] = [
  {
    type: 'personal',
    placeholder: 'Personal Details',
    fields: [
      {role: 'first-name', type: 'text', label: 'First Name'},
      {role: 'last-name', type: 'text', label: 'Last Name'},
      {role: 'email', type: 'text', label: 'Email'},
      {role: 'birth-date', type: 'date', label: 'Birth Date'}
    ]
  },
  {
    type: 'description',
    placeholder: 'Profile',
    fields: [
      {role: 'profile', type: 'textarea', label: 'Profile'}
    ]
  },
  {
    type: 'inscription',
    placeholder: 'Education',
    fields: [
      {role: 'education', type: 'text', label: 'Education'},
      {role: 'school', type: 'text', label: 'School'},
      {role: 'city', type: 'text', label: 'City'},
      {role: 'start-date', type: 'month', label: 'Start Date'},
      {role: 'finish-date', type: 'month', label: 'Finish Date'},
      {role: 'description', type: 'textarea', label: 'Description'}
    ]
  },
  {
    type: 'skills',
    placeholder: 'Skills',
    fields: [
      {role: 'skill', type: 'text', label: 'Skill'},
      {role: 'level', type: 'select', label: 'Level', answers: [
        'Beginner',
        'Professional'
      ]}
    ]
  },
  {
    type: 'list',
    placeholder: 'List',
    fields: [
      {role: 'list-item', type: 'text', label: 'Item'}
    ]
  }
] as const

/**
 * A list with the months
 * 
 * @description Each item its a 2 item array,
 * the first is the month number,
 * the second one is the month name
 * 
 * @example // Usage
 * months.map( ([monthNumber, month]) => {...} )
 */
export const months = [
  [1, 'January'],
  [2, 'February'],
  [3, 'March'],
  [4, 'April'],
  [5, 'May'],
  [6, 'June'],
  [7, 'July'],
  [8, 'August'],
  [9, 'September'],
  [10, 'October'],
  [11, 'November'],
  [12, 'December'],
] as const