import type { FormSectionTemplate } from "@/types"

export const sectionTemplates:FormSectionTemplate[] = [
  {
    type: 'personal',
    placeholder: 'Datos Personales',
    fields: [
      {role: 'first-name', type: 'text', title: 'First Name'},
      {role: 'last-name', type: 'text', title: 'Last Name'},
      {role: 'email', type: 'text', title: 'Email'},
      {role: 'birth-date', type: 'date', title: 'Birth Date'}
    ]
  },
  {
    type: 'description',
    placeholder: 'Perfil',
    fields: [
      {role: 'profile', type: 'textarea', title: 'Profile'}
    ]
  },
  {
    type: 'inscription',
    placeholder: 'Inscripción',
    fields: [
      {role: 'education', type: 'text', title: 'Education'},
      {role: 'school', type: 'text', title: 'School'},
      {role: 'city', type: 'text', title: 'City'},
      {role: 'start-date', type: 'month', title: 'Start Date'},
      {role: 'finish-date', type: 'month', title: 'Finish Date'},
      {role: 'description', type: 'textarea', title: 'Description'}
    ]
  },
  {
    type: 'skills',
    placeholder: 'Competencias',
    fields: [
      {role: 'skill', type: 'text', title: 'Skill'},
      {role: 'level', type: 'select', title: 'Level', answers: [
        'Beginner',
        'Professional'
      ]}
    ]
  },
  {
    type: 'list',
    placeholder: 'Lista',
    fields: [
      {role: 'list-item', type: 'text', title: 'Item'}
    ]
  }
]

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