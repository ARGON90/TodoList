import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Template = {
  id: number;
  backgroundColor: string;
  borderColor: string;
  image: string;
  taskColor: string;
  title: string;
  titleColor: string;
};

export type TemplateState = {
    addTemplate: Function;
    templates: Template[]

}

const TemplateStore = (set: Function) => ({
  templates: [],
  addTemplate: (template: Template) => {
    set((state: TemplateState) => ({
      templates: [template, ...state.templates],
    }));
  },
});
const useTemplateStore = create(
  devtools(
    persist(TemplateStore, {
      name: "templates",
    })
  )
);

export default useTemplateStore;
