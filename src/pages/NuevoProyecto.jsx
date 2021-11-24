const NuevoProyecto = () =>{
    return(
        <>
        <section className="pt-11 text-center h-32 ">
            <h1 className="font-sans text-4xl font-bold uppercase">
                CREAR NUEVO PROYECTO
            </h1>
        </section>
        <section className="h-3/4 ">
            <form className="flex flex-col min-w-min w-1/3 mx-auto bg-gray-100 py-3 text-center text-xl text-gray-500 uppercase font-bold  h-full rounded-3xl">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="objetivo">Objetivos</label>
                <input  type="text" id="objetivo" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="lider">Lider</label>
                <input  type="text" id="lider" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="LiderId">Identificacion</label>
                <input  type="text" id="LiderId" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="presupuesto">Presupuesto</label>
                <input  type="number" id="presupuesto" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="inicio">Fecha de Inicio</label>
                <input  type="date" id="inicio" className="m-auto text-center rounded-md text-black text-lg"/>
                <label htmlFor="fin">Fecha de Finalizacion</label>
                <input  type="date" id="fin" className="m-auto text-center rounded-md text-black text-lg pb-3"/>
                <button type="submit" className="border-black border-2">Crear Nuevo Proyecto </button>
            </form>
        </section>
        </>

    )
}
export default NuevoProyecto