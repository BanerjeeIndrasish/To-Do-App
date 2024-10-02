import React, {useState, useEffect} from 'react'
import DeleteIcon from './bin.png'; 
import EditIcon from './edit.png';
import confetti from 'canvas-confetti';

export default function Task() {
  const [tasks, setTasks] = useState([]); 
  const [textInput, setTextInput] = useState('');
  const [progress, setProgress] = useState(0);

  const onToggle = (index)=>{
    const checkTask = tasks.map((task,i)=> i === index ? {...task, isChecked: !task.isChecked} : task);
    setTasks(checkTask);
  }
  const addButton = (e)=>{
    e.preventDefault();
    if(textInput.trim()){
      setTasks([...tasks, {text: textInput, isCheked: false}]);   
      setTextInput(''); 
    }         
  }
  
  const onDelete = (index)=>{
    const updatedTask = tasks.filter((_,i) => i !== index);
    setTasks(updatedTask);
    console.log("Deleted");
  }

  const onEdit = (task, index)=>{
    setTextInput(task.text);
    const updatedTask = tasks.filter((_, i) => i !== index);
    setTasks(updatedTask);
  }

  const getText = (e)=>{
    setTextInput(e.target.value);
  }

  const updateProgress = () =>{
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.isChecked).length;
    const barPercentage = totalTasks === 0 ? 0 : (completedTasks/totalTasks)*100;
    if(totalTasks>0 && totalTasks===completedTasks) taskCompletionCelebration();
    return barPercentage;
  }
  const taskCompletionCelebration = ()=>{
    confetti({
        particleCount: 300,
        spread: 100,
        origin: { y: 0.6 },
      });
  }
  useEffect(()=>{
    setProgress(updateProgress());
  }, [tasks]);

  return (
    <div className='container'>
      <div className="stat-container">
        <div className="details">
          <h1>To Do App</h1>
          <p>Track Tasks</p>
          <div id="progressbar">
            <div id='progress' style={{width: `${progress}%`}}></div>
          </div>
          </div>
        <div className='stat-numbers'>
          <p id='numbers'>{tasks.filter((task) => task.isChecked).length}/{tasks.length}</p>
        </div>
      </div>  {/*//// Stat-Container End */}

      <form action="">
        <input type="text" placeholder='Enter Text' value= {textInput} onChange={getText}/>
        <button onClick={addButton}>+</button>
      </form>

      <ul id='task-list' className='task-list'>
        {tasks.map((task, index) =>
          <li key={index} className='taskItem'>
            <div className={`task ${task.isChecked ? 'Completed' : ''}`} >                
                <input type="checkbox" checked= {task.isChecked} value={textInput} onChange={()=> onToggle(index)}/>
                <p>{task.text}</p>               
            </div>
            <div className="icons">
              <img src={EditIcon} alt="Edit" onClick={() => onEdit(task, index)}/>
              <img src={DeleteIcon} alt="Delete" onClick={()=> onDelete(index)}/>
            </div>
          </li>
        )}
      </ul>
    </div>  
  )
}
