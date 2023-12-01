function NotFound() {
    return (
      <main className="text-center flex justify-center items-center flex-col h-screen mt-0 mb-0 ml-auto mr-auto">
        <h2 className="text-3xl text-accent font-bold">Ocurrió un problema</h2>
        <p>No pudimos encontrar la página que buscabas</p>
        <p>
          Volver al <a href="/">Inicio</a>
        </p>
      </main>
    );
  }
  
  export default NotFound;