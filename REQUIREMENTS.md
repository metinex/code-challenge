# Overview

The following challenges are used to assess a candidate’s proficiencies for placement in our team. Consider how your solutions to these challenges reflect the position’s skill/experience requirements: 

- Please complete at least two of the challenges. 
- Follow the instructions. Solutions should meet all challenge requirements. 
- Feel free to elaborate in your own way and get creative. - Explain your work—code comments, diagrams, and/or your preferred annotation method. 
- Utilize any frameworks or plugins you need. Keep in mind, we’re not looking at what you use, but how you use it. 
- Bonus points for unit tests, thoughtful consideration of the edge cases and self-identifying your usage of design patterns and progressive Web standards.

# Challenge 1: Sign up Requirements 


Create a sign up page. This must be accessible and validate user data entered into all fields.


### 1. Fields: 

#### Username 
- must be an email address. 
- It cannot be longer than 56 characters. Required. 

#### Password & Confirm Password 
- Must be at least 6 characters. 
- Passwords must match. Required. 

##### First & Last Name 
- Letters only. May not be more than 50 characters. Last Name Optional 

#### Birthday 
- Must be visible to the user in MM/DD/YYYY (03/21/1982) format, but submit as ISO 8601. 
- User must be at least 14 and not older than 150. Required. 

### 2. Submit: 
- Occurs either on button press or when the user hits the enter key. 
- Only submits when there are no errors. 
- Does not depend on the <form> element. 
- On success, takes the user to a success view. 

### 3. Clear:
- Clear all entered user data and any errors on click. 
- Provide a confirmation dialog before clearing. 

### 4.  Success View:
- Should be same-page as the form. Treat this like a SPA.
- Displays the user’s information.
- Allow the user to expand their profile by adding a bio and interests


# Challenge 2: Buddy List Requirements

Create a list of buddies that can be sorted, filtered, searched and prioritized. Clicking on a buddy should show their expanded information. 

## 1. The List 
 - Pre-populate the list with mock data. 
 - Stub out the data as if it were an api response. 

## 2. Buddies 
 - Each buddy in the list view should display their username, first name, last name and status 
 - The expanded information should display their email address, birthday and bio 
 - Buddies should be able to be added, prioritized and deleted. 
 - Deleting should prompt a confirmation dialog. 

## 3. Buddy Status 
- Buddies can be Available, Busy, Idle or Offline. 
- If the buddy is offline, the expanded information should also show the last sign in date. 

## 4. Add Buddy 
- Clicking this button should open a dialog with a form to add a new buddy. 
- Form should contain all required fields. 
- On submit, the buddy should be added to the list.
