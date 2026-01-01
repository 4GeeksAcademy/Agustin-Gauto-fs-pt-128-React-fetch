import React, { useState } from "react";

//create your first component
const Home = () => {

	const [todoList, setTodoList] = useState([])

	const [tarea, setTarea] = useState("")

	const tareaNueva = () => {
		if (tarea.trim() == "") {
			alert("Los campos no pueden estar vacios")
		}
		setTodoList([tarea, ...todoList])
		setTarea("")
	}

	const enterK = (e) => {
		if (e.key == "Enter") {
			tareaNueva()
		}
	}


	const eliminar = (ia) => {
		const borrar = todoList.filter((item, i) => i !== ia);
		setTodoList(borrar);
	}

	return (
		<>
			<div class="card position-absolute top-50 start-50 translate-middle" >
				<div class="card-body">
					<div className="text-center">
						<h1>Lista de Compras</h1>
						<div className="input-group mb-3 mt-3 p-0">
							<input onKeyUp={enterK} value={tarea} onChange={(e) => setTarea(e.target.value)} type="text" className="form-control" placeholder="ingresa aqui su compra" aria-label="ingresa aqui su compra" aria-describedby="button-addon2" />
							<button className="btn btn-outline-secondary" type="button" id="Añadir" onClick={tareaNueva} >Agregar</button>
						</div>

						<div className="text-center " style={{
					maxHeight: "27em",
					overflowY: "auto",
					lineHeight: "1.5em",
					textOverflow: "clip",
					whiteSpace: "normal",
				}}>
							{ todoList.length > 0 ? (
								todoList.map((item, i) => (
									<div key={i}>
										<div className="textoLista input-group d-flex justify-content-center d-flex justify-content-between">
											<p className="textoListaVista">{item}</p>
											<button className="btn m-0 eliminar" type="button" onClick={() => eliminar(i)}> <i class="fa-regular fa-trash-can"></i> </button>
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