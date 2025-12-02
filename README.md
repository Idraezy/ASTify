📝 ASTify – Smart Resume & ATS Analyzer

ASTify is a modern, responsive web application that analyzes your resume against job descriptions using ATS-style keyword matching and scoring. It helps job seekers optimize their resumes, improve keyword alignment, and increase their chances of passing real Applicant Tracking Systems.

Built with React + TypeScript + Vite, ASTify delivers a smooth, fast, and intuitive user experience with modern UI animations powered by Framer Motion.

🚀 Features
✔ ATS Score Calculation

Calculates resume-to-job match percentage

Measures keyword density

Highlights matched and missing keywords

Generates a predictive “Improved Resume Score”

✔ Resume Improvement Engine

Automatically enhances user resumes

Inserts missing keywords naturally

Suggests clear improvements

Allows users to preview and download the improved version

✔ Resume Upload & Preview

Upload any plain text resume

Preview original and optimized versions

Supports inline file rendering

✔ Clean UI with Modern Animations

Responsive design

Navbar with real-time greetings

Smooth transitions powered by Framer Motion

Light/Dark mode support (optional if enabled)

✔ Local Storage Persistence

Saves previous analyses

Resumes remain available after page refresh

Re-check or update anytime

⚠️ ATS Disclaimer (Important)

ASTify provides estimates based on keyword matching and common ATS patterns.
While the analysis is helpful, it is not guaranteed to match every real ATS system result.

Different ATS platforms use different algorithms, scoring rules, and filters.

Users should treat ASTify recommendations as guidelines, not absolute measurements.

🛠 Tech Stack

React.js (TypeScript)

Vite

TailwindCSS

Framer Motion

Lucide Icons

Local Storage API

Custom ATS parsing & text-analysis logic

📂 Project Structure
src/
 ├── components/
 ├── pages/
 ├── utils/
 ├── assets/
 ├── router/
 ├── types/
 └── main.tsx

📦 Installation & Setup

Clone the repository:

git clone https://github.com/your-username/ASTify.git
cd ASTify


Install dependencies:

npm install


Start development server:

npm run dev


Build for production:

npm run build


Preview production build:

npm run preview

🎯 Future Improvements

PDF resume parsing

Drag-and-drop resume upload

Multi-resume comparison

AI-powered resume rewriting

Export to PDF and DOCX

User accounts & cloud storage

Job application tracker

🤝 Contributing

------------------------------------------------------------------

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

Contributions are welcome!
Feel free to open issues or submit pull requests.

📄 License

MIT License © 2025 Idara Etim

⭐ Support the Project

If you find ASTify useful, consider giving the repo a ⭐ on GitHub!
