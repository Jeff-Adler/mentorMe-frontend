# MentorMe.

Life is full of challenges. But, any setback can be an opportunity for growth! That is, if you have a mentor! MentorMe. is a means to connect users looking for mentorship with those looking to give mentorship through a swipe-based mechanic familiar from dating apps. Get one-on-one advice for your career, relationships, and self-esteem from the comfort of your smartphone device!

[App Walkthrough](https://youtu.be/U85gXH0QPL0 "MentorMe. Walkthrough")

## Getting Started

### Prerequisites

Ensure you have React Native, Expo, iOS simulator, Ruby, and Rails installed.

### Installation

1. Fork and clone this repo
2. In your terminal:

```
cd mentorMe_backend
bundle install
```

3. In terminal (preferably in another tab):

```
cd mentorMe_frontend
npm install
```

4. From backend terminal tab:

```
rails s
```

5. From frontend terminal tab:

```
npm start
//After expo is loaded
i
```

## Usage

1. Click 'Go to signup'

2. Enter Username and Password (must be between 6 - 20 characters)

3. Click 'Create Profile'

![login_page](./screenshots/login_page.png?raw=true "Login Page")
![signup_page](./screenshots/signup_page.png?raw=true "Signup Page")
![profile_create_page](./screenshots/profile_create_page.png?raw=true "Profile Create Page")

4. Enter Name, Gender, and Birthdate

![name_entry_page](./screenshots/name_entry_page.png?raw=true "Name Submission Page")
![gender_page](./screenshots/gender_page.png?raw=true "Gender Selection Page")
![birthdate_picker](./screenshots/birthdate_picker.png?raw=true "Birthdate Selection Page")

5. Enter any categories for which you feel licensed to give mentorship on

![experience_picker](./screenshots/experience_picker.png?raw=true "Experience Picker Page")

6. Enter a tagline to display on your profile

![tagline_submission_page](./screenshots/tagline_submission_page.png?raw=true "Tagline Submission Page")

7. (Optional) To fully seed the database, from the backend terminal tab, run:

```
rake app:all
```

8. Search for mentorship for Career, Relationships, and Self-Esteem in the 'Search' tab. Swipe right to accept mentor, swipe left to reject.

![search_tab](./screenshots/search_tab.png?raw=true "Search Tab Page")

# Built With

- React Native
- Expo
- React Native Elements
- React Native Navigation
- Ruby on Rails
- ActiveRecord
- PostgreSQL

## React/Javascript Libraries

- react-native-responsive-dimensions
- react-native-safe-area-context
- react-native-user-avatar
- react-native-vector-icons
- react-native-gifted-chat
- react-native-card-stack-swiper
- moment

## Ruby Gems

- Faker
- HTTP Party
- JSON
- bcrypt
- jwt

## Third Party APIs

- <a href="https://randomuser.me/">Random User Profile Generator</a> - generates avatar images for user seeds

# Author

Me, Jeff Adler!

# Acknowledgments

I'd like to acknowledge all the amazing people who made the libraries, gems, and API listed above. Making clean, responsive apps would by nye impossible without them!
