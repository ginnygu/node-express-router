const express = require("express");
const router = express.Router();

let teamArray = [
  { id: 1, teamName: "lakers" },
  { id: 2, teamName: "knicks" },
  { id: 3, teamName: "nets" },
];

router.get("/", function (req, res) {
  //res.render("index");
  //if query exists return the target data
  //otherwise return the entire teamArray
  let foundTeam = null;
  if (Object.keys(req.query).length === 0) {
    res.json(teamArray);
  } else {
    teamArray.forEach((team) => {
      if (team.teamName === req.query.team) {
        foundTeam = team;
      }
    });

    if (!foundTeam) {
      return res.send("Team not found, please check your spelling");
    } else {
      return res.json({ foundTeam });
    }
  }
});

router.get("/get-team-array", function (req, res) {
  res.json({ teamArray });
});
//Using the params to query the teamArray object
//if the param id is 1, your code should return {id: 1, teamName: lakers}
router.get("/get-team-by-params-id/:id", function (req, res) {
  let foundTeam;

  teamArray.forEach((team) => {
    console.log(team.id, req.params.id);
    if (team.id === +req.params.id) {
      foundTeam = team;
    }
  });

  res.json({ foundTeam, id: req.params.id });
});

router.get("/get-team-by-params-name/:name", function (req, res) {
  let foundTeam;

  teamArray.forEach((team) => {
    if (team.teamName === req.params.name.toLowerCase()) {
      foundTeam = team;
    }
  });

  res.json({ foundTeam, name: req.params.name });
});

router.post("/", function (req, res) {
  //res.send("post path!");
  console.log(req.body);
  teamArray.push(req.body);
  res.json({ team: teamArray });
  //res.json(teamArray);
});

//delete  - using params /:dynamic to delete a team in the teamAarray. If successfully deleted the team the user should see
//team deleted message and return the current teamArray
//if team doesnt exists, tell the user "Team does not exisits, please check your spelling"

router.delete("/delete-by-id/:id", function (req, res) {
  let foundTeam = null;
  teamArray.forEach((item, index) => {
    if (item.id === +req.params.id) {
      foundTeam = item;
      teamArray.splice(index, 1);
    }
  });

  if (!foundTeam) {
    res.send("Pleasea check your spelling! Team does not exists");
  } else {
    res.json({ teamArray, foundTeam });
  }

  // let foundTeamArray = teamArray.filter((item) => item.id === +req.params.id);
});

router.put("/update-by-name/:teamName", function (req, res) {
  let foundTeam = null;

  teamArray.forEach((item) => {
    if (item.teamName === req.params.teamName) {
      item.teamName = req.body.newTeamName;
      foundTeam = true;
    }
  });

  if (!foundTeam) {
    res.send("Pleasea check your spelling! Team does not exists");
  } else {
    res.json({ teamArray });
  }
});

//put - update using params /:dynamic to update the team name
//if update successfully return the newly updated team object and the entire teamArray
//if team doesnt exists, tell the user "Team does not exisits, please check your spelling"

module.exports = router;
