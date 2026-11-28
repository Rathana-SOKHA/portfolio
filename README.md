# 🚀 Modern Developer Portfolio

A sleek, responsive, and highly interactive developer portfolio built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**. Features full bilingual internationalization (English & Khmer), class-based dark mode, custom cursor physics, click spark interactions, and a clean centralized data architecture.

---

## ✨ Features

- **⚡ Blazing Fast Performance** — Powered by Vite 8 with optimized builds and rapid Hot Module Replacement (HMR).
- **🎨 Tailwind CSS v4 Architecture** — Built with the latest Tailwind CSS v4 engine for modern, lightweight, and utility-first styling.
- **🌓 Adaptive Dark / Light Mode** — Seamless class-based theme switcher with smooth color transitions and persistent theme state.
- **🌐 Multilingual Support (i18n)** — Full bilingual support in **English** and **Khmer (ភាសាខ្មែរ)** powered by `i18next` and `react-i18next`.
- **✨ Micro-Interactions & Fluid Animations**:
  - **Custom Spring Cursor** with contextual hover expansion on cards, links, and buttons (desktop).
  - **Click Spark Particles** on mouse clicks.
  - **Reading Progress Bar** tracking scroll depth across the page.
  - **Scroll-triggered animations** powered by Framer Motion.
- **📁 Centralized Data Structure** — All personal information, projects, skills, education, and experience are configured in a single file (`src/data/index.ts`).
- **📱 Mobile-First Responsive Design** — Tested and optimized for mobile screens, tablets, laptops, and ultra-wide displays.
- **📬 Interactive Contact Form** — Fully styled contact section with direct email, Telegram, phone, and social links.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Core UI library with modern hooks & rendering architecture |
| **[TypeScript](https://www.typescriptlang.org/)** | Type safety, autocompletion, and robust code maintainability |
| **[Vite 8](https://vite.dev/)** | Lightning-fast build tool and local development server |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Next-generation styling engine with custom CSS variables & dark mode |
| **[Framer Motion](https://www.framer.com/motion/)** | Production-ready motion and gesture library |
| **[react-i18next](https://react.i18next.com/)** | Internationalization framework for localized content |
| **[Lucide React](https://lucide.dev/)** | Crisp, lightweight icon set |

---

## 📂 Project Structure

```text
portfolio/
├── public/                 # Static assets and favicon
├── src/
│   ├── assets/             # Images, portraits, and project screenshots
│   │   ├── projects/       # Project previews
│   │   └── profile.png     # Personal avatar
│   ├── components/         # Reusable UI & layout elements
│   │   ├── animations/     # CustomCursor, ClickSpark, ScrollProgress, SocialIcons
│   │   └── layouts/        # Navbar, Footer
│   ├── context/            # React context providers & UI helpers
│   │   ├── ThemeContext.tsx      # Dark / Light theme provider
│   │   └── LanguageSwitcher.tsx  # Language dropdown & toggle
│   ├── data/
│   │   └── index.ts        # Centralized profile, projects, skills, education & experience data
│   ├── hooks/              # Custom utility hooks (e.g. useSmoothScroll)
│   ├── i18n/               # Localization configuration
│   │   ├── index.ts        # i18next setup
│   │   └── locales/        # JSON translation bundles
│   │       ├── en.json     # English translations
│   │       └── km.json     # Khmer translations (ភាសាខ្មែរ)
│   ├── pages/              # Main portfolio sections
│   │   ├── Hero.tsx        # Hero banner with avatar showcase & CTA
│   │   ├── About.tsx       # Bio, philosophy & quick facts
│   │   ├── Skills.tsx      # Categorized skill bars & proficiencies
│   │   ├── Projects.tsx    # Filterable project showcase with tags
│   │   ├── Education.tsx   # Academic background & certifications timeline
│   │   ├── Experience.tsx  # Career timeline & responsibilities
│   │   └── Contact.tsx     # Contact details & inquiry form
│   ├── App.tsx             # Root application assembly
│   ├── index.css           # Global Tailwind CSS v4 styles & custom scrollbars
│   └── main.tsx            # Application entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (or **pnpm** / **yarn**)

### 1. Clone the repository

```bash
git clone https://github.com/Rathana-SOKHA/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 4. Build for production

```bash
npm run build
```

The optimized static build will be generated in the `dist/` directory.

### 5. Preview production build

```bash
npm run preview
```

---

## ⚙️ Customization Guide

### 1. Update Personal Data & Projects
All content can be updated from **`src/data/index.ts`**:
- **Personal Details**: Name, titles, tagline, bio, location, phone, email, and social profiles.
- **Projects**: Title, description, tags, category (`Company Project`, `School Project`, `Personal Project`), live URL, and repository links.
- **Skills**: Grouped into Frontend, Backend, Database & Cloud, and UI/UX design.
- **Experience & Education**: Timeline milestones, descriptions, and achievements.

### 2. Update Translations
Edit translation strings in:
- `src/i18n/locales/en.json` (English)
- `src/i18n/locales/km.json` (Khmer)

### 3. Replace Profile & Project Images
- Place your portrait image in `src/assets/profile.png`.
- Add project images to `src/assets/projects/` and reference them in `src/data/index.ts`.

---

## 🌐 Deployment

This portfolio is a static Single Page Application (SPA) and can be deployed anywhere with zero configuration:

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`

### Deploy to GitHub Pages
Configure your `vite.config.ts` `base` path and deploy the `dist/` directory using GitHub Actions.

---

## 👤 Author

**Rathana SOKHA**
- **GitHub**: [@Rathana-SOKHA](https://github.com/Rathana-SOKHA)
- **Telegram**: [@rathana_sokha](https://t.me/rathana_sokha)
- **Email**: [rathanasokha26@gmail.com](mailto:rathanasokha26@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use this template to build your own portfolio!
