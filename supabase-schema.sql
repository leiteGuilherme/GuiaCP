-- GuiaCP Supabase Database Schema
-- Execute este SQL no SQL Editor do Supabase Dashboard

-- Criar tabela contents
CREATE TABLE IF NOT EXISTS contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  blocks JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para ordenação por data de criação
CREATE INDEX IF NOT EXISTS idx_contents_created_at ON contents(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer um pode ler conteúdos (acesso público)
CREATE POLICY "Anyone can read contents" ON contents
  FOR SELECT USING (true);

-- Política: Apenas usuários autenticados podem inserir
CREATE POLICY "Authenticated users can insert" ON contents
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política: Apenas usuários autenticados podem atualizar
CREATE POLICY "Authenticated users can update" ON contents
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Política: Apenas usuários autenticados podem deletar
CREATE POLICY "Authenticated users can delete" ON contents
  FOR DELETE USING (auth.role() = 'authenticated');

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_contents_updated_at BEFORE UPDATE ON contents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
