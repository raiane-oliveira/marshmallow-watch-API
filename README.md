<h1 align="center">
  <a  href="https://github.com/raiane-oliveira/marshmallow-watch">
			<!-- LOGO DA APLICAÇÃO -->
     <!-- <img src="https://github.com/raiane-oliveira/find-a-friend-API/assets/100815627/d898fd25-a4f2-4109-be95-81a243d5ed22" /> -->
  </a>
</h1>

<!-- BADGES -->
<p align="center">
  <img src="https://badgen.net/github/last-commit/raiane-oliveira/marshmallow-watch-API" />
  <img src="https://badgen.net/github/contributors/raiane-oliveira/marshmallow-watch-API" />
</p>

<h4 align="center">
	🚧 Marshmallo Watch API 🗃️ Building... 🚧
</h4>

<p align="center">
 <a href="#-about">About</a> •
 <a href="#-run-locally">Run Locally</a> •
 <a href="#-features">Features</a> •
 <a href="#-tech-stack">Tech Stack</a> •
 <a href="#-learnings">Learnings</a> •
 <a href="#-feedbacks">Feedbacks</a>
</p>

## 💻 About

[DESRIÇÃO] Ex:
A RESTful API for pet adoption, built with SOLID principles and tests.
This challenge was offered in Rocketseat's Ignite course.

<!-- ER DO BANCO DE DADOS -->
<div align="center">
  <img src="https://github.com/raiane-oliveira/find-a-friend-API/assets/100815627/6343fbff-818a-463d-8934-440b9d251a37" />

*The ER diagram of the database*
</div>

## 👩‍💻 Run Locally

Clone the project

```bash
  git clone https://github.com/raiane-oliveira/marshmallow-watch-API
```

Go to the project directory and install the dependencies

```bash
  pnpm i
```

Create the `.env` file and add it these variables:
```txt
  PORT=3333

  # Database
  DATABASE_URL=""

  # JWT Authentication
  JWT_SECRET="marshmallow-watch"

  # Cloudflare
  CLOUDFLARE_ACCOUNT_ID=""

  AWS_BUCKET_NAME=""
  AWS_ACCESS_KEY_ID=""
  AWS_SECRET_ACCESS_KEY=""
  AWS_ENDPOINT_API_URL=""

  # Mailer
  MAILER_PORT="587"
  MAILER_HOST="smtp.ethereal.email"
  MAILER_SENDER_EMAIL=""
  MAILER_SENDER_PASS=""

  # Client
  WEBSITE_URL="http://localhost:3000"

  # TMDB API
  TMDB_BASE_API_URL="https://api.themoviedb.org"
  TMDB_API_KEY=""
```

Create the database server on Docker container

```bash
  docker compose up
```

That command it will already start the container. If not, run this command:

```bash
  docker compose start
```

Finally, start the server

```bash
  pnpm dev
```

<!-- ## 🪸 Features

- [x] DESCRIBE HERE

### 📏 Business rules

- [x] DESCRIBE HERE -->

## 📒 Learnings

- Postgres `JSON_AGG` and `JSON_BUILD_OBJECT` functions
- Internationalization in the Backend
- Sending e-mails with `nodemailer`
- Set private routes by default with `fastify`
- BiomeJS

## 🛠 Tech Stack

- TypeScript
- DrizzleORM
- Fastify
- Docker
  - Docker compose
- Vitest
- BiomeJS (alternative to Eslint)

## 🤝 Feedbacks

If you have opinions on how I can improve this application, please send me a message on <a href="https://www.linkedin.com/in/raiane-oliveira-dev">Linkedin</a> or an <a href="mailto:raiane.oliveira404@gmail.com">email</a>.
I will be happy to answer and learn more from you! ;)
