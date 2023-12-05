# API document
## search.js
Code location: src/api/search.js

get all users in a class as a sorted list

address: "/api/search?email=" + email + "&classID=" + classID

return: a list of users with all information

## addClass.js
Overview
The addClass function allows users to join an existing class or create a new one in our system. By providing class details and your email, you can easily be added to a class's member list.

How to Access
Location: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/addClass.js
Method: POST
Required Headers: Content-Type: application/json


Request Format:

title: Title of the class (String)
subtitle: Subtitle of the class (String)
email: Your email address (String)

Response:

A successful request will return details of the class you've joined or created, along with a success message.
In case of an error, you will receive an error message with a description of the issue.

File Structure
Location: /api/addClass.js
Dependencies: @prisma/client

Function Implementation

Purpose: Adds a user to a class. If the class doesn't exist, it creates a new class.

Parameters:

req: The request object, containing title, subtitle, and email.
res: The response object used to send back the result.


Checks if a class with the provided title and subtitle exists.
If yes, adds the user to the class's member list.
If no, creates a new class with the user as a member.
Updates the user's list of classes.
Error Handling: Returns a 500 status code with an error message in case of exceptions.

Database Schema
Interacts with two tables:

class: Stores class details.
entry: Stores user entries, including classes joined.

## createProject.js
Overview
The createProject function enables users to create a new project or group for a specific class. This function ensures that a user can only own one project per class and cannot be a member of multiple projects within the same class.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/createProject 
Method: POST
Required Headers: Content-Type: application/json

Request Format:

classID: ID of the class (String)
title: Title of the project (String)
groupName: Name of the group (String)
description: Description of the project (String)
email: Your email address (String)

Response:
A successful request will return details of the created project and a success message.
In case of an error, you will receive an error message with a description of the issue.

File Structure
Location: /api/createProject.js
Dependencies: @prisma/client

Purpose: Creates a new project/group for a specific class, ensuring the user is not already a project owner or member in the same class.

Inputs:
req: The request object containing classID, title, groupName, description, and email.
res: The response object for returning data or messages.
Core Logic:
Validates that the user is not already a project owner/member in the class.
Creates a new project and group, linking them to the class and user.
Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
project: Table for project details.
class: Table for class details.
group: Table for group details.
entry: Table for user entries.

## deleteProject.js
Overview
The deleteProject function enables the owner of a project to delete it. This operation will remove the project from the system and dissociate any linked members from it.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/deleteProject  
Method: DELETE
Required Headers: Content-Type: application/json

Request Format:

email: Email of the project owner (String)
projectID: ID of the project to be deleted (String)
classID: ID of the class related to the project (String)

Response:
A successful request will return a confirmation message.
If the project is not found, or the requester is not the owner, an error message will be returned.

File Structure
Location: /api/deleteProject.js
Dependencies: @prisma/client

Purpose: Deletes a specified project from the database, only if the requestor is the project owner.
Inputs:
req: The request object containing email, projectID, and classID.
res: The response object for returning data or messages.

Validates the existence of the project and ownership.
Dissociates group members and deletes the project.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
project: Table for project details.
entry: Table for user entries and their group affiliations.

## get-inbox.js
Overview
The get-inbox function allows users to retrieve their inbox messages. This API endpoint supports pagination, enabling users to fetch messages in manageable batches.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/get-inbox
Method: GET
Required Headers: None

Query Parameters:

recipientEmail: Email of the recipient whose messages are being fetched (String)
page: Page number for pagination (Integer, optional, default is 0)
limit: Number of messages to retrieve per page (Integer, optional, default is 10)

File Structure
Location: /api/get-inbox.js
Dependencies: @prisma/client

Purpose: Fetches a paginated list of inbox messages for a specific recipient.
Inputs:
req: The request object containing recipientEmail, page, and limit.
res: The response object for returning data or messages.


Validates the request method.
Retrieves a specified number of messages for the given recipient, including sender information.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
message: Table for message details.
sender: Linked entity providing sender details.

## get-sent-messages.js
Overview
The get-sent-messages function allows users to retrieve messages they have sent. This API endpoint supports pagination, enabling users to access their sent messages in batches for easier navigation and management.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/get-sent-messages
Method: GET
Required Headers: None

Query Parameters:

senderEmail: Email of the sender whose messages are being fetched (String)
page: Page number for pagination (Integer, optional, default is 0)
limit: Number of messages to retrieve per page (Integer, optional, default is 10)

Response:
A successful request will return a list of sent messages, including recipient information, ordered by creation date in descending order.
In case of an error, a relevant error message will be provided.

File Structure
Location: /api/get-sent-messages.js
Dependencies: @prisma/client

