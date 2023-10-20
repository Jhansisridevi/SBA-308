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
  //Adding test case to check exception on course_id
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
  //console.log(subDate );
  //console.log(dueDate);
  if (subDate > dueDate) {
    //console.log("Inside if");
    //options for validating 10%
    submission.score -= 0.1 * assignment.points_possible;
  }
}
function validateAssignmentGroup(assignmentGroup, courseInfo) {
  if (assignmentGroup.course_id !== courseInfo.id) {
    throw new Error("Assignment Group doesn't belong to the specified course.");
  }
}
function validateCourse(assignmentGroup, courseInfo) {
  if (assignmentGroup.course_id !== courseInfo.id) {
    throw new Error(
      `Assignment Group "${assignmentGroup.name}" ID: ${assignmentGroup.id} Course ID: ${assignmentGroup.course_id} does not belong to course "${courseInfo.name}" ID: ${courseInfo.id}`
    );
  }
  return true;
}
try {
  validateCourse(AssignmentGroup, CourseInfo);
  //console.log("Assignment Group is valid.");
} catch (error) {
  console.error(error.message);
}
function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  const result = [];
  const assignmentScores = {};
  let totalPoints = 0;
  const assignmentData = {};
  assignmentGroup.assignments.forEach((assignment) => {
    assignmentData[assignment.id] = {
      name: assignment.name,
      points_possible: assignment.points_possible,
      due_at: new Date(assignment.due_at),
    };
  });
  //console.log(assignmentData);
  const learnerIds = [
    ...new Set(learnerSubmissions.map((submission) => submission.learner_id)),
  ]; //to store unique values, considering id to be primitive
  //console.log(learnerIds);
  for (const learnerId of learnerIds) {
    const learnerData = {
      id: learnerId,
      avg: 0,
    };
    for (const assignment of assignmentGroup.assignments) {
      const submission = learnerSubmissions.find(
        (sub) =>
          sub.assignment_id === assignment.id && sub.learner_id === learnerId
      );
      if (!submission) {
        continue;
      }
      const dueDate = new Date(assignment.due_at);
      const subDate = new Date(submission.submission.submitted_at);
      if (new Date(submission.submitted_at) < dueDate) {
        //submissionDate validation
        continue;
      }
      if (dueDate > new Date()) {
        break;
        //console.log("Due not now")
      }
      validateLearnerSubmission(
        submission.submission,
        subDate,
        assignment,
        dueDate
      );
      assignmentScores[assignment.id] =
        submission.submission.score / assignment.points_possible;
      //console.log("Here: "+assignmentScores[assignment.id]);
      totalPoints += assignmentData[assignment.id].points_possible;
      //console.log("Total points: "+totalPoints);
      const totalWeightedScore = Object.values(assignmentScores).reduce(
        (total, score) => total + score,
        0
      );
      assignmentGroup.assignments.forEach((assignment) => {
        const assignmentId = assignment.id;
        const assignmentScore = assignmentScores[assignment.id];
        if (assignmentScore) {
          learnerData[assignmentId] = assignmentScore;
          //(assignmentScore / assignmentData[assignmentId].points_possible) * 100;
          //console.log("Learner info: "+assignmentId+"-"+learnerData[assignmentId]);
        }
        if (totalPoints === 0) {
          //validating to be changed when the try catch handles assignment-courses
          learnerData.avg = 0;
        } else {
          learnerData.avg = (totalWeightedScore / totalPoints) * 100;
          //console.log(Math.round(learnerData.avg)); - needs change
        }
      });
    }
    result.push(learnerData);
  }
  return result;
}
const learnerData = getLearnerData(
  CourseInfo,
  AssignmentGroup,
  LearnerSubmissions
);
console.log(learnerData);
