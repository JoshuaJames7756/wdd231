// Course data array based on certificate requirements from Brigham Young University-Idaho
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', completed: true },
    { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 2, certificate: 'Web and Computer Programming', completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 2, certificate: 'Web and Computer Programming', completed: false }
];

const courseContainer = document.getElementById('courseContainer');
const totalCreditsSpan = document.getElementById('totalCredits');

// Render course components onto the layout view dynamically
function displayCourses(filteredCourses) {
    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        
        // Append specific styling selectors if item completion status is marked true
        if (course.completed) {
            card.classList.add('completed');
        }

        card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        courseContainer.appendChild(card);
    });

    // Accumulate total layout credit hours utilizing the array reduce processing function
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

// Button click listener mappings to control display arrays
document.getElementById('btnAll').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses);
});

document.getElementById('btnWdd').addEventListener('click', (e) => {
    setActiveButton(e.target);
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

document.getElementById('btnCse').addEventListener('click', (e) => {
    setActiveButton(e.target);
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

// Configure active styling indicators for selection paths
function setActiveButton(activeBtn) {
    document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Trigger initialization run
displayCourses(courses);