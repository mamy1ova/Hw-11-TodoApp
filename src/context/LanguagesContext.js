import { createContext, useContext, useReducer } from "react";

const LanguageContext = createContext();

const LanguageReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return action.payload;
    default:
      return state;
  }
};
export const LanguageProvider = ({ children }) => {
  const [language, dispatch] = useReducer(LanguageReducer, "en");

  const text = {
    en: {
      title: "Todo App",
      buttonText: "Add",
      inputPlaceholder: "Enter new todo",
      message: "You have completed todos"
    },
    ru: {
      title: "Список задач",
      buttonText: "Добавить",
      inputPlaceholder: "Введите новое задание",
      message: "Выполненные задачи "
    },
    kg: {
      title: "Тапшырма тизмеси",
      buttonText: "Кошуу",
      inputPlaceholder: "Жаны тапшырма киргизиниз",
      message: "Сиз бутургон тизме"
    },
  };
  const currentLang = text[language];

  return (
    <LanguageContext.Provider value={{ language, currentLang, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("Повторите попытку");
  }
  return context;
};
