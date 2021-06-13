import { post, get } from "./request.service"
import { store } from 'store'

export const sendPdf = ({ pdfData, title, message }) => {
  return post(`/api/report/sendpdf`, { pdfData, title, message });
}
