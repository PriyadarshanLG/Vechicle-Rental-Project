# 🎨 Header Opacity Guide

## Current Header Opacity Settings

### Landing Page Header:
- **Background Opacity**: `bg-white/10` = **10% opacity** (0.1)
- **Backdrop Blur**: `backdrop-blur-md` = Medium blur effect
- **Border Opacity**: `border-white/20` = **20% opacity** (0.2)

### Other Pages Header:
- **Background**: `bg-white` = **100% opacity** (solid white)

---

## How to Change Header Opacity

### Option 1: More Transparent (Lower Opacity)

**Current (10%):**
```javascript
'bg-white/10 backdrop-blur-md border-b border-white/20'
```

**More Transparent (5%):**
```javascript
'bg-white/5 backdrop-blur-md border-b border-white/10'
```

**Very Transparent (3%):**
```javascript
'bg-white/3 backdrop-blur-md border-b border-white/5'
```

### Option 2: Less Transparent (Higher Opacity)

**Semi-Transparent (20%):**
```javascript
'bg-white/20 backdrop-blur-md border-b border-white/30'
```

**More Visible (30%):**
```javascript
'bg-white/30 backdrop-blur-md border-b border-white/40'
```

**Quite Visible (50%):**
```javascript
'bg-white/50 backdrop-blur-md border-b border-white/60'
```

---

## Opacity Scale Reference

| Code | Opacity | Visibility |
|------|---------|------------|
| `bg-white/5` | 5% | Very transparent |
| `bg-white/10` | 10% | Transparent (current) |
| `bg-white/20` | 20% | Semi-transparent |
| `bg-white/30` | 30% | More visible |
| `bg-white/40` | 40% | Visible |
| `bg-white/50` | 50% | Quite visible |
| `bg-white/60` | 60% | More solid |
| `bg-white/70` | 70% | Mostly solid |
| `bg-white/80` | 80% | Almost solid |
| `bg-white/90` | 90% | Nearly solid |
| `bg-white` | 100% | Completely solid |

---

## How to Edit

1. Open: `client/src/components/Header.js`
2. Find line ~28:
   ```javascript
   ? 'bg-white/10 backdrop-blur-md border-b border-white/20'
   ```
3. Change `bg-white/10` to your desired opacity
4. Save and refresh browser

---

## Recommended Settings

### For Video Background (Current):
- **10-20% opacity** - Good balance between transparency and readability

### For Light Backgrounds:
- **30-50% opacity** - More visible header

### For Dark Backgrounds:
- **5-10% opacity** - Keep it subtle

---

## Current Setting Location

**File**: `client/src/components/Header.js`  
**Line**: ~28  
**Current**: `bg-white/10` (10% opacity)

---

**Change the number after `/` to adjust opacity!**



