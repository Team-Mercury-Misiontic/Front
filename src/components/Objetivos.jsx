const Objetivos = ({ item, tipo, className }) => {
  const Objetivos = item.objetivos.map((objetivo) => {
    if (objetivo.tipo === tipo) {
      return (
        <>
          <li className={className}>{objetivo.descripcion}</li>
        </>
      );
    }
    return null;
  });
  return Objetivos;
};

export default Objetivos;
