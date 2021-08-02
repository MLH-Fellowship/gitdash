This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First install the dependencies for the project:

```bash
cd gitdash
npm install
```

Then, run the development server:

```bash
npm run dev
# # or
# yarn dev
```

To get the GitHub authentication to work, you need to create a `.env` file in the `gitdash` directory with the following content

```
GITHUB_ID=<your_github_client_id>
GITHUB_SECRET=<your_github_client_secret>
```

Follow the guide [here](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to create a new GitHub OAuth app.

The details should look something like this:

![OAuth App Details](https://i.imgur.com/p2yQzuT.png)

On creating the OAuth app on GitHub, you need to set the `GITHUB_ID` in the `.env.local` file as the Client ID you see in the GitHub OAuth App in your account, and the `GITHUB_SECRET` to the Client Secret that you generate. Refer to the image below for more details

![GitHub OAuth App Creds](https://i.imgur.com/NurdT2w.png)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
