# CODATA Website Landing Page

A 3D interactive landing page that can be used for any CODATA website under construction. This project showcases an immersive video experience built with React Three Fiber.

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

- [Website on GitHub Pages](https://codata.github.io/codata-www-starter/)
- [CODATA Official Website](https://codata.org/)
- [International Science Council](https://council.science/)

## 🚀 Deployment

### Automatic Deployment
This project automatically builds and deploys on every push to the `main` branch:

- **GitHub Pages**: Live site at `https://codata.github.io/codata-www-starter/`
- **Built Files**: Available in the `gh-pages-root` (hosted under /) and `gh-pages` (hosted under /codata-www-starter) branches for custom hosting

### Custom nginx/Apache Hosting (Root Domain)
To deploy to your own web server at root domain:

```bash
# Clone the built files from gh-pages-root branch (optimized for root domain)
git clone -b gh-pages-root https://github.com/codata/codata-www-starter.git /tmp/codata-dist

# Copy to your web server directory
sudo cp -r /tmp/codata-dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/

# Cleanup
rm -rf /tmp/codata-dist
```

### GitHub Pages Deployment
For GitHub Pages (subdirectory hosting):
```bash
# Use the gh-pages branch (optimized for GitHub Pages)
git clone -b gh-pages https://github.com/codata/codata-www-starter.git /tmp/codata-gh-pages
```

### Manual Build
```bash
git clone https://github.com/codata/codata-www-starter.git
cd codata-www-starter
pnpm install

# Build for root domain
VITE_BASE_PATH="/" pnpm build

# OR build for subdirectory
VITE_BASE_PATH="/your-subdirectory/" pnpm build

# Deploy the dist/ folder to your hosting service
```

### Deployment Script
Use the included `deploy.sh` script for automated deployment to nginx (uses root-optimized build):
```bash
./deploy.sh /var/www/html
```

## 🔄 CI/CD Pipeline

The project uses GitHub Actions to:
- ✅ Build on every push and PR
- ✅ Deploy to GitHub Pages automatically  
- ✅ Create `gh-pages` branch (for GitHub Pages hosting)
- ✅ Create `gh-pages-root` branch (for root domain hosting)
- ✅ Enable easy deployment to any hosting scenario

