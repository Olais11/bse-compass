# BSE Compass

An interactive front-end web application to help new BSE students reflect on their strengths, interests, and goals so they can choose a suitable specialisation.

This project was built as part of the **Front-End Web Development** summative assignment. It implements the **BSE Specialisation Advisor** scenario.

---

## 1. Project Overview

The BSE Compass guides new students through a short quiz and suggests one of four BSE specialisations:

- **Low-Level Programming**
- **AR/VR**
- **Full-Stack Web Development**
- **Machine Learning**

After completing the quiz, students receive:

- Their **best-fit specialisation**
- A brief **explanation of why it fits**
- **Next-step suggestions** for developing skills in that area
- A **visual score profile** showing how they scored across all four options

---

## 2. Features

### Landing Page (`index.html`)
- Welcomes new BSE students and introduces the tool.
- Briefly explains how the advisor works.
- Short descriptions of all four specialisations.
- Clear call-to-action button: **“Start the Quiz”**.

### Quiz Page (`quiz.html`)
- **8 questions** with answers fairly mapped across all 4 specialisations.
- Uses:
  - Radio buttons for single-choice questions
  - A **range slider** to capture math/statistics comfort level
- **Scoring logic** implemented in pure JavaScript:
  - Each answer adds to the score of one specialisation.
  - Math comfort level slightly adjusts the Machine Learning score.
- **Result section**:
  - Shows top specialisation
  - Explains why it’s a fit
  - Gives 3 concrete next steps
  - Includes a **score bar visualisation** of all four categories
- **Input validation**:
  - Ensures all questions are answered before showing results.
  - Displays an error message if anything is missing.

### Contact Page (`contact.html`)
- Shows static contact details:
  - Name
  - Email
  - GitHub profile
- Contact form with diverse form elements:
  - Text input (name)
  - Email input with built-in HTML validation
  - Student ID with pattern-based validation (e.g. `AB1234`)
  - Select dropdown (topic)
  - Textarea (message)
  - Required checkbox for consent
- JavaScript validation:
  - Checks required fields, minimum lengths, email format, optional ID pattern, and consent checkbox.
  - Shows clear error or success messages.
  - Simulates submission (no backend used, as required by the assignment).

---

## 3. Technology Stack

This project is built using **only client-side technologies**, with **no external libraries or frameworks**:

- **HTML5**
  - Semantic structure (`header`, `nav`, `main`, `section`, `footer`, `article`, `fieldset`, `legend`, etc.)
  - Multiple form elements (radio, range, text, email, select, textarea, checkbox)
  - Accessible attributes (`aria-live`, labels, `fieldset`/`legend`, etc.)

- **CSS3**
  - Responsive layout using **Flexbox** and **CSS Grid**
  - Global styling and component-level styling
  - Hover effects and **transitions/animations** (buttons, cards, score bars)
  - Mobile-friendly design with media queries

- **JavaScript**
  - Event handling (`DOMContentLoaded`, `submit`, `input`)
  - DOM manipulation (`getElementById`, `querySelector`, `innerHTML`, `classList`)
  - **Quiz scoring logic** for the four specialisations
  - **Input validation** (quiz and contact form)
  - Dynamic update of range slider value and animated score bars

---

## 4. How the Quiz Logic Works

1. Each radio question is associated with one of:
   - `lowlevel`
   - `arvr`
   - `fullstack`
   - `ml`

2. On submit:
   - JavaScript checks that **every question has an answer**.
   - A **score object** is created and incremented for each chosen answer.

3. Math comfort range:
   - Value from `1` to `5`.
   - If `≥ 4`: Machine Learning score is slightly increased.
   - If `≤ 2`: Machine Learning score is slightly decreased (not below zero).

4. The script:
   - Finds the **highest-scoring** specialisation.
   - Maps the key to:
     - Display title
     - Explanation text
     - A list of suggested next steps
   - Updates the result section and **score bars** accordingly.

---

## 5. Project Structure

```
bse-compass
├── index.html       # Landing page
├── quiz.html        # Quiz and results page
├── contact.html     # Contact information and form
├── styles.css       # Shared styling (layout, colours, animations)
└── script.js        # Quiz logic, DOM manipulation, validation
```

---

## 6. Getting Started

You can run the project locally in any modern web browser.

1. **Clone or download** this repository.
2. Open `index.html` directly in your browser (e.g. double-click or right-click → “Open with browser”).
3. Navigate using the top navigation bar:
   - Home → Quiz → Contact.

---

## 7. Author

[Julius Olais Laizer](https://github.com/Olais11)

---

## 8. Deployment

[Live Site](https://Olais11.github.io/bse-compass)