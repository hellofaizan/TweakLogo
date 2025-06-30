# 🎨 LogoTweak

A powerful, modern logo customization tool built with Next.js that allows you to create stunning logos with customizable icons, backgrounds, and export options.

![LogoTweak Preview](public/banner.png)

## ✨ Features

### 🎯 Icon Customization
- **Dual Icon Libraries**: Choose from [Lucide Icons](https://lucide.dev) and [Tabler Icons](https://tabler-icons.io)
- **Extensive Icon Collection**: Access thousands of beautiful, customizable icons
- **Real-time Preview**: See changes instantly as you customize
- **Icon Properties**:
  - Size adjustment (0-500px)
  - Color customization with color picker
  - Border width control
  - Rotation (0-360°)
  - Fill color and opacity

### 🎨 Background Customization
- **Gradient & Solid Colors**: Advanced color picker with gradient support
- **Shape Control**: Adjust border radius (0-300px)
- **Padding**: Fine-tune spacing around the icon
- **Shadow Effects**: Choose from 5 shadow levels (XS to XL)
- **Color Presets**: Quick access to curated color palettes

### 📤 Export Options
- **Multiple Formats**: PNG, JPG, SVG
- **Resolution Control**: 0.5x to 8x, plus FullRes option
- **High-Quality Output**: Perfect for web and print use
- **Instant Download**: No server processing required

### 🌙 Modern UI/UX
- **Dark/Light Mode**: Automatic theme switching
- **Responsive Design**: Works perfectly on desktop and mobile
- **Intuitive Controls**: Tabbed interface for organized customization
- **Real-time Feedback**: Live preview with hover effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hellofaizan/TweakLogo.git
   cd logotweak
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 TODO

- [x] Icon customization (size, color, border, rotation)
- [x] Background customization (color, gradient, shadow, padding)
- [x] Export as PNG, JPG, SVG
- [x] Dark/Light mode
- [x] Responsive design
- [ ] Custom icon upload (SVG)
- [ ] Add text overlay (with font options)
- [ ] More background patterns (stripes, dots, etc.)
- [ ] Save/load logo designs (local storage)
- [ ] Fun randomizer button (random logo generator)
- [ ] Shareable logo links
- [ ] Add more color presets
- [ ] Simple animation (spin, bounce, etc.)

---

*This list is for fun and learning! If you have ideas, feel free to open an issue or PR.*

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Tabler Icons](https://tabler-icons.io/)
- **Color Picker**: [react-best-gradient-color-picker](https://github.com/omariosouto/react-best-gradient-color-picker)
- **Export**: [html-to-image](https://github.com/bubkoo/html-to-image)

## 📁 Project Structure

```
logotweak/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout with theme provider
│   │   ├── page.tsx        # Main application page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── LogoPreview.tsx # Live logo preview component
│   │   ├── IconControls.tsx # Icon customization controls
│   │   ├── BackgroundControls.tsx # Background customization
│   │   ├── ModeToggle.tsx  # Theme toggle component
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── public/                # Static assets
│   └── logos/            # Example logos
└── package.json          # Dependencies and scripts
```

## 🎨 Usage Guide

### Creating Your Logo

1. **Choose an Icon**
   - Click the icon selector to browse thousands of icons
   - Switch between Lucide and Tabler icon libraries
   - Use the search function to find specific icons

2. **Customize the Icon**
   - Adjust size, color, and border width
   - Rotate the icon to your desired angle
   - Set fill color and opacity for filled effects

3. **Style the Background**
   - Choose between solid colors and gradients
   - Adjust border radius for different shapes
   - Set padding and shadow effects
   - Use preset color combinations

4. **Export Your Logo**
   - Select your preferred format (PNG, JPG, SVG)
   - Choose the resolution for your needs
   - Click download to save your logo

### Tips for Best Results

- **For Web Use**: Use PNG format with 1x or 2x resolution
- **For Print**: Use PNG or SVG with higher resolutions
- **For Scalability**: SVG format is best for logos that need to scale
- **Color Harmony**: Use the preset color combinations for professional results

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Pull requests and ideas are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev/) for the beautiful icon library
- [Tabler Icons](https://tabler-icons.io/) for additional icon options
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the existing issues for solutions
- Join our community discussions

---

**Made with ❤️ by Mohammad Faizan**
