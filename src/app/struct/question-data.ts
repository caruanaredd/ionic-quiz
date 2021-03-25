import { Question } from "./question";

export const QUESTIONS: Question[] = [
  {
    text: "Ionic is a mobile framework based on Angular.",
    randomize: true,
    answers: [
      {
        text: "True",
        correct: true
      },
      {
        text: "False"
      }
    ]
  },

  {
    text: "When an Angular page needs to use a script in another folder, it is called...",
    randomize: true,
    answers: [
      {
        text: "Loop"
      },
      {
        text: "Components"
      },
      {
        text: "Dependency Injection",
        correct: true
      },
      {
        text: "Decorator"
      }
      ]
  },

  {
    text: "Which tag in index.html is the main entry point for an Ionic app?",
    randomize: true,
    answers: [
      {
        text: "<html>"
      },
      {
        text: "<body>"
      },
      {
        text: "<app-root>",
        correct: true
      }
      ]
  },

  {
    text: "The role of @Component is to determine how a component (page) should be ___ at runtime.",
    answers: [
      {
        text: "processed"
      },
      {
        text: "instantiated"
      },
      {
        text: "used"
      },
      {
        text: "All of the above",
        correct: true
      }
    ]
  },

  {
    text: "*ngIf only renders an HTML template when the condition is false.",
    randomize: true,
    answers: [
      {
        text: "True"
      },
      {
        text: "False",
        correct: true
      }
    ]
  },

  {
    text: "*ngFor is used to ...",
    randomize: true,
    answers: [
      {
        text: "get a validation error"
      },
      {
        text: "meet a condition"
      },
      {
        text: "clone an array collection",
        correct: true
      }
    ]
  }
];