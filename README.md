# Activio: The Ultimate Fitness App

## What is Activio?

A free web and mobile app that is perfect for fitness enthusiasts. Users can create workout plans, search through 1000+ exercises, track calories and explore workout plans from other users. 
- Try it out here: https://activio.netlify.app/

<img width="1000" alt="HomeScreen" src="https://user-images.githubusercontent.com/16049357/189257633-b24b3eb7-36d7-44dc-bd9d-7fb541dd4302.png">

## Built with

We used React and Material UI for the frontend, Node.js and MongoDB for the backend. JWT was used for authentication and Redux for global state management. We deployed it using Adaptable and Netlify.

* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

## How to run locally
1. Install required dependencies in root folder and both frontend and backend folders
```
npm install
```
2. Navigate to the backend folder `/api`
3. Create a `.env` file in this folder with the following variables:
```
MONGO_URL = [YOUR_MONGODB_URL]
JWT_SECRET = [YOUR_JWT_SECRET_KEY]
```
4. Navigate back to the root folder
5. Run the app on http://localhost:3000
```
npm run dev
```

## Inside Look
<img width="1000" alt="ExercisesScreen" src="https://user-images.githubusercontent.com/16049357/189259637-b594a274-25a9-46d8-9723-3e80a479a831.png"> <img width="1000" alt="WorkoutTimer" src="https://user-images.githubusercontent.com/16049357/189259527-e66c47b7-1ef0-4431-b660-43a012f82103.png"> 
<img width="1000" alt="WorkoutPlannerScreen" src="https://user-images.githubusercontent.com/16049357/189259606-14a81b73-e9d6-408a-9993-7e2fccadf18f.png"> <img width="1000" alt="NutritionTrackerScreen" src="https://user-images.githubusercontent.com/16049357/189259568-5778879a-512f-4875-b719-ee35a3f88880.png">
<img width="1000" alt="ExploreScreen" src="https://user-images.githubusercontent.com/16049357/189259558-afe5d7ae-33e7-4918-ae47-3129303cbf0b.png"> <img width="1000" alt="RegisterScreen" src="https://user-images.githubusercontent.com/16049357/189260628-c8b26106-9f61-4554-b525-c22bf05d330d.png">

## Next Steps

- [x] Create explore blog page
- [x] Polish and deploy
- [ ] Integrate all features to mobile app (WIP: https://github.com/braydonwang/Activio-Mobile-App)
- [ ] Implement ML image classification for calorie tracker
- [ ] Explore pricing plans 💸
