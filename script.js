// Query shared DOM nodes safely so code runs on every page without errors
const quizForm = document.getElementById("quiz-form");
const q4Slider = document.getElementById("q4");
const q4Output = document.getElementById("q4-output");
const resultsSection = document.getElementById("results");
const contactForm = document.querySelector(".contact-form");

// Update slider output live to give students instant feedback on their choice
if (q4Slider && q4Output) {
  q4Output.textContent = q4Slider.value;
  q4Slider.addEventListener("input", () => {
    q4Output.textContent = q4Slider.value;
  });
}

// Content describing each pathway for the result view
const profiles = {
  low_level: {
    title: "Low-Level Programming",
    reason:
      "You are motivated by precision, performance, and engineering foundations. You naturally consider constraints before anything else.",
    actions: [
      "Join the Embedded & Systems Lab sprint week.",
      "Shadow senior students working on firmware for campus devices.",
      "Pitch a capstone that modernises a core campus service with Rust or C."
    ],
    resource: {
      title: "Systems Playground",
      body: "Explore the BSE Systems Playground starter kit with microcontroller challenges.",
      link: "https://github.com/topics/embedded-systems"
    }
  },
  ar_vr: {
    title: "AR / VR",
    reason:
      "You instinctively design around human experience and prefer tangible, sensory breakthroughs over abstract optimisations.",
    actions: [
      "Prototype in the Immersive Media Studio every Friday.",
      "Facilitate a rapid user feedback loop using storyboards and bodystorming.",
      "Team up with Design for Impact to test spatial UI ideas."
    ],
    resource: {
      title: "Immersive Sprint Kit",
      body: "Borrow the XR starter package to keep experimenting with scene design.",
      link: "https://developer.oculus.com/resources/"
    }
  },
  full_stack: {
    title: "Full-Stack Web Development",
    reason:
      "You bridge frontend polish with backend reliability and enjoy orchestrating the entire delivery pipeline.",
    actions: [
      "Lead a DevOps duty shift for a student-led platform.",
      "Automate testing & deployment scripts for the BSE community portal.",
      "Host a workshop on clean API contracts for your cohort."
    ],
    resource: {
      title: "Full-Stack Launchpad",
      body: "Use this curated list of CI/CD templates to accelerate your builds.",
      link: "https://github.com/topics/full-stack"
    }
  },
  ml: {
    title: "Machine Learning",
    reason:
      "You think in signals, enjoy pattern-finding, and see data stories everywhere across campus life.",
    actions: [
      "Join the Responsible ML reading circle on Wednesdays.",
      "Contribute to the campus analytics dashboard with new models.",
      "Prototype a rapid ML microservice that powers a peer support bot."
    ],
    resource: {
      title: "Model Builders Hub",
      body: "Tap into curated Kaggle-style datasets to practice with real signals.",
      link: "https://www.kaggle.com/datasets"
    }
  }
};

// Helper to keep checkbox selections within the allowed limit
const enforceCheckboxLimit = () => {
  const checkboxGroup = document.querySelectorAll('input[name="q3"]');
  if (!checkboxGroup.length) return true;
  const checked = Array.from(checkboxGroup).filter((box) => box.checked);
  if (checked.length > 2) {
    alert("Please pick no more than two activities for Question 3.");
    checked.pop().checked = false;
    return false;
  }
  return checked.length > 0;
};

// Attach listener to enforce checkbox rule interactively
if (quizForm) {
  quizForm.addEventListener("change", (event) => {
    if (event.target.name === "q3") {
      enforceCheckboxLimit();
    }
  });
}

// Score calculation triggered on submit
if (quizForm) {
  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enforceCheckboxLimit()) {
      alert("Pick at least one activity for Question 3.");
      return;
    }

    if (!quizForm.reportValidity()) {
      return;
    }

    const formData = new FormData(quizForm);
    const scores = {
      low_level: 0,
      ar_vr: 0,
      full_stack: 0,
      ml: 0
    };

    const addScore = (key, points = 1) => {
      scores[key] += points;
    };

    // Direct mappings for single-choice questions
    ["q1", "q2", "q5", "q7", "q8"].forEach((question) => {
      const value = formData.get(question);
      if (value) addScore(value, 2);
    });

    // Checkbox selections contribute 1 point each
    const q3Selections = formData.getAll("q3");
    q3Selections.forEach((value) => addScore(value, 1));

    // Slider logic spreads influence across the spectrum
    const sliderValue = Number(formData.get("q4") ?? 5);
    if (sliderValue >= 8) addScore("low_level", 2);
    else if (sliderValue >= 5) addScore("full_stack", 2);
    else if (sliderValue >= 3) addScore("ml", 2);
    else addScore("ar_vr", 2);

    // Numerical input emphasises ML but nudges others
    const statsComfort = Number(formData.get("q6"));
    if (statsComfort >= 4) addScore("ml", 2);
    if (statsComfort === 5) addScore("low_level", 1);
    if (statsComfort >= 3) addScore("full_stack", 1);
    if (statsComfort <= 2) addScore("ar_vr", 1);

    // Datalist question maps famous figures to categories
    const q9Value = (formData.get("q9") || "").trim();
    const trailblazerMap = {
      "Ada Lovelace": "low_level",
      "Palmer Luckey": "ar_vr",
      "Margaret Hamilton": "full_stack",
      "Fei-Fei Li": "ml"
    };
    if (trailblazerMap[q9Value]) {
      addScore(trailblazerMap[q9Value], 2);
    }

    // Determine top category and render results
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [winningKey, winningScore] = sorted[0];
    const profile = profiles[winningKey];

    const resultTitle = document.getElementById("result-title");
    const resultReason = document.getElementById("result-reason");
    const actionsList = document.getElementById("result-actions");
    const momentumMeter = document.getElementById("momentum-meter");
    const resourceTitle = document.getElementById("resource-title");
    const resourceBody = document.getElementById("resource-body");
    const resourceLink = document.getElementById("resource-link");
    const progressRing = document.querySelector(".progress-ring");

    const name = formData.get("studentName") || "Explorer";
    resultTitle.textContent = `${name}, ${profile.title} shines brightest`;
    resultReason.textContent = profile.reason;

    actionsList.innerHTML = "";
    profile.actions.forEach((action) => {
      const li = document.createElement("li");
      li.textContent = action;
      actionsList.appendChild(li);
    });

    resourceTitle.textContent = profile.resource.title;
    resourceBody.textContent = profile.resource.body;
    resourceLink.textContent = "Open Resource";
    resourceLink.href = profile.resource.link;

    // Momentum meter uses a rough theoretical max to show progress
    const theoreticalMax = 17;
    const momentumPercent = Math.min(
      100,
      Math.round((winningScore / theoreticalMax) * 100)
    );
    momentumMeter.textContent = `${momentumPercent}% focus alignment`;

    if (progressRing) {
      const angle = momentumPercent * 3.6;
      progressRing.style.background = `conic-gradient(var(--green) ${angle}deg, rgba(17,199,96,0.2) ${angle}deg)`;
    }

    resultsSection?.removeAttribute("hidden");
    resultsSection?.scrollIntoView({ behavior: "smooth" });
  });
}

// Simple contact form handler provides quick feedback client-side
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    alert("Thanks! We will reach out soon.");
    contactForm.reset();
  });
}
