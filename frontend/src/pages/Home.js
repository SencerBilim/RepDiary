import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTranslation } from "react-i18next"; 

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
   const { workouts, dispatch } = useWorkoutsContext();
   const { user } = useAuthContext();
   const [selectedDay, setSelectedDay] = useState('');

   const days = [
     'monday',
     'tuesday',
     'wednesday',
     'thursday',
     'friday',
     'saturday',
     'sunday'
   ];

   const { t } = useTranslation(); // translation hook

   useEffect(() => {
       const fetchWorkouts = async () => {
           const response = await fetch("/api/workouts", {
             headers: {
               "Authorization": `Bearer ${user.token}`
             }
           });
           const json = await response.json();
           
           if (response.ok) {
               dispatch({type: "SET_WORKOUTS", payload: json});
           }
       };

       if (user) {
         fetchWorkouts();
       }
       
   }, [dispatch, user]);

   // Filter workouts based on selected day
   const filteredWorkouts = selectedDay
     ? workouts?.filter(workout => workout.day === selectedDay)
     : workouts;

   return (
       <div className="home">
         <div className="day-selector">
           <h2>{t('Workout Days')}</h2> 
           <div className="days-container">
             <button 
                 className={selectedDay === '' ? 'active' : ''} 
                 onClick={() => setSelectedDay('')}
               >
                 {t('All Days')} 
               </button>
               {days.map(day => (
                 <button
                   key={day}
                   onClick={() => setSelectedDay(day)}
                   className={selectedDay === day ? 'active' : ''}
                 >
                   {t(day)}
                 </button>
               ))}
           </div>
         </div>

         <div className="workouts-container">
           <div className="workouts">
             {filteredWorkouts && filteredWorkouts.map(workout => (
               <WorkoutDetails workout={workout} key={workout._id} />
             ))}
             {filteredWorkouts && filteredWorkouts.length === 0 && (
               <p className="no-workouts">
                 {selectedDay 
                   ? t('No workouts found for {{day}}', { day: selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1) }) // Use translation for no workouts message
                   : t('No workouts found')}
               </p>
             )}
           </div>
           <WorkoutForm />
         </div>
       </div>
   );
};

export default Home;