Purpose: Fetches a paginated list of sent messages for a specific sender.
Inputs:
req: The request object containing senderEmail, page, and limit.
res: The response object for returning data or messages.

Validates the request method.
Retrieves a specified number of sent messages for the given sender, including recipient information.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
message: Table for message details.
recipient: Linked entity providing recipient details.

## getClasses.js
How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/getClasses
Method: POST
Required Headers: Content-Type: application/json

Request Format:

email: Email of the user whose class memberships are being fetched (String)

Response
A successful request will return an array of classes, including member information for each class.
If the user is not a member of any classes, an empty array is returned.
In case of an error, an error message will be provided.

File Structure
Location: /api/getClasses.js
Dependencies: @prisma/client

Purpose: Retrieves a list of classes that a specific user is a member of.
Inputs:
req: The request object containing the user's email.
res: The response object for returning data or messages.

Validates the request method.
Fetches and returns the classes associated with the provided email.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
entry: Table for user entries.
classes: Linked table containing class details and members.

## getClassPreferences.js
Overview
The getClassPreferences function is designed to fetch a user's preferences for a specific class. If no preferences are set, it defaults them to preset values.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/getClassPreferences
Method: POST
Required Headers: Content-Type: application/json

Request Format:

email: Email of the user (String)
classID: ID of the class (String)

Response
If preferences exist, the request will return those preferences.
If no preferences are set, default preferences are created and returned.
In case of an error, an error message will be provided.

File Structure
Location: /api/getClassPreferences.js
Dependencies: Custom module ../src/prismaAPI.js, @prisma/client

Purpose: Retrieves or sets default class preferences for a user.
Inputs:
req: The request object containing the user's email and classID.
res: The response object for returning data or messages.

Fetches the user's ID based on the provided email.
Retrieves existing class preferences or sets default ones if none exist.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
entry: Table for user entries.
classPreferences: Table containing class preferences for users.

## getClassSubtitle
Overview
The getClassSubtitle function allows users to retrieve the subtitle of a class using its unique identifier. This function is useful for users seeking specific information about a class they are interested in or enrolled in.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/getClassSubtitle
Method: POST
Required Headers: Content-Type: application/json

Request Format:

classID: ID of the class (String)

Response
A successful request will return the subtitle of the specified class.
In case of an error, an error message will be provided.

File Structure
Location: /api/getClassSubtitle.js
Dependencies: @prisma/client

Purpose: Retrieves the subtitle of a class based on its ID.
Inputs:
req: The request object containing the classID.
res: The response object for returning the subtitle or an error message.

Validates the request method.
Queries the database to fetch the subtitle of the specified class.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
class: Table for class details.

## getProjects.js
Overview
The getProjects function is designed to retrieve a list of all projects associated with a specific class, including details about each project's group and owner.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/getProjects 
Method: POST
Required Headers: Content-Type: application/json

Request Format:

classID: ID of the class whose projects are being retrieved (String)

Response:
A successful request will return an array of projects, each including details about the project group and owner.
If no projects are found for the class, an empty array is returned.
In case of an error, an error message will be provided.

File Structure
Location: /api/getProjects.js
Dependencies: @prisma/client

Purpose: Fetches a list of projects for a given class, including details about the groups and owners of each project.
Inputs:
req: The request object containing classID.
res: The response object for returning the projects or an error message.

Validates the request method.
Queries the database to fetch all projects related to the given class.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
class: Table for class details.
projects: Linked table containing project details.

## getStablePreferences.js
Overview
The getStablePreferences function provides users with the ability to retrieve their stable preferences. These preferences are specific settings or choices a user has made that are stored in the system.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/getStablePreferences 
Method: GET
Required Headers: None

Query Parameters:

email: Email of the user whose stable preferences are being retrieved (String)

Response:
A successful request will return the stable preferences associated with the user's email.
If the user or preferences are not found, an appropriate error message will be returned.

File Structure
Location: /api/getStablePreferences.js
Dependencies: @prisma/client

Purpose: Fetches a user's stable preferences based on their email.
Inputs:
req: The request object containing the user's email.
res: The response object for returning the preferences or an error message.

Validates the request method and email parameter.
Queries the database to fetch the stable preferences for the user.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
entry: Table for user entries.
stablePreferences: Table containing user preferences.

## joinClass.js
Overview
The joinClass function enables users to join a specific class using a class code. It ensures that the class exists and that the user is not already a member of the class before adding them.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/joinClass 
Method: POST
Required Headers: Content-Type: application/json

Request Format:

email: Email of the user joining the class (String)
classID: ID of the class to join (String)

Response:
A successful request will return a confirmation message.
If the user is already a member of the class, or if the class does not exist, an error message will be returned.

