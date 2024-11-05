import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext";
import { useTranslation } from "react-i18next"; 
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const { t } = useTranslation();

    const handleClick = async () => {
        if(!user) {
            return
        }
        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        
        if (response.ok) {
            dispatch({type: "DELETE_WORKOUT", payload: json})
        }
    }

    // Function to capitalize first letter
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="workout-details">
            <div className="workout-header">
                <h4>{workout.title}</h4>
               
            </div>
            <p><strong>{t("Load (in kg)")}</strong> {workout.load}</p>
            <p><strong>{t("Number of Reps")}</strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails