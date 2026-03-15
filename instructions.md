You are building a MID-fidelity mobile web app prototype that gamifies the Pursuit OCR experience.

IMPORTANT
- Frontend only
- No backend
- No real auth
- No database
- No payment flow
- No booking integration
- No legal submission storage
- Host on GitHub Pages
- Use local mock data + localStorage only
- This is a MID-fi prototype for user testing, not the final product

SKILL USAGE
- In the project directory there is a file named `skills-lock.json`
- Read and use `skills-lock.json`
- Load and apply the locked skill `sleek-design-mobile-apps`
- Use that skill to improve mobile UI quality, layout, spacing, hierarchy, navigation, and visual polish
- Do not ignore the locked skill configuration

TECH STACK
- React + TypeScript + Vite
- React Router with HashRouter for GitHub Pages compatibility
- CSS Modules or another clean scoped CSS approach
- localStorage for persistence
- Static app only

GOAL
Create a gamified mobile companion app for Pursuit OCR that makes users feel like they are joining a challenge-based obstacle experience, getting ready to play, learning the rules, accepting a waiver, creating a player avatar, and then exploring features like missions, rooms, scanning, rewards, and leaderboards.

VISUAL DIRECTION
Use the Pursuit OCR website as style inspiration:
- dark / charcoal base
- bright neon-like accents inspired by the brand
- sporty, arcade-like, energetic feel
- bold typography
- rounded cards
- strong contrast
- clean, modern, mobile-first UI

Do not copy exact brand assets. Create an inspired design system.

CORE FLOW
Build this onboarding flow in this exact order:
1. Sign Up
2. How It Works / Instructions
3. Waiver / Terms Acceptance
4. Avatar Creation
5. Dashboard / Home

After onboarding, include these additional screens:
- Missions
- Scan QR Code
- Rooms / Lobby
- Create Room
- Room Detail
- Leaderboard
- Rewards / Badges
- Profile

USE THE PROVIDED WIREFRAMES
Use the attached reference images as functional guidance for:
- dashboard with active mission, XP, badges, quick actions, recent activity
- rooms/lobby with create room, join private room, tabs, room cards
- create room flow with course, room type, size, privacy, summary
- QR scan screen with mission completion, hidden rewards, recent scans
- bottom navigation with Home, Missions, Scan, Rooms, Rewards

Interpret those wireframes into a cleaner, more polished MID-fi mobile UI.

ROUTES
- / -> redirect to /signup
- /signup
- /how-it-works
- /waiver
- /avatar
- /dashboard
- /missions
- /scan
- /rooms
- /create-room
- /room/:id
- /leaderboard
- /rewards
- /profile

ONBOARDING SCREEN REQUIREMENTS

1) SIGN UP
- headline like “Join the Challenge”
- fields: full name, email, password, confirm password
- show/hide password
- validation for required fields, email, min password, password match
- CTA: “Create My Profile”
- save basic user info to localStorage
- on success go to /how-it-works

2) HOW IT WORKS
- short explainer with 4–5 cards/steps
- explain: create profile, review rules, build avatar, join missions/rooms, scan codes and earn rewards
- CTA: “Continue to Waiver”
- save progress locally

3) WAIVER
- summarized prototype-safe waiver screen
- do not reproduce real legal text
- include sections for activity risk, venue rules, session expectations, minors/guardian note, consent
- include checkboxes such as:
  - I understand this is a physical activity experience
  - I agree to follow venue rules and staff directions
  - I confirm I reviewed this prototype waiver step
- disable CTA until required boxes are checked
- CTA: “Accept and Continue”
- save acceptance in localStorage
- go to /avatar

4) AVATAR CREATION
- large live avatar preview
- real-time updates
- categories:
  - skin tone
  - face shape
  - eyes
  - eyebrows
  - nose
  - mouth
  - hairstyle
  - hair color
  - outfit
  - accessories
- include randomize, reset, and save
- avatar style inspiration only:
  - Apple Memoji
  - Nintendo Mii
  - Bitmoji
  - Zepeto
  - The Sims Create-a-Sim
- do not copy branded visuals
- keep style sporty, friendly, modern, semi-cartoon
- after save show a celebratory success state and go to /dashboard

MAIN APP SCREENS

5) DASHBOARD
- greeting with user name
- active mission card
- XP / missions / badges stats
- quick actions
- recent activity
- mini avatar
- readiness / profile completion card
- entry points to missions, scan, rooms, rewards

6) MISSIONS
- mission cards with status, XP reward, difficulty/category
- mock missions like Sprint Circuit, Tricycle Chaos, Wall Climb Rush, Ball Pit Recovery

7) SCAN
- UI-only QR scan screen
- large scanner area
- CTA: “Start Scanning”
- cards for mission completion and hidden rewards
- recent scan results list
- no real QR implementation required unless trivial

8) ROOMS / LOBBY
- Create Room CTA
- Join Private Room CTA
- tabs for My Room / Public Rooms
- room cards with room name, course, zone, players/capacity, action button

9) CREATE ROOM
- room name
- room type: Competitive / Collaborative
- select course: Ball Pit, Tricycle Race, Wall Climbing, Volleyball
- lobby size: 4, 6, 8, 10, 12, 16
- privacy: Public / Private
- room summary
- CTA: Create Room
- persist mock room locally
- then go to room detail

10) ROOM DETAIL
- owner and participant states
- room metadata
- player count
- challenge/course
- actions like Manage, Enter Room, Leave Room, Copy Join Code

11) LEADERBOARD
- filters: Weekly / All Time / Friends
- rank, avatar, player name, XP, badges
- top 3 highlight
- highlight current user

12) REWARDS
- earned and locked badges
- XP totals
- progress to next unlock
- mock badges like Rookie Challenger, Wall Runner, Hidden Hunter, Arena Explorer, Team Player

13) PROFILE
- avatar
- player name
- email
- total XP
- missions completed
- badges earned
- waiver status
- edit avatar
- reset prototype data

GAMIFICATION
Use light gamification throughout:
- onboarding progress indicator
- readiness meter
- XP and badge placeholders
- celebratory states after signup, waiver, avatar save
- motivating microcopy like:
  - Join the challenge
  - Build your player
  - Unlock your profile
  - Scan to discover
  - Climb the leaderboard

DATA
Use localStorage for:
- user/signup info
- onboarding completion
- waiver acceptance
- avatar config
- rooms
- stats
- scan history
- rewards
- recent activity

Create mock data files for:
- missions
- rooms
- leaderboard
- badges
- recent activity
- scan results
- courses

ACCESSIBILITY
- semantic HTML
- labels on forms
- high contrast
- tap-friendly controls
- clear validation and error states

DELIVERABLES
Generate:
- the full React + TypeScript + Vite project
- all routes and screens
- reusable components
- mock data files
- localStorage helpers
- cohesive Pursuit-inspired styling
- a README explaining:
  - purpose
  - that this is a frontend-only MID-fi prototype
  - how to run
  - how to build
  - how to deploy to GitHub Pages
  - what is mocked

QUALITY BAR
- mobile-first
- polished but not overbuilt
- clean code
- believable prototype
- easy to demo
- no backend assumptions
- no broken routes

Now build the prototype.
