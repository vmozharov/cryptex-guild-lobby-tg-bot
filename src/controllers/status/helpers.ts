import {scenes} from 'locales/ru.json'

export function formatStatusText(text: string, status: boolean, endDate: Date | null): string {
  const statusText = status ? scenes.status.active : scenes.status.inactive
  const endDateText = endDate?.toLocaleDateString('ru-RU') || scenes.status.never
  return text
    .replaceAll('%status%', statusText)
    .replaceAll('%end_date%', endDateText)
}
