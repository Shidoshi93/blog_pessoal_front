import React from "react";

function Home() {
  return (
    <>
        <main className="bg-indigo-900 flex-1 flex justify-center items-start w-full p-20">
            <section className="w-full h-full flex items-center justify-around px-8">
                <article className="flex flex-col gap-4 items-center justify-center text-white">
                    <h2 className="text-5xl font-bold">
                        Seja bem vinde!
                    </h2>
                    <p className="text-xl">
                        Expresse aqui os seus pensamentos e opiniões!
                    </p>
                    <button
                        className="mt-4 px-4 py-2 text-lg font-bold text-white bg-indigo-800 border-2 border-white rounded-lg cursor-pointer"
                        onClick={() => {
                            window.alert('Funcionalidade de nova postagem ainda não implementada.');
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = '#312e81';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#312e81';
                            e.target.style.color = 'white';
                        }}
                    >
                        Nova postagem
                    </button>
                </article>
                <figure className="flex justify-center items-center">
                    <img 
                        src="/src/assets/dev.png" 
                        alt="Ilustração de uma pessoa codando em um laptop"
                        className="max-w-md max-h-96 w-auto h-auto"
                    />
                </figure>
            </section>
        </main>
    </>
  );
}

export default Home;