"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // (completed) Giancarlo TODO: search by traits
      searchResults = searchByTraits(people);
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }
  //person is an Array of objects [{...}]
  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      // Craig DONE: get person's info
      // create function to print out person info
      displayPerson(person[0], people)
      break;
    case "family":
      // Craig TODO: get person's family
      //create a function to print out persons family 
      break;
    case "descendants":
      // Craig TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);


  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;

    }
    else {
      return false;
    }
  })
  // (completed) Giancarlo TODO: find the person using the name they entered
  return foundPerson;

}

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}



// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}



/***********************************************************
 * paired programming
************************************************************/

//(completed) searchByTraits() Giancarlo
function searchByTraits(people) {
  let gender = promptFor("What is the person's gender", chars); //string
  let height = promptFor("What is the person's height?", chars); //number
  let weight = promptFor("What is the person's weight", chars);//number
  let eyeColor = promptFor("What is the person's eye color", chars);//string

  let foundPerson = people.filter(function (person) {
    if (person.gender === gender && person.height == height && person.weight == weight && person.eyeColor == eyeColor) {
      return true;
    }
    else {
      return false;
    }
  })
  // (completed)Giancarlo TODO: find the person using the traits entered
  return foundPerson;
}


// display person information - Craig
function displayPerson(person, people) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "Name: " + person.firstName + " " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + retrievePersonName(person.parents[0], people) + ", " + retrievePersonName(person.parents[1], people) + "\n";
  personInfo += "Current Spouse: " + retrievePersonName(person.currentSpouse, people) + "\n";

  // Craig DONE: finish getting the rest of the information to display

  alert(personInfo);
}



// TODO - display a person's descendants
function displayDescendants() {
  
}



// TODO - display a person's family
function displayFamily() {
  
}



// perform person lookup using id - Craig
function lookupPersonByID(id, people) {
  let person = people.find(function (person) {
    if (person.id === id) {
      return person;
    } else {
      return undefined;
    }
  });
  console.log('selected: ', person);
  return person; // person
}


// return string containing person name
// from lookup - Craig
function retrievePersonName(id, people) {
  let person = lookupPersonByID(id, people);
  let name = "unknown";
  if (person) {
    name = person.firstName + " " + person.lastName;
  }
  console.log('retrieve: ', person);
  console.log(name);
  return name;
}


// lookup descendants by id ( children and grand children ) - Craig
function lookupDescendants(id, people) { //lookup (children, grand children, and great grand children )
  let offSpring = [];
  for (let i = 0; i < people.length; i++) {
    if (people[i].parents[0] === id || people[i].parents[1] === id) {
      offSpring.push({ person: people[i], relation: 'child' });
      for (let j = 0; j < people.length; j++) {
        if (people[j].parents[0] === offSpring[offSpring.length - 1].person.id || people[j].parents[1] === offSpring[offSpring.length - 1].person.id) {
          offSpring.push({ person: people[j], relation: 'grand-child' });
          for (let k = 0; k < people.length; k++) {
            if (people[k].parents[0] === offSpring[offSpring.length - 1].person.id || people[k].parents[1] === offSpring[offSpring.length - 1].person.id) {
              offSpring.push({ person: people[k], relation: 'great-grand-child' });
            }
          }

        }
      }
    }
  }
  return offSpring; // array of object
}


// lookup siblings by id - Craig
function lookupSiblings(id, people) {
  let siblings = [];
  let person = lookupPersonByID(id, people);
  let found = false;
  if (person.parents.length != 0) {
    for (let i = 0; i < people.length; i++) {
      if ((person.parents[0] === people[i].parents[0] || person.parents[0] === people[i].parents[1]) && people[i].id != id) {
        found = true;
      } else if ((person.parents[1] === people[i].parents[0] || person.parents[0] === people[i].parents[1]) && people[i].id != id) {
        found = true;
      } else {
        found = false;
      }
      found ? siblings.push(people[i]) : siblings // append sibling
    }
  }
  return siblings;
}


// entire family matrix for selected person - Craig
function familyPerson(id, people) {
	let person;
	let parent1 = {};
	let parent2 = {};
	let descendants = [];
	let siblings = [];
	let currentSpouseDetails = {};

	person = lookupPersonByID(id, people);
	parent1 = lookupPersonByID(person.parents[0], people);
	parent2 = lookupPersonByID(person.parents[1], people);
	descendants = lookupDescendants(id, people);
	siblings = lookupSiblings(id, people)
	spouseDetails = lookupPersonByID(person.currentSpouse, people);
	return { ...person, descendants, siblings, currentSpouseDetails, parent1, parent2 };
}

