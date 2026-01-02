import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {

	const url = 'https://playground.4geeks.com/todo'

	const [todoList, setTodoList] = useState([])
	const [tarea, setTarea] = useState("")

	const nuevoUsuario = async () => {
		const response = await fetch(`${url}/users/AgustinGauto`, {
			method: "POST"
		})
		if (response.ok) {
			traerTareas()
		}
		const data = await response.json()
		console.log(data);
	}

	const traerTareas = async () => {
		const response = await fetch(`${url}/users/AgustinGauto`)
		if (!response.ok) {
			console.log("usuario no existe");
			nuevoUsuario()
			return
		}
		const data = await response.json()
		setTodoList(data.todos)
	}

	const tareaNueva = async() => {
		if (tarea.trim()== "") return
		const response = await fetch(`${url}/todos/AgustinGauto`, {
			method: "POST",
			body: JSON.stringify({
				"label": tarea,
				"is_done": false
			}),
			headers: {"Content-type": "application/json"}
		})
		if (response.ok) traerTareas(); setTarea("")
	}


	const enterK = (e) => {
		if (e.key == "Enter") {
			tareaNueva()
		}
	}


	const eliminar =async (id) => {
		const response = await fetch(`${url}/todos/${id}`, {
			method: "DELETE"
		})
		if (response.ok) traerTareas()
	}

	useEffect(() => {
		traerTareas()
	}, [])


	return (
		<>
			<div className="card position-absolute top-50 start-50 translate-middle" >
				<div className="card-body">
					<div className="text-center">
						<h1>Lista de Compras</h1>
						<div className="input-group mb-3 mt-3 p-0">
							<input
								onKeyUp={enterK}
								value={tarea}
								onChange={(e) => setTarea(e.target.value)}
								type="text" className="form-control"
								placeholder="ingresa aqui su compra"
								aria-label="ingresa aqui su compra"
								aria-describedby="button-addon2" />

							<button
								className="btn btn-outline-secondary"
								type="button" id="Añadir"
								onClick={tareaNueva}
							>
								Agregar
							</button>
						</div>

						<div className="text-center " style={{
							maxHeight: "27em",
							overflowY: "auto",
							lineHeight: "1.5em",
							textOverflow: "clip",
							whiteSpace: "normal",
						}}>
							{todoList.length > 0 ? (
								todoList.map((item, i) => (
									<div key={i}>
										<div className="textoLista input-group d-flex justify-content-center d-flex justify-content-between">
											<p className="textoListaVista">{item.label}</p>
											<button 
											className="btn m-0 eliminar" 
											type="button" onClick={() => eliminar(item.id)}
											> <i className="fa-regular fa-trash-can"></i> </button>
										</div>
									</div>
								))
							) : (<p className="text-center position-absolute top-50 start-50 translate-middle fs-5">No hay ningun elemento en la lista</p>)
							}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;