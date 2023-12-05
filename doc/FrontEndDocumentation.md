
# Frontend Documentation

Directory /src/components:

-   AddClass.tsx

-   AddClassNavBar.tsx

-   ClassPage.tsx

-   ClassPageNavBar.tsx

-   ClassPagePeople.tsx

-   ClassPageProjects.tsx

-   CreateClass.tsx

-   Home.tsx

-   JoinClass.tsx

-   Login.tsx

-   MainLayout.tsx

-   Messages.tsx

-   NavBar.tsx

-   PopoutComponent.tsx

-   ProfilePage.tsx

-   Projects.tsx

-   Register.tsx

## AddClass.tsx

Methods:

useEffect() for Route Redirection

Parameters: none

render

Parameters: none

## ClassPage.tsx

Methods:

handleNewProjectTitleChange()

Parameters: `e` The event object representing change in new project
title field

Description: Handles changes in the new project title field. Updates
newProjectTitle with value entered by the user

handleNewProjectDescChange()

Parameters: Parameters: `e` The event object representing change in new
project description field

Description: Handles changes in the new project description field.
Updates newProjectDesc with value entered by the user

handleNewGroupNameChange()

Parameters: `e` The event object representing change in new group name
field

Description: This method handles changes in the new group name field.
Updates newGroupName() with value entered by the user

## ClassPagePeople.tsx

Methods:

heart()

Parameters: `id` A string representing the ID of a profile

Description: This method handles the click event on the heart button. It
then updates the relation state based on if a profile ID is already in
the relation.

## ClassPageProjects.tsx

Methods:

handleNewProjectTitleChange()

Parameters:`e` object of type 'React.ChangeEvent\<HTMLInputElement\>

Description: Updates the state variable newProjectTitle with new value
that is entered in the input field. It is used as an event handler for
changes in the new project title input.

handleNewProjectDescChange()

Parameters: :`e` object of type 'React.ChangeEvent\<HTMLInputElement\>

Description: Updates the state variable newProjectDesc with new value
that is entered in the input field. It is used as an event handler for
changes in the new project title input.

handleProjectDelete()

Parameters: `projectId`, this is the ID of the project to be deleted

Description: Sends a POST request to the server to join a specified
project. Updates the `projects` state by removing user email from
project's group members.

handleNewProjectSubmit()

Parameters: `e` object of type 'React.ChangeEvent\<HTMLInputElement\>

Description: Prevents default form submission. Validates input fields
and displays an error message if any field is empty. Sends a POST
request to server to create a new project. Updates the projects state
with newly created project.

isUserNotMember()

Parameters: `project` An object representing a project

Description: Checks if the user's email is not included in the list of
members in the project's group. Returns true if the user is a member,
otherwise returns false. Displays join button only if user is not
already a member.

isOwner()

Parameters: `project` An object representing a project

Description: Checks if user email matches the owner email property.
Returns true if user is the owner, otherwise returns false. Used to
conditionally render the delete button.

canUserLeaveProject()

Parameters: `project` An object representing a project

Description: Determines whether the current user can leave the specified
project. Returns true if a user is a member of the project. Returns
false if the owner is not a member.

## CreateClass.tsx

Methods:

handleTitleChange()

Parameters: `event` object of type React.ChangeEvent\<HTMLInputElement\>

Description: Updates the state variable `title` with new value entered
in the input field. Used as an event handler for changes in class title
input.

handleSubtitleChange()

Parameters: `event` object of type React.ChangeEvent\<HTMLInputElement\>

Description: Updates the state variable `subtitle` with the new value
entered into the input field. Used as an event handler for changes in
class subtitle input.

handleCapacityChange()

Parameters: `event` object of type React.ChangeEvent\<HTMLInputElement\>

Description: Updates state variable `capacity` with new numeric value
entered in capacity input field. Used as an event handler for changes in
class capacity.

handleSubmit()

Parameters: `event` object of type React.ChangeEvent\<HTMLInputElement\>

Description: Prevents default submission behavior. Validates input
fields. Sends POST request to the server to create a new class

validateInput()

Parameters: `input` A string representing a class title or subtitle

Description: Uses a regex to validate that the input matches the
expected pattern. Checks for format of CS (3 numbers) or MATH (3
numbers). Returns true if input matches the pattern, false if otherwise.

## Home.tsx

Methods:

redirectToProfilePage()

Parameters: None

Description: Navigates the user to "/ProfilePage" route. Passes user
information as a state.

redirectToMessagePage()

Parameters: None

Description: Navigates the user to "/Messages" route. Passes user
information as a state.

