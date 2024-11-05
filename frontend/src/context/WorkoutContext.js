import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload,
        selectedDay: state.selectedDay // preserve selected day
      }
    case 'CREATE_WORKOUT':
      return { 
        ...state,
        workouts: [action.payload, ...state.workouts] 
      }
    case "DELETE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    case 'SET_SELECTED_DAY':
      return {
        ...state,
        selectedDay: action.payload
      }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null,
    selectedDay: null // Add selected day to initial state
  })

  // Helper function to get workouts for a specific day
  const getWorkoutsForDay = (day) => {
    if (!state.workouts) return [];
    return state.workouts.filter(workout => 
      workout.day && workout.day.toLowerCase() === day.toLowerCase()
    );
  }
  
  return (
    <WorkoutsContext.Provider value={{ 
      ...state, 
      dispatch,
      getWorkoutsForDay 
    }}>
      { children }
    </WorkoutsContext.Provider>
  )
}