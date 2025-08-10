# HiveSurf - Digital Marketing Agency Website

A modern, responsive website for HiveSurf Digital Marketing Agency with advanced animations, theme switching, and interactive elements.

## ✨ Features

### 🎨 Theme System
- **Dark/Light Mode Toggle**: Smooth transitions between dark and light themes
- **Persistent Theme**: Theme preference is saved in localStorage
- **Dynamic Styling**: All components adapt to the current theme
- **Smooth Transitions**: 300ms transition animations for theme changes

### 🌍 Animated Background
- **Moving Earth**: 3D animated earth with rotating satellite
- **Digital Signature**: Animated "HiveSurf Digital" signature
- **Floating Particles**: Dynamic particle system with varying opacity
- **Wave Effects**: Subtle wave animations at the bottom
- **Canvas-based**: High-performance HTML5 Canvas animations

### 🚀 Enhanced Navigation
- **Smooth Page Transitions**: Framer Motion powered page transitions
- **Animated Buttons**: Interactive buttons with hover and tap animations
- **Functional Links**: All navigation links work with smooth animations
- **Responsive Design**: Mobile-friendly navigation with hamburger menu
- **Active State Indicators**: Visual feedback for current page

### 🎭 Interactive Components
- **AnimatedButton**: Reusable button component with multiple variants
- **PageTransition**: Smooth page transition wrapper
- **ThemeToggle**: Animated theme switcher with sun/moon icons
- **LoadingScreen**: Initial loading animation
- **StartNowModal**: Interactive modal for getting started

### 📱 Responsive Design
- **Mobile First**: Optimized for all screen sizes
- **Touch Friendly**: Proper touch targets and gestures
- **Performance Optimized**: Efficient animations and rendering

### 📊 HubSpot Integration
- **Lead Capture Forms**: Professional HubSpot forms integrated throughout the site
- **Source Tracking**: Hidden fields to track lead sources (Contact Page, Start Now Modal, etc.)
- **Automated Lead Management**: All form submissions automatically go to HubSpot CRM
- **Custom Styling**: HubSpot forms styled to match the website's design theme
- **Multi-Location Integration**: Forms embedded in Contact page and Start Now modal

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **Framer Motion**: Advanced animations and transitions
- **React Router**: Client-side routing
- **Three.js**: 3D graphics and animations
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **HTML5 Canvas**: Custom animations and graphics

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd main_website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── AnimatedBackground.js    # Canvas-based animated background
│   ├── AnimatedButton.js        # Reusable animated button component
│   ├── Footer.js               # Site footer
│   ├── HiveSurfLogo.js         # Animated logo component
│   ├── HubSpotForm.js          # HubSpot form integration component
│   ├── LoadingScreen.js        # Initial loading screen
│   ├── Navbar.js               # Navigation with theme toggle
│   ├── PageTransition.js       # Page transition wrapper
│   ├── PWARegistration.js      # PWA registration
│   ├── StartNowModal.js        # Get started modal
│   └── ThemeToggle.js          # Theme switcher component
├── context/
│   └── ThemeContext.js         # Theme management context
├── pages/
│   ├── About.js                # About page
│   ├── Contact.js              # Contact page with form
│   ├── Home.js                 # Homepage
│   └── Services.js             # Services page
├── App.js                      # Main app component
├── index.css                   # Global styles and theme variables
└── index.js                    # App entry point
```

## 🎨 Theme System

The website features a comprehensive theme system with:

### Dark Theme (Default)
- Dark background gradients
- Light text colors
- Blue/purple accent colors
- Glass morphism effects

### Light Theme
- Light background gradients
- Dark text colors
- Adjusted accent colors
- Modified glass effects

### Theme Switching
- Click the sun/moon icon in the navbar
- Smooth 300ms transitions
- Persistent across sessions
- Automatic body class updates

## 🌍 Animated Background Features

### Earth Animation
- 3D sphere with gradient coloring
- Rotating satellite orbit
- Animated continental outlines
- Orbital ring with dashed lines

### Digital Signature
- Animated character movement
- Individual character rotation
- Subtle opacity variations
- Monospace font styling

### Particle System
- 50+ floating particles
- Dynamic opacity changes
- Varying sizes and speeds
- Theme-aware coloring

## 🚀 Navigation Features

### Page Transitions
- Smooth fade in/out animations
- Y-axis movement for depth
- Configurable duration and easing
- Exit animations for better UX

### Interactive Elements
- Hover effects on all buttons
- Scale and position animations
- Ripple effects on click
- Disabled state handling

### Responsive Navigation
- Mobile hamburger menu
- Desktop horizontal layout
- Smooth mobile transitions
- Touch-friendly interactions

## 🎯 Key Components

### AnimatedButton
```jsx
<AnimatedButton
  variant="primary" // primary, secondary, outline
  size="lg"         // sm, md, lg
  icon={ArrowRight} // Optional icon
  onClick={handleClick}
>
  Button Text
</AnimatedButton>
```

### PageTransition
```jsx
<PageTransition>
  <YourPageContent />
</PageTransition>
```

### ThemeToggle
```jsx
<ThemeToggle />
// Automatically handles theme switching
```

## 🎨 Customization

### Adding New Themes
1. Update `ThemeContext.js` with new color schemes
2. Add corresponding CSS classes in `index.css`
3. Update component styles to use theme variables

### Modifying Animations
1. Edit Framer Motion variants in components
2. Adjust timing and easing functions
3. Update canvas animations in `AnimatedBackground.js`

### Styling Changes
1. Modify Tailwind classes in components
2. Update CSS custom properties in `index.css`
3. Adjust glass morphism effects

## 📱 PWA Features

- **Service Worker**: Offline functionality
- **Manifest**: App-like installation
- **Responsive**: Works on all devices
- **Fast Loading**: Optimized assets

## 🔧 Development

### Available Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

### Code Style
- ESLint configuration included
- Prettier formatting
- Consistent component structure
- Proper prop types and documentation

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI
2. Run `vercel` in project directory
3. Follow deployment prompts

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: info@hivesurf.com
- Phone: +91 7008310868
- Website: [hivesurf.com](https://hivesurf.com)

---

**HiveSurf** - Riding the wave of digital innovation! 🏄‍♂️ 