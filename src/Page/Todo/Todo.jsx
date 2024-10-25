import { useEffect, useRef, useState } from "react";
import { fetchTodos } from "../../data/todos";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import "./Todo.css";

function Todo() {
  const [todoRaw, setTodoRaw] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [todos, setTodos] = useState([]);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [numPage, setNumPage] = useState([]);
  const [curPage, setCurPage] = useState(1);

  //model
  const [show, setShow] = useState(false);
  const newIdref = useRef();
  const newTitleref = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function fetchData() {
      const fetchedTodos = await fetchTodos();
      setTodoRaw(fetchedTodos);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todoRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todoRaw);
    }
  }, [todoRaw, onlyWaiting, itemsPerPage]);

  useEffect(() => {
    setNumPage(Math.ceil(todoRaw.length / itemsPerPage));

  }, [itemsPerPage, todoRaw]);

  useEffect(() => {
    setCurPage(1);
  }, [numPage]);

  function deleteClick(id) {
    setTodoRaw(todoRaw.filter((todo) => todo.id !== id));
  }

  function changeState(id) {
    const matchTodo = todoRaw.find((todo) => {
      return todo.id === id;
    });
    matchTodo.completed = true;

    setTodoRaw([...todoRaw]);
  }

  function addtodo (id, title){
        const newTodo = {
            userId: 10,
            id,
            title,
            completed: false
        }

        setTodoRaw([...todoRaw, newTodo])
  }
  return (
    <div className="todo-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="ib ib-plus-lg">+ Add todo</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                disabled
                value={

                    Number(todoRaw.reduce( (prev, todo)=>{
                        return todo.id > prev ? todo.id : prev
                    }, 0)) + 1
                }
                ref={newIdref}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" autoFocus ref={newTitleref} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
                const id =newIdref.current.value
                const title =newTitleref.current.value.trim()
                if (title === ''){
                    alert('title can not be empty')
                    newTitleref.current.value = ''
                    newTitleref.current.focus()
                } else{
                    addtodo(id, title);
                    handleClose();
                }

            }}
          >
            + Add
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="filter-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onClick={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only{" "}
            <button className="btn btn-warning todo-space">
              waiting <span className="bi bi-clock-history"></span>
            </button>
          </label>
        </div>

        <select
          className="form-select"
          style={{ width: "200px" }}
          aria-label="Default select example"
          onChange={(e) => {
            setItemPerPage(e.target.value);
          }}
          defaultValue={10}
        >
          <option value="5">5 item per Page</option>
          <option value="10">10 items per Page</option>
          <option value="50">50 items per Page</option>
          <option value="100">100 items per Page</option>
        </select>
      </div>
      <div className="table-container">
        <table className="table table-striped" style={{ textAlign: "center" }}>
          <thead
            className="table-dark"
            style={{ textAlign: "center", height: "75px" }}
          >
            <tr>
              <th style={{ textAlign: "center", verticalAlign: "middle" }}>
                ID
              </th>
              <th style={{ width: '75%', textAlign: "center", verticalAlign: "middle" }}>
                TITLE
              </th>
              <th style={{ textAlign: "right", verticalAlign: "middle" }}>
                completed
                <button className="btn btn-primary todo-space">
                  <span
                    className="bi bi-plus-lg"
                    variant="primary"
                    onClick={handleShow}
                  ></span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos
              .filter((todo, index) => {
                const min = (curPage - 1) * itemsPerPage;
                const max = curPage * itemsPerPage - 1;

                return index >= min && index <= max;
              })
              .map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td>
                      <span className="badge bg-secondary" style={{verticalAlign: "middle"}}>{todo.id}</span>
                    </td>
                    <td style={{ textAlign: "left" ,verticalAlign: "middle"}}>{todo.title}</td>
                    <td style={{ alignSelf: "right" ,verticalAlign: "middle"}}>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button
                          className={
                            "btn " +
                            "state-container " +
                            (todo.completed ? " btn-success" : "btn-warning")
                          }
                          onClick={() => {
                            changeState(todo.id);
                          }}
                        >
                          <span>{todo.completed ? "Done" : "Waiting"} </span>
                          <span
                            className={
                              "bi " +
                              (todo.completed
                                ? "bi-check2-circle"
                                : "bi-clock-history")
                            }
                          ></span>
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            deleteClick(todo.id);
                          }}
                        >
                          <span className="bi bi-trash"></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div className="foot">
          <button
            className="btn btn-outline-primary todo-space"
            onClick={() => {
              setCurPage(1);
            }}
            disabled={curPage === 1}
          >
            First
          </button>
          <button
            className="btn btn-outline-primary todo-space"
            onClick={() => {
              curPage > 1 && setCurPage(curPage - 1);
            }}
            disabled={curPage === 1}
          >
            Previous
          </button>
          &nbsp; {curPage} &nbsp; / &nbsp;{numPage} &nbsp;
          <button
            className="btn btn-outline-primary todo-space"
            onClick={() => {
              curPage < numPage && setCurPage(curPage + 1);
            }}
            disabled={curPage === numPage}
          >
            Next
          </button>
          <button
            className="btn btn-outline-primary todo-space"
            onClick={() => {
              setCurPage(numPage);
            }}
            disabled={curPage === numPage}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
