import ListaPostagens from "../../components/postagem/ListaPostagem";
import ModalPostagem from "../../components/postagem/ModalPostagem";
import devImg from "../../assets/dev.png";

function Home() {
    return (
        <>
            <main className="bg-indigo-900 flex justify-center">
                <section className="container grid grid-cols-2 text-white">
                    <article className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className="text-5xl font-bold">
                            Seja bem vinde!
                        </h2>
                        <p className="text-xl">
                            Expresse aqui os seus pensamentos e opiniões!
                        </p>
                        <ModalPostagem />
                    </article>
                    <figure className="flex justify-center items-center">
                        <img
                            src={devImg}
                            alt="Ilustração de uma pessoa codando em um laptop"
                            className="max-w-md max-h-96 w-auto h-auto"
                        />
                    </figure>
                </section>
            </main>
            <ListaPostagens />
        </>
    );
}

export default Home;