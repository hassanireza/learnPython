# Repository Setup Guide

## How to Publish This as a Top GitHub Repository

Follow these steps exactly to launch and grow this repository.

---

### Step 1 — Create the GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Set the repository name to `python-30-days`
3. Add description: `Complete Python course from zero to confident developer in 30 days. 30 lessons, 30 real projects, 300+ code examples.`
4. Set visibility to **Public**
5. Do NOT initialize with a README (you have one already)
6. Click **Create repository**

---

### Step 2 — Push the Code

```bash
# Inside the python-30-days folder
git init
git add .
git commit -m "feat: initial release — 30-day Python course"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/python-30-days.git
git push -u origin main
```

---

### Step 3 — Configure the Repository for Discoverability

After pushing, go to the repository settings on GitHub:

**Topics (add all of these):**
```
python, python3, python-tutorial, learn-python, programming,
beginner-python, python-course, coding, software-development,
education, tutorial, open-source, 30-days, projects
```

**Social Preview:**
- Go to Settings → General → Social preview
- Upload the `assets/banner.svg` (convert to PNG first if needed)

**Website:**
- Add your GitHub Pages URL or leave it as the repo URL

---

### Step 4 — Enable GitHub Pages (Optional but Recommended)

1. Go to Settings → Pages
2. Source: Deploy from branch
3. Branch: `main`, folder: `/` (root)
4. Save

This gives you a URL like `https://yourusername.github.io/python-30-days/`

---

### Step 5 — Pin the Repository

On your GitHub profile:
1. Click "Customize your pins"
2. Select `python-30-days`
3. This puts it front and center on your profile

---

### Step 6 — SEO and Discoverability Checklist

- [x] Descriptive repository name with keywords
- [x] Clear one-line description with keywords
- [x] 14 relevant topics/tags added
- [x] Professional README with badges
- [x] Table of contents for navigation
- [x] Screenshots/visual assets (banner SVG)
- [x] LICENSE file (MIT)
- [x] CONTRIBUTING.md
- [x] Issue templates
- [x] CI/CD workflow (GitHub Actions)

---

### Step 7 — Promote the Repository

After launch, share to these platforms for initial momentum:

**Reddit:**
- r/learnpython — "I built a free 30-day Python course on GitHub"
- r/Python — Same post, different angle on the project structure
- r/programming — Focus on the curriculum design

**Dev.to / Hashnode:**
- Write a blog post: "I created a free 30-day Python course — here's what I learned"
- Link back to the repo

**Twitter/X:**
- "Just released a free 30-day Python course on GitHub. 30 projects, 300+ examples, completely open source. Link 👇"
- Use hashtags: #Python #LearnPython #OpenSource #100DaysOfCode

**LinkedIn:**
- Post a professional announcement
- Tag it as an "open source project"

---

### Step 8 — Maintain the Repository

For sustained growth:

- Respond to issues within 48 hours
- Merge good PRs and thank contributors
- Add a `CHANGELOG.md` as you update content
- Create GitHub Releases for major content additions
- Enable Discussions for community Q&A

---

### Expected Growth Timeline

| Week | Expected Stars | Notes |
|------|---------------|-------|
| 1 | 10-50 | From direct sharing |
| 2-4 | 50-200 | Reddit/community posts |
| 1-3 months | 200-1000 | Organic search + social |
| 6+ months | 1000+ | GitHub trending + backlinks |

---

### Repository Health Checklist

Run these checks monthly:

```bash
# Verify all Python files are syntactically valid
find days -name "*.py" -exec python3 -m py_compile {} \; && echo "All OK"

# Check for TODO items in code
grep -r "TODO" days/ --include="*.py"

# List files missing a solution.py
for d in days/day-*/; do
  [ -f "$d/project/solution.py" ] || echo "MISSING: $d/project/solution.py"
done
```
