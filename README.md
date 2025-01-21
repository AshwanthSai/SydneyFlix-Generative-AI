# SydneyFlix

![demo](https://github.com/user-attachments/assets/2aeefcd4-bf5e-4f0c-9e35-c44b0417a146)


![contributions](https://img.shields.io/badge/all_contributors-1-orange.svg)
![PRs](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=shields)
[![website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://ec2-51-21-44-213.eu-north-1.compute.amazonaws.com/sydneyflix/)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)!

## 🌐 Demo

Here is a working live demo: http://ec2-51-21-44-213.eu-north-1.compute.amazonaws.com/sydneyflix/

Sydneyflix Documentation (High Level Design & Low Level Design) : https://docs.google.com/document/d/1pBgBPbBMO60-6_7gbj91j6n6Ci0ZEkLfDhCCxWZDkgo/edit?usp=sharing)

## 📝 Description
Welcome to my project! Here's a brief overview of what inspired me to create it, the problem it solves, and what I've learned throughout its development:

Motivation: My blind cousin had trouble choosing his favorite series on Netflix because his screen reader couldn’t handle logical instructions. This is a common problem for vision-impaired Australians. ([Vision Australia](https://www.visionaustralia.org/business-consulting/digital-access/assistive-technology-survey/overview)). I created an AI agent that accepts both audio and video inputs to help address this issue.

Why I Built This Project: I wanted to develop a practical, user-friendly, and production-ready MVP to solve this pressing problem.

Problem Solved: This project improves accessibility for vision-impaired users and demonstrates the capabilities of AI agents.

What I Learned: Throughout the development process, I learned:



      - Frontend Development: React, Material UI
      - State Management: Redux, Redux Toolkit, Context API
      - Styling: Material UI
      - Backend Integration: Axios, Redux Toolkit
      - Unit and Integration Testing: React Testing Library, JEST
      - End-to-End (E2E) Testing: Cypress
      - API Testing - Postman
      - CI/CD Pipelines: GitHub Actions, AWS
      - Containerization: Docker
      - Deployment: Nginx, AWS EC2
      - Build Tools: Create React App
      - Linting and Code Quality: ESLint
      - AI Development: Creating AI agents using Alan AI

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Testing Library](https://img.shields.io/badge/React_Testing_Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Create React App](https://img.shields.io/badge/Create_React_App-09D3AC?style=for-the-badge&logo=create-react-app&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Alan AI](https://img.shields.io/badge/Alan_AI-0F80AA?style=for-the-badge&logo=alanai&logoColor=white)



## 📖 Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## ✨ Features

- Fully hands-free browsing and intelligent interaction via audio/chat with AI Agent
- Browse the latest, trending, and most popular movies
- Get detailed information about movies, watch trailers, and navigate to movie websites
- Check movie ratings on IMDb
- Create and manage favorite or unfavorite lists
- Discover similar movie genres and explore movies by specific actors
- Learn detailed information about actors

## 🛠️ Setup Project

To get this project up and running in your development environment, follow these step-by-step instructions.


### 🚀 Install Project

1. Clone the Repository

   ```bash
   git clone https://github.com/username/repository.git
   ```

2. Navigate into the project directory

   ```bash
   cd repository
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Set up environment variables (if necessary)

   - Create a .env file in the root directory.
   - Add environment-specific variables as needed.

5. Start the application

   ```bash
   npm start
   ```

6. Open your web browser and navigate to <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> to see the project running.

7. Test the application

   Run the test suite to ensure everything is working as expected.

   ```bash
   npm test
   ```
### 🔒 ENV file

Environment variables can be used for configuration. They must be set before starting the application.

Here are your environment variables:

- `REACT_APP_TMDBKEY= Your TMDB Key `
- `REACT_APP_ALAN_KEY= Your Alan AI Key`
- `TMDB_TEST_EMAIL= Your TMDB Email ID` 
- `TMDB_TEST_PASSWORD= Your TMDB Password `
- `PROJECT_ID= Your Cypress Test Dashboard Key` 

### OS-Specific Separator

Environment variables must be separated by OS-specific characters:

| OS                  | Separator | Example                    |
| ------------------- | --------- | -------------------------- |
| Linux / macOS / BSD | `:`       | `$HOME:$HOME/private/*`    |
| Windows             | `;`       | `$HOME;$HOME/private/*`    |

By default, this is set to `"$HOME"`.

## ⚒️ How to Contribute

Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request

### 📩 Bug / Feature Request

If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/AshwanthSai/SydneyFlix-Generative-AI/issues/new) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/AshwanthSai/SydneyFlix-Generative-AI/issues/new). Please include sample queries and their corresponding results.

## 📜 Credits

If I followed tutorials during development, I have included the creators here.

👩 Shubham Verma - CI/CD <br> 
GitHub: @varsubham

👦 Maximilian Schwarzmüller - React, RTK <br>
GitHub: @mschwarzmueller

👦 Adrian Hajdin - React, Docker <br>
GitHub: @adrianhajdin

👦 Mitchel - React Testing Library, Cypress <br>
GitHub: @MitchelSt


## 📞 Contact Me

[![Follow us on LinkedIn](https://img.shields.io/badge/LinkedIn-AshwanthSai-blue?style=flat&logo=linkedin&logoColor=b0c0c0&labelColor=363D44)](https://www.linkedin.com/in/a-sai/)
[![Email Badge](https://img.shields.io/badge/Gmail-Contact_Me-green?style=flat-square&logo=gmail&logoColor=FFFFFF&labelColor=3A3B3C&color=62F1CD)](mailto:ashwanth.saie@gmail.com)


