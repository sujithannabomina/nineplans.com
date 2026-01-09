# NinePlans — Production-ready MVP (Google Login)

This project is rebuilt from your old folder into a clean deployable MVP:
- Google Email Login (Firebase Auth)
- 3-column layout (Left categories, Center feed, Right profile + Ad slots)
- Posts, nested comments, voting, reporting
- Admin moderation panel: `/admin`
- Firestore rules + indexes included
- Seed script for starter categories

## 1) Firebase setup
1. Create Firebase project
2. Enable **Authentication → Google**
3. Create Firestore database
4. Get Web App config
5. Copy `.env.example` → `.env.local` and fill values

## 2) Run
```bash
npm install
npm run dev
```

## 3) Seed categories
```bash
npm run seed
```

## 4) Firestore rules
Copy `firebase/firestore.rules` into Firebase Console → Firestore → Rules.
If Firebase asks for indexes, use `firebase/firestore.indexes.json`.

## 5) Vercel deployment checklist
- Add the same env vars to Vercel Settings → Environment Variables
- Firebase → Auth → Settings → Authorized domains:
  - add `YOURPROJECT.vercel.app`
  - add `nineplans.com` (when you connect domain)

## 6) Make yourself admin
Firestore → users → {yourUid} → set `role` to `admin`, then open `/admin`.
