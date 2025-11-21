'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, Database, Shield, Bell } from 'lucide-react';

export default function ConfiguracoesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
                <p className="text-gray-600 mt-2">Gerencie as configurações do sistema</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-brand/10 rounded-lg">
                                <Database className="w-5 h-5 text-brand" />
                            </div>
                            <CardTitle>Banco de Dados</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Configurações relacionadas ao Supabase PostgreSQL e Storage.
                        </p>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm font-medium">Status do PostgreSQL</span>
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Conectado</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm font-medium">Status do Storage</span>
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Conectado</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-brand/10 rounded-lg">
                                <Shield className="w-5 h-5 text-brand" />
                            </div>
                            <CardTitle>Segurança</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Configurações de autenticação e permissões.
                        </p>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm font-medium">Autenticação</span>
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Ativa</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm font-medium">Método</span>
                                <span className="text-xs text-gray-600">Email/Senha</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm font-medium">Row Level Security</span>
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Ativo</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-brand/10 rounded-lg">
                                <Settings className="w-5 h-5 text-brand" />
                            </div>
                            <CardTitle>Geral</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Configurações gerais da aplicação.
                        </p>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium block mb-1">Nome do Site</label>
                                <input
                                    type="text"
                                    defaultValue="GuiaCP"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium block mb-1">Email de Contato</label>
                                <input
                                    type="email"
                                    defaultValue="laacapufslag@gmail.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    disabled
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-brand/10 rounded-lg">
                                <Bell className="w-5 h-5 text-brand" />
                            </div>
                            <CardTitle>Notificações</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Configure as notificações do sistema.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Novos conteúdos</span>
                                <input type="checkbox" className="w-4 h-4" disabled />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Comentários</span>
                                <input type="checkbox" className="w-4 h-4" disabled />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="py-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Shield className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-yellow-900">Importante: Configure o Supabase</h3>
                            <p className="text-sm text-yellow-800 mt-1">
                                Para que o sistema funcione corretamente, você precisa:
                            </p>
                            <ul className="text-sm text-yellow-800 mt-2 space-y-1 list-disc list-inside">
                                <li>Criar um projeto no Supabase (https://supabase.com)</li>
                                <li>Executar o SQL schema para criar a tabela 'contents'</li>
                                <li>Criar um bucket 'content-images' no Storage com política pública de leitura</li>
                                <li>Ativar Email/Password authentication</li>
                                <li>Adicionar usuários administradores na seção Authentication</li>
                                <li>Copiar URL e Anon Key para o arquivo .env.local</li>
                            </ul>
                            <a
                                href="https://supabase.com/dashboard"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3"
                            >
                                <Button variant="outline" size="sm">
                                    Abrir Supabase Dashboard
                                </Button>
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
