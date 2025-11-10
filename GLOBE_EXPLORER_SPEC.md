# Globe Explorer App - Project Specification

## Overview
An interactive 3D globe application that allows users to explore Earth with realistic rendering, featuring the top 10 most populous metropolitan areas with detailed information about each city.

## Tech Stack
- **3D Engine**: React Three Fiber (R3F) + Three.js
- **3D Helpers**: @react-three/drei
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Layout**: AppLayout (standalone app, no main site styling inheritance)

## High-Level User Experience

### Initial Load
1. User sees a loading screen while high-quality textures load
2. Once loaded, displays a photo-realistic 3D Earth globe
3. Globe is initially centered on Seattle, Washington (even if not in top 10 list)
4. Realistic lighting showing current sun position based on user's local time/date
5. Top 10 most populous metro areas marked with red pins and labels

### Interactions
- **Click & Drag**: Rotate globe in any direction
- **Zoom**: Mouse wheel or pinch to zoom in/out
- **Auto-rotation**: After 10 seconds of inactivity, globe slowly rotates
- **City Selection**: Click on city pin to open info popup
- **Mobile Support**: Full touch support (drag, pinch-to-zoom)

## Visual Requirements

### Globe Rendering
- **Photo-realistic textures**: High-quality Earth surface textures
- **Topography**: Visible elevation data (mountains, valleys)
- **No clouds**: Clear view of land and ocean
- **Realistic lighting**: Simulates sun position based on current date/time
- **High quality over speed**: Prioritize visual fidelity (2-3 second load acceptable)

### City Markers
- **Pin style**: Red pins/markers at city locations
- **Labels**: City names always visible
- **Label behavior**: Fade based on distance from camera (closer = more opaque)
- **Pin positioning**: Accurate lat/long coordinates

### Info Popups
- **Trigger**: Click on city pin
- **Position**: Appears near the pin itself (not center screen)
- **Content**: 400+ words covering:
  - Population statistics (metro area)
  - History and origin
  - Description of what the city is like today
- **Dismissal**: Easy to close/minimize
- **Style**: Should feel integrated with the 3D scene

## Data Requirements

### Top 10 Most Populous Metropolitan Areas
All data hardcoded (no external API calls). List based on metropolitan/urban area population:

1. **Tokyo, Japan**
   - Metro population: ~37-38 million
   - Coordinates: 35.6762°N, 139.6503°E
   - Content: Extensive description (400+ words)

2. **Delhi, India**
   - Metro population: ~32-33 million
   - Coordinates: 28.6139°N, 77.2090°E
   - Content: Extensive description (400+ words)

3. **Shanghai, China**
   - Metro population: ~28-29 million
   - Coordinates: 31.2304°N, 121.4737°E
   - Content: Extensive description (400+ words)

4. **São Paulo, Brazil**
   - Metro population: ~22-23 million
   - Coordinates: -23.5505°S, -46.6333°W
   - Content: Extensive description (400+ words)

5. **Mexico City, Mexico**
   - Metro population: ~22 million
   - Coordinates: 19.4326°N, -99.1332°W
   - Content: Extensive description (400+ words)

6. **Cairo, Egypt**
   - Metro population: ~21-22 million
   - Coordinates: 30.0444°N, 31.2357°E
   - Content: Extensive description (400+ words)

7. **Dhaka, Bangladesh**
   - Metro population: ~21-22 million
   - Coordinates: 23.8103°N, 90.4125°E
   - Content: Extensive description (400+ words)

8. **Mumbai, India**
   - Metro population: ~20-21 million
   - Coordinates: 19.0760°N, 72.8777°E
   - Content: Extensive description (400+ words)

9. **Beijing, China**
   - Metro population: ~20-21 million
   - Coordinates: 39.9042°N, 116.4074°E
   - Content: Extensive description (400+ words)

10. **Osaka, Japan**
    - Metro population: ~19 million
    - Coordinates: 34.6937°N, 135.5023°E
    - Content: Extensive description (400+ words)

**Note**: Implementer must web search to verify this list is accurate and gather authentic descriptions.

## Functional Requirements

### Camera System
- **Initial position**: Centered on Seattle, WA (47.6062°N, 122.3321°W)
- **Initial zoom**: Medium distance showing North America clearly
- **Drag rotation**: Smooth orbital controls
- **Zoom controls**:
  - Mouse wheel (desktop)
  - Pinch gesture (mobile)
  - Min/max zoom limits to prevent going inside Earth or too far away
- **Momentum**: Optional smooth continuation of rotation when drag is released
- **Auto-rotation**:
  - Activates after 10 seconds of no interaction
  - Slow, subtle rotation on Y-axis
  - Stops immediately on user interaction

