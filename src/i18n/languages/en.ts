export const en = {
  shared: {
    errors: {
      badRequest: "Bad Request",
      invalidUsername: "Invalid username",
      resourceNotFound: "Resource not found",
      playlistNotCreated: "It was not possible to delete the playlist",
      notAllowed: "Not allowed",
    },
    playlists: {
      watching: "Watching",
      willWatch: "I'll watch",
      watched: "Watched",
    },
    inputs: {
      required: "Required",
    },
  },
  requests: {
    authenticateUser: {
      response: {
        errors: {
          invalidCredentials: "Invalid e-mail and/or password",
        },
      },
      inputs: {
        email: {
          errors: {
            required: "Required",
            invalid: "Invalid e-mail",
          },
        },
        password: {
          errors: {
            required: "Required",
            invalid: "Invalid password length",
          },
        },
      },
    },
    registerUser: {
      response: {
        errors: {
          userAlreadyExists: "User already exists",
        },
      },
      inputs: {
        name: {
          errors: {
            required: "Required",
          },
        },
        username: {
          errors: {
            required: "Required",
            invalid: "Invalid username length",
          },
        },
        email: {
          errors: {
            required: "Required",
            invalid: "Invalid e-mail",
          },
        },
        password: {
          errors: {
            required: "Required",
            invalid: "Invalid password length",
          },
        },
      },
    },
  },
}
