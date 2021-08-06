
![pod-3.1.3-team-3](https://socialify.git.ci/MLH-Fellowship/pod-3.1.3-team-3/image?descriptionEditable=Maintain%20peak%20productivity%20by%20knowing%20exactly%20what%20you%20need%20to%20work%20on%20when%20you%20need%20to%20work%20on%20it.&font=Rokkitt&issues=1&language=1&owner=1&pattern=Brick%20Wall&pulls=1&stargazers=1&theme=Light)

[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
# GitDash 

> Maintain peak productivity by knowing exactly what you need to work on when you need to work on it. 

## Introduction

As software developers, we have often started new projects and then we forgot about it. This mostly happens because we don't track what items we are working on and what the deadline is. We might track a single repo and all the issues on it but what if we had one place which would track all of our issues and send us reminders when we don't work a specific deadline irrespective of what the repository may be. Presenting to you, GitDash...

![homepage](images/homepage.PNG?raw=True)

## Documentation and other details

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
```

### Github Authentication

To get the GitHub authentication to work, you need to create a `.env` file in the `gitdash` directory with the following content

```
GITHUB_ID=<your_github_client_id>
GITHUB_SECRET=<your_github_client_secret>
```

Follow the guide [here](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to create a new GitHub OAuth app.

The details should look something like this:

![OAuth App Details](https://i.imgur.com/p2yQzuT.png)

On creating the OAuth app on GitHub, you need to set the `GITHUB_ID` in the `.env` file as the Client ID you see in the GitHub OAuth App in your account, and the `GITHUB_SECRET` to the Client Secret that you generate. Refer to the image below for more details

![GitHub OAuth App Creds](https://i.imgur.com/NurdT2w.png)

After adding the GITHUB_ID and GITHUB_SECRET to your `.env` create two more values called `AUTH_SECRET` and `JWT_SECRET` which you can generate yourself as any 
string which will be used to authenticate with Github.

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



## Useful commands

Switch branches:
```
git checkout <branch-name>
```

Make new branch and switch to it:
```
git checkout -b <branch-name>
```

I'd recommend using the GitHub CLI for reviewing Pull Requests, making Pull Requests and making Issues.

Download it with Homebrew:
```
brew install gh
```

## 👨‍💻 Contributors 

<table>
  <tr>
    <td align="center"><a href="https://github.com/Green-Ranger11"><img src="https://avatars.githubusercontent.com/u/39209557?v=4" width="100px;" alt="" style="border-radius:50%"/><br /><sub><b>Alesana Lealofi Eteuati Jr
</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/anandrajaram21"><img src="https://avatars.githubusercontent.com/u/48560219?v=4" width="100px;" alt="" style="border-radius:50%"/><br /><sub><b>Anand Rajaram</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/prakharrathi25"><img src="https://avatars.githubusercontent.com/u/38958532?v=4" width="100px;" alt="" style="border-radius:50%"/><br /><sub><b>Prakhar Rathi</b></sub></a><br /></td>
  </tr>
</table>
