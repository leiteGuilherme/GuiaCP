import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="text-lg font-bold text-bordo-800 mb-4">GuiaCP</h3>
                        <p className="text-sm text-gray-600 max-w-xs">
                            Portal educativo dedicado ao estudo da anatomia de cabeça e pescoço.
                            Conteúdo revisado e focado no aprendizado acadêmico.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Links Rápidos</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link href="/" className="hover:text-bordo-800">Início</Link>
                            </li>
                            <li>
                                <Link href="/#conteudo" className="hover:text-bordo-800">Conteúdos</Link>
                            </li>
                            <li>
                                <Link href="/admin" className="hover:text-bordo-800">Área Administrativa</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Contato</h4>
                        <p className="text-sm text-gray-600">
                            Dúvidas ou sugestões? Entre em contato conosco.
                        </p>
                        <a href="mailto:contato@guiacp.com" className="mt-2 block text-sm font-medium text-bordo-800 hover:underline">
                            contato@guiacp.com
                        </a>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} GuiaCP. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}
