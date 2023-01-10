// Import necessary libraries
import { getJiraIssues, submitPullRequest } from './jira-bitbucket-api';

// define the initial state of the game
let state = {
  players: [],
  tasks: [],
  currentTaskIndex: 0,
  leaderboard: []
}

// function to add new player to the game
function addPlayer(playerName) {
  state.players.push({ name: playerName, score: 0, completedTasks: [] });
}

// function to add tasks to the game
function addTask(taskName, taskData) {
  state.tasks.push({ name: taskName, data: taskData });
}

// function to start the game
function startGame() {
  state.currentTaskIndex = 0;
  state.players.forEach(player => {
    player.score = 0;
    player.completedTasks = [];
  });
}

// function to submit a task
function submitTask(playerName, taskName, taskData) {
  // find the player
  let player = state.players.find(player => player.name === playerName);
  
  // find the task
  let task
  if (task) {
    // check if the task has already been completed by the player
    if (player.completedTasks.includes(task.name)) {
      console.log(`Task ${task.name} has already been completed by ${playerName}`);
      return;
    }
  
    // check if the task data is correct
    let isDataCorrect = checkTaskData(task, taskData);
  
    if (isDataCorrect) {
      player.score += task.points;
      player.completedTasks.push(task.name);
      console.log(`Task ${task.name} has been completed by ${playerName} and earned ${task.points} points.`);
  
      // check if this is the last task, if yes, the game is over
      if (state.currentTaskIndex === state.tasks.length - 1) {
        console.log("Game Over!")
        // update the leaderboard
        updateLeaderboard();
      } else {
        state.currentTaskIndex++;
      }
    } else {
      console.log(`Task ${task.name} has been submitted by ${playerName} but the data is incorrect.`);
    }
  } else {
    console.log(`Task ${taskName} not found.`);
  }
  

  function submitTask(playerName, taskName, taskData) {
    // find the player
    let player = state.players.find(player => player.name === playerName);
    
    // find the task
    let task = state.tasks.find(task => task.name === taskName);
    
    // check if the task has already been completed by the player
    if (player.completedTasks.includes(taskName)) {
      console.log(`Task ${taskName} has already been completed by ${playerName}`);
      return;
    }
    
    // check if the task data is correct
    let isDataCorrect = checkTaskData(task, taskData);
    
    if (isDataCorrect) {
      player.score += task.points;
      player.completedTasks.push(taskName);
      console.log(`Task ${taskName} has been completed by ${playerName} and earned ${task.points} points.`);
    } else {
      console.log(`Task ${taskName} has been submitted by ${playerName} but the data is incorrect.`);
    }
    
    // update the leaderboard
    updateLeaderboard();
  }
  // function to check if the task data is correct
function checkTaskData(task, taskData) {
  // code to check if the taskData is correct goes here
  // Example:
  if (task.data === taskData) {
    return true;
  }
  return false;
}

// function to update leaderboard
function updateLeaderboard() {
  state.leaderboard = state.players.sort((a, b) => b.score - a.score);
}

// function to get the leaderboard
function getLeaderboard() {
  return state.leaderboard;
}
} 
