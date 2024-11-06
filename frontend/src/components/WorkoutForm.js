import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTranslation } from "react-i18next"; 

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [day, setDay] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const days = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ];

    const { t } = useTranslation(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError(t("You must be logged in.")); // Translate
            return;
        }

        const workout = { title, load, reps, day };
        
        const response = await fetch('https://repdiary.onrender.com/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setEmptyFields([]);
            setError(null);
            setTitle('');
            setLoad('');
            setReps('');
            setDay('');
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}> 
            <h3>{t("Add a New Workout")}</h3> 

            <label>{t("Select Day")}</label>
            <select
                onChange={(e) => setDay(e.target.value)}
                value={day}
                className={emptyFields.includes('day') ? 'error' : ''}
            >
                <option value="">{t("Select a day")}</option>
                {days.map(d => (
                    <option key={d} value={d}>
                        {t(d)} 
                    </option>
                ))}
            </select>
  
            <label>{t("Exercise Title")}</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
  
            <label>{t("Load (in kg)")}</label>
            <input 
                type="number" 
                onChange={(e) => setLoad(e.target.value)} 
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
  
            <label>{t("Number of Reps")}</label>
            <input 
                type="number" 
                onChange={(e) => setReps(e.target.value)} 
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
  
            <button>{t("Add Workout")}</button> 
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
