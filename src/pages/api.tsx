import { post } from "../utils";

export const getNoteKinds = (p: any = {}) => post("/get_note_kinds", p);

export const getNotes = (p: any = {}) => post("/get_notes", p);
export const getOCR = (p: any = {}) => post("/get_ocr", p);
export const answerGPT = (p: any = {}) => post("/openAI", p);
