# How to run prisma APIs on localhost

## login in vercel
`vercel login`

## link the project
`vercel link`

## pull local environment
`vercel env pull .env.development.local`

## rename the file to .env
`rm .env.development.local .env`

## generate prisma
npx prisma generate