### Lighting System
- **Sun position calculation**: Based on user's current date/time
- **Static during session**: Lighting doesn't update dynamically (calculated once on load)
- **Hemisphere lighting**: Bright side (day) vs dark side (night)
- **Realistic shadows**: Topography casts appropriate shadows

### City Information System
- **Data structure**: Array of city objects containing:
  - Name
  - Coordinates (lat/long)
  - Metro population (number)
  - Description (extensive text with sections for history, stats, modern day)
- **Pin rendering**: 3D objects or sprites that stay positioned on globe surface
- **Label rendering**: HTML overlays or 3D text
- **Distance-based opacity**: Calculate camera distance to each city, adjust label opacity
- **Click detection**: Raycasting to detect pin clicks
- **Popup state**: Manage which city (if any) has popup open

### Loading System
- **Loading screen**: Shows while textures/assets load
- **Progress indicator**: Optional percentage or spinner
- **Asset preloading**: Ensure all textures loaded before showing globe
- **Graceful degradation**: Handle texture load failures

## Technical Implementation Details

### File Structure
```
src/pages/GlobeExplorer/
├── index.tsx                 # Main component with AppLayout
├── Globe.tsx                 # Three.js scene setup
├── Earth.tsx                 # Earth mesh with textures
├── CityMarkers.tsx           # Pins and labels
├── CityPopup.tsx             # Info popup component
├── LoadingScreen.tsx         # Loading UI
├── data/
│   └── cities.ts             # Hardcoded city data
└── utils/
    ├── sunPosition.ts        # Calculate sun position from date/time
    └── coordinates.ts        # Lat/long to 3D position conversion
```

### Route Integration
1. Add `'globeexplorer'` to navigation types
2. Register in App.tsx switch statement
3. Add to Apps gallery with appropriate icon/description
4. Include in `isAppPage` check

### Dependencies to Install
```json
{
  "three": "^0.160.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.95.0",
  "@types/three": "^0.160.0"
}
```

### Assets Required
- **Earth texture**: High-resolution color map (4K or 8K)
- **Bump map**: Topography/elevation data
- **Specular map**: Ocean reflectivity
- **Night lights**: Optional city lights for dark side

**Source**: NASA Blue Marble or Natural Earth data (free, public domain)

## Performance Considerations
- **Texture size**: Balance quality vs memory (4K recommended)
- **Geometry detail**: Use high-poly sphere (segments: 128+)
- **Label updates**: Throttle distance calculations to avoid constant recalc
- **Mobile optimization**: Consider lower-res textures on mobile detection
- **Memory management**: Dispose of Three.js objects properly on unmount

## Edge Cases & Considerations
- **Antimeridian**: Cities near date line (Tokyo, etc.) render correctly
- **Southern hemisphere**: Negative latitudes work correctly (São Paulo)
- **Popup positioning**: Ensure popups don't render off-screen
- **Multiple clicks**: Prevent opening multiple popups simultaneously
- **Fast rotation**: Labels remain readable during quick spins
- **Deep zoom**: Prevent camera from going inside Earth mesh
- **Far zoom**: Prevent camera from zooming infinitely far

## Styling Guidelines
- **App independence**: No inherited styles from main site
- **Loading screen**: Simple, clean design
- **City popups**: Semi-transparent background, good readability
- **Red pins**: Vibrant red (#ef4444 or similar)
- **Labels**: White text with dark outline/shadow for contrast
- **Responsive**: Works on mobile (320px width minimum)

## Success Criteria
- [ ] Globe renders with photo-realistic textures and topography
- [ ] Lighting accurately reflects current sun position
- [ ] All 10 cities correctly positioned with red pins
- [ ] City labels fade based on camera distance
- [ ] Click & drag rotation works smoothly
- [ ] Zoom in/out functions properly
- [ ] Auto-rotation activates after 10s idle
- [ ] Clicking city opens detailed popup near pin
- [ ] Popup content is extensive (400+ words per city)
- [ ] Loading screen displays during asset loading
- [ ] Works on mobile with touch controls
- [ ] No external API calls during runtime
- [ ] Initial view centers on Seattle
- [ ] No performance issues or lag

## Future Enhancements (Out of Scope)
- Search functionality for cities
- More than top 10 cities
- Day/night cycle animation
- Weather overlays
- Flight paths between cities
- Historical population data visualization
- User-submitted city information

## Notes
- This is a standalone app using AppLayout
- No navigation bar by default
- Self-contained with no external dependencies at runtime
- All city data and descriptions must be researched and hardcoded
- Prioritize visual quality over load time
- Ensure clean code without AI slop (excessive comments, defensive programming)
