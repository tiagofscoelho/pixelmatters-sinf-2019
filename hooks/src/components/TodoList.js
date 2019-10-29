import React, { useState, useEffect, useReducer } from 'react';

export default () =>  {
		const Todo = ({ index, todo, dispatchTodos }) => {
			return (
				<div
					className="todo"
					style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
				>
					{todo.text}
	
					<div className="todo__actions"> 
						<button 
							className="button button--success"
							onClick={() => dispatchTodos({ type: todo.isCompleted ? 'undone' : 'done', index })}> 
							{ todo.isCompleted ? 'Undone' : 'Done' } 
						</button>
						<button 
							className="button button--danger"
							onClick={() => dispatchTodos({ ype: 'remove', index })}>
							ⓧ
						</button>
					</div>
				</div>
			);
		}

		const todosReducer = (todos, action) => {
			let newTodos = [...todos]
			switch (action.type) {
				case 'add':
					newTodos.push({ text: action.text, isCompleted: false })
					break
				case 'done':
					newTodos[action.index].isCompleted = true;
					break
				case 'undone':
					newTodos[action.index].isCompleted = false;
					break
				case 'remove':
					newTodos.splice(action.index, 1);
					break
				default:
					return newTodos
			}

			return newTodos
		}

		const TodoList = () => {
			const [inputValue, setInputValue] = useState('');
  		const [todos, dispatchTodos] = useReducer(todosReducer, []);

	    useEffect(() => {
				const countUncompleted = () => todos.filter(todo => !todo.isCompleted)
	      document.title = `Todos: ${countUncompleted().length} (${todos.length})`
	    }, [todos])

			const onFormKeyPress = event => {
				const ENTER_KEY_CODE = 13
				if (event && event.which === ENTER_KEY_CODE) {
					if (inputValue) {
						dispatchTodos({ type: 'add', text: inputValue });
						setInputValue('');
					}
				}
			}

			return (
				<div className="todo-list">
					<input
						type="text"
						className="todo-list__input"
						placeholder="Add new todo"
						value={inputValue}
						onChange={event => setInputValue(event.target.value)}
						onKeyPress={event => onFormKeyPress(event)}
					/>
					<div className="todo-list__todos">
						{todos.map((todo, index) => (
							<Todo
								key={index}
								index={index}
								todo={todo}
								dispatchTodos={dispatchTodos}
							/>
						))}
					</div>
				</div>
			);
		}

    return (
       <TodoList />
    )
}