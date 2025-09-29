# CODATA Website Landing Page

A 3D interactive landing page for the CODATA (Committee on Data of the International Science Council) website, currently under construction. This project showcases an immersive video experience built with React Three Fiber.

## 🌐 About CODATA

CODATA is the Committee on Data of the International Science Council (ISC). CODATA exists to promote global collaboration to advance open science and to improve the availability and usability of data for all areas of research.

## 🚧 Project Status

This landing page is currently **under construction** and serves as a temporary interactive experience while the main CODATA website is being developed.

## ✨ Features

- **3D Video Display** - Interactive video player with orbital camera controls
- **Immersive Experience** - 3D scene with constrained navigation
- **Responsive Design** - Optimized for various screen sizes
- **Modern Tech Stack** - Built with React 19, TypeScript, and Vite
- **Three.js Integration** - Powered by React Three Fiber and Drei

## � Technical Stack

- **React 19** - Latest React with modern features
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers and video texture support
- **TypeScript** - Full type safety
- **Vite** - Fast build tool with HMR
- **Three.js** - JavaScript 3D library

## 🛠 Development Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🎯 Project Structure

```
src/
├── App.tsx          # Main 3D scene and video component
├── main.tsx         # Application entry point
├── index.css        # Global styles
└── vite-env.d.ts    # Vite type definitions
public/
└── codata.mp4       # Featured video content
```

## � Interactive Features

- **Orbital Camera Controls** - Mouse/touch to rotate around the video
- **Zoom Constraints** - Limited zoom range (50%-200%) for optimal viewing
- **Rotation Limits** - Camera movement constrained to ±60 degrees
- **Video Streaming** - Supports both local files and streaming URLs
- **Loading States** - Suspense-based loading with fallback UI

## � Links

- [CODATA Official Website](https://codata.org/)
- [International Science Council](https://council.science/)

## 🚀 Deployment

This project is optimized for static hosting and can be deployed to platforms like:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Build the project with `pnpm build` and deploy the `dist/` folder.

## 📧 Contact

For questions about CODATA or this landing page, please visit [codata.org](https://codata.org/) for official contact information.