File Structure
Location: /api/joinClass.js
Dependencies: @prisma/client

Purpose: Allows a user to join a class using a class code.
Inputs:
req: The request object containing the user's email and classID.
res: The response object for returning a success or error message.

Validates the class's existence and the user's non-membership in the class.
Updates the class's member list and the user's class list.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
class: Table for class details.
entry: Table for user entries.

## joinProject.js

Overview
The joinProject function enables users to join a project within a specific class. It checks that the user is not already a member of a project in that class and that they are not already part of the project they're attempting to join.

How to Access
Endpoint:  https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/joinProject 
Method: POST
Required Headers: Content-Type: application/json

Request Format:

email: Email of the user joining the project (String)
projectID: ID of the project to join (String)
classID: ID of the class that the project is a part of (String)

Response:
A successful request will return a confirmation message.
If the user is already a member of the project, or if they are in another project in the class, an error message will be returned.

File Structure
Location: /api/joinProject.js
Dependencies: @prisma/client

Purpose: Allows a user to join a specific project within a class.
Inputs:
req: The request object containing the user's email, projectID, and classID.
res: The response object for returning a success or error message.

Checks if the user is already in a project for the class or the specified project.
Updates the project's member list and the user's project list.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
class: Table for class details.
project: Table for project details.
entry: Table for user entries.

## leaveClass.js
Overview
The leaveClass function enables users to leave a class they have joined. This operation involves removing their association with the class in the system.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/leaveClass 
Method: POST
Required Headers: Content-Type: application/json

Request Format:

email: Email of the user leaving the class (String)
classID: ID of the class the user wishes to leave (String)

Response:
A successful request will return a confirmation message.
If the user is not a member of the class or the class does not exist, an error message will be returned.

File Structure
Location: /api/leaveClass.js
Dependencies: @prisma/client

Purpose: Allows a user to leave a class they are currently a member of.
Inputs:
req: The request object containing the user's email and classID.
res: The response object for returning a success or error message.

Checks if the user is a member of the class and then removes them from the class.
Updates the class's member list and the user's class list.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
class: Table for class details.
entry: Table for user entries.

## leaveProject.js
Overview
The leaveProject function enables users to leave a project they are a part of within a class. This API ensures that a user can leave a project unless they are the project owner, in which case they must delete the project instead.

Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/leaveProject 
Method: POST
Required Headers: Content-Type: application/json

Request Format:

email: Email of the user leaving the project (String)
projectID: ID of the project to leave (String)
classID: ID of the class that the project is a part of (String)

Response:
A successful request will return a confirmation message.
If the user is the owner of the project, an error message will be returned, instructing them to delete the project.

File Structure
Location: /api/leaveProject.js
Dependencies: @prisma/client

Purpose: Allows a user to leave a specific project within a class, unless they are the owner of the project.
Inputs:
req: The request object containing the user's email, projectID, and classID.
res: The response object for returning a success or error message.

Checks if the user is the owner of the project and then removes them from the project if they are not.
Updates the project's member list and the user's project list.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
class: Table for class details.
project: Table for project details.
entry: Table for user entries.

## login.js
Overview
The login function is designed to authenticate users based on their email and password. Upon successful authentication, it provides a JWT (JSON Web Token) for session management.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/login 
Method: POST
Required Headers: Content-Type: application/json

Request Format:

email: Email of the user (String)
password: Password of the user (String)

Response:
A successful login will return the user's email, name, and a JWT token.
If the email is not found or the password is incorrect, an error message will be returned.

File Structure
Location: /api/login.js
Dependencies: bcryptjs, jsonwebtoken, @prisma/client, Custom module ../src/prismaAPI.js

Purpose: Authenticates a user and provides a JWT upon successful login.
Inputs:
req: The request object containing the user's email and password.
res: The response object for returning the token or an error message.

Validates the provided email and password against the database.
Uses bcrypt to compare the hashed password.
Generates a JWT upon successful authentication.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
entry: Table for user details, including hashed passwords.

## register.js

Overview
The register function enables new users to create an account by providing their name, email, and password. The function checks for existing users with the same email and securely stores the user's information.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/register 
Method: POST
Required Headers: Content-Type: application/json

Request Format:

name: Name of the user (String)
email: Email of the user (String)
password: Password chosen by the user (String)

Response:
A successful registration will return a confirmation message.
If a user with the given email already exists, an error message will be returned.

File Structure
Location: /api/register.js
Dependencies: bcryptjs, @prisma/client, Custom module ../src/prismaAPI.js

Purpose: Registers a new user by adding their details to the database after ensuring the email is not already in use.
Inputs:
req: The request object containing the user's name, email, and password.
res: The response object for returning a success or error message.

