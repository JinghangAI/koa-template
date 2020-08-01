# Koa template

Koa project template with mongodb.

## Start

```bash
npm install
npm run compile
# node
NODE_ENV=development node ./lib/app.js
# pm2
NODE_ENV=development pm2 start ./lib/app.js
```

## File Description

```text
.
├── build                        // script files
├── schema                       // schema files
├── src
│   ├── @types                   // Type definition files(dts)
│   ├── app.ts                   // entry point
│   ├── common                   // util files
│   ├── config                   // runtime variables
│   ├── middleware               // middlewares
│   ├── modules                  // controller, service and repo
│   └── route                    // route
└── tsconfig.json
```
