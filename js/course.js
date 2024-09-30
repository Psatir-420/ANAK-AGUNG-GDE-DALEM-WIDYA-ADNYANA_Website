const categorySelect = document.getElementById('category');
const courseList = document.getElementById('course-list');
let delay = 200

function fadeInWithDelay(card, delay) {
    setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease-in-out';
        card.style.opacity = 1;
    }, delay);
}
// Fetch course data from JSON file
fetch('../db/course.json')
    .then(response => response.json())
    .then(courses => { 

        // Function to display courses 
        function displayCourses(coursesToDisplay) {
            courseList.innerHTML = ''; // Clear previous courses

            coursesToDisplay.forEach(course => {
                // Create course card element
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card');
                courseCard.style.opacity = 0;
                courseCard.style.transform = 'translateY(10px)'; 

                // Set data-href attribute (adjust dynamically based on your course data)
                courseCard.setAttribute('data-href', `../courses/${course.title.toLowerCase().replace(/\s+/g, '-')}.html`); 

                // Build inner HTML of course card
                courseCard.innerHTML = `
                    <div class="course-image">
                        <img src="../assets/img/${course.title.toLowerCase().replace(/\s+/g, '-')}.png" alt="${course.title}" data-href="../courses/${course.title.toLowerCase().replace(/\s+/g, '-')}.html"> 
                    </div>
                    <div class="course-text">
                        <h4>${course.title}</h4>
                        <p>${course.description}</p>
                    </div>
                `;

                courseList.appendChild(courseCard);
                fadeInWithDelay(courseCard, delay);
                delay += 100;
            });
        }


        // Event listener for category filter
        categorySelect.addEventListener('change', () => {
            const selectedCategory = categorySelect.value;
            const filteredCourses = (selectedCategory === 'all') 
                ? courses 
                : courses.filter(course => course.category === selectedCategory);

            displayCourses(filteredCourses);
        });

        // Initial display of all courses
        displayCourses(courses); 

    })
    .catch(error => console.error('Error fetching courses:', error));
