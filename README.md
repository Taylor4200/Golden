# Golden Heavy Duty Truck Repair Website

A professional, high-converting website for Golden Heavy Duty Truck Repair located in Hudson, CO. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## 🚛 Features

- **Professional Design**: Heavy-duty truck theme with golden accents
- **Responsive Layout**: Mobile-first design that works on all devices
- **Fast Performance**: Optimized images, clean code, and efficient loading
- **SEO Optimized**: Complete meta tags, structured data, and sitemap
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Contact Forms**: Interactive contact forms with validation
- **Emergency Service**: Prominent 24/7 emergency service messaging

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter & Oswald (Google Fonts)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── gallery/           # Gallery page
│   ├── services/          # Services page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap
├── components/            # Reusable components
│   ├── ContactSection.tsx # Contact form component
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Site header
│   ├── Hero.tsx           # Hero section
│   ├── Services.tsx       # Services section
│   ├── StructuredData.tsx # SEO structured data
│   └── Testimonials.tsx   # Customer testimonials
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd golden-heavy-duty
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Pages

- **Homepage** (`/`) - Hero, services, testimonials, and contact section
- **About** (`/about`) - Company story, team, and values
- **Services** (`/services`) - Detailed service offerings and process
- **Contact** (`/contact`) - Contact information and service request form
- **Gallery** (`/gallery`) - Facility photos, team, and before/after projects

## 🎨 Customization

### Colors
The website uses a custom color scheme defined in `globals.css`:
- Primary: `#d4af37` (Golden)
- Secondary: `#2c2c2c` (Dark Gray)
- Accent: `#ff6b35` (Orange)

### Content
Update business information in:
- `src/components/Header.tsx` - Phone number, address
- `src/components/Footer.tsx` - Contact details, hours
- `src/components/StructuredData.tsx` - Business schema data

### Images
Replace placeholder images with actual photos:
- Hero background images
- Team member photos
- Facility and equipment photos
- Before/after project photos

## 🔧 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## 📈 SEO Features

- **Meta Tags**: Complete title, description, and Open Graph tags
- **Structured Data**: JSON-LD schema for business and services
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine directives
- **Local SEO**: Optimized for "heavy duty truck repair Hudson CO"

## 🎯 Performance

- **Image Optimization**: Next.js automatic image optimization
- **Font Optimization**: Google Fonts with display swap
- **Code Splitting**: Automatic code splitting by Next.js
- **Lazy Loading**: Images and components load as needed

## 📞 Contact Information

**Golden Heavy Duty Truck Repair**
- Address: 806 Cedar St, Hudson, CO 80642
- Phone: (970) 123-4567
- Email: info@goldenheavyduty.com
- Hours: Mon-Fri 7AM-6PM, Sat 8AM-4PM, 24/7 Emergency

## 📄 License

This project is proprietary software for Golden Heavy Duty Truck Repair.

## 🤝 Support

For technical support or questions about this website, please contact the development team.
