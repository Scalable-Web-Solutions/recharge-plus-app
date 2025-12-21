// Simple script to create placeholder PWA icons
// In production, replace these with professionally designed icons

const fs = require('fs');
const path = require('path');

const sizes = [192, 512];

const createSVGIcon = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#001F3F"/>
  <text 
    x="50%" 
    y="50%" 
    font-family="Arial, sans-serif" 
    font-size="${size * 0.3}" 
    font-weight="bold" 
    fill="#FFFFFF" 
    text-anchor="middle" 
    dominant-baseline="middle"
  >R+</text>
</svg>
`;

console.log('📱 Generating placeholder PWA icons...\n');

sizes.forEach(size => {
  const svg = createSVGIcon(size);
  const filename = `icon-${size}.svg`;
  const filepath = path.join(__dirname, '..', 'public', filename);
  
  fs.writeFileSync(filepath, svg.trim());
  console.log(`✅ Created ${filename}`);
});

console.log('\n✨ Done! Replace these SVG files with PNG icons for production.');
console.log('💡 Tip: Use a tool like Figma or Canva to create professional icons.');
