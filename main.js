const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript", // 13 "Introduction to JavaScript" test case for handling exception
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
  //   id: 12346,
  //   name: "JavaScript Callbacks",
  //   course_id: 452,
  //   group_weight: 26,
  //   assignments: [
  //     {
  //       id: 1,
  //       name: "Declare a Variable",
  //       due_at: "2023-01-25",
  //       points_possible: 50,
  //     },
  //   ],
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
  //   test case for invalid date
  //   {
  //     learner_id: 126,
  //     assignment_id: 1,
  //     submission: {
  //       submitted_at: "202301-25",
  //       score: 49,
  //     },
  //   },
];

function validateLearnerSubmission(submission, subDate, assignment, dueDate) {
  if (
    typeof submission.score !== "number" ||
    typeof submission.submitted_at !== "string"
  ) {
    throw new Error("Invalid submission data.");
  }
  console.log(subDate);
  console.log(dueDate);
  if (subDate > dueDate) {
    //console.log("Inside if");
    //options for validating 10%
    submission.score -= 0.1 * assignment.points_possible;
  }
}
function validateCourse(assignmentGroup, courseInfo) {
  if (assignmentGroup.course_id !== courseInfo.id) {
    throw new Error(
      `Assignment Group "${assignmentGroup.name}" ID: ${assignmentGroup.id} Course ID: ${assignmentGroup.course_id} does not belong to course "${courseInfo.name}" ID: ${courseInfo.id}`
    );
  }
  const result = getLearnerData(
    CourseInfo,
    AssignmentGroup,
    LearnerSubmissions
  );
  return true;
}
try {
  validateCourse(AssignmentGroup, CourseInfo);
  console.log("Assignment Group is valid.");
} catch (error) {
  console.error(error.message);
}
//function calculateScores(course, assignmentGroup, submissions){}
//console.log(result);

function getLearnerData(
  CourseInfo,
  AssignmentGroup,
  LearnerSubmissions,
  learnerId
) {
  try {
    const assignmentScores = calculateScores(
      learnerId,
      AssignmentGroup,
      LearnerSubmissions
    );
    console.log(assignmentScores);
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}
// const learnerId = 132; provided learner id
//
try {
  const result = getLearnerData(
    CourseInfo,
    AssignmentGroup,
    LearnerSubmissions,
    learnerId
  );
  console.log(result);
} catch (error) {}

/*
return {
    id: learnerId,
    weightedAvg,
    ...assignmentScores,
  };
  */
