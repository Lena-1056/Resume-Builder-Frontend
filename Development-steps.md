## Section 1: Initial Project Setup & UI Foundation

**Step 1:** Initialize the project using **Vite + React (SWC)** and set up the directory structure.

**Step 2:** Configure **Tailwind CSS** with design tokens.
- Add primary/secondary color schemes.
- Implement glassmorphism and custom scrollbar utilities in `index.css`.

**Step 3:** Install core dependencies:
- `axios` (API requests)
- `zustand` (State management)
- `react-hot-toast` (Notifications)
- `lucide-react` (Icons)
- `html2pdf.js` (PDF export)

**Step 4:** Set up **React Router DOM** for navigation.
- Implement a `ProtectedRoute` component to handle restricted access to the Dashboard and Resume Builder.

---

## Section 2: State Management & API Integration

**Step 1:** Implement the **Auth Store (`authStore.js`)**.
- Handle JWT tokens, user data, and persist session to `localStorage`.
- Manage common auth actions: `login`, `register`, `logout`, and token verification status.

**Step 2:** Implement the **Resume Store (`resumeStore.js`)**.
- Create a centralized state for the resume currently being edited.
- Implement `setResumeData` and logic for tracking whether a draft is saved.

**Step 3:** Configure **Axios (`services/api.js`)**.
- Create a global instance with the backend base URL (`http://localhost:9090`).
- Implement a **Request Interceptor** to automatically attach the Bearer token.
- Implement a **Response Interceptor** to handle 401 Unauthorized errors by clearing local storage and redirecting.

---

## Section 3: Authentication System

**Step 1:** Create `EmailVerification.jsx`.
- Accept the verification token from the URL.
- Call the backend verification API and provide visual feedback to the user upon success or failure.

**Step 2:** Build the `AuthModal.jsx`.
- Implement a unified modal for both **Login** and **Register**.
- Integrate with `authStore` to perform API calls and update global state.
- Show success/error notifications via `react-hot-toast`.

**Step 3:** Create the Landing Page (`Home.jsx`).
- Featuring a modern hero section that opens the Auth Modal for new users.

---

## Section 4: Multi-Step Resume Builder (Wizard)

**Step 1:** Implement the `ResumeBuilder.jsx` layout.
- Create a split-screen design: Left for Editor (Form) and Right for Live Preview.
- Add a top navbar for document title, saving status, and export buttons.

**Step 2:** Develop the **7-Step Wizard** logic.
- **Step 1:** Profile Information (Full Name, Designation, Summary).
- **Step 2:** Work Experience (Company, Role, Description).
- **Step 3:** Skills (Name and Proficiency Level).
- **Step 4:** Projects (Title, Description, GitHub, Live Demo).
- **Step 5:** Education (Degree, Institution, Dates).
- **Step 6:** Certifications (Title, Issuer, Year).
- **Step 7:** Interests (Simple tagging/listing).

**Step 3:** Implement the `ColorPicker` component.
- Allow users to dynamically change the primary theme color of their resume.

**Step 4:** Handle draft persistence.
- Implement logic to `POST` new resumes or `PUT` updates as the user progresses through the steps.

---

## Section 5: Real-Time A4 Preview & Export

**Step 1:** Build the `A4Preview.jsx` component.
- Carefully style using CSS to match precise A4 dimensions (210mm x 297mm).
- Use `forwardRef` to allow external tools (like the PDF generator) to target the DOM.
- Map the global `resumeData` from the store to the preview layout in real-time.

**Step 2:** Implement **PDF Export**.
- Use **html2pdf.js** to capture the `A4Preview` DOM.
- Configure PDF options: A4 format, high quality (JPEG 0.98), and device scaling.

**Step 3:** Implement scaling logic.
- Ensure the preview panel can fit on smaller resolutions by using CSS `scale()` while maintaining the internal A4 proportions for the generator.

---

## Section 6: Resume Distribution Features

**Step 1:** Implementation of the **Dashboard (`Dashboard.jsx`)**.
- Fetch and display the user's saved resumes in a responsive card grid.
- Provide Quick Actions: Edit, Delete, and Download.

**Step 2:** Build the `EmailResumeModal.jsx`.
- Allow users to enter a recipient's email address.
- Create a helper to generate a **PDF Blob** from the preview DOM on the fly.
- Send the PDF blob to the backend's `/api/email/send-resume` endpoint using `FormData`.

**Step 3:** Final Polishing.
- Add transition animations via CSS and `framer-motion` for a premium, snappy feel.
