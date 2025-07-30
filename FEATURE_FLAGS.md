# CleanSip Feature Flags

Diese Datei erklärt, wie die Feature Flags für Produktkategorien funktionieren.

## 📍 Konfiguration

Die Feature Flags befinden sich in `lib/constants.ts`:

```typescript
export const FEATURE_FLAGS = {
  SHOW_STROHHALME: true,      // Currently available
  SHOW_PARTY_CUPS: false,    // Coming soon - set to true when ready
  SHOW_RUEHRSTABCHEN: false, // Coming soon - set to true when ready  
  SHOW_BESTECK: false,       // Coming soon - set to true when ready
  SHOW_COMING_SOON_PAGE: true // Show coming soon for unavailable products
} as const;
```

## 🚀 Produkte live schalten

Um neue Produktkategorien zu aktivieren:

### 1. **Strohhalme** (bereits aktiv)
- ✅ `SHOW_STROHHALME: true`
- Produkte sind im Shop sichtbar unter `/search/strohhalme`

### 2. **Party Cups aktivieren**
```typescript
SHOW_PARTY_CUPS: true,  // Ändere false zu true
```

### 3. **Rührstäbchen aktivieren**
```typescript
SHOW_RUEHRSTABCHEN: true,  // Ändere false zu true
```

### 4. **Besteck aktivieren**
```typescript
SHOW_BESTECK: true,  // Ändere false zu true
```

## 🎯 Auswirkungen der Änderungen

### **Navigation (Navbar)**
- Nur verfügbare Produkte werden in der Navigation angezeigt
- Nicht verfügbare Produkte verlinken zur Coming Soon Seite

### **Footer**
- Verfügbare Produkte verlinken direkt zu Produktseiten
- Nicht verfügbare Produkte sind mit "(Coming Soon)" markiert

### **Coming Soon Seite**
- Zeigt nur Produkte, die noch nicht verfügbar sind
- Wenn alle Produkte verfügbar sind, wird eine "Alle verfügbar"-Nachricht angezeigt

## 📝 Workflow für neue Produkte

1. **Shopify Setup**: Produkte in Shopify anlegen
2. **Feature Flag**: Entsprechenden Flag auf `true` setzen
3. **Navigation**: Automatisch aktualisiert
4. **Deploy**: Änderungen committen und pushen

## 🔄 Rollback

Um Produkte wieder zu verstecken, setze den entsprechenden Flag zurück auf `false`.

## 📁 Betroffene Dateien

- `lib/constants.ts` - Feature Flag Konfiguration
- `components/layout/navbar/index.tsx` - Navigation
- `components/layout/footer.tsx` - Footer Links
- `app/coming-soon/page.tsx` - Coming Soon Logik
