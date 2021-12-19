const Objetivos = ({ item, tipo, className }) => {
  const ObjetivosCopy = item.objetivos.map((objetivo) => {
    if (objetivo.tipo === tipo) {
      return (
        <>
          <li className={className}>{objetivo.descripcion}</li>
        </>
      );
    }
    return null;
  });
  return ObjetivosCopy;
};

export default Objetivos;
