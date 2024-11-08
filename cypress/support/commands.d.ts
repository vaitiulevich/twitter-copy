/// <reference types="cypress" />

// Расширение интерфейса Chainable для пользовательских команд
declare namespace Cypress {
  interface Chainable {
    signInWithEmulator(email: string, password: string): any;
    signOutEmulator(): any;
    signUpWithEmulator(email: string, password: string): any;
    login(): Chainable;
  }
}

// Расширение глобальных типов для window (например, для добавления свойства store)
// declare global {
//   interface Window {
//     store: any; // Или используйте более точный тип для вашего Redux store
//   }
// }

// export {}; // Это нужно для того, чтобы файл был признан модулем
