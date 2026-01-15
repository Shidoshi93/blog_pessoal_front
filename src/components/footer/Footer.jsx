import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

function Footer() {
    let currentYear = new Date().getFullYear();
    return (
        <footer className="flex justify-center bg-indigo-900 text-white">
            <section className="container flex flex-col py-4 items-center">
                <p className="text-xl font-bold">&copy; {currentYear} Blog Pessoal. Todos os direitos reservados.</p>
                <p className="text-lg">Entre em contato pelas redes sociais:</p>

                <section className="flex gap-2">
                    <a href="https://www.linkedin.com/in/seu-perfil" target="_blank" aria-label="LinkedIn">
                        <LinkedinLogoIcon size={48} weight="bold"/>
                    </a>
                    <a href="https://www.instagram.com/seu-perfil" target="_blank" aria-label="Instagram">
                        <InstagramLogoIcon size={48} weight="bold"/>
                    </a>
                    <a href="https://www.github.com/seu-perfil" target="_blank" aria-label="GitHub">
                        <GithubLogoIcon size={48} weight="bold"/>
                    </a>
                </section>
            </section>
        </footer>
    );
}

export default Footer;