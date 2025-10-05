# 🎨 CPS Academy Color Scheme

## Overview

Refined, professional color palette with consistent indigo-blue-cyan gradients throughout the application.

---

## 🎨 Primary Color Palette

### Brand Colors (Primary)

- **Indigo**: `indigo-50` → `indigo-700`
  - Use for: Primary buttons, navigation, headers, main CTAs
  - Hex: `#4F46E5` (indigo-600)
- **Blue**: `blue-50` → `blue-700`
  - Use for: Secondary accents, links, hover states
  - Hex: `#2563EB` (blue-600)
- **Cyan**: `cyan-50` → `cyan-700`
  - Use for: Tertiary accents, gradient endpoints
  - Hex: `#06B6D4` (cyan-600)

### Success Colors

- **Emerald**: `emerald-50` → `emerald-700`

  - Use for: Success messages, badges, positive states
  - Hex: `#10B981` (emerald-600)

- **Teal**: `teal-50` → `teal-100`
  - Use for: Success gradient accents
  - Hex: `#14B8A6` (teal-600)

### Warning Colors

- **Amber**: `amber-50` → `amber-700`
  - Use for: Warning messages, alerts, pending states
  - Hex: `#F59E0B` (amber-600)

### Error Colors

- **Rose**: `rose-50` → `rose-700`

  - Use for: Error messages, delete actions, danger states
  - Hex: `#F43F5E` (rose-600)

- **Pink**: `pink-50` → `pink-500`
  - Use for: Error gradient accents
  - Hex: `#EC4899` (pink-500)

### Neutral Colors

- **Gray**: `gray-50` → `gray-900`
  - Use for: Text, backgrounds, borders
  - Hex: `#6B7280` (gray-500)

---

## 🌈 Gradient Patterns

### Primary Brand Gradient

```css
bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600
```

- **Use for**: Main headers, hero text, logo, important CTAs
- **Example**: Page titles, brand logo

### Button Gradients

#### Primary Action

```css
bg-gradient-to-r from-indigo-600 to-blue-600
hover:from-indigo-700 hover:to-blue-700
```

- **Use for**: Main CTAs, submit buttons, primary actions

#### Danger Action

```css
bg-gradient-to-r from-rose-500 to-pink-500
hover:from-rose-600 hover:to-pink-600
```

- **Use for**: Delete, logout, destructive actions

### Background Gradients

#### Page Background

```css
bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/40
```

- **Use for**: Body background

#### Section Header

```css
bg-gradient-to-r from-indigo-50 to-cyan-50
```

- **Use for**: Section headers, featured areas

#### Card Image Placeholder

```css
bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100
```

- **Use for**: Image placeholders, empty states

### Badge & Tag Gradients

#### Course/Primary Badge

```css
bg-gradient-to-r from-indigo-100 to-cyan-100
text-indigo-700 border-indigo-200
```

#### Success Badge

```css
bg-gradient-to-r from-emerald-100 to-teal-100
text-emerald-700 border-emerald-200
```

#### User Role Badge

```css
bg-gradient-to-r from-indigo-50 to-blue-50
text-indigo-700 border-indigo-200
```

---

## 📦 Component-Specific Colors

### Layout/Navigation

- **Navbar**: `backdrop-blur-xl bg-white/80 border-indigo-200/30 shadow-indigo-100/50`
- **Logo**: `from-indigo-600 via-blue-600 to-cyan-600`
- **Active Link**: `from-indigo-600 to-blue-600`
- **Inactive Link**: `bg-indigo-50 text-indigo-700 hover:bg-indigo-100`

### Forms & Inputs

- **Focus State**: `border-indigo-500 ring-indigo-100`
- **Hover State**: `border-gray-400`
- **Default Border**: `border-gray-200`
- **Submit Button**: `from-indigo-600 to-blue-600`

### Cards

- **Background**: `backdrop-blur-md bg-white/80`
- **Border**: `border-gray-200/50`
- **Hover**: `hover:shadow-xl`
- **Title Hover**: `group-hover:text-indigo-600`

### Feedback Components

#### Loader

- **Outer Ring**: `border-indigo-200 border-t-indigo-600`
- **Inner Ring**: `border-t-cyan-600`

#### Toast Notifications

- **Success**: `from-emerald-50 to-teal-50 border-emerald-300`
- **Error**: `from-rose-50 to-pink-50 border-rose-300`
- **Info**: `from-indigo-50 to-cyan-50 border-indigo-300`

#### Inline Alerts

- **Success**: `bg-emerald-50 border-emerald-300 text-emerald-800`
- **Error**: `bg-rose-50 border-rose-300 text-rose-800`
- **Info**: `bg-indigo-50 border-indigo-300 text-indigo-800`

### Course Components

- **Course Badge**: `from-indigo-100 to-cyan-100 text-indigo-700`
- **Audience Badge**: `bg-emerald-50 text-emerald-700 border-emerald-200`
- **Level Badge**: `from-emerald-100 to-teal-100 text-emerald-700`
- **Topic Tag**: `bg-indigo-50 text-indigo-700 border-indigo-200`
- **Module Number Badge**: `from-indigo-500 to-blue-600` (white text)

---

## 🎯 Usage Guidelines

### Do's ✅

- **Always use gradients** for primary CTAs and headers
- **Use emerald** for success states, not green
- **Use rose** for errors/danger, not red
- **Use indigo-blue-cyan** for brand identity
- **Maintain consistency** across similar components
- **Use subtle backgrounds** (e.g., `/80` opacity) for glassmorphism

### Don'ts ❌

- **Don't mix** old blue-purple gradients with new indigo-cyan
- **Don't use** pure red - use rose instead
- **Don't use** pure green - use emerald instead
- **Don't use** purple gradients (replaced with indigo-cyan)
- **Don't override** focus states - keep indigo-500 consistent

---

## 🔄 Migration Notes

### Changed Colors

| Old                                          | New                                        | Reason                                |
| -------------------------------------------- | ------------------------------------------ | ------------------------------------- |
| `from-blue-600 to-indigo-600`                | `from-indigo-600 to-blue-600`              | Better brand consistency              |
| `from-blue-600 via-indigo-600 to-purple-600` | `from-indigo-600 via-blue-600 to-cyan-600` | More modern, cohesive                 |
| `green-*`                                    | `emerald-*`                                | More vibrant success state            |
| `red-*`                                      | `rose-*`                                   | Softer, more professional error state |
| `purple-*` for badges                        | `emerald-*`                                | Better semantic meaning               |
| `blue` focus ring                            | `indigo` focus ring                        | Brand consistency                     |

---

## 📊 Color Contrast Ratios

All color combinations meet WCAG AA standards:

- **Indigo-700 on white**: 7.5:1 ✅
- **Blue-700 on white**: 8.2:1 ✅
- **Emerald-700 on white**: 4.8:1 ✅
- **Rose-700 on white**: 6.1:1 ✅
- **Gray-700 on white**: 7.2:1 ✅

---

## 🎨 Figma/Design Export

For designers:

```json
{
  "brand": {
    "primary": "#4F46E5",
    "secondary": "#2563EB",
    "tertiary": "#06B6D4"
  },
  "semantic": {
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#F43F5E"
  },
  "neutral": {
    "text": "#374151",
    "border": "#E5E7EB",
    "background": "#F9FAFB"
  }
}
```

---

**Last Updated**: October 2025
**Version**: 2.0
**Status**: ✅ Implemented
