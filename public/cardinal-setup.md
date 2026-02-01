# Adding the NC Blockchain Cardinal Logo

To add your cardinal mascot image to the game:

## Option 1: Direct Image Upload

1. Save your cardinal images as:
   - `public/cardinal.png` - Main mascot image
   - `public/cardinal-pixel.png` - Pixel art version

2. Update game.html to use the image instead of emoji:

```html
<!-- Replace the coin div with: -->
<div class="coin" id="coin">
    <img src="cardinal.png" alt="NC Cardinal" style="width: 80%; height: 80%;">
</div>
```

## Option 2: Base64 Embed

Convert your image to base64 and embed directly:

```javascript
const cardinalImage = 'data:image/png;base64,YOUR_BASE64_HERE';
```

## Option 3: Animated Cardinal

Add multiple cardinal states for animation:

```javascript
const cardinalStates = {
    idle: 'cardinal-idle.png',
    tap: 'cardinal-tap.png',
    happy: 'cardinal-happy.png'
};
```

## Recommended Image Specs

- Format: PNG with transparent background
- Size: 512x512px for main image
- Pixel art: 64x64px or 128x128px
- File size: Under 100KB for fast loading

## Adding Cardinal Sounds

```javascript
// Add to game.html
const sounds = {
    tap: new Audio('sounds/chirp.mp3'),
    levelUp: new Audio('sounds/cardinal-call.mp3')
};
```

## NC Blockchain Branding Colors

- Primary Red: #DC143C (Crimson)
- Dark Red: #8B0000 (Dark Red)
- Accent Gold: #FFD700 (Gold)
- Text White: #FFFFFF
- Background Dark: #1A1A1A