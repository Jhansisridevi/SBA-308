const CourseInfo = {
  id: 451,
  name: 13, //"Introduction to JavaScript" test case for handling exception 
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
  //Adding test case to check exception on course-id
  id: 12346,
  name: "JavaScript Callbacks",
  course_id: 452,
  group_weight: 26,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
  ],
};
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];
function validateCourse(assignmentGroup, courseInfo) {
  if (assignmentGroup.course_id !== courseInfo.id) {
    throw new Error(
      `Assignment Group "${assignmentGroup.name}" ID: ${assignmentGroup.id} Course ID: ${assignmentGroup.course_id} does not belong to course "${courseInfo.name}" ID: ${courseInfo.id}`
    );
  }
  return true;
}
function validateCourseInfo(courseInfo) {
  if (
    typeof courseInfo.id !== "number" ||
    typeof courseInfo.name !== "string"
  ) {
    throw new Error("Course Info invalid");
  }
}
try {
  validateCourseInfo(CourseInfo);
  validateCourse(AssignmentGroup, CourseInfo);
  console.log("Valid assignment group");
} catch (error) {
  console.error(error.message);
}

//  function calculateScores(course, assignmentGroup, submissions) {

// const assignmentScores = {};
// for(const assignment of assignmentGroup.assignments){
//     const submission = submissions.find(sub => sub.assignment_id === assignment.id);
//    console.log(submission);
//    const dueDate = new Date(assignment.due_at);
//    const submittedDate = new Date(submission.submission.submitted_at);
//    console.log(dueDate);
//    console.log(submittedDate);
//    }
// }}
// calculateScores(CourseInfo,AssignmentGroup,LearnerSubmissions);
