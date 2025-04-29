/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// === Helper Functions ===
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomRate(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createFreelancer() {
  return {
    name: getRandomElement(NAMES),
    occupation: getRandomElement(OCCUPATIONS),
    rate: getRandomRate(PRICE_RANGE.min, PRICE_RANGE.max),
  };
}

// === State Initialization ===
const state = {
  freelancers: Array.from({ length: NUM_FREELANCERS }, createFreelancer),
  averageRate: 0,
};

function calculateAverageRate(freelancers) {
  const totalRate = freelancers.reduce(
    (sum, freelancer) => sum + freelancer.rate,
    0
  );
  return totalRate / freelancers.length;
}

state.averageRate = calculateAverageRate(state.freelancers);

// === Component Functions ===
function FreelancerComponent({ name, occupation, rate }) {
  return `<tr>
                <td>${name}</td>
                <td>${occupation}</td>
                <td>$${rate}/hr</td>
            </tr>`;
}

function FreelancersComponent(freelancers) {
  return `<table class="freelancers">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Occupation</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    ${freelancers
                      .map(
                        (freelancer) =>
                          `<tr>
                                    <td>${freelancer.name}</td>
                                    <td>${freelancer.occupation}</td>
                                    <td>$${freelancer.rate}/hr</td>
                                </tr>`
                      )
                      .join("")}
                </tbody>
            </table>`;
}

function AverageRateComponent(averageRate) {
  return `<div class="average-rate">
                <h2>Average Rate: $${averageRate.toFixed(2)}/hr</h2>
            </div>`;
}

// === Render Function ===
function render() {
  const app = document.getElementById("app");
  app.innerHTML = `
        ${FreelancersComponent(state.freelancers)}
        ${AverageRateComponent(state.averageRate)}
    `;
}

render();
