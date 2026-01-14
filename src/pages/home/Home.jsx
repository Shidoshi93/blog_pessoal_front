import React from "react";

function Home() {
  return (
    <>
        <div 
            style={{
            backgroundColor: '#312e81',
            display: 'flex',
            justifyContent: 'center',
            }}
        >
            <div 
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    color: 'white',
                    width: '100%',
                    maxWidth: '1280px',
                }}
            >
                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1rem 0',
                    }}
                >
                    <h2 
                        style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Seja bem vinde!
                    </h2>
                    <p 
                        style={{
                            fontSize: '1.25rem',
                        }}
                    >
                        Expresse aqui os seus pensamentos e opiniões!
                    </p>
                    <button 
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            color: 'white',
                            backgroundColor: '#312e81',
                            border: '2px solid white',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                        }}
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
                </div>
                <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img 
                        src="/src/assets/dev.png" 
                        alt="Ilustração de uma pessoa codando em um laptop"
                    />
                </div>
            </div>
        </div>
    </>
  );
}

export default Home;