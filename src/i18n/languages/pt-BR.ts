export const ptBR = {
  shared: {
    errors: {
      badRequest: "Requisição mal feita",
      invalidUsername: "Nome de usuário inválido",
      resourceNotFound: "Recurso não encontrado",
    },
  },
  requests: {
    authenticateUser: {
      response: {
        errors: {
          invalidCredentials: "E-mail não existe ou senha está incorreta",
        },
      },
      inputs: {
        email: {
          errors: {
            required: "Obrigatório",
            invalid: "E-mail inválido",
          },
        },
        password: {
          errors: {
            required: "Obrigatório",
            invalid: "Senha inválida",
          },
        },
      },
    },
    registerUser: {
      response: {
        errors: {
          userAlreadyExists: "Este usuário já existe",
        },
      },
      inputs: {
        name: {
          errors: {
            required: "Obrigatório",
          },
        },
        username: {
          errors: {
            required: "Obrigatório",
            invalid: "Nome de usuário inválido",
          },
        },
        email: {
          errors: {
            required: "Obrigatório",
            invalid: "E-mail inválido",
          },
        },
        password: {
          errors: {
            required: "Obrigatório",
            invalid: "Senha inválida",
          },
        },
      },
    },
  },
}
