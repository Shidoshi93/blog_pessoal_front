import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

function Footer() {
    let currentYear = new Date().getFullYear();
    return (
        <footer className="flex justify-center bg-indigo-900 text-white">
            <section className="container flex flex-col py-4 text-center items-center">
                <p className="text-lg font-bold">&copy; {currentYear} Blog Pessoal. Todos os direitos reservados.</p>
                <p className="text-lg">Entre em contato pelas redes sociais:</p>

                <section className="flex gap-2">
                    <LinkedinLogoIcon size={48} weight="bold"/>
                    <InstagramLogoIcon size={48} weight="bold"/>
                    <GithubLogoIcon size={48} weight="bold"/>
                </section>
            </section>
        </footer>
    );
}

export default Footer;