Checks for an existing user with the same email.
Hashes the password using bcrypt.
Creates a new user record in the database.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
entry: Table for user entries.

## send-message.js
Overview
The send-message function enables users to send messages to other users. It requires the sender's email, the recipient's email, and the message content.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/send-message 
Method: POST
Required Headers: Content-Type: application/json

Request Format:

senderEmail: Email of the sender (String)
recipientEmail: Email of the recipient (String)
messageContent: Content of the message (String)

Response:
A successful request will return the details of the sent message.
In case of an error, such as an invalid email or server issue, an error message will be provided.

File Structure
Location: /api/send-message.js
Dependencies: @prisma/client

Purpose: Allows users to send messages to other users.
Inputs:
req: The request object containing senderEmail, recipientEmail, and messageContent.
res: The response object for returning the message details or an error message.

Creates a new message in the database with the provided sender and recipient information and content.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
message: Table for storing message details.

## setClassPreferences.js
Overview
The setClassPreferences function enables users to set or update their personal preferences for a class, such as preferred skills and interests. This function is useful for tailoring the class experience to individual needs.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/setClassPreferences 
Method: POST
Required Headers: Content-Type: application/json

Request Format:

email: Email of the user setting the preferences (String)
classID: ID of the class for which preferences are being set (String)
preferredSkills: List of preferred skills (Array of Strings)
preferredSkillsWeight: Weight or importance of preferred skills (Number)
interests: List of interests (Array of Strings)
interestsWeight: Weight or importance of interests (Number)

Response:
A successful request will return the updated preferences.
If the user or class is not found, or if there is an error during the process, an error message will be provided.

File Structure
Location: /api/setClassPreferences.js
Dependencies: @prisma/client

Purpose: Sets or updates a user's preferences for a specific class.
Inputs:
req: The request object containing user's email, classID, and preference details.
res: The response object for returning the updated preferences or an error message.

Checks for the existence of the user and the preference record.
Creates or updates the class preference record.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
entry: Table for user entries.
classPreferences: Table for class preference records.

## setStablePreferences.js
Overview
The setStablePreferences function enables users to update their stable preferences, including skills, interests, and availability. This feature is particularly useful for tailoring user experiences and recommendations.

How to Access
Endpoint: https://team-forge-restruct-git-main-tomato-tigers-projects.vercel.app/api/setStablePreferences 
Method: POST
Required Headers: Content-Type: application/json

equest Format:

email: Email of the user updating preferences (String)
stableSkills: List of stable skills (Array of Strings)
stableInterests: List of stable interests (Array of Strings)
availability: User's availability (String or relevant format)

Response:
A successful request will return the updated user data including their preferences.
If the email is not found or there is a server issue, an error message will be provided.

File Structure
Location: /api/setStablePreferences.js
Dependencies: @prisma/client

Purpose: Updates a user's stable skills, interests, and availability.
Inputs:
req: The request object containing the user's email and preference details.
res: The response object for returning the updated preferences or an error message.

Validates user's existence based on email.
Updates user's preferences in the database.

Error Handling: Catches exceptions and returns appropriate status codes and messages.

Database Schema
Interacts with:
entry: Table for user entries, containing preference details.

## prismaAPI.js
Overview
prismaAPI.js is a utility module that encapsulates various database operations using Prisma Client. It provides functions for user registration, password retrieval, class and message management, and handling of user preferences.

Key Functions

createNewUser

Purpose: Creates a new user in the database.
Parameters: data - An object containing user details like email, password, and name.

getPasswordByEmail

Purpose: Retrieves a hashed password for a given email.
Parameters: email - The email of the user.

getSkillsByID

Purpose: Fetches skills for a given user ID.
Parameters: id - User's ID.

getEntryByID, getRelationByID, updateRelationByID, deleteEntryByID

Purpose: Various functions to retrieve, update, and delete user information.
Parameters: User-specific details like email or ID.

getStudentsByClassID

Purpose: Retrieves all students (members) associated with a specific class.
Parameters: classID - The ID of the class.

getClassPreference

Purpose: Retrieves class preferences for a given ID.
Parameters: id - Combination of userID and classID.

createMessage, getUserIdByEmail, getInbox, getSentMessages

Purpose: Functions related to messaging, such as creating messages and fetching inbox/sent messages.
Parameters: User and message-specific details.

getStablePreferencesByUserID, upsertStablePreferences

Purpose: Retrieves and updates stable preferences for a user.
Parameters: User ID and preference data.

createClassPreferences

Purpose: Creates default class preferences for a user.
Parameters: user - User's ID, classID - Class ID.