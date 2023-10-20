# Project Name
Save the Universe
(SBA-308)

## Project Details

A CourseInfo object:
{
  "id": number,
  "name": string,
}

An AssignmentGroup object:
{
  "id": number,
  "name": string,
  // the ID of the course the assignment group belongs to
  "course_id": number,
  // the percentage weight of the entire assignment group
  "group_weight": number,
  "assignments": [AssignmentInfo],
}

Each AssignmentInfo object within the assignments array:
{
  "id": number,
  "name": string,
  // the due date for the assignment
  "due_at": Date string,
  // the maximum points possible for the assignment
  "points_possible": number,
}

An array of LearnerSubmission objects:
{
    "learner_id": number,
    "assignment_id": number,
    "submission": {
      "submitted_at": Date string,
      "score": number
    }
}

The goal is to analyze and transform this data such that the output of the program is an array of objects each containing the following information, in the following format:
{
     the ID of the learner for which this data has been collected
    "id": number,
     the learner’s total, weighted average, in which assignments
     with more points_possible should be counted for more
     e.g. a learner with 50/100 on one assignment and 190/200 on another
     would have a weighted average score of 240/300 = 80%.
    "avg": number,
     each assignment should have a key with its ID,
     and the value associated with it should be the percentage that
     the learner scored on the assignment (submission.score / points_possible)
    <assignment_id>: number,
     if an assignment is not yet due, it should not be included in either
     the average or the keyed dictionary of scores
}
## Project Screenshots

# Clone the repository
git clone https://github.com/Jhansisridevi/SBA-308.git

# Change to the project directory
cd SBA-308

# Install dependencies

You will need node and npm installed globally on your machine.

Installation:

npm install

To Run Test Suite:

npm test

To Start Server:

npm start

To Visit App:

localhost:3000/ideas