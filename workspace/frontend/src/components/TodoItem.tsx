import { Todo } from "../models/Todo";

function TodoItem({todo}: { todo: Todo }) {
    return (<>
        { todo.task }
    </>);
}

export default TodoItem;