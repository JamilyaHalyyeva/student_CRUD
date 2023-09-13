import inquirer from "inquirer";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";
import fs from "fs";

export default async function updateData(info) {
  dbFileCheck();

  try {
    const answer = await inquirer.prompt([
      { type: "input", name: "id", message: "Please enter  user id " },
    ]);


    let user;
    let isAMatch=false;
    info.forEach((element) => {
      if (element.id === answer.id) {
        user = element;
        isAMatch=true;
        updateDetails(user, info);
      }
      
    });
    if (!isAMatch) {
        console.log(`${answer.id} has no match`);
    }
    

   
  } catch (error) {
    console.log("Something went wrong ", error);
  }
}

async function updateDetails(user, info) {
  try {
    const response = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        default: user.name,
        message: "Please enter your Name",
      },
      {
        type: "input",
        name: "surname",
        default: user.surname,
        message: "Please enter your Surname",
      },
      {
        type: "number",
        name: "phone",
        default: user.phone,
        message: "Please enter your Phone Number",
      },
      {
        type: "list",
        name: "age",
        default: user.age,
        message: "Are you older than 18 years ",
        choices: [
          { name: "Yes ", value: "Adult" },
          { name: "No", value: "Minor" },
        ],
      },
    ]);

    user.name=response.name;
    user.surname=response.surname;
    user.age=response.age;
    user.phone=response.phone;

    await fs.writeFile("db.json", JSON.stringify(info), function(error){
if (error) {
    console.log("Error Updating Database");
}
 console.log("User updated successfully");
    });


  } catch (error) {
    console.log("Something went wrong ", error);
  }
}
queryDB(updateData);