redirectToMyProjects()

Parameters: None

Description: Navigates the user to "/Projects" route. Passes email as a
state.

## JoinClass.tsx

Methods:

handleJoinClass()

Parameters: `classId: String` The ID of the class to join.

Description: Sends a POST request to "/api/joinClass" to join a class.
Passes the user's email and selected `classID`. The navigates to the
"/Projects" route after a delay.

## Login.tsx

Methods:

handleEmailChange()

Parameters: `event` React.ChangeEvent\<HTMLInputElement\>

Description: Handles change event for the email. Updates email with the
new value.

handlePasswordChange()

Parameters: `event` React.ChangeEvent\<HTMLInputElement\>

Description: Handles the change event for the password. Updates password
with the new value.

handleLogin()

Parameters: `event` React.ChangeEvent\<HTMLInputElement\>

Description: Handles the form submission event for login process. Sends
a POST request to the API with provided email and password.

redirecttoRegister()

Parameters: None

Description: Navigates to "/Register" route

## Messages.tsx

Methods:

fetchInboxMessages()

Parameters: none

Description: Fetches inbox messages for a current user. Uses the
user.email and currentPage for the request. Updates the `inbox` state
with fetched messages.

fetchSentMessages()

Parameters: None

Description: Fetches sent messages for the current user. Uses the
user.email and currrentPage states to perform the request. Updates the
`sent` state with fetched messages.

handleReply()

Parameters: `senderEmail`, `originalMessages`

Description: Sets the newRecipient state with the sender's email. Sets
the newMessage state with pre-filled message. Updates `setOutgoingMsgs`
`setShowSentMsgs` `setSentMessages`

handleSendMessage()

Parameters: None

Description: Sends a new message using the provided data. Sends a POST
request to /api/send-message endpoint. Updates the messages state with a
new message. Refreshes the inbox after sending a reply.

handleInboxMessages()

Parameters: None

Description: Fetches and displays sent messages. Updates visibility
states `setShowSentMsgs` `setOutgoingMsgs` `setSentMessages`

Pagination

Parameters: None

Description: Manages pagination for inbox and sent messages. Updates the
`currentPage` state based upon user interaction.

## NavBar.tsx

Methods:

handleLogout()

Parameters: None

Description: Envokes the onLogout prop passed to the component and then
navigates user to the home page.

toggleDropdown()

Parameters: None

Description: Shows visibility of the user dropdown menu. Changes the
state of showDropdown to its opposite value.

navigateToHomePage()

Parameters: none

Description: Navigates user to the home page when called.

navigateToProfile()

Parameters: None

Description: Navigates user to the profile page when called.

handleLogoClick()

Parameters: None

Description: Is triggered when logo is clicked and navigates to homepage

## PopoutComponent.tsx

Methods:

showSidebar()

Parameters: None

Description: Toggles the visibility of the sidebar by setting the
sidebar component to its opposite value

handleCheckboxChange()

Parameters: \`setFunction:
React.Dispatch\<React.SetStateAction\<string[]\>\>, selectedValues,
value

Description: Updates checkbox values based on whether provided value is
in the selectedValues array

handleUpdate()

Parameters: None

Description: This method sends a POST request to update the user's class
preferences, including preferred skills, skills weight, interests, and
those weights.

## ProfilePage.tsx

Methods:

fetchPreferences()

Parameters: None

Description: Fetches the user's stable preferences (skills and
interests) and sets the corresponding state variables

handleSkillChange()

Parameters: `skill`The skill being toggled

Description: Handles the change in the selected skills. Toggles when
there is a skill in the `selectedSkills` state.

handleInterestChange()

Parameters: `interest` The interest being toggled

Description: Handles the change in the selected interests. Toggles when
there is a skill in the `selectedInterests` state

handleAvailabilityChange()

Parameters: `day` `time`

Description: Handles change in availability for specific day and time
slot

## Register.tsx 

Methods:

handleFirstNameChange()

Parameters: `event<React.ChangeEvent<HTMLInputElement>`

Description: Updates the state with the entered first name

handleLastNameChange()

Parameters: `event<React.ChangeEvent<HTMLInputElement>`

Description: Updates the state with entered last name

handleEmailChange()

Parameters: `event<React.ChangeEvent<HTMLInputElement>`

Description: Updates the state with the entered email

handlePasswordChange()

Parameters: `event<React.ChangeEvent<HTMLInputElement>`

Description: Updates state with entered confirm password

handleRegistration()

Parameters: `event<React.ChangeEvent<HTMLInputElement>`

Description: Handles registration form submission and sends request to
the server
