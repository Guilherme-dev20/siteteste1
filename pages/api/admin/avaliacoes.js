import { createClient } from '@supabase/supabase-js'

// Service role key — bypassa RLS, nunca exposta ao browser
const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

export default async function handler(req, res) {
  // Proteção básica por senha
  const auth = req.headers['x-admin-password']
  if (auth !== (process.env.ADMIN_PASSWORD || 'cometa2025')) {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  // GET — busca todas as avaliações
  if (req.method === 'GET') {
    const { data, error } = await adminSupabase
      .from('avaliacoes')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  // PATCH — atualiza status
  if (req.method === 'PATCH') {
    const { id, status } = req.body
    const { error } = await adminSupabase
      .from('avaliacoes')
      .update({ status })
      .eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  // DELETE — apaga avaliação
  if (req.method === 'DELETE') {
    const { id } = req.body
    const { error } = await adminSupabase
      .from('avaliacoes')
      .delete()
      .eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  res.status(405).json({ error: 'Método não permitido' })
}
